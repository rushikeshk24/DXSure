import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { paymentApi } from "../../services/api";

function ClientPaymentPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await paymentApi.getAll({ paymentType: "client" });
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await paymentApi.create({
      ...data,
      paymentType: "client",
      amount: Number(data.amount),
    });
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-neutral-100">Client Payment</h2>
      <SimpleForm
        fields={[
          { name: "name", label: "Client Name", required: true },
          { name: "amount", label: "Amount", type: "number", required: true },
          { name: "note", label: "Note" },
        ]}
        onSubmit={handleCreate}
      />
      <SimpleTable
        columns={[
          { key: "name", label: "Client" },
          { key: "amount", label: "Amount" },
          {
            key: "date",
            label: "Date",
            render: (row) => new Date(row.date).toLocaleDateString(),
          },
          { key: "note", label: "Note" },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default ClientPaymentPage;
