import { useEffect, useState } from "react";
import Card from "../../components/ui/Card";
import { dashboardApi, ticketApi } from "../../services/api";

function AdminDashboard() {
  const [summary, setSummary] = useState({});
  const [recentTickets, setRecentTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const [summaryRes, ticketsRes] = await Promise.all([
        dashboardApi.getSummary(),
        ticketApi.getAll(),
      ]);
      setSummary(summaryRes.data);
      setRecentTickets(ticketsRes.data?.slice().reverse().slice(0, 5) || []);
    };

    fetchData();
  }, []);

  const cards = [
    { label: "Users", value: summary.users || 0 },
    { label: "Tickets", value: summary.tickets || 0 },
    { label: "Clients", value: summary.clients || 0 },
    { label: "Day Plans", value: summary.dayPlans || 0 },
    { label: "Entries", value: summary.expenses || 0 },
  ];

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Admin Portal - Command Center
        </h2>
        <p className="mt-1 font-medium text-[#43474e]">
          Global infrastructure and workforce tracking synchronized.
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
                    support_agent
                  </span>
                  Active Support Tickets
                </h3>
                <p className="mt-1 text-sm text-[#43474e]">
                  Real-time escalation tracking and issue resolution.
                </p>
              </div>
              <span className="rounded-full bg-[#d6e3ff] px-3 py-1 text-xs font-bold text-[#0061a5]">
                LIVE
              </span>
            </div>
            
            <div className="space-y-4">
              {recentTickets.length === 0 ? (
                <p className="text-sm text-[#43474e]">System is stable. No recent tickets.</p>
              ) : (
                recentTickets.map((ticket) => (
                  <div key={ticket._id || Math.random()} className="group flex items-start gap-4 rounded-lg bg-[#f1f4f6] p-4 transition-all hover:bg-[#ebeef0] hover:shadow-[0_8px_32px_rgba(24,28,30,0.06)] ring-1 ring-transparent flex-col sm:flex-row">
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#181c1e]">{ticket.title}</h4>
                      <p className="mt-0.5 text-xs text-[#43474e]">{ticket.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${ticket.priority === 'high' ? 'bg-red-500/10 text-red-500' : ticket.priority === 'medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-[#002045]'}`}>
                        {ticket.priority?.toUpperCase()} PRIORITY
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
              Aggregated Entities
            </h3>
            <div className="grid grid-cols-1 gap-4">
                {cards.map((card) => (
                  <div key={card.label} className="group relative overflow-hidden rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-5 shadow-sm backdrop-blur-md">
                    <p className="mb-1 text-xs font-bold text-[#43474e]">{card.label}</p>
                    <div className="flex items-end justify-between">
                      <h4 className="text-3xl font-black text-[#0061a5]">{card.value}</h4>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
