function RoleBadge({ role }) {
  const isAdmin = role === "admin";

  return (
    <span
      className={[
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold capitalize",
        isAdmin
          ? "bg-indigo-100 text-indigo-700"
          : "bg-emerald-100 text-emerald-700",
      ].join(" ")}
    >
      {role || "unknown"}
    </span>
  );
}

export default RoleBadge;
