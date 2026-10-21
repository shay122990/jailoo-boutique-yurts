export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "medium",
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-primary-900 text-white hover:bg-primary-800 focus:ring-primary-700",
    secondary:
      "border border-primary-900 text-primary-900 hover:bg-primary-50 focus:ring-primary-700",
    white: "bg-white text-stone-900 hover:bg-stone-100 focus:ring-white",
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-5 py-3 text-base",
    large: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant] ?? variants.primary} ${
        sizes[size] ?? sizes.medium
      } ${className}`}
    >
      {children}
    </button>
  );
}
