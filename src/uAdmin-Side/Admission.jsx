import { useState, useMemo } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import AdmissionHeader from "../Components/AdminComponents/Admission/AdmissionHeader";
import AdmissionToolbar from "../Components/AdminComponents/Admission/AdmissionToolbar";
import ApprovedModal from "../Components/AdminModal/AdmissionPage/ApprovedModal";
import ViewApplicantModal from "../Components/AdminModal/AdmissionPage/ViewApplicantModal";
import ApproveApplicantModal from "../Components/AdminModal/AdmissionPage/ApproveApplicantModal";
import RejectApplicantModal from "../Components/AdminModal/AdmissionPage/RejectApplicantModal";
import {
  getApplications,
  getApplicationById,
  approveApplicant,
  bulkApproveApplicants,
  rejectApplicant,
} from "../requests/preEnrollmentRequests";
import { useLoaderData } from "react-router-dom";
import DataTable from "../Components/DataTable";

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

const STATUSES = ["Pending", "Approved", "Rejected"];

const TABS = [
  { label: "Applications", path: "/admin/admission" },
  { label: "Document Submission", path: "/admin/submission" },
];

const Admission = () => {
  // =========================
  // APPLICATION DATA
  // =========================

  const {
    applications: initialApplications,
    pagination: initialPagination,
    rejectionReasons: initialRejectionReasons,
  } = useLoaderData();

  const [applications, setApplications] = useState(initialApplications);
  const [pagination, setPagination] = useState(initialPagination);
  const [rejectionReasons, setRejectionReasons] = useState(
    initialRejectionReasons,
  );

  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // =========================
  // FILTERS
  // =========================

  const [activeStatus, setActiveStatus] = useState("Pending");
  const [search, setSearch] = useState("");

  const isPending = activeStatus.toLowerCase() === "pending";

  // =========================
  // SELECTION
  // =========================

  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);

  // =========================
  // MODALS
  // =========================

  const [activeModal, setActiveModal] = useState(null);
  const [viewedApplicant, setViewedApplicant] = useState(null);

  const [applicantToApprove, setApplicantToApprove] = useState(null);

  const [approvalSchedule, setApprovalSchedule] = useState({
    date: "",
    from: "",
    to: "",
  });

  const [applicantToReject, setApplicantToReject] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  // =========================
  // FETCH APPLICATIONS
  // =========================

  const fetchApplications = async (
    currentPage = pagination.page,
    currentSearch = search,
    currentStatus = activeStatus,
  ) => {
    try {
      setLoading(true);

      const response = await getApplications({
        page: currentPage,
        limit: pagination.limit,
        application_status: currentStatus.toLowerCase(),
        search: currentSearch,
      });

      setApplications(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch applications:", error);

      setApplications([]);

      setPagination({
        page: currentPage,
        limit: pagination.limit,
        total: 0,
        totalPages: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // STATUS
  // =========================

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setSelectedIds([]);

    if (status.toLowerCase() !== "pending") {
      setSelectionMode(false);
    }

    fetchApplications(1, search, status);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setSelectedIds([]);

    fetchApplications(1, search, activeStatus);
  };

  // =========================
  // SELECTION
  // =========================

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id],
    );
  };

  const handleSelectAll = () => {
    const visibleIds = applications
      .filter((application) => application.application_status === "pending")
      .map((application) => application.application_id);

    setSelectedIds((prev) => {
      const allSelected =
        visibleIds.length > 0 && visibleIds.every((id) => prev.includes(id));

      if (allSelected) {
        return prev.filter((id) => !visibleIds.includes(id));
      }

      return [...new Set([...prev, ...visibleIds])];
    });
  };

  const handleClearSelection = () => {
    if (selectedIds.length === 0) return;

    setActiveModal("clear");
  };

  const confirmClearSelection = () => {
    setSelectedIds([]);
    setActiveModal(null);
  };

  const handleToggleSelectionMode = () => {
    if (!isPending) return;

    setSelectionMode((prev) => !prev);
    setSelectedIds([]);
  };

  // =========================
  // VIEW
  // =========================

  const handleViewApplicant = async (applicant) => {
    try {
      setActionLoading(true);
      const response = await getApplicationById(applicant.application_id);
      setViewedApplicant(response.data.data);
      console.log("APPLICATION RESPONSE:", response.data.data);
    } catch (error) {
      console.error("Failed to fetch applicant:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // APPROVAL MODAL
  // =========================

  const handleApproveApplicant = (applicant) => {
    setApplicantToApprove(applicant);

    setApprovalSchedule({
      date: "",
      from: "",
      to: "",
    });
  };

  const handleScheduleChange = (field, value) => {
    setApprovalSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  /*
   * Backend approval request is not connected here yet.
   * Do not modify applications locally because the old
   * mock-data implementation has been removed.
   */
  const confirmApproveApplicant = async () => {
    if (!applicantToApprove) return;
    try {
      setActionLoading(true);
      await approveApplicant({
        application_id: applicantToApprove.application_id,
        sub_date: approvalSchedule.date,
        from_time: approvalSchedule.from,
        to_time: approvalSchedule.to,
      });
      setApplicantToApprove(null);
      await fetchApplications(pagination.page, search, activeStatus);
    } catch (error) {
      console.error("Failed to approve applicant:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // REJECTION MODAL
  // =========================

  const handleRejectApplicant = (applicant) => {
    setApplicantToReject(applicant);
    setSelectedReason("");
  };

  const confirmRejectApplicant = async () => {
    if (!applicantToReject || !selectedReason) return;

    try {
      setActionLoading(true);
      await rejectApplicant(
        applicantToReject.application_id,
        Number(selectedReason),
      );

      setApplicantToReject(null);
      setSelectedReason("");

      await fetchApplications(pagination.page, search, activeStatus);
    } catch (error) {
      console.error("Failed to reject applicant:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // BULK APPROVAL
  // =========================

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;

    setApprovalSchedule({
      date: "",
      from: "",
      to: "",
    });

    setActiveModal("approve");
  };

  /*
   * Backend bulk approval request is not connected yet.
   */
  const confirmApproveSelected = async () => {
    if (selectedIds.length === 0) return;

    try {
      setActionLoading(true);

      await bulkApproveApplicants({
        application_ids: selectedIds,
        sub_date: approvalSchedule.date,
        from_time: approvalSchedule.from,
        to_time: approvalSchedule.to,
      });

      setSelectedIds([]);
      setActiveModal(null);

      await fetchApplications(pagination.page, search, activeStatus);
    } catch (error) {
      console.error("Failed to approve applicants:", error);
    } finally {
      setActionLoading(false);
    }
  };
  const selectedCount = selectedIds.length;

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (pagination.page <= 1 || loading) return;

    fetchApplications(pagination.page - 1, search, activeStatus);
  };

  const handleNextPage = () => {
    if (
      loading ||
      pagination.totalPages === 0 ||
      pagination.page >= pagination.totalPages
    ) {
      return;
    }

    fetchApplications(pagination.page + 1, search, activeStatus);
  };

  const allVisibleSelected =
    applications.length > 0 &&
    applications.every((application) =>
      selectedIds.includes(application.application_id),
    );

  const columns = useMemo(
    () => [
      ...(selectionMode
        ? [
            columnHelper.display({
              id: "select",

              header: () => (
                <input
                  type="checkbox"
                  checked={allVisibleSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 cursor-pointer"
                />
              ),

              cell: ({ row }) => {
                const applicationId = row.original.application_id;

                return (
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(applicationId)}
                    onChange={() => handleToggleSelect(applicationId)}
                    className="h-4 w-4 cursor-pointer"
                  />
                );
              },
            }),
          ]
        : []),

      columnHelper.accessor("application_no", {
        header: "APPLICATION NO.",
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
          activeStatus.toLowerCase() === "rejected"
            ? row.rejected_at
            : row.date_applied,
        {
          id: "date",

          header:
            activeStatus.toLowerCase() === "rejected"
              ? "DATE REJECTED"
              : "DATE APPLIED",

          cell: (info) => {
            const value = info.getValue();

            if (!value) return "—";

            return new Date(value).toLocaleDateString("en-PH", {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });
          },
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
              <button
                type="button"
                onClick={() => handleViewApplicant(applicant)}
                className="rounded-full border border-gray-300 px-4 py-1 text-[11px] text-gray-600 hover:bg-gray-100 lg:text-xs xl:text-sm"
              >
                View
              </button>

              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleApproveApplicant(applicant)}
                  className="rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white hover:bg-swamp-green lg:text-xs xl:text-sm"
                >
                  Approve
                </button>
              )}

              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleRejectApplicant(applicant)}
                  className="rounded-full bg-[#ff7272] px-4 py-1 text-[11px] text-white hover:bg-[#f45f5f] lg:text-xs xl:text-sm"
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
      selectionMode,
      selectedIds,
      handleViewApplicant,
      handleApproveApplicant,
      handleRejectApplicant,
      handleToggleSelect,
      handleSelectAll,
      allVisibleSelected,
    ],
  );

  // =========================
  // RENDER
  // =========================

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      {/* Header */}
      <AdmissionHeader tabs={TABS} />

      {/* Toolbar */}
      <AdmissionToolbar
        statuses={STATUSES}
        activeStatus={activeStatus}
        onStatusChange={handleStatusChange}
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        selectedCount={selectedCount}
        onApproveSelected={handleApproveSelected}
        onClearSelection={handleClearSelection}
        selectionMode={selectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
        selectionDisabled={!isPending}
      />

      {/* Table */}

      <DataTable
        data={applications}
        columns={columns}
        loading={loading}
        emptyMessage="No applications found."
      />

      {/* Pagination */}
      <div className="flex items-center justify-between px-2 py-3">
        <span className="text-xs text-gray-500">
          Page {pagination.page} of {pagination.totalPages || 0}
        </span>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={pagination.page === 1 || loading}
            onClick={handlePreviousPage}
            className="rounded-full border border-gray-300 px-4 py-1.5 text-xs text-gray-600 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            disabled={
              loading ||
              pagination.totalPages === 0 ||
              pagination.page >= pagination.totalPages
            }
            onClick={handleNextPage}
            className="rounded-full bg-swamp-green px-4 py-1.5 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

      {/* View Applicant */}
      {viewedApplicant && (
        <ViewApplicantModal
          applicant={viewedApplicant}
          onClose={() => setViewedApplicant(null)}
        />
      )}

      {/* Approve Applicant */}
      {applicantToApprove && (
        <ApproveApplicantModal
          applicant={applicantToApprove}
          schedule={approvalSchedule}
          onScheduleChange={handleScheduleChange}
          onApprove={confirmApproveApplicant}
          onCancel={() => setApplicantToApprove(null)}
        />
      )}

      {/* Reject Applicant */}
      <RejectApplicantModal
        isOpen={Boolean(applicantToReject)}
        onClose={() => {
          setApplicantToReject(null);
          setSelectedReason("");
        }}
        onReject={confirmRejectApplicant}
        reasons={rejectionReasons}
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
      />

      {/* Bulk Approve */}
      {activeModal === "approve" && (
        <ApproveApplicantModal
          applicant={{
            email: `${selectedIds.length} selected applicants`,
            purpose: "Enrollment & Assessment",
          }}
          schedule={approvalSchedule}
          title={`Approve ${selectedIds.length} Applicants`}
          onScheduleChange={handleScheduleChange}
          onApprove={confirmApproveSelected}
          onCancel={() => setActiveModal(null)}
          approveLabel="Approve All"
        />
      )}

      {/* Clear Selection */}
      {activeModal === "clear" && (
        <ApprovedModal
          title="Clear Selection"
          message="Are you sure you want to clear the selected applicants?"
          confirmLabel="CLEAR"
          danger
          onConfirm={confirmClearSelection}
          onCancel={() => setActiveModal(null)}
        />
      )}
    </div>
  );
};

export default Admission;
