import { NextResponse } from "next/server";
import stripe from "../../../../_lib/stripe";
import { supabaseAdmin } from "../../../../_lib/supabaseAdmin";

// Successful payment verification and booking confirmation.
// Failed payment attempt logging without cancelling the booking.
// Expired Checkout Session handling.
// Stripe signature verification.
// Booking, session, amount and currency validation.

export async function POST(request) {
  // read the raw request body and verify Stripe's signature
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error.message);

    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // handle successful checkout payments
  if (event.type === "checkout.session.completed") {
    const checkoutSession = event.data.object;

    if (checkoutSession.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const bookingId = checkoutSession.metadata?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing booking ID" },
        { status: 400 },
      );
    }

    // Find the corresponding booking
    const { data: booking, error: bookingError } = await supabaseAdmin
      .from("bookings")
      .select("id, totalPrice, stripeSessionId, isPaid")
      .eq("id", bookingId)
      .maybeSingle();

    if (bookingError) {
      console.error("Booking lookup failed:", bookingError);

      return NextResponse.json(
        { error: "Booking lookup failed" },
        { status: 500 },
      );
    }

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 400 });
    }

    // Verify that this Stripe session belongs to this booking
    if (booking.stripeSessionId !== checkoutSession.id) {
      console.error("Stripe session does not match booking");

      return NextResponse.json({ error: "Session mismatch" }, { status: 400 });
    }

    // Verify payment amount and currency
    const expectedAmount = Math.round(Number(booking.totalPrice) * 100);

    if (
      checkoutSession.amount_total !== expectedAmount ||
      checkoutSession.currency !== "usd"
    ) {
      console.error("Payment amount or currency mismatch");

      return NextResponse.json(
        { error: "Payment amount mismatch" },
        { status: 400 },
      );
    }

    // Avoid processing an already-paid booking again
    if (booking.isPaid) {
      return NextResponse.json({ received: true });
    }

    // Confirm booking in Supabase
    const { error: updateError } = await supabaseAdmin
      .from("bookings")
      .update({
        isPaid: true,
        status: "confirmed",
        stripePaymentIntentId: checkoutSession.payment_intent,
      })
      .eq("id", bookingId)
      .eq("isPaid", false);

    if (updateError) {
      console.error("Booking payment update failed:", updateError);

      return NextResponse.json(
        { error: "Could not update booking" },
        { status: 500 },
      );
    }
  }

  // handle failed payment attempts
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    const bookingId = paymentIntent.metadata?.bookingId;

    console.log("Payment attempt failed:", {
      bookingId,
      reason: paymentIntent.last_payment_error?.message,
    });

    // Don't cancel the booking here.
    // The customer may retry payment through Checkout.
  }

  // handle expired Checkout Sessions
  if (event.type === "checkout.session.expired") {
    const checkoutSession = event.data.object;
    const bookingId = checkoutSession.metadata?.bookingId;

    if (!bookingId) {
      return NextResponse.json(
        { error: "Missing booking ID" },
        { status: 400 },
      );
    }

    const { error: expireError } = await supabaseAdmin
      .from("bookings")
      .update({
        status: "expired",
      })
      .eq("id", bookingId)
      .eq("stripeSessionId", checkoutSession.id)
      .eq("isPaid", false);

    if (expireError) {
      console.error("Booking expiration failed:", expireError);

      return NextResponse.json(
        { error: "Could not expire booking" },
        { status: 500 },
      );
    }
  }

  // Why we added webhook idempotency:
  // Stripe sometimes sends the same event more than once.
  // For example, a customer pays for a booking, but Stripe doesn't receive
  // a response from our server, so it sends the payment event again.
  // Without this protection, we could process the same payment twice.
  // We now save each event's unique ID in Supabase and check it before
  // processing. If we've already handled that event, we ignore it.
  // This keeps our booking and payment records consistent.
  const { data: claimed, error: claimError } = await supabaseAdmin.rpc(
    "claim_stripe_event",
    {
      p_event_id: event.id,
      p_event_type: event.type,
    },
  );

  if (claimError) {
    console.error("Could not claim Stripe event:", claimError);

    return NextResponse.json(
      { error: "Could not claim event" },
      { status: 500 },
    );
  }

  // Check if this event was already processed or claimed
  if (!claimed) {
    const { data: existingEvent, error: lookupError } = await supabaseAdmin
      .from("stripe_webhook_events")
      .select("status")
      .eq("event_id", event.id)
      .maybeSingle();

    if (lookupError) {
      return NextResponse.json(
        { error: "Could not check event status" },
        { status: 500 },
      );
    }

    if (existingEvent?.status === "processed") {
      return NextResponse.json({ received: true });
    }

    return NextResponse.json(
      { error: "Event is already being processed" },
      { status: 500 },
    );
  }

  return NextResponse.json({ received: true });
}
