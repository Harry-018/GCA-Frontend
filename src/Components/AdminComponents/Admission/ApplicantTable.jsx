
import React from "react";

// Table styling
const TABLE_CLASS = "w-full min-w-[52rem]";

const CELL_CLASS = "whitespace-nowrap px-3 py-2 sm:px-7";

const HEADER_CLASS =
  "whitespace-nowrap px-3 py-3 text-[11px] font-[PoppinsBold] text-swamp-green sm:px-7 sm:py-5 sm:text-xs lg:text-sm xl:text-base";

// Status colors
const STATUS_STYLES = {
  Pending: "bg-yellow-400/10 text-yellow-700",
  Approved: "bg-green-400/10 text-green-700",
  Rejected: "bg-red-400/10 text-red-700",
};

const getStatusStyle = (status) => {
  return STATUS_STYLES[status] || "bg-gray-100 text-gray-600";
};

// Reusable table header
const TableHeader = ({
  headers,
  dateHeader,
  selectable,
  allSelected,
  onSelectAll,
}) => {
  return (
    <thead className="sticky top-0 z-10 bg-bone">
      <tr className="text-left">
        {selectable && (
          <th className="w-14 px-3 py-3 sm:px-7 sm:py-5">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={onSelectAll}
              aria-label="Select all pending applicants"
              className="h-4 w-4 rounded border-gray-300 text-swamp-green focus:ring-swamp-green"
            />
          </th>
        )}

        {headers.map((header) => (
          <th key={header} className={HEADER_CLASS}>
            {header === "DATE APPLIED" ? dateHeader : header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

// Reusable table cell
const TableCell = ({ children }) => {
  return (
    <td className={CELL_CLASS}>
      {children}
    </td>
  );
};

// Applicant status badge
const StatusBadge = ({ status }) => {
  return (
    <span
      className={`
        inline-flex rounded-full px-3 py-1
        text-[11px] font-medium sm:text-[11px]
        lg:text-xs xl:text-sm
        ${getStatusStyle(status)}
      `}
    >
      {status}
    </span>
  );
};

// Applicant selection checkbox
const ApplicantCheckbox = ({
  applicant,
  selected,
  onToggleSelect,
}) => {
  if (applicant.status !== "Pending") {
    return null;
  }

  return (
    <input
      type="checkbox"
      checked={selected}
      onChange={() => onToggleSelect(applicant.id)}
      aria-label={`Select applicant ${applicant.id}`}
      className="h-4 w-4 rounded border-gray-300 text-swamp-green focus:ring-swamp-green"
    />
  );
};

// Applicant action buttons
const ApplicantActions = ({
  applicant,
  onView,
  onApprove,
  onReject,
}) => {
  const isPending = applicant.status === "Pending";

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onView(applicant)}
        className="rounded-full border border-gray-300 px-4 py-1 text-[11px] text-gray-600 hover:bg-gray-100 sm:text-[11px] lg:text-xs xl:text-sm"
      >
        View
      </button>

      {isPending && (
        <>
          <button
            type="button"
            onClick={() => onApprove(applicant)}
            className="rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white hover:bg-swamp-green sm:text-[11px] lg:text-xs xl:text-sm"
          >
            Approve
          </button>

          <button
            type="button"
            onClick={() => onReject(applicant)}
            className="rounded-full bg-[#ff7272] px-4 py-1 text-[11px] text-white hover:bg-[#f45f5f] sm:text-[11px] lg:text-xs xl:text-sm"
          >
            Reject
          </button>
        </>
      )}
    </div>
  );
};

// Single applicant row
const ApplicantRow = ({
  applicant,
  dateHeader,
  selectable,
  selectedIds,
  onToggleSelect,
  onView,
  onApprove,
  onReject,
}) => {
  const date =
    dateHeader === "DATE REJECTED"
      ? applicant.dateRejected || applicant.dateApplied
      : applicant.dateApplied;

  const isSelected = selectedIds.includes(applicant.id);

  return (
    <tr className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 sm:text-[11px] lg:text-xs xl:text-sm">
      {selectable && (
        <td className="w-14 px-3 py-2 sm:px-7">
          <ApplicantCheckbox
            applicant={applicant}
            selected={isSelected}
            onToggleSelect={onToggleSelect}
          />
        </td>
      )}

      <TableCell>{applicant.id}</TableCell>
      <TableCell>{applicant.lastName}</TableCell>
      <TableCell>{applicant.firstName}</TableCell>
      <TableCell>{applicant.gradeLevel}</TableCell>
      <TableCell>{date}</TableCell>

      <TableCell>
        <StatusBadge status={applicant.status} />
      </TableCell>

      <TableCell>
        <ApplicantActions
          applicant={applicant}
          onView={onView}
          onApprove={onApprove}
          onReject={onReject}
        />
      </TableCell>
    </tr>
  );
};

// Empty table message
const EmptyTable = ({ colSpan }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-3 py-10 text-center text-[11px] text-gray-400 sm:px-7 sm:text-[11px] lg:text-xs xl:text-sm"
      >
        No applicants found.
      </td>
    </tr>
  );
};

// Main applicant table
const ApplicantTable = ({
  applicants = [],
  headers = [],
  dateHeader,
  selectedIds = [],
  selectable = false,
  onToggleSelect,
  onSelectAll,
  onView,
  onApprove,
  onReject,
}) => {
  const selectableApplicants = applicants.filter(
    (applicant) => applicant.status === "Pending"
  );

  const allSelected =
    selectableApplicants.length > 0 &&
    selectableApplicants.every((applicant) =>
      selectedIds.includes(applicant.id)
    );

  const columnCount = headers.length + (selectable ? 1 : 0);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
        <div className="thin-scrollbar flex min-h-0 flex-1 flex-col overflow-x-auto overflow-y-auto">
          <table className={TABLE_CLASS}>
            <TableHeader
              headers={headers}
              dateHeader={dateHeader}
              selectable={selectable}
              allSelected={allSelected}
              onSelectAll={onSelectAll}
            />

            <tbody>
              {applicants.length > 0 ? (
                applicants.map((applicant) => (
                  <ApplicantRow
                    key={applicant.id}
                    applicant={applicant}
                    dateHeader={dateHeader}
                    selectable={selectable}
                    selectedIds={selectedIds}
                    onToggleSelect={onToggleSelect}
                    onView={onView}
                    onApprove={onApprove}
                    onReject={onReject}
                  />
                ))
              ) : (
                <EmptyTable colSpan={columnCount} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantTable;