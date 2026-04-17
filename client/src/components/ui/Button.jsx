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
      "bg-gradient-to-br from-[#002045] to-[#1a365d] text-[#ffffff] hover:from-[#001b3c] hover:to-[#002045] active:from-[#001b3c] hover:to-[#002045] focus-visible:ring-[#0061a5] shadow-lg shadow-[#002045]/10",
    secondary:
      "bg-[#ffffff] text-[#181c1e] hover:bg-neutral-700 active:bg-neutral-600 focus-visible:ring-neutral-500 border border-[#c4c6cf]/20",
    success:
      "bg-emerald-600 text-[#181c1e] hover:bg-gradient-to-br from-[#002045] to-[#1a365d] active:bg-emerald-700 focus-visible:ring-emerald-500",
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
