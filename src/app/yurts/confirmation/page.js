import Link from "next/link";
import { auth } from "../../../_lib/auth";
import { supabaseAdmin } from "../../../_lib/supabaseAdmin";

export default async function Page({ searchParams }) {
  const { session_id: sessionId } = await searchParams;
  const session = await auth();

  let isPaid = false;

  if (sessionId && session?.user?.guestId) {
    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .select("isPaid")
      .eq("stripeSessionId", sessionId)
      .eq("guestId", session.user.guestId)
      .maybeSingle();

    if (error) {
      console.error("Could not verify booking:", error);
    }

    isPaid = booking?.isPaid === true;
  }

  return (
    <div className="mt-4 space-y-6 text-center">
      {isPaid ? (
        <>
          <h1 className="text-3xl font-semibold">
            Thank you for your reservation!
          </h1>

          <p>Your payment has been confirmed.</p>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold">Payment pending</h1>

          <p>
            Your payment has not yet been confirmed. Please check your
            reservations shortly.
          </p>
        </>
      )}

      <Link
        href="/account/reservations"
        className="inline-block text-xl text-accent-500 underline"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
