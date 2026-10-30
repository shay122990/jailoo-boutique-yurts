import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/solid";
import Button from "../../_components/Button";

function SignOutButton() {
  return (
    <Button className="flex w-full items-center gap-4 px-5 py-3 font-semibold  transition-colors hover:bg-pink hover:text-plum">
      <ArrowRightStartOnRectangleIcon className="h-5 w-5 text-plum" />
      <span className="text-plum">Sign out</span>
    </Button>
  );
}

export default SignOutButton;
