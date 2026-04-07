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
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Raise Ticket</h2>
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
    </div>
  );
}

export default RaiseTicketPage;
