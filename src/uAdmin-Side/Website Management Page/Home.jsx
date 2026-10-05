import React, { useState, useEffect } from "react";
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
import AddChildrenActivityModal from "../../Components/AdminComponents/Website Management/Home/AddChildrenActivityModal";
import EditChildrenActivityModal from "../../Components/AdminComponents/Website Management/Home/EditChildrenActivity";
import RemoveChildrenActivityModal from "../../Components/AdminComponents/Website Management/Home/RemoveChildrenActivityModal";

import {
  editBanner,
  getBanner,
  getAcademicPrograms,
  getGradeLevels,
  addAcademicProgram,
  editAcademicProgram,
  deleteAcademicProgram,
  getVideo,
  editVideo,
  getReasons,
  editReason as editReasonApi,
  addReason as addReasonApi,
  deleteReason as deleteReasonApi,
  getMissionVision,
  editMissionVision,
  getChildrenActivities,
  addChildrenActivity,
  editChildrenActivity,
  deleteChildrenActivity,
} from "../../requests/homepageRequests";

const SECONDARY_ITEMS = [
  { label: "Homepage", key: "home" },
  { label: "Mission / Vision", key: "mission-vision" },
  { label: "Activities", key: "activities" },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState("home");

  const [bannerData, setBannerData] = useState(null);
  const [bannerEditOpen, setBannerEditOpen] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    quote: "",
    image: null,
  });

  const [programs, setPrograms] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [removeProgram, setRemoveProgram] = useState(false);

  const [addProgramOpen, setAddProgramOpen] = useState(false);
  const [addForm, setAddForm] = useState({
    gradeLevel: "",
    minAge: "",
    maxAge: "",
    image: null,
    description: "",
  });

  const [editProgramOpen, setEditProgramOpen] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [reasons, setReasons] = useState([]);
  const [addReasonOpen, setAddReasonOpen] = useState(false);
  const [addReasonText, setAddReasonText] = useState("");

  const [editReasonOpen, setEditReasonOpen] = useState(false);
  const [editReasonText, setEditReasonText] = useState("");
  const [editingReason, setEditingReason] = useState(null);

  const [removeReason, setRemoveReason] = useState(null);

  const [videoData, setVideoData] = useState(null);
  const [editVideoOpen, setEditVideoOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({
    videoTitle: "",
    videoSrc: "",
    video: null,
  });

  const [missionData, setMissionData] = useState(null);
  const [missionEditOpen, setMissionEditOpen] = useState(false);
  const [missionForm, setMissionForm] = useState({
    title: "",
    description: "",
  });

  const [visionData, setVisionData] = useState(null);
  const [visionEditOpen, setVisionEditOpen] = useState(false);
  const [visionForm, setVisionForm] = useState({
    title: "",
    description: "",
  });

  const [childrenActivities, setChildrenActivities] = useState([]);

  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const [editActivityOpen, setEditActivityOpen] = useState(false);
  const [removeActivityOpen, setRemoveActivityOpen] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [activityLoading, setActivityLoading] = useState(false);

  const [addActivityForm, setAddActivityForm] = useState({
    title: "",
    description: "",
    image: null,
  });

  const formatAcademicPrograms = (programData) => {
    return programData.map((program) => ({
      id: program.program_id,
      gradeLevelId: program.grade_level_id,
      name: program.grade_level_name,
      minAge: program.min_age,
      maxAge: program.max_age,
      image: program.image_url,
      description: program.description,
    }));
  };

  const formatReasons = (reasonData) => {
    return reasonData.map((reason) => ({
      id: reason.reason_id,
      text: reason.reasons,
    }));
  };

  useEffect(() => {
    const loadBanner = async () => {
      try {
        const data = await getBanner();

        setBannerData(data);
      } catch (error) {
        console.error("Failed to load banner:", error);
      }
    };

    loadBanner();
  }, []);

  useEffect(() => {
    const loadAcademicPrograms = async () => {
      try {
        const [programData, gradeLevelData] = await Promise.all([
          getAcademicPrograms(),
          getGradeLevels(),
        ]);

        setPrograms(formatAcademicPrograms(programData));
        setGradeLevels(gradeLevelData);

        if (programData.length > 0) {
          setSelectedProgram(programData[0].grade_level_name);
        } else {
          setSelectedProgram("");
        }
      } catch (error) {
        console.error("Failed to load academic programs:", error);
      }
    };

    loadAcademicPrograms();
  }, []);

  useEffect(() => {
    const loadVideo = async () => {
      try {
        const data = await getVideo();

        if (data.length > 0) {
          const video = data[0];

          setVideoData({
            id: video.video_id,
            videoTitle: video.video_title,
            videoSrc: video.videourl,
          });
        }
      } catch (error) {
        console.error("Failed to load video:", error);
      }
    };

    loadVideo();
  }, []);

  useEffect(() => {
    const loadReasons = async () => {
      try {
        const data = await getReasons();

        setReasons(
          data.map((reason) => ({
            id: reason.reason_id,
            text: reason.reasons,
          })),
        );
      } catch (error) {
        console.error("Failed to load reasons:", error);
      }
    };

    loadReasons();
  }, []);

  useEffect(() => {
    const loadMissionVision = async () => {
      try {
        const data = await getMissionVision();

        if (data.length > 0) {
          const missionVision = data[0];

          setMissionData({
            title: missionVision.mission_title,
            description: missionVision.mission_body,
          });

          setVisionData({
            title: missionVision.vision_title,
            description: missionVision.vision_body,
          });
        }
      } catch (error) {
        console.error("Failed to load mission and vision:", error);
      }
    };

    loadMissionVision();
  }, []);

  useEffect(() => {
    const loadChildrenActivities = async () => {
      try {
        const data = await getChildrenActivities();

        setChildrenActivities(data.r);
      } catch (error) {
        console.error("Failed to load children activities:", error);
      }
    };

    loadChildrenActivities();
  }, []);

  const openBannerEdit = () => {
    if (!bannerData) return;

    setBannerForm({
      title: bannerData.banner_title || "",
      quote: bannerData.banner_quote || "",
      image: null,
    });

    setBannerEditOpen(true);
  };

  const saveBanner = async () => {
    try {
      const formData = new FormData();

      formData.append("banner_title", bannerForm.title);
      formData.append("banner_quote", bannerForm.quote);

      if (bannerForm.image) {
        formData.append("banner_image", bannerForm.image);
      }

      await editBanner(formData);

      const updatedBanner = await getBanner();

      setBannerData(updatedBanner);
      setBannerEditOpen(false);
    } catch (error) {
      console.error("Failed to update banner:", error);
    }
  };

  const openAddProgram = () => {
    setAddForm({
      gradeLevel: "",
      minAge: "",
      maxAge: "",
      image: null,
      description: "",
    });

    setAddProgramOpen(true);
  };

  const confirmRemoveProgram = async () => {
    try {
      const active = programs.find(
        (program) => program.name === selectedProgram,
      );

      if (!active) return;

      await deleteAcademicProgram(active.id);

      const updatedPrograms = await getAcademicPrograms();

      const formattedPrograms = formatAcademicPrograms(updatedPrograms);

      setPrograms(formattedPrograms);

      setSelectedProgram(
        formattedPrograms.length > 0 ? formattedPrograms[0].name : "",
      );

      setRemoveProgram(false);
    } catch (error) {
      console.error("Failed to delete academic program:", error);
    }
  };

  const addProgram = async () => {
    try {
      const formData = new FormData();

      formData.append("grade_level_id", addForm.gradeLevel);
      formData.append("min_age", addForm.minAge);
      formData.append("max_age", addForm.maxAge);
      formData.append("description", addForm.description);

      if (addForm.image) {
        formData.append("image", addForm.image);
      }

      await addAcademicProgram(formData);

      const updatedPrograms = await getAcademicPrograms();

      const formattedPrograms = formatAcademicPrograms(updatedPrograms);

      setPrograms(formattedPrograms);

      if (formattedPrograms.length > 0 && !selectedProgram) {
        setSelectedProgram(formattedPrograms[0].name);
      }

      setAddProgramOpen(false);
    } catch (error) {
      console.error("Failed to add academic program:", error);
    }
  };

  const openEditProgram = () => {
    const active =
      programs.find((program) => program.name === selectedProgram) ||
      programs[0];

    if (!active) return;

    setEditForm({
      programId: active.id,
      gradeLevel: String(active.gradeLevelId),
      minAge: String(active.minAge ?? ""),
      maxAge: String(active.maxAge ?? ""),
      image: null,
      description: active.description || "",
    });

    setEditProgramOpen(true);
  };

  const saveEditProgram = async () => {
    try {
      const formData = new FormData();

      formData.append("grade_level_id", editForm.gradeLevel);
      formData.append("min_age", editForm.minAge);
      formData.append("max_age", editForm.maxAge);
      formData.append("description", editForm.description);

      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      await editAcademicProgram(editForm.programId, formData);

      const updatedPrograms = await getAcademicPrograms();

      const formattedPrograms = formatAcademicPrograms(updatedPrograms);

      setPrograms(formattedPrograms);

      setEditProgramOpen(false);
    } catch (error) {
      console.error("Failed to update academic program:", error);
    }
  };

  const openAddReason = () => {
    setAddReasonText("");
    setAddReasonOpen(true);
  };

  const addReason = async () => {
    try {
      await addReasonApi({
        reasons: addReasonText,
      });

      const updatedReasons = await getReasons();

      setReasons(
        updatedReasons.map((reason) => ({
          id: reason.reason_id,
          text: reason.reasons,
        })),
      );

      setAddReasonText("");
      setAddReasonOpen(false);
    } catch (error) {
      console.error("Failed to add reason:", error);
    }
  };

  const openEditReason = (reason) => {
    setEditingReason(reason);
    setEditReasonText(reason.text);
    setEditReasonOpen(true);
  };

  const confirmRemoveReason = async () => {
    try {
      await deleteReasonApi(removeReason.id);

      const updatedReasons = await getReasons();

      setReasons(
        updatedReasons.map((reason) => ({
          id: reason.reason_id,
          text: reason.reasons,
        })),
      );

      setRemoveReason(null);
    } catch (error) {
      console.error("Failed to delete reason:", error);
    }
  };

  const saveEditReason = async () => {
    try {
      await editReasonApi(editingReason.id, {
        reasons: editReasonText,
      });

      const updatedReasons = await getReasons();

      setReasons(
        updatedReasons.map((reason) => ({
          id: reason.reason_id,
          text: reason.reasons,
        })),
      );

      setEditReasonOpen(false);
      setEditingReason(null);
    } catch (error) {
      console.error("Failed to update reason:", error);
    }
  };

  const openEditVideo = () => {
    if (!videoData) return;

    setVideoForm({
      videoTitle: videoData.videoTitle || "",
      video: null,
    });

    setEditVideoOpen(true);
  };

  const saveEditVideo = async () => {
    try {
      const formData = new FormData();

      formData.append("video_title", videoForm.videoTitle);

      if (videoForm.video) {
        formData.append("video", videoForm.video);
      }

      await editVideo(formData);

      const updatedVideo = await getVideo();

      if (updatedVideo.length > 0) {
        const video = updatedVideo[0];

        setVideoData({
          videoTitle: video.video_title,
          videoSrc: video.videourl,
        });
      }

      setEditVideoOpen(false);
    } catch (error) {
      console.error("Failed to update video:", error);
    }
  };

  const openRemoveReason = (reason) => setRemoveReason(reason);

  const openEditMission = () => {
    if (!missionData) return;

    setMissionForm(missionData);
    setMissionEditOpen(true);
  };

  const saveEditMission = async () => {
    try {
      await editMissionVision({
        mission_title: missionForm.title,
        mission_body: missionForm.description,
        vision_title: visionData.title,
        vision_body: visionData.description,
      });

      const updatedData = await getMissionVision();

      if (updatedData.length > 0) {
        const missionVision = updatedData[0];

        setMissionData({
          title: missionVision.mission_title,
          description: missionVision.mission_body,
        });

        setVisionData({
          title: missionVision.vision_title,
          description: missionVision.vision_body,
        });
      }

      setMissionEditOpen(false);
    } catch (error) {
      console.error("Failed to update mission:", error);
    }
  };

  const openEditVision = () => {
    if (!visionData) return;

    setVisionForm(visionData);
    setVisionEditOpen(true);
  };

  const saveEditVision = async () => {
    try {
      await editMissionVision({
        mission_title: missionData.title,
        mission_body: missionData.description,
        vision_title: visionForm.title,
        vision_body: visionForm.description,
      });

      const updatedData = await getMissionVision();

      if (updatedData.length > 0) {
        const missionVision = updatedData[0];

        setMissionData({
          title: missionVision.mission_title,
          description: missionVision.mission_body,
        });

        setVisionData({
          title: missionVision.vision_title,
          description: missionVision.vision_body,
        });
      }

      setVisionEditOpen(false);
    } catch (error) {
      console.error("Failed to update vision:", error);
    }
  };

  const openAddActivity = () => {
    setAddActivityForm({
      title: "",
      description: "",
      image: null,
    });

    setAddActivityOpen(true);
  };

  const addActivity = async (form) => {
    try {
      setActivityLoading(true);

      const formData = new FormData();

      formData.append("activity_title", form.title);
      formData.append("activity_description", form.description);

      if (form.image) {
        formData.append("activityImage", form.image);
      }

      await addChildrenActivity(formData);

      const updatedData = await getChildrenActivities();

      setChildrenActivities(updatedData.r);

      setAddActivityOpen(false);
    } catch (error) {
      console.error("Failed to add children activity:", error);
    } finally {
      setActivityLoading(false);
    }
  };

  const openEditActivity = (activity) => {
    setSelectedActivity(activity);
    setEditActivityOpen(true);
  };

  const editActivity = async (data) => {
    try {
      setActivityLoading(true);

      const formData = new FormData();

      formData.append("activity_title", data.activity_title);
      formData.append("activity_description", data.activity_description);

      if (data.activity_image) {
        formData.append("activityImage", data.activity_image);
      }

      await editChildrenActivity(data.activity_id, formData);

      const updatedData = await getChildrenActivities();

      setChildrenActivities(updatedData.r);

      setEditActivityOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error("Failed to update children activity:", error);
    } finally {
      setActivityLoading(false);
    }
  };

  const openRemoveActivity = (activity) => {
    setSelectedActivity(activity);
    setRemoveActivityOpen(true);
  };

  const removeActivity = async (activityId) => {
    try {
      setActivityLoading(true);

      await deleteChildrenActivity(activityId);

      const updatedData = await getChildrenActivities();

      setChildrenActivities(updatedData.r);

      setRemoveActivityOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error("Failed to remove children activity:", error);
    } finally {
      setActivityLoading(false);
    }
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
            {bannerData && (
              <Banner
                admissionStatus={
                  bannerData.enrollment_status === "open" ? "Open" : "Closed"
                }
                schoolYear={bannerData.school_year}
                title={bannerData.banner_title}
                quote={bannerData.banner_quote}
                image={bannerData.banner_image}
                onEdit={openBannerEdit}
              />
            )}

            <AcademicPrograms
              programs={programs}
              selectedProgram={selectedProgram}
              onProgramChange={setSelectedProgram}
              onEdit={openEditProgram}
              onAdd={openAddProgram}
              onRemove={() => setRemoveProgram(true)}
            />

            {videoData && (
              <VideoPresentation
                videoTitle={videoData.videoTitle}
                videoSrc={videoData.videoSrc}
                onEdit={openEditVideo}
              />
            )}

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
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-swamp-green sm:text-base">
                Children Activities
              </h2>

              <button
                type="button"
                onClick={openAddActivity}
                className="rounded-full bg-swamp-green px-5 py-2 text-[9px] font-medium text-white transition hover:bg-lime-green sm:text-xs"
              >
                Add
              </button>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 content-start gap-4 pb-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {childrenActivities.map((activity) => (
                <ChildrenActivityCard
                  key={activity.activity_id}
                  title={activity.activity_title}
                  description={activity.activity_description}
                  image={activity.activity_image}
                  onEdit={() => openEditActivity(activity)}
                  onRemove={() => openRemoveActivity(activity)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <EditBannerModal
        isOpen={bannerEditOpen}
        title={bannerForm.title}
        quote={bannerForm.quote}
        image={bannerForm.image}
        onChange={(key, value) =>
          setBannerForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setBannerEditOpen(false)}
        onSave={saveBanner}
      />

      <AddProgramModal
        isOpen={addProgramOpen}
        gradeLevels={gradeLevels}
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
        gradeLevels={gradeLevels}
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
        video={videoForm.video}
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

      <AddChildrenActivityModal
        isOpen={addActivityOpen}
        onClose={() => setAddActivityOpen(false)}
        onSubmit={addActivity}
        loading={activityLoading}
      />

      <EditChildrenActivityModal
        isOpen={editActivityOpen}
        activity={selectedActivity}
        onClose={() => {
          setEditActivityOpen(false);
          setSelectedActivity(null);
        }}
        onSubmit={editActivity}
        loading={activityLoading}
      />

      <RemoveChildrenActivityModal
        isOpen={removeActivityOpen}
        activity={selectedActivity}
        onClose={() => {
          setRemoveActivityOpen(false);
          setSelectedActivity(null);
        }}
        onConfirm={removeActivity}
        loading={activityLoading}
      />
    </div>
  );
};

export default Home;
