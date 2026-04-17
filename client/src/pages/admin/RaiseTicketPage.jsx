import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { ticketApi, userApi } from "../../services/api";

function RaiseTicketPage() {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const [ticketRes, userRes] = await Promise.all([
      ticketApi.getAll(),
      userApi.getAll(),
    ]);
    setTickets(ticketRes.data);
    setUsers(userRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (data) => {
    await ticketApi.create(data);
    fetchData();
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Raise Technical Ticket
        </h2>
        <p className="mt-1 text-sm font-medium text-[#43474e]">
          Escalate priority faults into the service tracker.
        </p>
      </div>
      
      <section className="mb-8 rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleForm
        fields={[
          { name: "title", label: "Title", required: true },
          { name: "description", label: "Description", required: true },
          {
            name: "priority",
            label: "Priority",
            type: "select",
            required: true,
            options: [
              { label: "Low", value: "low" },
              { label: "Medium", value: "medium" },
              { label: "High", value: "high" },
            ],
          },
          {
            name: "assignedTo",
            label: "Assigned To",
            type: "select",
            options: users.map((item) => ({
              label: item.name,
              value: item._id,
            })),
          },
        ]}
        onSubmit={handleCreate}
      />
      </section>

      <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleTable
        columns={[
          { key: "title", label: "Title" },
          { key: "description", label: "Description" },
          { key: "priority", label: "Priority" },
          { key: "status", label: "Status" },
          {
            key: "assignedTo",
            label: "Assigned To",
            render: (row) => row.assignedTo?.name || "-",
          },
        ]}
        rows={tickets}
      />
      </section>
    </div>
  );
}

export default RaiseTicketPage;
