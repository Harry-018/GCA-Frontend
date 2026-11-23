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
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

import AdminHeader from "../Components/AdminComponents/Dashboard/AdminHeader";
import DashboardCards from "../Components/AdminComponents/Dashboard/DashboardCards";
import DataTable from "../Components/DataTable";
import { getDashboard } from "../requests/preEnrollmentRequests";
import { queryKeys } from "../lib/queryKeys.js";
import { QUERY_STALE_TIME } from "../lib/queryClient.js";

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

const Dashboard = () => {
  // The loader primes the same query cache used here.
  const { recent_applicants = [], dashboard: initialDashboard } =
    useLoaderData();

  const initialSchoolYearId = initialDashboard?.selected_school_year_id
    ? String(initialDashboard.selected_school_year_id)
    : "";

  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState(
    initialSchoolYearId,
  );

  const {
    data: dashboardData,
    isFetching: loading,
    error: dashboardError,
  } = useQuery({
    queryKey: queryKeys.dashboard(selectedSchoolYearId || null),
    queryFn: async () => {
      const response = await getDashboard(selectedSchoolYearId || undefined);

      return response?.data ?? {};
    },
    enabled: Boolean(selectedSchoolYearId),
    initialData:
      selectedSchoolYearId === initialSchoolYearId ? initialDashboard : undefined,
    staleTime: QUERY_STALE_TIME.tableData,
  });

  const dashboard = dashboardData ?? {};
  const schoolYears = dashboard.school_years ?? [];
  const stats = dashboard.stats ?? {};

  const error =
    dashboardError?.response?.data?.message ||
    dashboardError?.message ||
    "";

  const cards = CARD_CONFIG.map(({ key, title, icon }) => ({
    title,
    value: stats[key] ?? 0,
    icon,
  }));

  const handleSchoolYearChange = (event) => {
    setSelectedSchoolYearId(event.target.value);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-y-auto bg-egg px-1 pb-4 font-[Poppins]">
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

      <span className="flex gap-3 py-3 font-[PoppinsBold] text-parent-green">
        <FileClockIcon />
        Recent Applicants
      </span>

      <DataTable
        data={recent_applicants}
        columns={columns}
        emptyMessage="No recent applicants."
        className="min-h-80"
      />
    </div>
  );
};

export default Dashboard;
