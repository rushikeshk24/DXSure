import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { clientApi } from "../../services/api";

function ClientRegistrationPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await clientApi.getAll({ category: "client" });
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await clientApi.create({ ...data, category: "client" });
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Client Registration
      </h2>
      <SimpleForm
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone" },
          { name: "company", label: "Company" },
        ]}
        onSubmit={handleCreate}
      />
      <SimpleTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "company", label: "Company" },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default ClientRegistrationPage;
