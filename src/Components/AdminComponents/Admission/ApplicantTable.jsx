import React from "react";

const ApplicantTable = ({
  applicants,
  headers,
  dateHeader,
  selectedIds,
  selectable,
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
    selectableApplicants.every((applicant) => selectedIds.includes(applicant.id));

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
        <div className="flex flex-1 flex-col overflow-y-auto min-h-0 thin-scrollbar">
          <table className="w-full min-w-212.5">
          <thead className="sticky top-0">
            <tr className="text-left bg-bone">

              {selectable && (
                <th className="w-14 px-7 py-5">
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
                <th
                  key={header}
                  className="px-7 py-5 text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base"
                >
                  {header === "DATE APPLIED" ? dateHeader : header}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {applicants.map((applicant) => (
              <tr
                key={applicant.id}
                className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
              >
                {selectable && (
                  <td className="w-14 px-7 py-2">
                    {applicant.status === "Pending" && (
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(applicant.id)}
                        onChange={() => onToggleSelect(applicant.id)}
                        aria-label={`Select applicant ${applicant.id}`}
                        className="h-4 w-4 rounded border-gray-300 text-swamp-green focus:ring-swamp-green"
                      />
                    )}
                  </td>
                )}
                <td className="px-7 py-2">
                  {applicant.id}
                </td>

                <td className="px-7 py-2">
                  {applicant.lastName}
                </td>

                <td className="px-7 py-2">
                  {applicant.firstName}
                </td>

                <td className="px-7 py-2">
                  {applicant.gradeLevel}
                </td>

                <td className="px-7 py-2">
                  {dateHeader === "DATE REJECTED"
                    ? applicant.dateRejected || applicant.dateApplied
                    : applicant.dateApplied}
                </td>

                <td className="px-7 py-2">
                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-[11px] font-medium lg:text-xs xl:text-sm ${
                      applicant.status === "Pending"
                        ? "bg-yellow-400/10 text-yellow-700"
                        : applicant.status === "Approved"
                          ? "bg-green-400/10 text-green-700"
                          : applicant.status === "Rejected"
                            ? "bg-red-400/10 text-red-700"
                            : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {applicant.status}
                  </span>
                </td>

                <td className="px-7 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onView(applicant)}
                      className="rounded-full border border-gray-300 px-4 py-1 text-[11px] text-gray-600 hover:bg-gray-100 lg:text-xs xl:text-sm"
                    >
                      View
                    </button>

                    {applicant.status === "Pending" && (
                      <>
                        <button
                          type="button"
                          onClick={() => onApprove(applicant)}
                          className="rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white hover:bg-swamp-green lg:text-xs xl:text-sm"
                        >
                          Approve
                        </button>

                        <button
                          type="button"
                          onClick={() => onReject(applicant)}
                          className="rounded-full bg-[#ff7272] px-4 py-1 text-[11px] text-white hover:bg-[#f45f5f] lg:text-xs xl:text-sm"
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {applicants.length === 0 && (
              <tr>
                <td
                  colSpan={headers.length}
                  className="px-7 py-10 text-center text-[11px] text-gray-400 lg:text-xs xl:text-sm"
                >
                  No applicants found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
};

export default ApplicantTable;