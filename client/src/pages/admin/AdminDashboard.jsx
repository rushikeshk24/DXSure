import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { dashboardApi } from "../../services/api";

function AdminDashboard() {
  const [summary, setSummary] = useState({});

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
    };

    fetchSummary();
  }, []);

  const cards = [
    { label: "Users", value: summary.users || 0 },
    { label: "Tickets", value: summary.tickets || 0 },
    { label: "Clients", value: summary.clients || 0 },
    { label: "Day Plans", value: summary.dayPlans || 0 },
    { label: "Entries", value: summary.expenses || 0 },
  ];

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Admin Dashboard</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.label} className="rounded-xl border-indigo-100 bg-indigo-50/60">
            <p className="text-sm font-medium text-slate-600">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-indigo-700">{card.value}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
