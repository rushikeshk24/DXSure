import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { dashboardApi, dayPlanApi } from "../../services/api";

function EmployeeDashboard() {
  const [summary, setSummary] = useState({});
  const [recentPlans, setRecentPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [summaryRes, plansRes] = await Promise.all([
        dashboardApi.getSummary(),
        dayPlanApi.getAll(),
      ]);
      setSummary(summaryRes.data);
      setRecentPlans(plansRes.data?.slice().reverse().slice(0, 5) || []);
    };

    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Employee Portal - Dashboard
        </h2>
        <p className="mt-1 font-medium text-[#43474e]">
          Syncing backend tracking metrics across active models.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Column */}
        <div className="col-span-12 space-y-6 lg:col-span-8">
          <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-8 shadow-sm backdrop-blur-md">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h3 className="flex items-center gap-2 text-xl font-bold text-[#181c1e]">
                  <span className="material-symbols-outlined text-[#002045]">
                    event_note
                  </span>
                  My Daily Operations
                </h3>
                <p className="mt-1 text-sm text-[#43474e]">
                  Manage priorities and pipeline progression.
                </p>
              </div>
              <span className="rounded-full bg-[#d6e3ff] px-3 py-1 text-xs font-bold text-[#0061a5]">
                ACTIVE
              </span>
            </div>
            
            <div className="space-y-4">
              {recentPlans.length === 0 ? (
                <p className="text-sm text-[#43474e]">No active day plans found.</p>
              ) : (
                recentPlans.map((plan) => (
                  <div key={plan._id || Math.random()} className="group flex items-start gap-4 rounded-lg bg-[#f1f4f6] p-4 transition-all hover:bg-[#ebeef0] hover:shadow-[0_8px_32px_rgba(24,28,30,0.06)] ring-1 ring-transparent">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#181c1e]">{plan.task}</h4>
                      <p className="mt-0.5 text-xs text-[#43474e]">{new Date(plan.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${plan.status === 'done' ? 'bg-emerald-500/10 text-[#002045]' : 'bg-amber-500/10 text-amber-500'}`}>
                        {plan.status?.toUpperCase() || 'PENDING'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* Stats Column */}
        <div className="col-span-12 space-y-8 lg:col-span-4">
          <div className="space-y-4">
            <h3 className="px-1 text-xs font-bold uppercase tracking-widest text-[#43474e]">
              Live DB Stats
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="group relative overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-5 shadow-sm backdrop-blur-md">
                <p className="mb-1 text-xs font-bold text-[#43474e]">Pending Clients</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-[#0061a5]">{summary.clients || 0}</h4>
                  <span className="flex items-center gap-0.5 text-xs font-bold text-[#002045]">
                    Live
                  </span>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-5 shadow-sm backdrop-blur-md">
                <p className="mb-1 text-xs font-bold text-[#43474e]">Open Tickets</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-[#0061a5]">{summary.tickets || 0}</h4>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-5 shadow-sm backdrop-blur-md">
                <p className="mb-1 text-xs font-bold text-[#43474e]">Active DayPlans</p>
                <div className="flex items-end justify-between">
                  <h4 className="text-3xl font-black text-[#0061a5]">{summary.dayPlans || 0}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
