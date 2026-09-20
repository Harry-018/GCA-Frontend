import React, { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";

import { getApprovedApplicants } from "../requests/preEnrollmentRequests";

import AdmissionHeader from "../Components/AdminComponents/Admission/AdmissionHeader";
import SubmissionDocsHeader from "../Components/AdminComponents/Admission/SubmissionDocsHeader";

import RescheduleModal from "../Components/AdminModal/AdmissionPage/RescheduleModal";
import EnrolledModal from "../Components/AdminModal/AdmissionPage/enrolledModal";
import RejectModal from "../Components/AdminModal/AdmissionPage/rejectModal";

const TABLE_HEADERS = [
  "APPL. ID",
  "LAST NAME",
  "FIRST NAME",
  "GRADE LEVEL",
  "DATE APPROVED",
  "STATUS",
  "ACTION",
];

const TABS = [
  { label: "Applications", path: "/admin/admission" },
  { label: "Submitted Documents", path: "/admin/submission" },
];

const TITLE = "Approved Applicants";

const SubmissionDocs = () => {
  const [applicants, setApplicants] = useState([]);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");

  const [applicantToEnroll, setApplicantToEnroll] = useState(null);
  const [applicantToReject, setApplicantToReject] = useState(null);
  const [applicantToResched, setApplicantToResched] = useState(null);

  const [reschedSchedule, setReschedSchedule] = useState({
    date: "",
    from: "",
    to: "",
  });

  const fetchApprovedApplicants = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getApprovedApplicants({
        page,
        limit,
        search,
      });

      setApplicants(response.data.data || []);

      setPagination(
        response.data.pagination || {
          page,
          limit,
          total: 0,
          totalPages: 0,
        },
      );
    } catch (error) {
      console.error("Failed to fetch approved applicants:", error);

      setError("Unable to load approved applicants.");
      setApplicants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedApplicants();
  }, [page, limit]);

  const handleSearch = () => {
    setPage(1);
    fetchApprovedApplicants();
  };

  const handleEnrollClick = (applicant) => {
    setApplicantToEnroll(applicant);
  };

  const confirmEnroll = async () => {
    if (!applicantToEnroll) return;

    try {
      // TODO:
      // Connect this to the real enrollment API.
      console.log("Enroll applicant:", applicantToEnroll);

      setApplicantToEnroll(null);

      await fetchApprovedApplicants();
    } catch (error) {
      console.error("Failed to enroll applicant:", error);
    }
  };

  const handleRejectClick = (applicant) => {
    setApplicantToReject(applicant);
  };

  const confirmReject = async () => {
    if (!applicantToReject) return;

    try {
      // TODO:
      // Connect this to the real reject API.
      console.log("Reject applicant:", applicantToReject);

      setApplicantToReject(null);

      await fetchApprovedApplicants();
    } catch (error) {
      console.error("Failed to reject applicant:", error);
    }
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

  const confirmResched = async () => {
    if (!applicantToResched) return;

    try {
      // TODO:
      // Connect this to the real reschedule API.
      console.log("Reschedule:", {
        applicant: applicantToResched,
        schedule: reschedSchedule,
      });

      setApplicantToResched(null);

      await fetchApprovedApplicants();
    } catch (error) {
      console.error("Failed to reschedule applicant:", error);
    }
  };

  const filteredApplicants = applicants.filter((applicant) => {
    if (!date) return true;

    const approvedDate = applicant.dateApproved
      ? applicant.dateApproved.slice(0, 10)
      : "";

    const appliedDate = applicant.dateApplied
      ? applicant.dateApplied.slice(0, 10)
      : "";

    return approvedDate === date || appliedDate === date;
  });

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <AdmissionHeader tabs={TABS} />

      <SubmissionDocsHeader
        title={TITLE}
        date={date}
        onDateChange={(e) => setDate(e.target.value)}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        onSearch={handleSearch}
      />

      {error ? (
        <p className="text-center text-sm text-red-400">{error}</p>
      ) : filteredApplicants.length === 0 ? (
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
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
            <div className="thin-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
              <table className="w-full min-w-200">
                <thead className="sticky top-0">
                  <tr className="bg-bone text-left">
                    {TABLE_HEADERS.map((header) => (
                      <th
                        key={header}
                        className="whitespace-nowrap px-7 py-5 text-xs font-[PoppinsBold] text-swamp-green lg:text-sm xl:text-base"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredApplicants.map((applicant) => (
                    <tr
                      key={applicant.id}
                      className="border-b border-gray-200 text-[11px] text-gray-600 last:border-b-0 lg:text-xs xl:text-sm"
                    >
                      <td className="px-7 py-2">{applicant.id}</td>

                      <td className="px-7 py-2">{applicant.lastName}</td>

                      <td className="px-7 py-2">{applicant.firstName}</td>

                      <td className="px-7 py-2">{applicant.gradeLevel}</td>

                      <td className="px-7 py-2">
                        {applicant.dateApproved || applicant.dateApplied || "-"}
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
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between border-t border-gray-200 px-7 py-4">
                <p className="text-xs text-gray-500">
                  Page {pagination.page} of {pagination.totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((prev) => prev - 1)}
                    className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  <button
                    type="button"
                    disabled={page >= pagination.totalPages}
                    onClick={() => setPage((prev) => prev + 1)}
                    className="rounded-md border border-gray-300 px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <EnrolledModal
        isOpen={Boolean(applicantToEnroll)}
        onClose={() => setApplicantToEnroll(null)}
        onConfirm={confirmEnroll}
      />

      <RejectModal
        isOpen={Boolean(applicantToReject)}
        onClose={() => setApplicantToReject(null)}
        onConfirm={confirmReject}
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
