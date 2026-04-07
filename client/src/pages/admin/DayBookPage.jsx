import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { expenseApi } from "../../services/api";

function DayBookPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await expenseApi.getAll();
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await expenseApi.create({ ...data, amount: Number(data.amount) });
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Day Book (Profit/Loss)
      </h2>

      <SimpleForm
        fields={[
          {
            name: "type",
            label: "Type",
            type: "select",
            required: true,
            options: [
              { label: "Income", value: "income" },
              { label: "Expense", value: "expense" },
            ],
          },
          { name: "title", label: "Title", required: true },
          { name: "amount", label: "Amount", type: "number", required: true },
          { name: "note", label: "Note" },
        ]}
        onSubmit={handleCreate}
      />

      <SimpleTable
        columns={[
          { key: "type", label: "Type" },
          { key: "title", label: "Title" },
          { key: "amount", label: "Amount" },
          { key: "note", label: "Note" },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default DayBookPage;
