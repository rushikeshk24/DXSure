import { useEffect, useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { dayPlanApi } from "../../services/api";

function DayPlanViewPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRows = async () => {
      const response = await dayPlanApi.getAll();
      setRows(response.data);
    };

    fetchRows();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-neutral-100">Day Plan View</h2>
      <SimpleTable
        columns={[
          { key: "task", label: "Task" },
          {
            key: "date",
            label: "Date",
            render: (row) => new Date(row.date).toLocaleDateString(),
          },
          { key: "status", label: "Status" },
          {
            key: "createdBy",
            label: "Employee",
            render: (row) => row.createdBy?.name || "-",
          },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default DayPlanViewPage;
