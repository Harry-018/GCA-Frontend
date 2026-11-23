import { lazy, Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import ScrollToTop from "./Components/ScrollToTop.jsx";
import { queryClient } from "./lib/queryClient.js";

// loaders
import {
  admissionLoader,
  submissionDocsLoader,
} from "./loaders/preEnrollmentLoaders.js";
import { dashboardLoader } from "./loaders/dashboardLoader.js";
import {
  admissionPageLoader,
  landingPageLoader,
  tuitionPageLoader,
} from "./loaders/LandingPageLoader.js";
import { enrollmentFormLoader } from "./loaders/formLoaderGuard.js";

import SessionExpiredModal from "./SessionExpiredModal.jsx";
import SessionCacheGuard from "./Components/SessionCacheGuard.jsx";
import ProtectedRoutes from "./protectedRoutes.jsx";
import NotFound from "./notFound.jsx";
import NotAuth from "./notauth.jsx";
import RouterErrorBoundary from "./RouterErrorBoundary.jsx";
import ParentInquiryProvider from "./Components/ParentInquiryProvider.jsx";

// ----- LAZY ROUTES -----
const HomePage = lazy(() => import("./LandingPage/HomePage.jsx"));
const AdmissionPage = lazy(() => import("./LandingPage/AdmissionPage.jsx"));
const TransportationPage = lazy(
  () => import("./LandingPage/TransportationPage.jsx"),
);
const EmailVerificationPage = lazy(
  () => import("./LandingPage/emailVerification.jsx"),
);
const FormPage = lazy(() => import("./LandingPage/FormPage.jsx"));
const ThanksforApply = lazy(() => import("./LandingPage/ThanksforApply.jsx"));
const TuitionPage = lazy(() => import("./LandingPage/TuitionPage.jsx"));
const TeacherRegistrationPage = lazy(
  () => import("./LandingPage/TeacherRegistrationPage.jsx"),
);
const AccountActivation = lazy(
  () => import("./LandingPage/AccountActivation.jsx"),
);

const Login = lazy(() => import("./Login - Forget/Login.jsx"));
const ForgotPassword = lazy(
  () => import("./Login - Forget/ForgotPassword.jsx"),
);

const ParentsLayout = lazy(() => import("./Layout/ParentsLayout.jsx"));
const ParentsDashboard = lazy(
  () => import("./Parents-Side/ParentsDashboard.jsx"),
);
const Grades = lazy(() => import("./Parents-Side/Grades.jsx"));
const Security = lazy(() => import("./Parents-Side/Security.jsx"));

const TeacherLayout = lazy(() => import("./Layout/TeacherLayout.jsx"));
const DashBoard = lazy(() => import("./Teacher-Side/DashBoard.jsx"));
const Attendance = lazy(() => import("./Teacher-Side/Attendance.jsx"));
const TeacherGrades = lazy(() => import("./Teacher-Side/Grades.jsx"));
const WeeklySchedule = lazy(() => import("./Teacher-Side/WeeklySchedule.jsx"));
const Report = lazy(() => import("./Teacher-Side/Report.jsx"));
const TeacherSettings = lazy(() => import("./Teacher-Side/Settings.jsx"));

const AdminLayout = lazy(() => import("./Layout/AdminLayout.jsx"));
const Dashboard = lazy(() => import("./uAdmin-Side/Dashboard.jsx"));
const Admission = lazy(() => import("./uAdmin-Side/Admission.jsx"));
const Students = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Students.jsx"),
);
const Teacher = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Teacher.jsx"),
);
const Parents = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Parents.jsx"),
);
const Section = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Section.jsx"),
);
const SectionClass = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/SectionClass.jsx"),
);
const SectionInformation = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/SectionInformation.jsx"),
);
const Schedule = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Schedule.jsx"),
);
const ScheduleSection = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/ScheduleSection.jsx"),
);
const ScheduleSetUp = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/ScheduleSetUp.jsx"),
);
const GradeLevels = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/GradeLevels.jsx"),
);
const CoreSubjects = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/CoreSubjects.jsx"),
);
const Skills = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/Skills.jsx"),
);
const SchoolYear = lazy(
  () => import("./uAdmin-Side/Academic_Management_Page/SchoolYear.jsx"),
);
const SubmissionDocs = lazy(
  () => import("./uAdmin-Side/SubmissionDocs.jsx"),
);
const UserAccount = lazy(() => import("./uAdmin-Side/UserAccount.jsx"));
const ActivityLogs = lazy(() => import("./uAdmin-Side/ActivityLogs.jsx"));
const AdminSettings = lazy(() => import("./uAdmin-Side/AdminSettings.jsx"));
const AdminSectionName = lazy(
  () => import("./uAdmin-Side/AdminSectionName.jsx"),
);
const AdminSubjects = lazy(() => import("./uAdmin-Side/AdminSubjects.jsx"));
const AdminSkills = lazy(() => import("./uAdmin-Side/AdminSkills.jsx"));
const Announcement = lazy(
  () => import("./uAdmin-Side/Communication/Announcements.jsx"),
);
const AnnouncementList = lazy(
  () => import("./uAdmin-Side/Communication/AnnouncementList.jsx"),
);
const Notification = lazy(
  () => import("./uAdmin-Side/Communication/Notifications.jsx"),
);

