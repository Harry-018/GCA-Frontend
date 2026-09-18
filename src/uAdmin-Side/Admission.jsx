import { useState } from "react";
import { matchGlobalSearch } from "../utils/search";
import AdmissionHeader from "../Components/AdminComponents/Admission/AdmissionHeader";
import AdmissionToolbar from "../Components/AdminComponents/Admission/AdmissionToolbar";
import ApplicantTable from "../Components/AdminComponents/Admission/ApplicantTable";
import ApprovedModal from "../Components/AdminModal/AdmissionPage/ApprovedModal";
import ViewApplicantModal from "../Components/AdminModal/AdmissionPage/ViewApplicantModal";
import ApproveApplicantModal from "../Components/AdminModal/AdmissionPage/ApproveApplicantModal";
import RejectApplicantModal from "../Components/AdminModal/AdmissionPage/RejectApplicantModal";

const DEFAULT_APPLICANTS = [
  { id: "1452", lastName: "Agassi", firstName: "Carlos", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:00:00", status: "Pending" },
  { id: "1456", lastName: "Bernado", firstName: "Kathryn", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:15:00", status: "Pending" },
  { id: "1478", lastName: "Jumagesa", firstName: "Henry", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:30:00", status: "Pending" },
  { id: "1475", lastName: "Kaligtan", firstName: "Michelle", gradeLevel: "Kinder", dateApplied: "2026-08-24 08:45:00", status: "Pending" },
  { id: "1723", lastName: "Kinalina", firstName: "Rexter", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:00:00", status: "Pending" },
  { id: "1458", lastName: "Macasinag", firstName: "Jake", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:15:00", status: "Pending" },
  { id: "4521", lastName: "Padilla", firstName: "Daniel", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:30:00", status: "Pending" },
  { id: "1493", lastName: "Panaga", firstName: "Diane Mae", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:45:00", status: "Pending" },
  { id: "1465", lastName: "Romasanta", firstName: "Rosaline", gradeLevel: "Kinder", dateApplied: "2026-08-24 10:00:00", status: "Pending" },
  { id: "5256", lastName: "Sy", firstName: "James", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:15:00", status: "Pending" },
  { id: "1485", lastName: "Tumatong", firstName: "Yuna Richelle", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:30:00", status: "Pending" },
  { id: "1457", lastName: "Yap", firstName: "Daniel", gradeLevel: "Kinder", dateApplied: "2026-08-24 10:45:00", status: "Pending" },
  { id: "1510", lastName: "Aquino", firstName: "Bianca", gradeLevel: "Nursery", dateApplied: "2026-08-24 11:00:00", status: "Pending" },
  { id: "1512", lastName: "Balagtas", firstName: "Miguel", gradeLevel: "Kinder", dateApplied: "2026-08-24 11:15:00", status: "Pending" },
  { id: "1515", lastName: "Cruz", firstName: "Angela", gradeLevel: "Nursery", dateApplied: "2026-08-24 11:30:00", status: "Pending" },
  { id: "1518", lastName: "Dela Pena", firstName: "Joshua", gradeLevel: "Kinder", dateApplied: "2026-08-24 11:45:00", status: "Pending" },
  { id: "1521", lastName: "Estrada", firstName: "Sofia", gradeLevel: "Nursery", dateApplied: "2026-08-24 12:00:00", status: "Pending" },
  { id: "1524", lastName: "Flores", firstName: "Kyle", gradeLevel: "Kinder", dateApplied: "2026-08-24 12:15:00", status: "Pending" },
  { id: "1527", lastName: "Garcia", firstName: "Jamie", gradeLevel: "Nursery", dateApplied: "2026-08-24 12:30:00", status: "Pending" },
  { id: "1530", lastName: "Herrera", firstName: "Nico", gradeLevel: "Kinder", dateApplied: "2026-08-24 12:45:00", status: "Pending" },
  { id: "1533", lastName: "Ignacio", firstName: "Patricia", gradeLevel: "Nursery", dateApplied: "2026-08-24 13:00:00", status: "Pending" },
  { id: "1536", lastName: "Jimenez", firstName: "Rafael", gradeLevel: "Kinder", dateApplied: "2026-08-24 13:15:00", status: "Pending" },
  { id: "1539", lastName: "Lopez", firstName: "Camille", gradeLevel: "Nursery", dateApplied: "2026-08-24 13:30:00", status: "Pending" },
  { id: "1542", lastName: "Mendoza", firstName: "Marcus", gradeLevel: "Kinder", dateApplied: "2026-08-24 13:45:00", status: "Pending" },
  { id: "1545", lastName: "Navarro", firstName: "Isabel", gradeLevel: "Nursery", dateApplied: "2026-08-24 14:00:00", status: "Pending" },
  { id: "1548", lastName: "Ocampo", firstName: "Gabriel", gradeLevel: "Kinder", dateApplied: "2026-08-24 14:15:00", status: "Pending" },

  { id: "1602", lastName: "Reyes", firstName: "John", gradeLevel: "Kinder", dateApplied: "2026-08-23 09:00:00", dateApproved: "2026-08-25 09:00:00", status: "Approved" },
  { id: "1603", lastName: "Santos", firstName: "Maria", gradeLevel: "Nursery", dateApplied: "2026-08-23 09:30:00", dateApproved: "2026-08-25 09:30:00", status: "Approved" },
  { id: "1705", lastName: "Torres", firstName: "Kevin", gradeLevel: "Kinder", dateApplied: "2026-08-23 10:00:00", dateApproved: "2026-08-25 10:00:00", status: "Approved" },

  { id: "1701", lastName: "Garcia", firstName: "Paul", gradeLevel: "Nursery", dateApplied: "2026-08-22 09:00:00", status: "Rejected", rejectionReason: "incomplete-documents", dateRejected: "2026-08-24 09:00:00" },
  { id: "1702", lastName: "Molina", firstName: "Anne", gradeLevel: "Kinder", dateApplied: "2026-08-22 09:30:00", status: "Rejected", rejectionReason: "not-qualified", dateRejected: "2026-08-24 10:00:00" },
];

export function getApplicants() {
  return DEFAULT_APPLICANTS;
}

export function saveApplicants(applicants) {
  return applicants;
}

export function getApprovedApplicants() {
  return getApplicants().filter((a) => a.status === "Approved");
}

export function approveApplicants(ids) {
  const applicants = getApplicants().map((a) =>
    ids.includes(a.id) ? { ...a, status: "Approved" } : a
  );
  saveApplicants(applicants);
  return applicants;
}

export function rejectApplicant(id, reason) {
  const applicants = getApplicants().map((a) =>
    a.id === id
      ? {
          ...a,
          status: "Rejected",
          rejectionReason: reason,
          dateRejected: new Date().toISOString().slice(0, 19).replace("T", " "),
        }
      : a
  );
  saveApplicants(applicants);
  return applicants;
}

export function markEnrolled(id) {
  const applicants = getApplicants().map((a) =>
    a.id === id ? { ...a, status: "Enrolled" } : a
  );
  saveApplicants(applicants);
  return applicants;
}

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