import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Eye, Check, X } from "lucide-react";

const columnHelper = createColumnHelper();

const formatDate = (value) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const STATUS_STYLES = {
  pending: "bg-yellow-100 text-yellow-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const ApplicantTable = ({
  applicants = [],
  selectedIds = [],
  selectable = false,
  onToggleSelect,
  onSelectAll,
  onView,
  onApprove,
  onReject,
  dateHeader = "DATE APPLIED",
}) => {
  const allVisibleSelected =
    applicants.length > 0 &&
    applicants.every((applicant) =>
      selectedIds.includes(applicant.application_id),
    );

  const columns = useMemo(
    () => [
      ...(selectable
        ? [
            columnHelper.display({
              id: "select",
              header: () => (
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={onSelectAll}
                  className="h-4 w-4 cursor-pointer"
                />
              ),
              cell: ({ row }) => {
                const applicationId = row.original.application_id;

                return (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(applicationId)}
                    onChange={() => onToggleSelect(applicationId)}
                    className="h-4 w-4 cursor-pointer"
                  />
                );
              },
            }),
          ]
        : []),

      columnHelper.accessor("application_no", {
        header: "APPL. ID",
        cell: (info) => info.getValue() ?? "—",
      }),

      columnHelper.accessor("last_name", {
        header: "LAST NAME",
        cell: (info) => info.getValue() ?? "—",
      }),

      columnHelper.accessor("first_name", {
        header: "FIRST NAME",
        cell: (info) => info.getValue() ?? "—",
      }),

      columnHelper.accessor("grade_level", {
        header: "GRADE LEVEL",
        cell: (info) => info.getValue() ?? "—",
      }),

      columnHelper.accessor(
        (row) =>
          dateHeader === "DATE REJECTED" ? row.rejected_at : row.date_applied,
        {
          id: "date",
          header: dateHeader,
          cell: (info) => formatDate(info.getValue()),
        },
      ),

      columnHelper.accessor("application_status", {
        header: "STATUS",
        cell: (info) => {
          const status = info.getValue() ?? "";

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
                STATUS_STYLES[status.toLowerCase()] ??
                "bg-gray-100 text-gray-600"
              }`}
            >
              {status || "—"}
            </span>
          );
        },
      }),

      columnHelper.display({
        id: "actions",
        header: "ACTION",
        cell: ({ row }) => {
          const applicant = row.original;

          return (
            <div className="flex items-center gap-1.5">
              {/* VIEW */}
              <button
                type="button"
                onClick={() => onView(applicant)}
                title="View applicant"
                className="rounded-lg bg-[#d9ddd8] px-3 py-1.5 text-[11px] font-[Poppins] text-[#4f5a50] transition hover:bg-[#cdd3cc] active:scale-95"
              >
                View
              </button>

              {/* APPROVE */}
              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => onApprove(applicant)}
                  title="Approve applicant"
                  className="rounded-lg bg-swamp-green px-3 py-1.5 text-[11px] font-[Poppins] text-white transition hover:brightness-95 active:scale-95"
                >
                  Approve
                </button>
              )}

              {/* REJECT */}
              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => onReject(applicant)}
                  title="Reject applicant"
                  className="rounded-lg bg-[#f47773] px-3 py-1.5 text-[11px] font-[Poppins] text-white transition hover:bg-[#ed6b67] active:scale-95"
                >
                  Reject
                </button>
              )}
            </div>
          );
        },
      }),
    ],
    [
      selectable,
      selectedIds,
      onToggleSelect,
      onSelectAll,
      onView,
      onApprove,
      onReject,
      dateHeader,
      allVisibleSelected,
    ],
  );

  const table = useReactTable({
    data: applicants,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.application_id),
  });

  return (
    <div className="min-h-0 flex-1 overflow-auto rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-bone">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b border-gray-200">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-xs font-semibold tracking-wide text-gray-500"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-10 text-center text-sm text-gray-500"
              >
                No applications found.
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
    </div>
  );
};

export default ApplicantTable;
