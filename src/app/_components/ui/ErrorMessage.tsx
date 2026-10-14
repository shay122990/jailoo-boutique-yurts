import Button from "./Button";

type ErrorMessageProps = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export default function ErrorMessage({
  title = "Something went wrong",
  message = "We couldn't load the information. Please try again.",
  onRetry,
}: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center justify-center gap-3 px-6 py-12 text-center"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee9df] text-[#7c8067]">
        <span className="text-2xl" aria-hidden="true">
          !
        </span>
      </div>

      <h3 className="font-marcellus text-2xl text-[#292d25]">{title}</h3>

      <p className="max-w-md text-sm leading-7 text-[#686a60]">{message}</p>

      {onRetry && (
        <Button
          onClick={onRetry}
          className="mt-2 bg-[#414938] px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#30372a]"
        >
          Try again
        </Button>
      )}
    </div>
  );
}
