import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import RoleBadge from "../components/ui/RoleBadge";
import { authApi } from "../services/api";

function LoginPage() {
  const navigate = useNavigate();
  const existingUser = JSON.parse(localStorage.getItem("user") || "null");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authApi.login(formData);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (apiError) {
      setError(apiError.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-950 text-neutral-200">
      {/* Visual branding side */}
      <div className="hidden flex-col justify-between bg-neutral-900 border-r border-white/5 p-10 lg:flex lg:w-1/2 xl:w-2/3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6"><path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" /></svg>
          </div>
          <p className="text-xl font-bold tracking-tight text-white">DXSure Operations</p>
        </div>
        <div className="space-y-4 max-w-xl">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Streamlined workflow<br /> for <span className="text-emerald-400">your business.</span>
          </h1>
          <p className="text-lg text-neutral-400">
            Log in to manage records, handle ticketing securely, and collaborate securely on the central workspace.
          </p>
        </div>
        <div className="text-sm font-medium text-neutral-600">
          &copy; {new Date().getFullYear()} DXSure Systems
        </div>
      </div>

      {/* Login Form Side */}
      <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:px-20 xl:w-1/3 xl:px-24">
        <div className="mx-auto w-full max-w-sm space-y-8">
          <div className="lg:hidden flex items-center gap-3 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M4.5 3.75a3 3 0 00-3 3v10.5a3 3 0 003 3h15a3 3 0 003-3V6.75a3 3 0 00-3-3h-15zm4.125 3a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zm-3.873 8.703a4.126 4.126 0 017.746 0 .75.75 0 01-.351.92 7.47 7.47 0 01-3.522.877 7.47 7.47 0 01-3.522-.877.75.75 0 01-.351-.92zM15 8.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15zM14.25 12a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H15a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3.75a.75.75 0 000-1.5H15z" clipRule="evenodd" /></svg>
            </div>
            <p className="text-lg font-bold tracking-tight text-white">DXSure</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white">
              Sign in
            </h2>
            <p className="text-sm text-neutral-400">
              Enter your corporate credentials to continue.
            </p>
            {existingUser?.role ? (
              <div className="pt-2">
                <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-500">Saved Session Activity</p>
                <RoleBadge role={existingUser.role} />
              </div>
            ) : null}
          </div>

          <Card className="!p-6 bg-transparent border-0 shadow-none lg:bg-neutral-900/50 lg:border lg:border-white/10 lg:shadow-xl lg:backdrop-blur-sm lg:!p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                type="email"
                name="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="yours@company.com"
              />
              <Input
                type="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />

              {error ? <p className="text-sm font-medium text-red-500">{error}</p> : null}

              <div className="pt-2">
                <Button type="submit" fullWidth loading={loading}>
                  Sign in securely
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
