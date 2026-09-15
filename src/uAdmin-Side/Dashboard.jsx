import { Users, User, UserCheck, Accessibility, Banknote, CreditCard, Wallet } from "lucide-react";
import AdminHeader from "../Components/AdminComponents/Dashboard/AdminHeader";
import DashboardCards from "../Components/AdminComponents/Dashboard/DashboardCards";
import RecentApplicants from "../Components/AdminComponents/Dashboard/RecentApplicants";

const SCHOOL_YEAR = "2026-2027";

const RECENT_HEADERS = [
  "APPLICATE ID",
  "LAST NAME",
  "FIRST NAME",
  "GENDER",
  "GRADE LEVEL",
  "DATE APPLIED",
];

const CARDS = [
  { title: "Total Students", value: 50, icon: Users },
  { title: "Male Students", value: 19, icon: User },
  { title: "Female Students", value: 18, icon: UserCheck },
  { title: "Disabled Students", value: 3, icon: Accessibility },
  { title: "Total Full Cash Payment", value: 19, icon: Banknote },
  { title: "Total Pay Lite Payment", value: 18, icon: CreditCard },
  { title: "Total All In Payment", value: 3, icon: Wallet },
];

const APPLICANTS = [
  { id: "1518", lastName: "Dela Pena", firstName: "Joshua", gender: "Male", gradeLevel: "Kinder", dateApplied: "2026-08-24 07:00:00" },
  { id: "1515", lastName: "Cruz", firstName: "Angela", gender: "Female", gradeLevel: "Nursery", dateApplied: "2026-08-24 07:15:00" },
  { id: "1512", lastName: "Balagtas", firstName: "Miguel", gender: "Male", gradeLevel: "Kinder", dateApplied: "2026-08-24 07:30:00" },
  { id: "1510", lastName: "Aquino", firstName: "Bianca", gender: "Female", gradeLevel: "Nursery", dateApplied: "2026-08-24 07:45:00" },
  { id: "1456", lastName: "Yap", firstName: "Daniel", gender: "Male", gradeLevel: "Kinder", dateApplied: "2026-08-24 08:00:00" },
  { id: "1485", lastName: "Tumatong", firstName: "Yuna Richelle", gender: "Female", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:15:00" },
  { id: "5256", lastName: "Sy", firstName: "James", gender: "Male", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:30:00" },
  { id: "1465", lastName: "Romasanta", firstName: "Rosaline", gender: "Female", gradeLevel: "Kinder", dateApplied: "2026-08-24 08:45:00" },
  { id: "1493", lastName: "Panaga", firstName: "Diane Mae", gender: "Female", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:00:00" },
  { id: "4521", lastName: "Padilla", firstName: "Daniel", gender: "Male", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:15:00" },
  { id: "1458", lastName: "Macasinag", firstName: "Jake", gender: "Male", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:30:00" },
  { id: "1723", lastName: "Kinalina", firstName: "Rexter", gender: "Male", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:45:00" },
  { id: "1475", lastName: "Kaligtan", firstName: "Michelle", gender: "Female", gradeLevel: "Kinder", dateApplied: "2026-08-24 10:00:00" },
  { id: "1478", lastName: "Jumagesa", firstName: "Henry", gender: "Male", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:15:00" },
  { id: "1456", lastName: "Bernado", firstName: "Kathryn", gender: "Female", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:30:00" },
  { id: "1452", lastName: "Agassi", firstName: "Carlos", gender: "Male", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:45:00" },
];

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 bg-[#ebe9e4] cursor-default font-[Poppins] min-h-0">
      
      <AdminHeader 
        schoolYear={SCHOOL_YEAR} 
      />

      <DashboardCards 
        cards={CARDS} 
      />

      <RecentApplicants 
        applicants={APPLICANTS} 
        headers={RECENT_HEADERS} 
      />

    </div>
  );
};

export default Dashboard;
