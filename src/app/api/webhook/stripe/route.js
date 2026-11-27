import { NextResponse } from "next/server";
import stripe from "../../../../_lib/stripe";
import { supabaseAdmin } from "../../../../_lib/supabaseAdmin";

export async function POST(request) {
  // read the raw request body and verify stripe's signature
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  // reference
  //   {
  //   "id": "evt_123",
  //   "type": "checkout.session.completed",
  //   "data": {
  //     "object": {
  //       "id": "cs_test_123",
  //       "payment_status": "paid",
  //       "amount_total": 25000,
  //       "currency": "usd"
  //     }
  //   }
  // }

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

    // get corresponding booking
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

    // check that this stripe session belongs to this booking
    if (booking.stripeSessionId !== checkoutSession.id) {
      console.error("Stripe session does not match booking");

      return NextResponse.json({ error: "Session mismatch" }, { status: 400 });
    }

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

    // avoid processing an already-paid booking again
    if (booking.isPaid) {
      return NextResponse.json({ received: true });
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      const bookingId = paymentIntent.metadata?.bookingId;

      console.log("Payment attempt failed:", {
        bookingId,
        reason: paymentIntent.last_payment_error?.message,
      });

      // Do not cancel the booking here.
      // The customer may retry payment through Checkout.
    }

    // update booking in supabase
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

  return NextResponse.json({ received: true });
}
