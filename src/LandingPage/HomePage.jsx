import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import SideBanner from "../Components/LandingpageComponents/Home/SideBanner";
import MainBanner from "../Components/LandingpageComponents/Home/MainBanner";
import AcademicCard from "../Components/LandingpageComponents/Home/AcademicCard";
import Mission from "../Components/LandingpageComponents/Home/Mission";
import Vision from "../Components/LandingpageComponents/Home/Vision";
import HymnSection from "../Components/LandingpageComponents/Home/HymnSection";
import WhyChooseUs from "../Components/LandingpageComponents/Home/WhyChooseUs";
import Activities from "../Components/LandingpageComponents/Home/Activities";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";
import LoginHeader from "../Components/LoginHeader";

// import axios from "axios";
import { Bus, GraduationCap } from "lucide-react";

const HomePage = () => {
  const { banner, acadprog, childact, missionvision, reasons, video } =
    useLoaderData();

  const loaderData = useLoaderData();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {}, []);

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader onMenuToggle={() => setSidebarOpen(true)} />

      <HomeSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex w-full flex-col overflow-x-hidden">
        <div className="flex w-full justify-center px-3 bg-egg py-3 sm:px-5 lg:px-6 lg:py-5">
          <div className="grid h-auto w-full max-w-7xl grid-cols-1 gap-2 sm:h-87.5 lg:h-92.5 lg:grid-cols-[210px_minmax(0,1fr)_210px] lg:gap-3">
            <SideBanner
              image="/image/sb.jpg"
              title="Transportation"
              subtitle="Services"
              icon={Bus}
              arrow="left"
              to="/transport"
            />

            <MainBanner
              schoolYear={banner?.school_year ?? ""}
              admissionStatus={banner?.enrollment_status ?? "Close"}
              title={banner?.banner_title ?? ""}
              quote={banner?.banner_quote ?? ""}
              backgroundImage={banner?.banner_image || "/image/kinder.jpg"}
            />

            <SideBanner
              image="/image/money.jpg"
              title="Tuition"
              subtitle="& Fees"
              icon={GraduationCap}
              to="/tuitionfee"
            />
          </div>
        </div>

        {/* Academic Programs */}
        <div className="flex flex-col items-center pt-5 bg-egg">
          <div className="flex w-full max-w-full flex-col lg:gap-5">
            <div className="flex w-full justify-center">
              <h2 className="px-5 font-[SuperJoyful] uppercase text-swamp-green lg:text-2xl">
                Academic Programs
              </h2>
            </div>

            <div className="no-scrollbar flex snap-x snap-mandatory justify-center-safe gap-5 overflow-x-auto px-5 py-5">
              <div className="grid  w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {(acadprog ?? []).map((program) => (
                  <AcademicCard
                    key={program.program_id}
                    card={{
                      program: program.grade_level_name,
                      ages: `${program.min_age}–${program.max_age}`,
                      description: program.description,
                    }}
                    image={program.image_url || "/image/nursery.jpg"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="flex w-full flex-col">
          <Mission
            image="/image/bb.jpg"
            overlay="/image/90.webp"
            label="Our Mission"
            title={missionvision?.mission_title ?? "Our Mission"}
            description={missionvision?.mission_body ?? ""}
          />

          <Vision
            image="/image/nut.webp"
            overlay="/image/123.jpg"
            label="Our Vision"
            title={missionvision?.vision_title ?? "Our Vision"}
            description={missionvision?.vision_body ?? ""}
          />
        </div>

        {/* Hymn Section */}
        <div className="flex flex-col bg-egg pt-15 pb-0 -mb-10">
          <HymnSection
            title={video?.video_title || "Grace Christian Academy Hymn"}
            videoSrc={video?.videourl}
          />
        </div>

        <WhyChooseUs
          title="WHY PARENT'S CHOOSE US"
          reasons={(reasons ?? []).map((item) => item.reasons)}
        />
        <Activities
          title="CHILDREN ACTIVITIES"
          activities={(childact ?? []).map((activity) => ({
            id: activity.activity_id,
            title: activity.activity_title,
            description: activity.activity_description,
            image: activity.activity_image || "/image/nursery.jpg",
          }))}
        />

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
