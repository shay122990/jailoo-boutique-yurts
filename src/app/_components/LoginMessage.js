import Link from "next/link";

function LoginMessage() {
  return (
    <div className="grid bg-plum rounded-2xl">
      <p className="text-center text-xl py-12 self-center text-white">
        Please{" "}
        <Link href="/login" className="underline text-teal">
          login
        </Link>{" "}
        to reserve this
        <br /> yurt right now
      </p>
    </div>
  );
}

export default LoginMessage;
