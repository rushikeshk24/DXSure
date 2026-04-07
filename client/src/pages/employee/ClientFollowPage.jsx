import { useEffect, useState } from "react";
import { clientApi } from "../../services/api";

function ClientFollowPage() {
  const [rows, setRows] = useState([]);

  const fetchRows = async () => {
    const response = await clientApi.getAll();
    setRows(response.data);
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const updateFollow = async (id, followStatus) => {
    await clientApi.update(id, { followStatus });
    fetchRows();
  };

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Client Follow</h2>
      <div className="overflow-auto border rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Category</th>
              <th className="border px-3 py-2 text-left">Follow Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => (
              <tr key={item._id}>
                <td className="border px-3 py-2">{item.name}</td>
                <td className="border px-3 py-2">{item.category}</td>
                <td className="border px-3 py-2">
                  <select
                    value={item.followStatus || "pending"}
                    onChange={(event) =>
                      updateFollow(item._id, event.target.value)
                    }
                    className="border rounded px-2 py-1"
                  >
                    <option value="pending">pending</option>
                    <option value="called">called</option>
                    <option value="converted">converted</option>
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

export default ClientFollowPage;
