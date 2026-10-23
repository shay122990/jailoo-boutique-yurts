import Spinner from "./_components/Spinner";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Spinner size={64} />
    </div>
  );
}
