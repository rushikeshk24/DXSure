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
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Day Book Financials
        </h2>
        <p className="mt-1 text-sm font-medium text-[#43474e]">
          Monitor synchronized P&L transactions.
        </p>
      </div>

      <section className="mb-8 rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">

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
      </section>

      <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleTable
        columns={[
          { key: "type", label: "Type" },
          { key: "title", label: "Title" },
          { key: "amount", label: "Amount" },
          { key: "note", label: "Note" },
        ]}
        rows={rows}
      />
      </section>
    </div>
  );
}

export default DayBookPage;
