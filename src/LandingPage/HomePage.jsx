import { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";

import SideBanner from "../Components/LandingpageComponents/Home/SideBanner";
import MainBanner from "../Components/LandingpageComponents/Home/MainBanner";
import AcademicCard from "../Components/LandingpageComponents/Home/AcademicCard";
import Mission from "../Components/LandingpageComponents/Home/Mission";
import Vision from "../Components/LandingpageComponents/Home/Vision";
import HymnSection from "../Components/LandingpageComponents/Home/HymnSection";
import WhyChooseUs from "../Components/LandingpageComponents/Home/WhyChooseUs";
import ActivityCarouselCard from "../Components/LandingpageComponents/Home/ActivityCarouselCard";
import HomeSidebar from "../Components/HomeSidebar";
import Footer from "../Components/Footer";
import LoginHeader from "../Components/LoginHeader";
import {
  AcademicProgramsSkeleton,
  MissionVisionSkeleton,
  HymnSkeleton,
  WhyChooseUsSkeleton,
  ActivitiesSkeleton,
} from "../Components/LandingpageComponents/Home/LandingSkeletons.jsx";

import { Bus, GraduationCap } from "lucide-react";
import { optimizeCloudinaryImage } from "../lib/cloudinary.js";
import BackToTopButton from "../Components/BackToTopButton.jsx";

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
              image="/image/sb.webp"
              title="Transportation"
              subtitle="Services"
              icon={Bus}
              to="/transport"
            />

            <MainBanner
              schoolYear={banner?.school_year ?? ""}
              admissionStatus={banner?.enrollment_status ?? "Close"}
              title={banner?.banner_title ?? ""}
              quote={banner?.banner_quote ?? ""}
              backgroundImage={optimizeCloudinaryImage(
                banner?.banner_image || "/image/kinder.webp",
                1600,
              )}
              schoolStart={banner?.school_start ?? ""}
            />

            <SideBanner
              image="/image/money.webp"
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

            <Suspense fallback={<AcademicProgramsSkeleton />}>
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
                          image={optimizeCloudinaryImage(
                            program.image_url || "/image/nursery.webp",
                            800,
                          )}
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
        <Suspense fallback={<MissionVisionSkeleton />}>
          <Await resolve={missionvision}>
            {(content) => (
              <div className="flex w-full flex-col">
                <Mission
                  image="/image/bb.webp"
                  overlay="/image/90.webp"
                  label="Our Mission"
                  title={content?.mission_title ?? "Our Mission"}
                  description={content?.mission_body ?? ""}
                />

                <Vision
                  image="/image/nut.webp"
                  overlay="/image/123.webp"
                  label="Our Vision"
                  title={content?.vision_title ?? "Our Vision"}
                  description={content?.vision_body ?? ""}
                />
              </div>
            )}
          </Await>
        </Suspense>

        {/* Hymn Section */}
        <Suspense fallback={<HymnSkeleton />}>
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

        <Suspense fallback={<WhyChooseUsSkeleton />}>
          <Await resolve={reasons}>
            {(items) => (
              <WhyChooseUs
                title="WHY PARENTS CHOOSE US"
                reasons={(items ?? []).map((item) => item.reasons)}
              />
            )}
          </Await>
        </Suspense>

        <Suspense fallback={<ActivitiesSkeleton />}>
          <Await resolve={childact}>
            {(activities) => (
              <section className="w-full bg-egg px-5 py-12 sm:px-10 sm:py-16">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
                  <div className="flex w-full flex-col items-center gap-3 text-center">
                    <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.2em] text-lime-dark">
                      Learn · Play · Grow
                    </span>
                    <h2 className="text-center font-[SuperJoyful] uppercase text-xl leading-tight text-parent-green sm:text-2xl md:text-3xl">
                      CHILDREN ACTIVITIES
                    </h2>
                    <span className="h-1 w-12 rounded-full bg-lime-dark/70" />
                  </div>
                  <div className="lg:hidden no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                    {(activities ?? []).map((activity, index) => (
                      <div
                        key={activity.activity_id}
                        className="w-[85%] shrink-0 snap-center sm:w-[48%]"
                      >
                        <ActivityCarouselCard
                          index={index}
                          title={activity.activity_title}
                          description={activity.activity_description}
                          image={optimizeCloudinaryImage(
                            activity.activity_image || "/image/nursery.webp",
                            800,
                          )}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="hidden auto-rows-fr gap-4 lg:grid lg:grid-cols-3">
                    {(activities ?? []).map((activity, index) => (
                      <ActivityCarouselCard
                        key={activity.activity_id}
                        index={index}
                        title={activity.activity_title}
                        description={activity.activity_description}
                        image={optimizeCloudinaryImage(
                          activity.activity_image || "/image/nursery.webp",
                          800,
                        )}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </Await>
        </Suspense>

        <Footer admissionStatus={banner?.enrollment_status ?? "Close"} />
      </div>
      <BackToTopButton />
    </div>
  );
};

export default HomePage;
