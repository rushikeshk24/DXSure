function Input({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  error = "",
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-neutral-300">
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className={[
          "w-full rounded-lg border bg-neutral-900/50 px-3.5 py-2.5 text-sm text-white transition duration-200 backdrop-blur-sm",
          "placeholder:text-neutral-600 focus:outline-none focus:ring-2",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
            : "border-white/10 focus:border-emerald-500 focus:ring-emerald-500/20",
        ].join(" ")}
        {...props}
      />
      {error ? <p className="mt-1.5 text-xs font-medium text-red-400">{error}</p> : null}
    </div>
  );
}

export default Input;
