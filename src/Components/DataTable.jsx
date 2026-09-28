import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DataTable = ({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = "No records found.",

  // Pagination
  pagination,
  onPaginationChange,
  pageCount,

  // Optional row selection
  enableRowSelection = false,
  selectedRowIds = [],
  onSelectedRowIdsChange,
  getRowId,
}) => {
  const enablePagination =
    pagination !== undefined && onPaginationChange !== undefined;

  const tableColumns = enableRowSelection
    ? [
        {
          id: "select",
          header: ({ table }) => (
            <input
              type="checkbox"
              checked={table.getIsAllPageRowsSelected()}
              ref={(element) => {
                if (element) {
                  element.indeterminate = table.getIsSomePageRowsSelected();
                }
              }}
              onChange={table.getToggleAllPageRowsSelectedHandler()}
              className="h-4 w-4 cursor-pointer accent-[#9caf7e]"
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
              className="h-4 w-4 cursor-pointer accent-[#9caf7e]"
            />
          ),
        },
        ...columns,
      ]
    : columns;

  const rowSelection = Object.fromEntries(
    selectedRowIds.map((id) => [String(id), true]),
  );

  const table = useReactTable({
    data,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),

    ...(getRowId && {
      getRowId,
    }),

    state: {
      ...(enablePagination ? { pagination } : {}),
      ...(enableRowSelection ? { rowSelection } : {}),
    },

    ...(enableRowSelection && {
      enableRowSelection: true,

      onRowSelectionChange: (updater) => {
        const nextSelection =
          typeof updater === "function" ? updater(rowSelection) : updater;

        const nextIds = Object.keys(nextSelection).filter(
          (id) => nextSelection[id],
        );

        onSelectedRowIdsChange?.(nextIds);
      },
    }),

    ...(enablePagination && {
      onPaginationChange,
      manualPagination: true,
      pageCount,
    }),
  });

  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-auto rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-bone">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-500"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={tableColumns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                Loading...
              </td>
            </tr>
          ) : table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={tableColumns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-b border-gray-100 last:border-0 hover:bg-white/60"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-gray-700">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {enablePagination && (
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
          <div className="text-xs text-gray-500">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;
