import {
  Users,
  User,
  UserCheck,
  Accessibility,
  Banknote,
  CreditCard,
  Wallet,
  FileClockIcon,
} from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import AdminHeader from "../Components/AdminComponents/Dashboard/AdminHeader";
import DashboardCards from "../Components/AdminComponents/Dashboard/DashboardCards";
import DataTable from "../Components/DataTable";
// import { getDashboard } from "../requests/preEnrollmentRequests";

const CARD_CONFIG = [
  { key: "totalStudents", title: "Total Students", icon: Users },
  { key: "maleStudents", title: "Male Students", icon: User },
  { key: "femaleStudents", title: "Female Students", icon: UserCheck },
  { key: "disabledStudents", title: "Disabled Students", icon: Accessibility },
  { key: "fullCashPayments", title: "Total Full Cash Payment", icon: Banknote },
  { key: "payLitePayments", title: "Total Pay Lite Payment", icon: CreditCard },
  { key: "allInPayments", title: "Total All In Payment", icon: Wallet },
];

const columns = [
  { accessorKey: "application_no", header: "Application No." },
  { accessorKey: "last_name", header: "Last Name" },
  { accessorKey: "first_name", header: "First Name" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "grade_level", header: "Grade Level" },
  {
    accessorKey: "date_applied",
    header: "Date Applied",
    cell: ({ getValue }) => {
      const value = getValue();

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
];

const formatSchoolYear = (year) => {
  if (!year) return "No School Year";

  const startYear = new Date(year.start_date).getFullYear();
  const endYear = new Date(year.end_date).getFullYear();

  return `${startYear} - ${endYear}`;
};

const Dashboard = () => {
  // Use the existing React Router loader data
  const { recent_applicants = [], dashboard: initialDashboard } =
    useLoaderData();

  const [dashboard, setDashboard] = useState(initialDashboard);
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState(
    initialDashboard?.selected_school_year_id
      ? String(initialDashboard.selected_school_year_id)
      : "",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const schoolYears = dashboard?.school_years ?? [];
  const stats = dashboard?.stats ?? {};

  const selectedSchoolYear = schoolYears.find(
    (year) => String(year.school_year_id) === selectedSchoolYearId,
  );

  const cards = CARD_CONFIG.map(({ key, title, icon }) => ({
    title,
    value: stats[key] ?? 0,
    icon,
  }));

  const handleSchoolYearChange = async (event) => {
    const schoolYearId = event.target.value;

    setSelectedSchoolYearId(schoolYearId);
    setError("");

    if (!schoolYearId) return;

    setLoading(true);

    try {
      const response = await getDashboard(schoolYearId);
      const updatedDashboard = response.data;

      setDashboard(updatedDashboard);
      setSelectedSchoolYearId(
        String(updatedDashboard.selected_school_year_id ?? schoolYearId),
      );
    } catch (err) {
      console.error("Failed to load Dashboard statistics:", err);
      setError("Failed to load statistics for the selected school year.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <AdminHeader
        schoolYears={schoolYears}
        selectedSchoolYearId={selectedSchoolYearId}
        onSchoolYearChange={handleSchoolYearChange}
        loading={loading}
      />

      {error && (
        <p role="alert" className="text-sm text-reject">
          {error}
        </p>
      )}

      {loading && (
        <p className="text-sm text-gray-600">
          Updating Dashboard statistics...
        </p>
      )}

      <DashboardCards cards={cards} />

      <span className="flex gap-3 py-3 font-[PoppinsBold] text-swamp-green">
        <FileClockIcon />
        Recent Applicants
      </span>

      <DataTable
        data={recent_applicants}
        columns={columns}
        emptyMessage="No recent applicants."
      />
    </div>
  );
};

export default Dashboard;
