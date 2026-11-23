import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

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

import { Bus, GraduationCap } from "lucide-react";

const HomePage = () => {
  const { banner, acadprog, childact, missionvision, reasons, video } =
    useLoaderData();

  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              schoolStart={banner?.school_start ?? ""}
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
              <h2 className="px-5 font-[SuperJoyful] uppercase text-parent-green text-lg leading-tight sm:text-xl md:text-4xl">
                Academic Programs
              </h2>
            </div>

            <Suspense fallback={null}>
              <Await resolve={acadprog}>
                {(programs) => (
                  <div className="no-scrollbar flex snap-x snap-mandatory justify-start gap-5 overflow-x-auto px-5 py-5 sm:justify-center">
                    <div className="grid w-max grid-flow-col auto-cols-[calc(100vw-2.5rem)] gap-5 sm:w-full sm:max-w-7xl sm:auto-cols-auto sm:grid-flow-row sm:grid-cols-2 lg:grid-cols-3">
                      {(programs ?? []).map((program) => (
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
                )}
              </Await>
            </Suspense>
          </div>
        </div>

        {/* Mission & Vision */}
        <Suspense fallback={null}>
          <Await resolve={missionvision}>
            {(content) => (
              <div className="flex w-full flex-col">
                <Mission
                  image="/image/bb.jpg"
                  overlay="/image/90.webp"
                  label="Our Mission"
                  title={content?.mission_title ?? "Our Mission"}
                  description={content?.mission_body ?? ""}
                />

                <Vision
                  image="/image/nut.webp"
                  overlay="/image/123.jpg"
                  label="Our Vision"
                  title={content?.vision_title ?? "Our Vision"}
                  description={content?.vision_body ?? ""}
                />
              </div>
            )}
          </Await>
        </Suspense>

        {/* Hymn Section */}
        <Suspense fallback={null}>
          <Await resolve={video}>
            {(content) => (
              <div className="flex flex-col bg-egg pt-15 pb-0 -mb-10">
                <HymnSection
                  title={content?.video_title || "Grace Christian Academy Hymn"}
                  videoSrc={content?.videourl}
                />
              </div>
            )}
          </Await>
        </Suspense>

        <Suspense fallback={null}>
          <Await resolve={reasons}>
            {(items) => (
              <WhyChooseUs
                title="WHY PARENTS CHOOSE US"
                reasons={(items ?? []).map((item) => item.reasons)}
              />
            )}
          </Await>
        </Suspense>

        <Suspense fallback={null}>
          <Await resolve={childact}>
            {(activities) => (
              <Activities
                title="CHILDREN ACTIVITIES"
                activities={(activities ?? []).map((activity) => ({
                  id: activity.activity_id,
                  title: activity.activity_title,
                  description: activity.activity_description,
                  image: activity.activity_image || "/image/nursery.jpg",
                }))}
              />
            )}
          </Await>
        </Suspense>

        <Footer admissionStatus={banner?.enrollment_status ?? "Close"} />
      </div>
    </div>
  );
};

export default HomePage;
