import { useState, useEffect } from "react";
import { subscribe } from "../utils/data/core";
import { matchGlobalSearch } from "../utils/search";
import { getApplicants, saveApplicants } from "../utils/data/Admin/admission";
import AdmissionHeader from "../Components/AdminComponents/Admission/AdmissionHeader";
import AdmissionToolbar from "../Components/AdminComponents/Admission/AdmissionToolbar";
import ApplicantTable from "../Components/AdminComponents/Admission/ApplicantTable";
import ApprovedModal from "../Components/AdminModal/AdmissionPage/ApprovedModal";
import ViewApplicantModal from "../Components/AdminModal/AdmissionPage/ViewApplicantModal";
import ApproveApplicantModal from "../Components/AdminModal/AdmissionPage/ApproveApplicantModal";
import RejectApplicantModal from "../Components/AdminModal/AdmissionPage/RejectApplicantModal";

const TABS = [
  { label: "Applications", path: "/admin/admission" },
  { label: "Submitted Documents", path: "/admin/submission" },
];

const STATUSES = [
  "Pending",
  "Approved",
  "Rejected",
];

const TABLE_HEADERS = [
  "APPL. ID",
  "LAST NAME",
  "FIRST NAME",
  "GRADE LEVEL",
  "DATE APPLIED",
  "STATUS",
  "ACTION",
];

const REJECTION_REASONS = [
  { value: "incomplete-documents", label: "Incomplete documents" },
  { value: "invalid-information", label: "Invalid information" },
  { value: "not-qualified", label: "Does not meet requirements" },
  { value: "other", label: "Other" },
];

const Admission = () => {
  const [activeTab, setActiveTab] = useState(TABS[0]);
  const [activeStatus, setActiveStatus] = useState(STATUSES[0]);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectionMode, setSelectionMode] = useState(false);
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
  const [customReason, setCustomReason] = useState("");
  const [applicants, setApplicants] = useState(getApplicants);

  useEffect(() => {
    return subscribe(() => setApplicants(getApplicants()));
  }, []);

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesStatus =
      applicant.status === activeStatus;
    const term = search.trim().toLowerCase();

    const matchesSearch =
      term === "" || matchGlobalSearch(applicant, term);

    return matchesStatus && matchesSearch;
  });

  const handleToggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((selectedId) => selectedId !== id)
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    setSelectedIds((prev) => {
      const visibleIds = filteredApplicants.map((a) => a.id);
      const allSelected = visibleIds.every((id) => prev.includes(id));
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
    setSelectionMode((prev) => !prev);
    setSelectedIds([]);
  };

  const handleViewApplicant = (applicant) => {
    setViewedApplicant(applicant);
  };

  const handleApproveApplicant = (applicant) => {
    setApplicantToApprove(applicant);
    setApprovalSchedule({ date: "", from: "", to: "" });
  };

  const handleScheduleChange = (field, value) => {
    setApprovalSchedule((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const confirmApproveApplicant = () => {
    if (!applicantToApprove) return;
    const updated = applicants.map((applicant) =>
      applicant.id === applicantToApprove.id
        ? { ...applicant, status: "Approved" }
        : applicant
    );
    setApplicants(updated);
    saveApplicants(updated);
    setApplicantToApprove(null);
  };

  const handleRejectApplicant = (applicant) => {
    setApplicantToReject(applicant);
    setSelectedReason("");
    setCustomReason("");
  };

  const confirmRejectApplicant = () => {
    const rejectionReason =
      selectedReason === "other" ? customReason.trim() : selectedReason;
    if (!applicantToReject || !rejectionReason) return;
    const updated = applicants.map((applicant) =>
      applicant.id === applicantToReject.id
        ? {
            ...applicant,
            status: "Rejected",
            rejectionReason,
            dateRejected: new Date()
              .toISOString()
              .slice(0, 19)
              .replace("T", " "),
          }
        : applicant
    );
    setApplicants(updated);
    saveApplicants(updated);
    setApplicantToReject(null);
    setSelectedReason("");
    setCustomReason("");
  };

  const handleApproveSelected = () => {
    if (selectedIds.length === 0) return;
    setApprovalSchedule({ date: "", from: "", to: "" });
    setActiveModal("approve");
  };

  const confirmApproveSelected = () => {
    const updated = applicants.map((a) =>
      selectedIds.includes(a.id) ? { ...a, status: "Approved" } : a
    );
    setApplicants(updated);
    saveApplicants(updated);
    setSelectedIds([]);
    setActiveModal(null);
  };

  const selectedCount = selectedIds.length;

  const handleSearch = () => {
    console.log(
      "Search:",
      search,
      "| Status:",
      activeStatus
    );
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">

      <AdmissionHeader
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <AdmissionToolbar
        statuses={STATUSES}
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
        search={search}
        onSearchChange={setSearch}
        onSearch={handleSearch}
        selectedCount={selectedCount}
        onApproveSelected={handleApproveSelected}
        onClearSelection={handleClearSelection}
        selectionMode={selectionMode}
        onToggleSelectionMode={handleToggleSelectionMode}
      />

      <ApplicantTable
        applicants={filteredApplicants}
        headers={TABLE_HEADERS}
        selectedIds={selectedIds}
        selectable={activeStatus === "Pending" && selectionMode}
        onToggleSelect={handleToggleSelect}
        onSelectAll={handleSelectAll}
        onView={handleViewApplicant}
        onApprove={handleApproveApplicant}
        onReject={handleRejectApplicant}
        dateHeader={activeStatus === "Rejected" ? "DATE REJECTED" : "DATE APPLIED"}
      />

      {viewedApplicant && (
        <ViewApplicantModal
          applicant={viewedApplicant}
          onClose={() => setViewedApplicant(null)}
        />
      )}

      {applicantToApprove && (
        <ApproveApplicantModal
          applicant={applicantToApprove}
          schedule={approvalSchedule}
          onScheduleChange={handleScheduleChange}
          onApprove={confirmApproveApplicant}
          onCancel={() => setApplicantToApprove(null)}
        />
      )}

      <RejectApplicantModal
        isOpen={Boolean(applicantToReject)}
        onClose={() => setApplicantToReject(null)}
        onReject={confirmRejectApplicant}
        reasons={REJECTION_REASONS}
        selectedReason={selectedReason}
        onReasonChange={setSelectedReason}
        customReason={customReason}
        onCustomReasonChange={setCustomReason}
      />

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