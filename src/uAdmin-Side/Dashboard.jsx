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
import AdminHeader from "../Components/AdminComponents/Dashboard/AdminHeader";
import DashboardCards from "../Components/AdminComponents/Dashboard/DashboardCards";
import RecentApplicants from "../Components/AdminComponents/Dashboard/RecentApplicants";

import { useLoaderData } from "react-router-dom";
import DataTable from "../Components/DataTable";

const SCHOOL_YEAR = "2026 - 2027";

const CARDS = [
  { title: "Total Students", value: 50, icon: Users },
  { title: "Male Students", value: 19, icon: User },
  { title: "Female Students", value: 18, icon: UserCheck },
  { title: "Disabled Students", value: 3, icon: Accessibility },
  { title: "Total Full Cash Payment", value: 19, icon: Banknote },
  { title: "Total Pay Lite Payment", value: 18, icon: CreditCard },
  { title: "Total All In Payment", value: 3, icon: Wallet },
];
const columns = [
  {
    accessorKey: "application_no",
    header: "Application No.",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "grade_level",
    header: "Grade Level",
  },
  {
    accessorKey: "date_applied",
    header: "Date Applied",
    cell: ({ getValue }) => {
      const date = new Date(getValue());

      return date.toLocaleDateString("en-PH", {
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
  const { recent_applicants } = useLoaderData();
  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <AdminHeader schoolYear={SCHOOL_YEAR} />

      <DashboardCards cards={CARDS} />

      <span className="flex gap-3 font-[PoppinsBold] py-3 text-swamp-green">
        <FileClockIcon /> Recent Applicants
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
