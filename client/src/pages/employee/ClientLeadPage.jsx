import { useEffect, useState } from "react";
import { clientApi } from "../../services/api";
import SimpleForm from "../../components/SimpleForm";

function ClientLeadPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await clientApi.getAll({ category: "lead" });
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const handleCreate = async (data) => {
    await clientApi.create({ ...data, category: "lead" });
    fetchRows();
  };

  const updateStatus = async (id, status) => {
    await clientApi.update(id, { status });
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Client Lead</h2>

      <SimpleForm
        fields={[
          { name: "name", label: "Name", required: true },
          { name: "email", label: "Email", type: "email" },
          { name: "phone", label: "Phone" },
          { name: "company", label: "Company" },
        ]}
        onSubmit={handleCreate}
      />

      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item._id}>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.email}</td>
                <td className="border px-3 py-2">
                  <select
                    value={item.status || "new"}
                    onChange={(event) =>
                      updateStatus(item._id, event.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="new">new</option>
                    <option value="in_progress">in progress</option>
                    <option value="won">won</option>
                    <option value="lost">lost</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientLeadPage;
