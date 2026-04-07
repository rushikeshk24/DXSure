import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Navbar from "../components/ui/Navbar";
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
    <div className="min-h-screen bg-slate-50">
      <Navbar title="DXSure CRM" subtitle="Secure access portal" />
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 sm:p-6">
        <Card className="w-full max-w-md rounded-3xl p-6 shadow-lg sm:p-8">
          <div className="mb-6 space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              Sign in
            </h2>
            <p className="text-sm text-slate-500">
              Welcome back. Access your dashboard securely.
            </p>
            {existingUser?.role ? (
              <div className="pt-1">
                <p className="mb-1 text-xs text-slate-500">Current saved role</p>
                <RoleBadge role={existingUser.role} />
              </div>
            ) : null}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              name="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="you@company.com"
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
            />

            {error ? <p className="text-sm font-medium text-rose-600">{error}</p> : null}

            <Button type="submit" fullWidth loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Use an admin account to open admin dashboard and an employee account
            to open employee dashboard.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default LoginPage;
