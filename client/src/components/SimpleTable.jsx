function SimpleTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-white/10 shadow-lg shadow-black/20">
      <table className="w-full min-w-[680px] text-sm">
        <thead className="bg-neutral-900/80 backdrop-blur-md">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left font-semibold text-neutral-300"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 bg-neutral-900/40">
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-center text-neutral-500" colSpan={columns.length}>
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row._id || index} className="transition-colors hover:bg-neutral-800/50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3.5 text-neutral-300">
                    {column.render ? column.render(row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default SimpleTable;
