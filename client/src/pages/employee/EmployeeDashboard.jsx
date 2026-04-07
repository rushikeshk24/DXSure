import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { dashboardApi } from "../../services/api";

function EmployeeDashboard() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Employee Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-xl border-emerald-100 bg-emerald-50/60">
          <p className="text-sm font-medium text-slate-600">Total Clients</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {summary.clients || 0}
          </p>
        </Card>
        <Card className="rounded-xl border-emerald-100 bg-emerald-50/60">
          <p className="text-sm font-medium text-slate-600">Tickets</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {summary.tickets || 0}
          </p>
        </Card>
        <Card className="rounded-xl border-emerald-100 bg-emerald-50/60">
          <p className="text-sm font-medium text-slate-600">Day Plans</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {summary.dayPlans || 0}
          </p>
        </Card>
        <Card className="rounded-xl border-emerald-100 bg-emerald-50/60">
          <p className="text-sm font-medium text-slate-600">Payments</p>
          <p className="mt-2 text-3xl font-semibold text-emerald-700">
            {summary.expenses || 0}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
