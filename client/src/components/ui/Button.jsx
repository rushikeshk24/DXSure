function Button({
  children,
  type = "button",
  variant = "primary",
  fullWidth = false,
  loading = false,
  disabled = false,
  className = "",
  ...props
}) {
  const variantStyles = {
    primary:
      "bg-emerald-500 text-neutral-950 hover:bg-emerald-400 active:bg-emerald-600 focus-visible:ring-emerald-400 shadow-lg shadow-emerald-500/20",
    secondary:
      "bg-neutral-800 text-neutral-200 hover:bg-neutral-700 active:bg-neutral-600 focus-visible:ring-neutral-500 border border-white/5",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700 focus-visible:ring-emerald-500",
    danger:
      "bg-red-500/10 text-red-400 hover:bg-red-500/20 active:bg-red-500/30 border border-red-500/20 focus-visible:ring-red-500",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        fullWidth ? "w-full" : "",
        variantStyles[variant] || variantStyles.primary,
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default Button;
