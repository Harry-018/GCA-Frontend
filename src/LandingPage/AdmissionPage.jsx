import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import axios from "axios";
import AdmissionCard from "../Components/LandingpageComponents/Admission/AdmissionCard.jsx";
import AdmissionBanner from "../Components/LandingpageComponents/Admission/AdmissionBanner.jsx";
import StepCard from "../Components/LandingpageComponents/Admission/StepCard.jsx";
import LoginHeader from "../Components/LoginHeader";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";
import { FileBadge, Camera, FileEdit } from "lucide-react";

const AdmissionPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // TEMPORARY - api fetch (uncomment to run)
    // axios
    //   .get("http://localhost:5000/api/admission")
    //   .then((response) => {
    //     console.log("AdmissionPage data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching admission data:", error);
    //   });
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex w-full flex-col overflow-x-hidden">
        <div className="flex w-full flex-col bg-egg px-3 pt-3 pb-10 font-[Poppins] text-egg-dark sm:px-5 sm:pt-5 sm:pb-12 lg:px-6 lg:pt-5 lg:pb-14">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 sm:gap-10">
            <AdmissionBanner />

            <div className="flex flex-col gap-3">
              <h2 className="font-[PoppinsBold] uppercase text-lg text-swamp-green">
                Required Documents
              </h2>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <AdmissionCard
                  Icon={<FileBadge className="hidden" />}
                  Atitle="Birth Certificate / PSA / NSO"
                />
                <AdmissionCard
                  Icon={<Camera className="hidden" />}
                  Atitle="2x2 ID Picture"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="font-[PoppinsBold] uppercase text-lg text-swamp-green">
                Admission Process
              </h2>
              <div className="flex flex-col gap-6 rounded-2xl bg-bone px-4 py-6 shadow-[0_2px_3px_rgba(0,0,0,0.25)] sm:px-8 sm:py-8 sm:gap-10">
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
                    <Link
                      to="/email-verification"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-fit bg-swamp-green px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-white shadow-sm transition hover:opacity-80 active:scale-95 sm:w-auto"
                    >
                      <FileEdit className="h-5 w-5" />
                      Fill out form
                    </Link>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdmissionPage;
