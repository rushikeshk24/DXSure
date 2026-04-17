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
    <div className="min-h-screen bg-[#f7fafc] text-[#181c1e]">
      <Navbar
        title={`DXSure - ${title}`}
        subtitle="Operational Dashboard"
        rightSlot={
          <div className="flex items-center gap-4">
            <span className="hidden items-center gap-2 text-sm text-[#43474e] sm:inline-flex">
              <span className="font-medium">{user?.name}</span>
              <RoleBadge role={user?.role} />
            </span>
            <Link
              to="/dashboard"
              className="hidden rounded-lg bg-white/5 px-3 py-2 text-xs font-semibold text-[#43474e] transition hover:bg-[#ebeef0] hover:text-[#181c1e] border border-transparent sm:inline-block"
            >
              Operational Hub
            </Link>
            <Button variant="secondary" onClick={logout} className="!py-2 !px-3 text-xs">
              Logout
            </Button>
          </div>
        }
      />

      <div className="mx-auto grid w-full max-w-screen-2xl gap-6 p-4 md:grid-cols-[240px_1fr] md:p-6 lg:p-8">
        <aside>
          <Card className="sticky top-24 h-fit p-3 bg-[#ffffff] border-[#c4c6cf]/20 shadow-2xl">
            <nav className="space-y-1.5 flex flex-col">
              {links.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={[
                      "block rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-br from-[#002045] to-[#1a365d]/10 text-emerald-400 border border-emerald-500/20 shadow-sm"
                        : "text-[#43474e] border border-transparent hover:bg-white/5 hover:text-[#181c1e]",
                    ].join(" ")}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </Card>
        </aside>

        <Card className="min-h-[calc(100vh-10rem)] bg-[#ffffff] border-[#c4c6cf]/20 shadow-2xl">
          <main className="space-y-5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#002045] to-[#1a365d]"></div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#74777f]">
                {title} Overview
              </p>
            </div>
            <Outlet />
          </main>
        </Card>
      </div>
    </div>
  );
}

export default Layout;
