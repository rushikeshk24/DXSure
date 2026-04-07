import { useEffect, useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { paymentApi } from "../../services/api";

function EmployeePaymentPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchRows = async () => {
      const response = await paymentApi.getAll({ paymentType: "employee" });
      setRows(response.data);
    };

    fetchRows();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Employee Payment
      </h2>
      <SimpleTable
        columns={[
          { key: "name", label: "Employee" },
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

export default EmployeePaymentPage;
