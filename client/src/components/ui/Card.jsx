function Card({ children, className = "" }) {
  return (
    <div
      className={[
        "rounded-2xl border border-white/10 bg-neutral-900/50 p-5 shadow-lg shadow-black/20 backdrop-blur-sm md:p-6",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

export default Card;
