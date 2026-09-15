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
import { useEffect, useState } from "react";
// import axios from "axios";
import { Bus, GraduationCap } from "lucide-react";

const BANNER_DATA = {
  admission_status: "Open",
  banner_title: "Discover a joyful preschool journey with faith, play, and learning.",
  banner_quote: "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast. — Ephesians 2:8–9 (NIV)",
  school_year: "2026-2027",
};

const ACADEMIC_PROGRAMS = [
  {
    id: 1,
    program: "Nursery",
    ages: "2–3",
    description: "A gentle start where toddlers explore, play, and build early social skills in a loving environment.",
    image: "/image/nursery.jpg",
  },
  {
    id: 2,
    program: "Pre-Kindergarten",
    ages: "4–5",
    description: "Hands-on learning that builds foundational literacy, numeracy, and creativity through guided play.",
    image: "/image/pre-kinder.avif",
  },
  {
    id: 3,
    program: "Kindergarten",
    ages: "5–6",
    description: "A Christ-centered program that prepares young learners for elementary with confidence and joy.",
    image: "/image/kinder.jpg",
  },
];

const WHY_CHOOSE_US = [
  "We help every child grow with confidence and values",
  "Focused on both education and character formation",
  "Safe, supportive, and child-centered education",
  "A safe, joyful, and structured experience",
  "Engaging activities for meaningful learning",
];

const ACTIVITIES = [
  {
    title: "Cognitive Development",
    icon: "🧠",
    image: "/image/nursery.jpg",
    description:
      "Learning through play strengthens problem-solving skills, memory, and the ability to think creatively and critically.",
  },
  {
    title: "Physical Health",
    icon: "💪",
    image: "/image/kinder.jpg",
    description:
      "Active play and movement activities build strong muscles, coordination, and establish healthy habits for life.",
  },
  {
    title: "Social Skills",
    icon: "🫂",
    image: "/image/p2.jpg",
    description:
      "Group activities teach sharing, cooperation, turn-taking, and empathy—essential skills for healthy relationships.",
  },
  {
    title: "Spiritual Growth",
    icon: "✝️",
    image: "/image/bb.jpg",
    description:
      "Faith-based activities and Christian values help children develop a strong moral foundation rooted in love and kindness.",
  },
  {
    title: "Creative Expression",
    icon: "🎨",
    image: "/image/pre-kinder.avif",
    description:
      "Art, music, and imaginative play encourage children to express ideas, build confidence, and celebrate their unique creativity.",
  },
  {
    title: "Language & Literacy",
    icon: "📚",
    image: "/image/kinder.jpg",
    description:
      "Stories, songs, and conversations help children build vocabulary, express themselves, and discover the joy of reading.",
  },
  {
    title: "Nature Discovery",
    icon: "🌱",
    image: "/image/sb.jpg",
    description:
      "Hands-on exploration nurtures curiosity as children observe nature, ask questions, and learn about the world around them.",
  },
  {
    title: "Music & Rhythm",
    icon: "🎵",
    image: "/image/money.jpg",
    description:
      "Singing, dancing, and rhythm games develop listening skills, coordination, self-expression, and joyful confidence.",
  },
];

const HomePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // TEMPORARY - api fetch (uncomment to run)
    // axios
    //   .get("http://localhost:5000/api/home")
    //   .then((response) => {
    //     console.log("HomePage data:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching home data:", error);
    //   });
  }, []);

  return (
    <div className="flex h-full w-full flex-col">
      <LoginHeader 
        onMenuToggle={() => 
        setSidebarOpen(true)} 
      />

      <HomeSidebar 
        open={sidebarOpen} 
        onClose={() => 
        setSidebarOpen(false)} 
      />

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
            schoolYear={BANNER_DATA.school_year}
            admissionStatus={BANNER_DATA.admission_status}
            title={BANNER_DATA.banner_title}
            quote={BANNER_DATA.banner_quote}
            backgroundImage="/image/kinder.jpg"
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
      <div className="flex flex-col items-center bg-egg">
        <div className="flex w-full max-w-full flex-col lg:gap-5">
          <div className="flex w-full justify-center">
            <h2 className="px-5 font-Handpicked-seashells font-bold uppercase text-swamp-green lg:text-2xl">
              Academic Programs
            </h2>
          </div>

          <div className="no-scrollbar flex snap-x snap-mandatory justify-center-safe gap-5 overflow-x-auto px-5 py-5">
            {ACADEMIC_PROGRAMS.map((program) => (
              <AcademicCard
                key={program.id}
                card={program}
                image={program.image}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="flex w-full flex-col">
      <Mission
        image="/image/bb.jpg"
        overlay="/image/90.webp"
        label="Our Mission"
        title="Raising Godly and Lifelong Learners"
        description="To be a Christ-centered preschool that inspires young children to grow in faith, character, knowledge, and confidence. We envision a generation of lifelong learners who love God, respect others, and are equipped with the skills and values needed to succeed in school and in life."
      />

      <Vision
        image="/image/nut.webp"
        overlay="/image/123.jpg"
        label="Our Vision"
        title="Nurturing Faith, Excellence, and Character"
        description="We envision a community where every child is empowered to reach their full potential—academically, spiritually, and emotionally—as they grow into confident, compassionate, and responsible individuals prepared for a lifetime of learning and service."
        reversed
      />
      </div>

      {/* Hymn Section */}
      <div className="flex flex-col bg-egg pt-15 pb-0 -mb-10">
        <HymnSection
          title="GRACE CHRISTIAN ACADEMY HYMN"
          videoSrc="/video/hymn.mp4"
        />
      </div>

       <WhyChooseUs
        title="WHY PARENT'S CHOOSE US"
        reasons={WHY_CHOOSE_US}
      />

      <Activities
        title="CHILDREN ACTIVITIES"
        activities={ACTIVITIES}
      />

      <Footer />

      </div>
    </div>
  );
};

export default HomePage;