import React, { useState } from "react";
import Header from "../../Components/AdminComponents/Website Management/Header";
import Banner from "../../Components/AdminComponents/Website Management/Home/Banner";
import AcademicPrograms from "../../Components/AdminComponents/Website Management/Home/AcademicPrograms";
import VideoPresentation from "../../Components/AdminComponents/Website Management/Home/VideoPresentation";
import WhyParentsChooseUs from "../../Components/AdminComponents/Website Management/Home/WhyParentsChooseUs";
import Mission from "../../Components/AdminComponents/Website Management/Mission&Vision/Mission";
import Vision from "../../Components/AdminComponents/Website Management/Mission&Vision/Vision";
import ChildrenActivityCard from "../../Components/AdminComponents/Website Management/ChildrenActivityCard";
import EditBannerModal from "../../Components/AdminComponents/Website Management/Home/EditBannerModal";
import AddProgramModal from "../../Components/AdminComponents/Website Management/Home/AddProgramModal";
import EditProgramModal from "../../Components/AdminComponents/Website Management/Home/EditProgramModal";
import AddReasonModal from "../../Components/AdminComponents/Website Management/Home/AddReasonModal";
import EditReasonModal from "../../Components/AdminComponents/Website Management/Home/EditReasonModal";
import EditVideoModal from "../../Components/AdminComponents/Website Management/Home/EditVideoModal";
import EditMissionModal from "../../Components/AdminComponents/Website Management/Mission&Vision/EditMissionModal";
import EditVisionModal from "../../Components/AdminComponents/Website Management/Mission&Vision/EditVisionModal";
import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal";

const BANNER_DATA = {
  admissionStatus: "Open",
  schoolYear: "2026 - 2027",
  title: "Discover a joyful preschool journey with faith, play, and learning.",
  quote:
    '"For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God not by works, so that no one can boast." Ephesians 2:8–9 (NIV)',
};

const ACADEMIC_PROGRAMS = [
  {
    id: 1,
    name: "Nursery",
    minAge: 2,
    maxAge: 3,
    description:
      "A gentle start where toddlers explore, play, and build early social skills in a loving environment.",
    image: "/image/nursery.jpg",
  },
  {
    id: 2,
    name: "Pre-Kinder",
    minAge: 4,
    maxAge: 5,
    description:
      "Hands-on learning that builds foundational literacy, numeracy, and creativity through guided play.",
    image: "/image/pre-kinder.avif",
  },
  {
    id: 3,
    name: "Kinder",
    minAge: 5,
    maxAge: 6,
    description:
      "A Christ-centered program that prepares young learners for elementary with confidence and joy.",
    image: "/image/kinder.jpg",
  },
];

const VIDEO_DATA = {
  videoTitle: "Grace Christian Learning Hymn",
  videoSrc: "/video/hymn.mp4",
};

const WHY_PARENTS_REASONS = [
  "We help every child grow with confidence and values",
  "Focused on both education and character formation",
  "Safe, supportive, and child-centered education",
  "A safe, joyful, and structured experience",
  "Engaging activities for meaningful learning",
].map((text, i) => ({ id: i + 1, text }));

const MISSION_DATA = {
  title: "Raising Godly and Lifelong Learners",
  description:
    "To be a Christ-centered preschool that inspires young children to grow in faith, character, knowledge, and confidence. We envision a generation of lifelong learners who love God, respect others, and are equipped with the skills and values needed to succeed in school and in life.",
};

const VISION_DATA = {
  title: "Nurturing Faith, Excellence, and Character",
  description:
    "We envision a community where every child is empowered to reach their full potential—academically, spiritually, and emotionally—as they grow into confident, compassionate, and responsible individuals prepared for a lifetime of learning and service.",
};

