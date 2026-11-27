import Link from "next/link";

export const metadata = {
  title: "Payment Unsuccessful | Jailoo",
};

function PaymentFailed() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-red-600 text-3xl">
        ×
      </div>

      <h1 className="mb-3 text-3xl font-semibold">Payment unsuccessful</h1>

      <p className="mb-8 max-w-md text-gray-600">
        Your payment could not be completed. Your booking has not been
        confirmed. Please try again.
      </p>

      <Link
        href="/yurts"
        className="rounded-md bg-[#414938] px-6 py-3 text-white transition hover:bg-[#30372a]"
      >
        Back to yurts
      </Link>
    </main>
  );
}

export default PaymentFailed;
