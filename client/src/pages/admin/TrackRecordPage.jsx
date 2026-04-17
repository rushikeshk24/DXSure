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
    <div className="w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#181c1e] tracking-tighter">
          Track Record Ledger
        </h2>
        <p className="mt-1 text-sm font-medium text-[#43474e]">
          Global audit grid mapping Stitch database logs.
        </p>
      </div>

      <section className="rounded-xl bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 p-6 shadow-sm backdrop-blur-md">
        <div className="grid gap-3 mb-6 md:grid-cols-3">
        <input
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
          className="w-full rounded-lg bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 px-3.5 py-2.5 text-[#181c1e] focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <input
          type="text"
          placeholder="User ID (optional)"
          value={user}
          onChange={(event) => setUser(event.target.value)}
          className="w-full rounded-lg bg-[#ffffff] shadow-[0_4px_24px_rgba(24,28,30,0.04)] ring-1 ring-[#c4c6cf]/20 px-3.5 py-2.5 text-[#181c1e] focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <button
          onClick={fetchRecords}
          className="rounded-lg bg-gradient-to-br from-[#002045] to-[#1a365d] px-4 py-2 font-semibold text-[#181c1e] transition hover:from-[#001b3c] hover:to-[#002045] text-sm"
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
      </section>
    </div>
  );
}

export default TrackRecordPage;
