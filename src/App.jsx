import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import ScrollToTop from "./Components/ScrollToTop.jsx";

// ----- LANDING PAGE -----
import HomePage from "./LandingPage/HomePage.jsx";
import AdmissionPage from "./LandingPage/AdmissionPage.jsx";
import TransportationPage from "./LandingPage/TransportationPage.jsx";
import EmailVerificationPage from "./LandingPage/emailVerification.jsx";
import FormPage from "./LandingPage/FormPage.jsx";
import ThanksforApply from "./LandingPage/ThanksforApply.jsx";
import TuitionPage from "./LandingPage/TuitionPage.jsx";

// ----- PARENTS SIDE -----
import ParentsLayout from "./Layout/ParentsLayout.jsx";
import ParentsDashboard from "./Parents-Side/ParentsDashboard.jsx";
import Grades from "./Parents-Side/Grades.jsx";
import Security from "./Parents-Side/Security.jsx";

// ----- LOGIN -----
import Login from "./Login - Forget/Login.jsx";
import ForgotPassword from "./Login - Forget/ForgotPassword.jsx";

// ----- TEACHER SIDE -----
import TeacherLayout from "./Layout/TeacherLayout.jsx";
import DashBoard from "./Teacher-Side/DashBoard.jsx";
import Attendance from "./Teacher-Side/Attendance.jsx";
import TeacherGrades from "./Teacher-Side/Grades.jsx";
import WeeklySchedule from "./Teacher-Side/WeeklySchedule.jsx";
import Report from "./Teacher-Side/Report.jsx";
import GradesReport from "./Teacher-Side/GradesReport.jsx";
import Settings from "./Teacher-Side/Settings.jsx";

// ----- ADMIN SIDE -----
import AdminLayout from "./Layout/AdminLayout.jsx";
import Dashboard from "./uAdmin-Side/Dashboard.jsx";
import Admission from "./uAdmin-Side/Admission.jsx";
import Students from "./uAdmin-Side/Academic Management Page/Students.jsx";
import Teacher from "./uAdmin-Side/Academic Management Page/Teacher.jsx";
import Parents from "./uAdmin-Side/Academic Management Page/Parents.jsx";
import Section from "./uAdmin-Side/Academic Management Page/Section.jsx";
import SectionClass from "./uAdmin-Side/Academic Management Page/SectionClass.jsx";
import SectionInformation from "./uAdmin-Side/Academic Management Page/SectionInformation.jsx";
import Schedule from "./uAdmin-Side/Academic Management Page/Schedule.jsx";
import ScheduleSection from "./uAdmin-Side/Academic Management Page/ScheduleSection.jsx";
import ScheduleSetUp from "./uAdmin-Side/Academic Management Page/ScheduleSetUp.jsx";
import GradeLevels from "./uAdmin-Side/Academic Management Page/GradeLevels.jsx";
import CoreSubjects from "./uAdmin-Side/Academic Management Page/CoreSubjects.jsx";
import Skills from "./uAdmin-Side/Academic Management Page/Skills.jsx";
import SchoolYear from "./uAdmin-Side/Academic Management Page/SchoolYear.jsx";
import SubmissionDocs from "./uAdmin-Side/SubmissionDocs.jsx";

//loaders
import {
  admissionLoader,
  getGradeLevels,
  submissionDocsLoader,
} from "./loaders/preEnrollmentLoaders.js";
import { dashboardLoader } from "./loaders/dashboardLoader.js";

import { enrollmentFormLoader } from "./loaders/formLoaderGuard.js";
import SessionExpiredModal from "./SessionExpiredModal.jsx";
//ProtectedRoutes

import ProtectedRoutes from "./protectedRoutes.jsx";
import NotFound from "./notFound.jsx";
import NotAuth from "./notauth.jsx";
import RouterErrorBoundary from "./RouterErrorBoundary.jsx";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<ScrollToTop />} errorElement={RouterErrorBoundary}>
          <Route path="*" element={<NotFound />} />
          <Route path="/notauth" element={<NotAuth />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/transport" element={<TransportationPage />} />
          <Route
            path="/email-verification"
            element={<EmailVerificationPage />}
          />
          <Route
            path="/enrollmentform"
            element={<FormPage />}
            loader={getGradeLevels} //change to enrollmentLoaderGuard
          />
          <Route path="/thanksforapply" element={<ThanksforApply />} />
          <Route path="/tuitionfee" element={<TuitionPage />} />

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
            <Route path="gradesreport/:schoolId" element={<GradesReport />} />
            <Route path="security" element={<Settings />} />
          </Route>

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
          </Route>
        </Route>
      </>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} /> <SessionExpiredModal />
    </>
  );
};

export default App;
