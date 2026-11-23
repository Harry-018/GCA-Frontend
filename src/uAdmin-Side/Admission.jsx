import { useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  getRejectionReasons,
  approveApplicant,
  bulkApproveApplicants,
  rejectApplicant,
} from "../requests/preEnrollmentRequests";
import { useLoaderData } from "react-router-dom";
import DataTable from "../Components/DataTable";
import { queryKeys } from "../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../lib/queryClient.js";

const columnHelper = createColumnHelper();

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
  const queryClient = useQueryClient();

  // =========================
  // APPLICATION DATA
  // =========================

  const {
    applications: initialApplications,
    pagination: initialPagination,
    rejectionReasons: initialRejectionReasons,
  } = useLoaderData();

  const [page, setPage] = useState(initialPagination.page ?? 1);
  const limit = initialPagination.limit ?? 10;

  // =========================
  // FILTERS
  // =========================

  const [activeStatus, setActiveStatus] = useState("Pending");
  const [search, setSearch] = useState("");

  const isPending = activeStatus.toLowerCase() === "pending";

  const filters = useMemo(
    () => ({
      page,
      limit,
      application_status: activeStatus.toLowerCase(),
      search,
    }),
    [page, limit, activeStatus, search],
  );

  const usesLoaderData =
    page === 1 &&
    limit === 10 &&
    activeStatus === "Pending" &&
    search === "";

  const { data: applicationsResult, isFetching: loading } = useQuery({
    queryKey: queryKeys.preEnrollment.applications(filters),
    queryFn: async () => {
      const response = await getApplications(filters);

      return {
        applications: Array.isArray(response?.data?.data)
          ? response.data.data
          : [],
        pagination: response?.data?.pagination ?? initialPagination,
      };
    },
    initialData: usesLoaderData
      ? {
          applications: initialApplications,
          pagination: initialPagination,
        }
      : undefined,
    staleTime: QUERY_STALE_TIME.tableData,
  });

  const applications = applicationsResult?.applications ?? [];
  const pagination = applicationsResult?.pagination ?? initialPagination;

  const { data: rejectionReasons = [] } = useQuery({
    queryKey: queryKeys.preEnrollment.rejectionReasons,
    queryFn: async () => {
      const response = await getRejectionReasons();

      return Array.isArray(response?.data?.data) ? response.data.data : [];
    },
    initialData: initialRejectionReasons,
    staleTime: QUERY_STALE_TIME.referenceData,
  });

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
  // STATUS
  // =========================

  const handleStatusChange = (status) => {
    setActiveStatus(status);
    setSelectedIds([]);

    if (status.toLowerCase() !== "pending") {
      setSelectionMode(false);
    }

    setPage(1);
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    setSelectedIds([]);

    setPage(1);
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
      const response = await getApplicationById(applicant.application_id);
      setViewedApplicant(response.data.data);
    } catch (error) {
      console.error("Failed to fetch applicant:", error);
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

  const confirmApproveApplicant = async () => {
    if (!applicantToApprove) return;
    try {
      await approveApplicant({
        application_id: applicantToApprove.application_id,
        sub_date: approvalSchedule.date,
        from_time: approvalSchedule.from,
        to_time: approvalSchedule.to,
      });
      setApplicantToApprove(null);
      // The application leaves the pending list and appears in Submission Docs.
      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.applicationsAll,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.approvedApplicantsAll,
      });
    } catch (error) {
      console.error("Failed to approve applicant:", error);
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
      await rejectApplicant(
        applicantToReject.application_id,
        Number(selectedReason),
      );

      setApplicantToReject(null);
      setSelectedReason("");

      // Rejection only changes the application list; no approved applicant is
      // created, so Submission Docs can keep its cached data.
      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.applicationsAll,
      });
    } catch (error) {
      console.error("Failed to reject applicant:", error);
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
      await bulkApproveApplicants({
        application_ids: selectedIds,
        sub_date: approvalSchedule.date,
        from_time: approvalSchedule.from,
        to_time: approvalSchedule.to,
      });

      setSelectedIds([]);
      setActiveModal(null);

      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.applicationsAll,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.approvedApplicantsAll,
      });
    } catch (error) {
      console.error("Failed to approve applicants:", error);
    }
  };
  const selectedCount = selectedIds.length;

  // =========================
  // PAGINATION
  // =========================

  const handlePreviousPage = () => {
    if (pagination.page <= 1 || loading) return;

    setPage(pagination.page - 1);
  };

  const handleNextPage = () => {
    if (
      loading ||
      pagination.totalPages === 0 ||
      pagination.page >= pagination.totalPages
    ) {
      return;
    }

    setPage(pagination.page + 1);
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

      columnHelper.accessor(
        (row) =>
          activeStatus.toLowerCase() === "rejected"
            ? row.rejection_reason
            : null,
        {
          id: "reason",
          header: activeStatus.toLowerCase() === "rejected" ? "REASON" : null,
          cell: (info) => info.getValue(),
        },
      ),

      columnHelper.accessor("application_status", {
        header: "STATUS",

        cell: (info) => {
          const status = info.getValue() ?? "";

          return (
            <span
              className={`rounded-full px-3 py-1 text-xs capitalize ${
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
                className="whitespace-nowrap rounded-full border border-parent-accent/25 px-2.5 py-1 font-[Poppins] text-xs text-gray-600 transition hover:bg-gray-100 sm:px-4 sm:text-[11px] lg:text-xs xl:text-sm"
              >
                View
              </button>

              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleApproveApplicant(applicant)}
                  className="whitespace-nowrap rounded-full bg-parent-green px-2.5 py-1 font-[Poppins] text-xs text-white transition hover:bg-parent-accent sm:px-4 sm:text-[11px] lg:text-xs xl:text-sm"
                >
                  Approve
                </button>
              )}

              {applicant.application_status === "pending" && (
                <button
                  type="button"
                  onClick={() => handleRejectApplicant(applicant)}
                  className="whitespace-nowrap rounded-full bg-reject px-2.5 py-1 font-[Poppins] text-xs text-white transition hover:bg-reject/80 sm:px-4 sm:text-[11px] lg:text-xs xl:text-sm"
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
      activeStatus,
    ],
  );

  // =========================
  // RENDER
  // =========================

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-egg font-[Poppins]">
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
            className="rounded-full border border-parent-accent/25 px-4 py-1.5 text-xs text-gray-600 transition hover:bg-bone disabled:cursor-not-allowed disabled:opacity-40"
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
            className="rounded-full bg-parent-green px-4 py-1.5 text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
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
