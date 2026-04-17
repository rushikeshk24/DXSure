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
        <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-[#43474e]">
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
          "w-full rounded-lg border bg-[#ffffff] px-3.5 py-2.5 text-sm text-[#181c1e] transition duration-200 backdrop-blur-sm",
          "placeholder:text-[#74777f] focus:outline-none focus:ring-2",
          error
            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
            : "border-[#c4c6cf]/20 focus:border-[#0061a5] focus:ring-[#0061a5]/10",
        ].join(" ")}
        {...props}
      />
      {error ? <p className="mt-1.5 text-xs font-medium text-red-400">{error}</p> : null}
    </div>
  );
}

export default Input;
