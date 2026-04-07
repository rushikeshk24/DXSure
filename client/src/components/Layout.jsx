import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Button from "./ui/Button";
import Card from "./ui/Card";
import Navbar from "./ui/Navbar";
import RoleBadge from "./ui/RoleBadge";

function Layout({ title, links }) {
  const navigate = useNavigate();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        title={`DXSure CRM - ${title}`}
        subtitle="Modern workflow dashboard"
        rightSlot={
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-2 text-sm text-slate-600 sm:inline-flex">
              <span>{user?.name}</span>
              <RoleBadge role={user?.role} />
            </span>
            <Link
              to={user?.role === "admin" ? "/admin" : "/employee"}
              className="hidden rounded-xl bg-slate-100 px-3 py-2 text-xs font-medium text-slate-700 transition hover:bg-slate-200 sm:inline-block"
            >
              {user?.role === "admin" ? "Admin Dashboard" : "Employee Dashboard"}
            </Link>
            <Button variant="secondary" onClick={logout}>
              Logout
            </Button>
          </div>
        }
      />

      <div className="mx-auto grid w-full max-w-7xl gap-4 p-4 md:grid-cols-[260px_1fr] md:p-6">
        <Card className="h-fit p-3">
          <nav className="space-y-1">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={[
                    "block rounded-xl px-3 py-2 text-sm transition-colors duration-200",
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "text-slate-700 hover:bg-indigo-50 hover:text-indigo-700",
                  ].join(" ")}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </Card>

        <Card className="min-h-[calc(100vh-9rem)]">
          <main className="space-y-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {title} workspace
            </p>
            <Outlet />
          </main>
        </Card>
      </div>
    </div>
  );
}

export default Layout;
