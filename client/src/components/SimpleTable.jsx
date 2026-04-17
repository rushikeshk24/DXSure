function SimpleTable({ columns, rows }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-[#c4c6cf]/20 shadow-lg shadow-black/20">
      <table className="w-full min-w-[680px] text-sm">
        <thead className="bg-[#f1f4f6] backdrop-blur-md">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left font-semibold text-[#43474e]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#c4c6cf]/20 bg-[#ffffff]">
          {rows.length === 0 ? (
            <tr>
              <td className="px-4 py-8 text-center text-[#74777f]" colSpan={columns.length}>
                No records found.
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={row._id || index} className="transition-colors hover:bg-[#f1f4f6]">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3.5 text-[#43474e]">
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
