function RoleBadge({ role }) {
  const isAdmin = role === "admin";

  return (
    <span
      className={[
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider",
        isAdmin
          ? "border-emerald-500/30 bg-gradient-to-br from-[#002045] to-[#1a365d]/10 text-emerald-400"
          : "border-sky-500/30 bg-sky-500/10 text-sky-400",
      ].join(" ")}
    >
      {role || "unknown"}
    </span>
  );
}

export default RoleBadge;
