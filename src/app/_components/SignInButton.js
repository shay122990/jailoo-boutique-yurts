import { signIn } from "../../_lib/auth";

function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}

export default SignInButton;