const CHILDREN_ACTIVITIES = [
  {
    id: 1,
    title: "Cognitive Development",
    description:
      "Learning through play strengthens problem-solving skills, memory, and the ability to think creatively and critically.",
    image: "/image/nursery.jpg",
  },
  {
    id: 2,
    title: "Physical Health",
    description:
      "Active play and movement activities build strong muscles, coordination, and establish healthy habits for life.",
    image: "/image/kinder.jpg",
  },
  {
    id: 3,
    title: "Social Skills",
    description:
      "Group activities teach sharing, cooperation, turn-taking, and empathy—essential skills for healthy relationships.",
    image: "/image/p2.jpg",
  },
  {
    id: 4,
    title: "Spiritual Growth",
    description:
      "Faith-based activities and Christian values help children develop a strong moral foundation rooted in love and kindness.",
    image: "/image/bb.jpg",
  },
  {
    id: 5,
    title: "Creative Expression",
    description:
      "Art, music, and imaginative play encourage children to express ideas, build confidence, and celebrate their unique creativity.",
    image: "/image/pre-kinder.avif",
  },
  {
    id: 6,
    title: "Language & Literacy",
    description:
      "Stories, songs, and conversations help children build vocabulary, express themselves, and discover the joy of reading.",
    image: "/image/kinder.jpg",
  },
  {
    id: 7,
    title: "Nature Discovery",
    description:
      "Hands-on exploration nurtures curiosity as children observe nature, ask questions, and learn about the world around them.",
    image: "/image/sb.jpg",
  },
  {
    id: 8,
    title: "Music & Rhythm",
    description:
      "Singing, dancing, and rhythm games develop listening skills, coordination, self-expression, and joyful confidence.",
    image: "/image/money.jpg",
  },
];

