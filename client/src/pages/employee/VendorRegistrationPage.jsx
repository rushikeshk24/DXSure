import { useEffect, useState } from "react";
import SimpleForm from "../../components/SimpleForm";
import SimpleTable from "../../components/SimpleTable";
import { vendorApi } from "../../services/api";

function VendorRegistrationPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await vendorApi.getAll();
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await vendorApi.create(data);
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">
        Vendor Registration
      </h2>
      <SimpleForm
        fields={[
          { name: "name", label: "Vendor Name", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone" },
          { name: "address", label: "Address" },
        ]}
        onSubmit={handleCreate}
      />
      <SimpleTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "address", label: "Address" },
        ]}
        rows={rows}
      />
    </div>
  );
}

export default VendorRegistrationPage;
