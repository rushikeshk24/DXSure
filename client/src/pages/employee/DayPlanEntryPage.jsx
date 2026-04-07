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
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Day Plan Entry</h2>
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
    </div>
  );
}

export default DayPlanEntryPage;
