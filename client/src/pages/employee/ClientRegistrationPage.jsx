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
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Client Registration
        </h2>
        <p className="mt-1 text-sm font-medium text-[#43474e]">
          Onboard structured relationships directly into DB.
        </p>
      </div>
      
      <section className="mb-8 rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleForm
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone" },
          { name: "company", label: "Company" },
        ]}
        onSubmit={handleCreate}
      />
      </section>
      
      <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <SimpleTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "company", label: "Company" },
        ]}
        rows={rows}
      />
      </section>
    </div>
  );
}

export default ClientRegistrationPage;
