import { useEffect, useState } from "react";
import SimpleTable from "../../components/SimpleTable";
import { recordApi } from "../../services/api";

function TrackRecordPage() {
  const [records, setRecords] = useState([]);
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");

  const fetchRecords = async () => {
    const response = await recordApi.getAll({ date, user });
    setRecords(response.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-slate-900">Track Record</h2>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
        <input
          type="text"
          placeholder="User ID (optional)"
          value={user}
          onChange={(event) => setUser(event.target.value)}
          className="border rounded px-3 py-2 text-sm"
        />
        <button
          onClick={fetchRecords}
          className="bg-blue-700 text-white rounded px-3 py-2 text-sm"
        >
          Apply Filter
        </button>
      </div>

      <SimpleTable
        columns={[
          { key: "type", label: "Type" },
          { key: "title", label: "Title" },
          { key: "user", label: "User" },
          {
            key: "date",
            label: "Date",
            render: (row) => new Date(row.date).toLocaleString(),
          },
        ]}
        rows={records}
      />
    </div>
  );
}

export default TrackRecordPage;
