function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default Card;