const Home = lazy(
  () => import("./uAdmin-Side/Website Management Page/Home.jsx"),
);
const Transpo = lazy(
  () => import("./uAdmin-Side/Website Management Page/Transpo.jsx"),
);
const Tuition = lazy(
  () => import("./uAdmin-Side/Website Management Page/Tuition.jsx"),
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<ScrollToTop />} errorElement={RouterErrorBoundary}>
        {/* PUBLIC */}
        <Route path="*" element={<NotFound />} />
        <Route path="/notauth" element={<NotAuth />} />
        <Route path="/" element={<HomePage />} loader={landingPageLoader} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/admission"
          element={<AdmissionPage />}
          loader={admissionPageLoader}
        />
        <Route path="/transport" element={<TransportationPage />} />
        <Route
          path="/email-verification"
          element={<EmailVerificationPage />}
        />
        <Route
          path="/teacher-registration"
          element={<TeacherRegistrationPage />}
        />
        <Route path="/account-activation" element={<AccountActivation />} />
        <Route
          path="/enrollmentform"
          element={<FormPage />}
          loader={enrollmentFormLoader} //change to enrollmentLoaderGuard
        />
        <Route path="/thanksforapply" element={<ThanksforApply />} />
        <Route
          path="/tuitionfee"
          element={<TuitionPage />}
          loader={tuitionPageLoader}
        />

        {/* PARENT */}
        <Route
          path="/parents"
          element={
            <ProtectedRoutes allowedRole={"parent"}>
              <ParentsLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<ParentsDashboard />} />
          <Route path="grades/:studentId" element={<Grades />} />
          <Route path="security" element={<Security />} />
        </Route>

        {/* TEACHER */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoutes allowedRole={"teacher"}>
              <TeacherLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<DashBoard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="grades" element={<TeacherGrades />} />
          <Route path="weekly-schedule" element={<WeeklySchedule />} />
          <Route path="report" element={<Report />} />
          <Route path="security" element={<TeacherSettings />} />
        </Route>

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoutes allowedRole={"admin"}>
              <AdminLayout />
            </ProtectedRoutes>
          }
        >
          <Route index element={<Dashboard />} loader={dashboardLoader} />
          <Route
            path="admission"
            element={<Admission />}
            loader={admissionLoader}
          />
          <Route path="academic" element={<Students />} />
          <Route path="academic/teachers" element={<Teacher />} />
          <Route path="academic/parents" element={<Parents />} />
          <Route path="academic/section" element={<Section />} />
          <Route path="academic/sectionclass" element={<SectionClass />} />
          <Route path="academic/schedules" element={<Schedule />} />
          <Route path="academic/grade-levels" element={<GradeLevels />} />
          <Route path="academic/core-subjects" element={<CoreSubjects />} />
          <Route path="academic/skills" element={<Skills />} />
          <Route path="academic/school-years" element={<SchoolYear />} />
          <Route
            path="academic/schedulesection"
            element={<ScheduleSection />}
          />
          <Route path="academic/setupschedule" element={<ScheduleSetUp />} />
          <Route
            path="academic/sectionInformation"
            element={<SectionInformation />}
          />
          <Route
            path="submission"
            element={<SubmissionDocs />}
            loader={submissionDocsLoader}
          />
          <Route path="users" element={<UserAccount />} />
          <Route path="activity-logs" element={<ActivityLogs />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route
            path="settings/section-name"
            element={<AdminSectionName />}
          />
          <Route path="settings/subjects/" element={<AdminSubjects />} />
          <Route
            path="settings/subjects/:subjectId/skills"
            element={<AdminSkills />}
          />
          <Route path="communication" element={<Announcement />} />
          <Route
            path="communication/announcements"
            element={<AnnouncementList />}
          />
          <Route
            path="communication/notifications"
            element={<Notification />}
          />
          <Route path="website" element={<Home />} />
          <Route path="website/transpo" element={<Transpo />} />
          <Route path="website/tuition" element={<Tuition />} />
        </Route>
      </Route>
    </>,
  ),
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <SessionCacheGuard />
    <ParentInquiryProvider>
      <Suspense fallback={null}>
        <RouterProvider router={router} />
      </Suspense>
      <SessionExpiredModal />
    </ParentInquiryProvider>
  </QueryClientProvider>
);

export default App;
