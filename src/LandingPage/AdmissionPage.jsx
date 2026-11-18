import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
// import axios from "axios";
import AdmissionCard from "../Components/LandingpageComponents/Admission/AdmissionCard.jsx";
import AdmissionBanner from "../Components/LandingpageComponents/Admission/AdmissionBanner.jsx";
import AdmissionOpeningNotice from "../Components/LandingpageComponents/Admission/AdmissionOpeningNotice.jsx";
import StepCard from "../Components/LandingpageComponents/Admission/StepCard.jsx";
import LoginHeader from "../Components/LoginHeader";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";
import { FileBadge, Camera, FileEdit } from "lucide-react";

const AdmissionPage = () => {
  const banner = useLoaderData();
  const admissionIsOpen = banner?.enrollment_status === "open";
  const schoolStart = banner?.school_start ?? "";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex w-full flex-col overflow-x-hidden">
        <div className="flex w-full flex-col bg-egg px-3 pt-3 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pt-5 sm:pb-12 lg:px-6 lg:pt-5 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
            <AdmissionBanner />

            <div className="flex flex-col gap-3">
              <h2 className="font-[PoppinsBold] uppercase text-lg text-parent-green">
                Required Documents
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <AdmissionCard
                  Icon={<FileBadge className="h-4 w-4" />}
                  Atitle="Birth Certificate / PSA / NSO"
                />
                <AdmissionCard
                  Icon={<Camera className="h-4 w-4" />}
                  Atitle="2x2 ID Picture"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-[PoppinsBold] uppercase text-lg text-parent-green">
                Admission Process
              </h2>
              <div className="relative flex flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-linear-to-br from-bone via-bone to-parent-pale/40 px-4 py-6 sm:px-8 sm:py-8">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-parent-green via-parent-accent to-lime-green" />

                <StepCard
                  step="1"
                  title={"STEP 1: FILL OUT FORM"}
                  description={"Complete the online application form"}
                />
                <StepCard
                  step="2"
                  title={"STEP 2: WAIT FOR EMAIL"}
                  description="Wait for the confirmation message schedule for your child's assessment and submission of your documents"
                />
                <StepCard
                  step="3"
                  title={"STEP 3: REQUIREMENTS"}
                  description="The required documents must be submitted at the school after your child's assessment"
                />
                <StepCard
                  step="4"
                  title={"STEP 4: ENROLLMENT"}
                  description={
                    "Complete enrollment and become a part of Grace Christian Academy"
                  }
                  action={
                    admissionIsOpen ? (
                      <Link
                        to="/email-verification"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-parent-green px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-white transition hover:bg-parent-accent active:scale-95 sm:w-auto"
                      >
                        <FileEdit className="h-5 w-5" />
                        Fill out form
                      </Link>
                    ) : (
                      <AdmissionOpeningNotice
                        schoolStart={schoolStart}
                        className="w-full justify-center sm:w-auto"
                      />
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer admissionStatus={admissionIsOpen ? "open" : "close"} />
    </div>
  );
};

export default AdmissionPage;
