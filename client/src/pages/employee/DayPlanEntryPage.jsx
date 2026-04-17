import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { dayPlanApi } from "../../services/api";

function DayPlanEntryPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await dayPlanApi.getAll();
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await dayPlanApi.create(data);
    fetchRows();
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Day Plan Entry
        </h2>
        <p className="mt-1 text-sm font-medium text-[#43474e]">
          Schedule and register daily operations with backend sync.
        </p>
      </div>

      <section className="mb-8 rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleForm
        fields={[
          { name: "task", label: "Task", required: true, fullWidth: true },
          { name: "date", label: "Date", type: "date", required: true },
          {
            name: "status",
            label: "Status",
            type: "select",
            options: [
              { label: "Pending", value: "pending" },
              { label: "Done", value: "done" },
            ],
          },
        ]}
        onSubmit={handleCreate}
      />
      </section>
      
      <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleTable
        columns={[
          { key: "task", label: "Task" },
          {
            key: "date",
            label: "Date",
            render: (row) => new Date(row.date).toLocaleDateString(),
          },
          { key: "status", label: "Status" },
        ]}
        rows={rows}
      />
      </section>
    </div>
  );
}

export default DayPlanEntryPage;
