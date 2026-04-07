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
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-700">
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
          "w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 transition duration-200",
          "placeholder:text-slate-400 focus:outline-none focus:ring-2",
          error
            ? "border-rose-300 focus:border-rose-400 focus:ring-rose-200"
            : "border-slate-300 focus:border-indigo-400 focus:ring-indigo-200",
        ].join(" ")}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
}

export default Input;
