import React, { useEffect, useState } from "react";
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

const SubmissionDocs = () => {
  const {
    approvedApplicants: initialApplications,
    pagination: initialPagination,
  } = useLoaderData();

  const [applicants, setApplicants] = useState(initialApplications);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const getLocalDate = () => {
    const date = new Date();

    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0",
    )}-${String(date.getDate()).padStart(2, "0")}`;
  };

  const [date, setDate] = useState(getLocalDate());
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  const [pagination, setPagination] = useState(initialPagination);

  const [applicantToEnroll, setApplicantToEnroll] = useState(null);
  const [applicantToReject, setApplicantToReject] = useState(null);
  const [rejectionReasonId, setRejectionReasonId] = useState("");
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const [rejectLoading, setRejectLoading] = useState(false);

  const [applicantToResched, setApplicantToResched] = useState(null);

  const [reschedSchedule, setReschedSchedule] = useState({
    date: "",
    from: "",
    to: "",
  });

  useEffect(() => {
    const fetchRejectionReasons = async () => {
      try {
        const response = await getRejectionReasons();

        setRejectionReasons(response.data.data);
      } catch (error) {
        console.error("Failed to fetch rejection reasons:", error);
      }
    };

    fetchRejectionReasons();
  }, []);
  const handleEnrollClick = (applicant) => {
    setApplicantToEnroll(applicant);
  };

  const confirmEnroll = async () => {
    if (!applicantToEnroll) return;

    try {
      setActionLoading(true);

      await enrollApplicant(applicantToEnroll.app_approval_id);

      setApplicantToEnroll(null);

      await fetchApprovedApplicants(pagination.page, search, date);
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

      await fetchApprovedApplicants(pagination.page, search, date);
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
    fetchApprovedApplicants(1, search, date);
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

      await fetchApprovedApplicants(pagination.page, search, date);
    } catch (error) {
      console.error("Failed to reschedule applicant:", error);
    }
  };

  const fetchApprovedApplicants = async (
    currentPage = pagination.page,
    currentSearch = search,
    currentDate = date,
  ) => {
    try {
      setLoading(true);
      setError("");

      const response = await getApprovedApplicants(
        currentDate,
        currentSearch,
        currentPage,
        pagination.limit,
      );

      setApplicants(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch approved applicants:", error);

      setError("Failed to load approved applicants.");

      setApplicants([]);

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

  const handlePreviousPage = () => {
    if (pagination.page <= 1 || loading) return;

    fetchApprovedApplicants(pagination.page - 1, search, date);
  };

  const handleNextPage = () => {
    if (
      loading ||
      pagination.totalPages === 0 ||
      pagination.page >= pagination.totalPages
    ) {
      return;
    }

    fetchApprovedApplicants(pagination.page + 1, search, date);
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
            className={`rounded-full px-3 py-1 text-xs font-medium capitalize ${
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
              className="rounded-full bg-swamp-green px-4 py-1 text-[11px] text-white hover:bg-swamp-green lg:text-xs xl:text-sm"
            >
              Enroll
            </button>

            <button
              type="button"
              onClick={() => handleRejectClick(applicant)}
              className="rounded-full bg-[#ff7272] px-4 py-1 text-[11px] text-white hover:bg-[#f45f5f] lg:text-xs xl:text-sm"
            >
              Reject
            </button>

            <button
              type="button"
              onClick={() => handleResched(applicant)}
              className="rounded-full border border-gray-300 px-4 py-1 text-[11px] text-gray-600 hover:bg-gray-100 lg:text-xs xl:text-sm"
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
          const selectedDate = e.target.value;

          setDate(selectedDate);

          fetchApprovedApplicants(1, search, selectedDate);
        }}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />

      {error ? (
        <p className="text-center text-sm text-red-400">{error}</p>
      ) : applicants.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-swamp-green/10">
            <FileText size={32} className="text-swamp-green" />
          </div>

          <h2 className="text-base font-[PoppinsBold] uppercase text-swamp-green lg:text-lg">
            Submitted Documents
          </h2>

          <p className="max-w-sm text-center text-sm text-gray-500">
            No approved applicants yet. Once you approve an applicant on the
            Applications page, they will appear here for enrollment.
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