const SECONDARY_ITEMS = [
  { label: "Homepage", key: "home" },
  { label: "Mission / Vision", key: "mission-vision" },
  { label: "Activities", key: "activities" },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");

  const [bannerData, setBannerData] = useState(BANNER_DATA);
  const [programs, setPrograms] = useState(ACADEMIC_PROGRAMS);
  const [selectedProgram, setSelectedProgram] = useState("Nursery");

  const [bannerEditOpen, setBannerEditOpen] = useState(false);
  const [bannerForm, setBannerForm] = useState(BANNER_DATA);

  const [removeProgram, setRemoveProgram] = useState(false);

  const [addProgramOpen, setAddProgramOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    gradeLevel: "",
    minAge: "",
    maxAge: "",
    image: "",
    description: "",
  });

  const [editProgramOpen, setEditProgramOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [reasons, setReasons] = useState(WHY_PARENTS_REASONS);

  const [addReasonOpen, setAddReasonOpen] = useState(false);
  const [addReasonText, setAddReasonText] = useState("");

  const [editReasonOpen, setEditReasonOpen] = useState(false);
  const [editReasonText, setEditReasonText] = useState("");
  const [editingReason, setEditingReason] = useState(null);

  const [removeReason, setRemoveReason] = useState(null);

  const [videoData, setVideoData] = useState(VIDEO_DATA);
  const [editVideoOpen, setEditVideoOpen] = useState(false);
  const [videoForm, setVideoForm] = useState(VIDEO_DATA);

  const [missionData, setMissionData] = useState(MISSION_DATA);
  const [missionEditOpen, setMissionEditOpen] = useState(false);
  const [missionForm, setMissionForm] = useState(MISSION_DATA);

  const [visionData, setVisionData] = useState(VISION_DATA);
  const [visionEditOpen, setVisionEditOpen] = useState(false);
  const [visionForm, setVisionForm] = useState(VISION_DATA);

  const openBannerEdit = () => {
    setBannerForm(bannerData);
    setBannerEditOpen(true);
  };

  const saveBanner = () => {
    setBannerData(bannerForm);
    setBannerEditOpen(false);
  };

  const openAddProgram = () => {
    setAddForm({
      gradeLevel: "",
      minAge: "",
      maxAge: "",
      image: "",
      description: "",
    });
    setAddProgramOpen(true);
  };

  const confirmRemoveProgram = () => {
    const remaining = programs.filter((p) => p.name !== selectedProgram);

    setPrograms(remaining);
    setSelectedProgram(remaining[0]?.name || "");
    setRemoveProgram(false);
  };

  const addProgram = () => {
    const nextId = programs.length
      ? Math.max(...programs.map((p) => p.id)) + 1
      : 1;

    setPrograms((prev) => [
      ...prev,
      {
        id: nextId,
        name: addForm.gradeLevel,
        minAge: Number(addForm.minAge) || 0,
        maxAge: Number(addForm.maxAge) || 0,
        image: addForm.image,
        description: addForm.description,
      },
    ]);

    setAddProgramOpen(false);
  };

  const openEditProgram = () => {
    const active = programs.find((p) => p.name === selectedProgram) || programs[0];

    setEditForm({
      gradeLevel: active?.name || "",
      minAge: String(active?.minAge ?? ""),
      maxAge: String(active?.maxAge ?? ""),
      image: active?.image || "",
      description: active?.description || "",
    });

    setEditProgramOpen(true);
  };

  const saveEditProgram = () => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.name === selectedProgram
          ? {
              ...p,
              name: editForm.gradeLevel,
              minAge: Number(editForm.minAge) || 0,
              maxAge: Number(editForm.maxAge) || 0,
              image: editForm.image,
              description: editForm.description,
            }
          : p
      )
    );

    setEditProgramOpen(false);
  };

  const openAddReason = () => {
    setAddReasonText("");
    setAddReasonOpen(true);
  };

  const addReason = () => {
    const nextId = reasons.length
      ? Math.max(...reasons.map((r) => r.id)) + 1
      : 1;

    setReasons((prev) => [...prev, { id: nextId, text: addReasonText }]);

    setAddReasonOpen(false);
  };

  const openEditReason = (reason) => {
    setEditingReason(reason);
    setEditReasonText(reason.text);
    setEditReasonOpen(true);
  };

  const confirmRemoveReason = () => {
    setReasons((prev) => prev.filter((r) => r.id !== removeReason.id));
    setRemoveReason(null);
  };

  const saveEditReason = () => {
    setReasons((prev) =>
      prev.map((r) =>
        r.id === editingReason.id ? { ...r, text: editReasonText } : r
      )
    );

    setEditReasonOpen(false);
    setEditingReason(null);
  };

  const openEditVideo = () => {
    setVideoForm(videoData);
    setEditVideoOpen(true);
  };

  const saveEditVideo = () => {
    setVideoData(videoForm);
    setEditVideoOpen(false);
  };

  const openRemoveReason = (reason) => setRemoveReason(reason);

  const openEditMission = () => {
    setMissionForm(missionData);
    setMissionEditOpen(true);
  };

  const saveEditMission = () => {
    setMissionData(missionForm);
    setMissionEditOpen(false);
  };

  const openEditVision = () => {
    setVisionForm(visionData);
    setVisionEditOpen(true);
  };

  const saveEditVision = () => {
    setVisionData(visionForm);
    setVisionEditOpen(false);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-[#ebe9e4] font-[Poppins]">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <nav className="flex w-full flex-wrap items-center gap-3 sm:gap-5">
        {SECONDARY_ITEMS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActiveTab(item.key)}
            className={`inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-full px-3 text-[9px] overflow-x-auto font-[Poppins] transition sm:text-xs ${
              activeTab === item.key
                ? "bg-swamp-green text-white"
                : "text-gray-600 hover:text-swamp-green"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto">
        {activeTab === "home" && (
          <div className="grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2">
            <Banner
              admissionStatus={bannerData.admissionStatus}
              schoolYear={bannerData.schoolYear}
              title={bannerData.title}
              quote={bannerData.quote}
              onEdit={openBannerEdit}
            />

            <AcademicPrograms
              programs={programs}
              selectedProgram={selectedProgram}
              onProgramChange={setSelectedProgram}
              onEdit={openEditProgram}
              onAdd={openAddProgram}
              onRemove={() => setRemoveProgram(true)}
            />

            <VideoPresentation
              videoTitle={videoData.videoTitle}
              videoSrc={videoData.videoSrc}
              onEdit={openEditVideo}
            />

            <WhyParentsChooseUs
              reasons={reasons}
              onAdd={openAddReason}
              onEdit={openEditReason}
              onRemove={openRemoveReason}
            />
          </div>
        )}

        {activeTab === "mission-vision" && (
          <div className="grid grid-cols-1 gap-4 md:auto-rows-fr md:grid-cols-2">
            <Mission
              title={missionData.title}
              description={missionData.description}
              onEdit={openEditMission}
            />

            <Vision
              title={visionData.title}
              description={visionData.description}
              onEdit={openEditVision}
            />
          </div>
        )}

        {activeTab === "activities" && (
          <div className="grid auto-rows-fr grid-cols-1 content-start gap-4 pb-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {CHILDREN_ACTIVITIES.map((activity) => (
              <ChildrenActivityCard
                key={activity.id}
                title={activity.title}
                description={activity.description}
                image={activity.image}
              />
            ))}
          </div>
        )}
      </div>

      <EditBannerModal
        isOpen={bannerEditOpen}
        admissionStatus={bannerForm.admissionStatus}
        schoolYear={bannerForm.schoolYear}
        title={bannerForm.title}
        quote={bannerForm.quote}
        onChange={(key, value) =>
          setBannerForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setBannerEditOpen(false)}
        onSave={saveBanner}
      />

      <AddProgramModal
        isOpen={addProgramOpen}
        gradeLevel={addForm.gradeLevel}
        minAge={addForm.minAge}
        maxAge={addForm.maxAge}
        image={addForm.image}
        description={addForm.description}
        onChange={(key, value) =>
          setAddForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setAddProgramOpen(false)}
        onAdd={addProgram}
      />

      <EditProgramModal
        isOpen={editProgramOpen}
        gradeLevel={editForm.gradeLevel}
        minAge={editForm.minAge}
        maxAge={editForm.maxAge}
        image={editForm.image}
        description={editForm.description}
        onChange={(key, value) =>
          setEditForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setEditProgramOpen(false)}
        onSave={saveEditProgram}
      />

      <EditVideoModal
        isOpen={editVideoOpen}
        videoTitle={videoForm.videoTitle}
        videoSrc={videoForm.videoSrc}
        onChange={(key, value) =>
          setVideoForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setEditVideoOpen(false)}
        onSave={saveEditVideo}
      />

      <AddReasonModal
        isOpen={addReasonOpen}
        reason={addReasonText}
        onChange={setAddReasonText}
        onClose={() => setAddReasonOpen(false)}
        onAdd={addReason}
      />

      <EditReasonModal
        isOpen={editReasonOpen}
        reason={editReasonText}
        onChange={setEditReasonText}
        onClose={() => {
          setEditReasonOpen(false);
          setEditingReason(null);
        }}
        onSave={saveEditReason}
      />

      <EditMissionModal
        isOpen={missionEditOpen}
        title={missionForm.title}
        description={missionForm.description}
        onChange={(key, value) =>
          setMissionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setMissionEditOpen(false)}
        onSave={saveEditMission}
      />

      <EditVisionModal
        isOpen={visionEditOpen}
        title={visionForm.title}
        description={visionForm.description}
        onChange={(key, value) =>
          setVisionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setVisionEditOpen(false)}
        onSave={saveEditVision}
      />

      <RemoveModal
        isOpen={removeProgram}
        title="Remove Program"
        itemName={selectedProgram}
        onClose={() => setRemoveProgram(false)}
        onRemove={confirmRemoveProgram}
      />

      <RemoveModal
        isOpen={removeReason !== null}
        title="Remove Reason"
        message={`Clicking "Remove" will remove this reason and all of its information.`}
        onClose={() => setRemoveReason(null)}
        onRemove={confirmRemoveReason}
      />
    </div>
  );
};

export default Home;