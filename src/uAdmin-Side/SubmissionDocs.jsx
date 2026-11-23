import React, { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FileText } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import {
  getApprovedApplicants,
  getRejectionReasons,
  enrollApplicant,
  rejectApprovedApplicant,
  rescheduleApprovedApplicant,
} from "../requests/preEnrollmentRequests";

import DataTable from "../Components/DataTable";
import { queryKeys } from "../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../lib/queryClient.js";

import AdmissionHeader from "../Components/AdminComponents/Admission/AdmissionHeader";
import SubmissionDocsHeader from "../Components/AdminComponents/Admission/SubmissionDocsHeader";
import RescheduleModal from "../Components/AdminModal/AdmissionPage/RescheduleModal";
import EnrolledModal from "../Components/AdminModal/AdmissionPage/enrolledModal";
import RejectModal from "../Components/AdminModal/AdmissionPage/rejectModal";

const TABS = [
  { label: "Applications", path: "/admin/admission" },
  { label: "Document Submissions", path: "/admin/submission" },
];

const TITLE = "Approved Applicants";

const columnHelper = createColumnHelper();

const getLocalDate = () => {
  const date = new Date();

  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0",
  )}-${String(date.getDate()).padStart(2, "0")}`;
};

const SubmissionDocs = () => {
  const queryClient = useQueryClient();

  const {
    approvedApplicants: initialApplications,
    pagination: initialPagination,
  } = useLoaderData();

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(getLocalDate());
  const [page, setPage] = useState(initialPagination.page ?? 1);
  const limit = initialPagination.limit ?? 10;

  const [actionLoading, setActionLoading] = useState(false);

  const [applicantToEnroll, setApplicantToEnroll] = useState(null);
  const [applicantToReject, setApplicantToReject] = useState(null);
  const [rejectionReasonId, setRejectionReasonId] = useState("");
  const [rejectLoading, setRejectLoading] = useState(false);

  const [applicantToResched, setApplicantToResched] = useState(null);

  const [reschedSchedule, setReschedSchedule] = useState({
    date: "",
    from: "",
    to: "",
  });

  const filters = useMemo(
    () => ({ date, search, page, limit }),
    [date, search, page, limit],
  );

  const usesLoaderData =
    date === getLocalDate() && search === "" && page === 1 && limit === 10;

  const {
    data: applicantsResult,
    isFetching: loading,
    error: applicantsError,
  } = useQuery({
    queryKey: queryKeys.preEnrollment.approvedApplicants(filters),
    queryFn: async () => {
      const response = await getApprovedApplicants(
        date,
        search,
        page,
        limit,
      );

      return {
        applicants: Array.isArray(response?.data?.data)
          ? response.data.data
          : [],
        pagination: response?.data?.pagination ?? initialPagination,
      };
    },
    initialData: usesLoaderData
      ? {
          applicants: initialApplications,
          pagination: initialPagination,
        }
      : undefined,
    staleTime: QUERY_STALE_TIME.tableData,
  });

  const applicants = applicantsResult?.applicants ?? [];
  const pagination = applicantsResult?.pagination ?? initialPagination;

  const error =
    applicantsError?.response?.data?.message ||
    applicantsError?.message ||
    "";

  const { data: rejectionReasons = [] } = useQuery({
    queryKey: queryKeys.preEnrollment.rejectionReasons,
    queryFn: async () => {
      const response = await getRejectionReasons();

      return Array.isArray(response?.data?.data) ? response.data.data : [];
    },
    staleTime: QUERY_STALE_TIME.referenceData,
  });
  const handleEnrollClick = (applicant) => {
    setApplicantToEnroll(applicant);
  };

  const confirmEnroll = async () => {
    if (!applicantToEnroll) return;

    try {
      setActionLoading(true);

      await enrollApplicant(applicantToEnroll.app_approval_id);

      setApplicantToEnroll(null);

      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.approvedApplicantsAll,
      });
    } catch (error) {
      console.error("Failed to enroll applicant:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmReject = async () => {
    if (!applicantToReject || !rejectionReasonId) return;

    try {
      setRejectLoading(true);

      await rejectApprovedApplicant(applicantToReject.app_approval_id, {
        rejection_reason_id: rejectionReasonId,
      });

      setApplicantToReject(null);
      setRejectionReasonId("");

      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.approvedApplicantsAll,
      });
    } catch (error) {
      console.error("Failed to reject applicant:", error);
    } finally {
      setRejectLoading(false);
    }
  };

  const handleRejectClick = (applicant) => {
    setRejectionReasonId("");
    setApplicantToReject(applicant);
  };

  const handleResched = (applicant) => {
    setReschedSchedule({
      date: "",
      from: "",
      to: "",
    });

    setApplicantToResched(applicant);
  };

  const handleReschedChange = (field, value) => {
    setReschedSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSearch = () => {
    setPage(1);
  };

  const confirmResched = async () => {
    if (!applicantToResched) return;

    try {
      await rescheduleApprovedApplicant(applicantToResched.app_approval_id, {
        sub_date: reschedSchedule.date,
        from_time: reschedSchedule.from,
        to_time: reschedSchedule.to,
      });

      setApplicantToResched(null);

      queryClient.invalidateQueries({
        queryKey: queryKeys.preEnrollment.approvedApplicantsAll,
      });
    } catch (error) {
      console.error("Failed to reschedule applicant:", error);
    }
  };

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

  const columns = [
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

    columnHelper.accessor("approved_at", {
      header: "DATE APPROVED",
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
    }),

    columnHelper.accessor("application_status", {
      header: "STATUS",

      cell: (info) => {
        const status = info.getValue() ?? "";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs capitalize ${
              status.toLowerCase() === "approved"
                ? "bg-green-400/10 text-green-700"
                : status.toLowerCase() === "rejected"
                  ? "bg-red-400/10 text-red-700"
                  : "bg-yellow-400/10 text-yellow-700"
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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleEnrollClick(applicant)}
              className="rounded-full bg-parent-green px-4 py-1 text-[11px] text-white hover:bg-parent-accent lg:text-xs xl:text-sm"
            >
              Enroll
            </button>

            <button
              type="button"
              onClick={() => handleRejectClick(applicant)}
              className="rounded-full bg-reject px-4 py-1 text-[11px] text-white hover:bg-reject/80 lg:text-xs xl:text-sm"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={() => handleResched(applicant)}
              className="rounded-full border border-parent-accent/25 px-4 py-1 text-[11px] text-gray-600 hover:bg-gray-100 lg:text-xs xl:text-sm"
            >
              Resched
            </button>
          </div>
        );
      },
    }),
  ];

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 font-[Poppins]">
      <AdmissionHeader tabs={TABS} />
      <SubmissionDocsHeader
        title={TITLE}
        date={date}
        onDateChange={(e) => {
          setDate(e.target.value);
          setPage(1);
        }}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />

      {error ? (
        <p className="text-center text-sm text-red-400">{error}</p>
      ) : applicants.length === 0 ? (
        <div className="flex flex-1 bg-bone rounded-2xl flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-parent-accent/10">
            <FileText size={32} className="text-parent-green" />
          </div>

          <h2 className="text-base font-[PoppinsBold] uppercase text-parent-green lg:text-lg">
            Submitted Documents
          </h2>

          <p className="max-w-sm text-center text-sm text-gray-500">
            No approved applicants for this date yet. Once you approve an
            applicant on the Applications page, they will appear here for
            enrollment.
          </p>
        </div>
      ) : (
        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl ">
            <DataTable
              data={applicants}
              columns={columns}
              loading={loading}
              emptyMessage="No approved applicants found."
            />
            <div className="flex items-center justify-between px-2 py-3">
              <span className="text-xs text-gray-500">
                Page {pagination.page} of {pagination.totalPages || 0}
              </span>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={pagination.page <= 1 || loading}
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
          </div>
        </div>
      )}

      <EnrolledModal
        isOpen={Boolean(applicantToEnroll)}
        onClose={() => setApplicantToEnroll(null)}
        onConfirm={confirmEnroll}
        loading={actionLoading}
      />

      <RejectModal
        isOpen={Boolean(applicantToReject)}
        onClose={() => {
          setApplicantToReject(null);
          setRejectionReasonId("");
        }}
        onConfirm={confirmReject}
        rejectionReasons={rejectionReasons}
        rejectionReasonId={rejectionReasonId}
        setRejectionReasonId={setRejectionReasonId}
        loading={rejectLoading}
      />

      <RescheduleModal
        applicant={applicantToResched}
        schedule={reschedSchedule}
        onScheduleChange={handleReschedChange}
        onSubmit={confirmResched}
        onClose={() => setApplicantToResched(null)}
      />
    </div>
  );
};

export default SubmissionDocs;
