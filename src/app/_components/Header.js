import Navigation from "./Navigation";
import Logo from "./Logo";

export default function Header() {
  return (
    <header className="relative z-20 border-b border-primary-900/30 px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
