import React, { useState, useEffect, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Header from "../../Components/AdminComponents/Website Management/Header";
import ResponsiveFilter from "../../Components/AdminComponents/ResponsiveFilter";
import Banner from "../../Components/AdminComponents/Website Management/Home/Banner";
import AcademicPrograms from "../../Components/AdminComponents/Website Management/Home/AcademicPrograms";
import VideoPresentation from "../../Components/AdminComponents/Website Management/Home/VideoPresentation";
import WhyParentsChooseUs from "../../Components/AdminComponents/Website Management/Home/WhyParentsChooseUs";
import Mission from "../../Components/AdminComponents/Website Management/Mission&Vision/Mission";
import Vision from "../../Components/AdminComponents/Website Management/Mission&Vision/Vision";
import ActivityCarouselCard from "../../Components/LandingpageComponents/Home/ActivityCarouselCard";
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
  getGradeLevels,
  addAcademicProgram,
  editAcademicProgram,
  deleteAcademicProgram,
  editVideo,
  editReason as editReasonApi,
  addReason as addReasonApi,
  deleteReason as deleteReasonApi,
  editMissionVision,
  addChildrenActivity,
  editChildrenActivity,
  deleteChildrenActivity,
} from "../../requests/homepageRequests";
import {
  useAcademicPrograms,
  useChildrenActivities,
  useHomepageBanner,
  useHomepageVideo,
  useMissionVision,
  useReasons,
} from "../../hooks/queries/useHomepageContent.js";
import { queryKeys } from "../../lib/queryKeys.js";

const SECONDARY_ITEMS = [
  { label: "Homepage", key: "home" },
  { label: "Mission / Vision", key: "mission-vision" },
  { label: "Activities", key: "activities" },
];

const asArray = (value) => (Array.isArray(value) ? value : []);

const formatAcademicPrograms = (programData) =>
  asArray(programData).map((program) => ({
    id: program.program_id,
    gradeLevelId: program.grade_level_id,
    name: program.grade_level_name,
    minAge: program.min_age,
    maxAge: program.max_age,
    image: program.image_url,
    description: program.description,
  }));

const formatReasons = (reasonData) =>
  asArray(reasonData).map((reason) => ({
    id: reason.reason_id,
    text: reason.reasons,
  }));

const Home = () => {
  const queryClient = useQueryClient();

  const { data: bannerData } = useHomepageBanner();
  const { data: academicPrograms } = useAcademicPrograms();
  const { data: childrenActivitiesData } = useChildrenActivities();
  const { data: missionVisionList } = useMissionVision();
  const { data: reasonsData } = useReasons();
  const { data: videoList } = useHomepageVideo();

  const [activeTab, setActiveTab] = useState("home");

  const [bannerEditOpen, setBannerEditOpen] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    quote: "",
    image: null,
  });

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

  const [addReasonOpen, setAddReasonOpen] = useState(false);
  const [addReasonText, setAddReasonText] = useState("");

  const [editReasonOpen, setEditReasonOpen] = useState(false);
  const [editReasonText, setEditReasonText] = useState("");
  const [editingReason, setEditingReason] = useState(null);

  const [removeReason, setRemoveReason] = useState(null);

  const [editVideoOpen, setEditVideoOpen] = useState(false);
  const [videoForm, setVideoForm] = useState({
    videoTitle: "",
    videoSrc: "",
    video: null,
  });

  const [missionEditOpen, setMissionEditOpen] = useState(false);
  const [missionForm, setMissionForm] = useState({
    title: "",
    description: "",
  });

  const [visionEditOpen, setVisionEditOpen] = useState(false);
  const [visionForm, setVisionForm] = useState({
    title: "",
    description: "",
  });

  const [addActivityOpen, setAddActivityOpen] = useState(false);
  const [editActivityOpen, setEditActivityOpen] = useState(false);
  const [removeActivityOpen, setRemoveActivityOpen] = useState(false);

  const [selectedActivity, setSelectedActivity] = useState(null);

  const [activityLoading, setActivityLoading] = useState(false);
  const [processing, setProcessing] = useState(false);

  const runWithProcessing = async (action) => {
    setProcessing(true);

    try {
      await action();
    } finally {
      setProcessing(false);
    }
  };

  const programs = useMemo(
    () => formatAcademicPrograms(academicPrograms),
    [academicPrograms],
  );

  const reasons = useMemo(() => formatReasons(reasonsData), [reasonsData]);

  const videoData = useMemo(() => {
    const video = asArray(videoList)[0];

    if (!video) return null;

    return {
      id: video.video_id,
      videoTitle: video.video_title,
      videoSrc: video.videourl,
    };
  }, [videoList]);

  const missionVision = asArray(missionVisionList)[0] ?? null;

  const missionData = missionVision
    ? {
        title: missionVision.mission_title,
        description: missionVision.mission_body,
      }
    : null;

  const visionData = missionVision
    ? {
        title: missionVision.vision_title,
        description: missionVision.vision_body,
      }
    : null;

  const childrenActivities = useMemo(
    () => asArray(childrenActivitiesData?.r),
    [childrenActivitiesData],
  );

  const selectedProgramName = selectedProgram || programs[0]?.name || "";

  useEffect(() => {
    let cancelled = false;

    const loadGradeLevels = async () => {
      try {
        const data = await getGradeLevels();

        if (!cancelled) {
          setGradeLevels(asArray(data));
        }
      } catch (error) {
        console.error("Failed to load grade levels:", error);
      }
    };

    loadGradeLevels();

    return () => {
      cancelled = true;
    };
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

      queryClient.invalidateQueries({ queryKey: queryKeys.homepage.banner });
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
        (program) => program.name === selectedProgramName,
      );

      if (!active) return;

      await deleteAcademicProgram(active.id);

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.academicPrograms,
      });
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.academicPrograms,
      });
      setAddProgramOpen(false);
    } catch (error) {
      console.error("Failed to add academic program:", error);
    }
  };

  const openEditProgram = () => {
    const active =
      programs.find((program) => program.name === selectedProgramName) ||
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.academicPrograms,
      });
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

      queryClient.invalidateQueries({ queryKey: queryKeys.homepage.reasons });
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

      queryClient.invalidateQueries({ queryKey: queryKeys.homepage.reasons });
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

      queryClient.invalidateQueries({ queryKey: queryKeys.homepage.reasons });
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

      queryClient.invalidateQueries({ queryKey: queryKeys.homepage.video });
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.missionVision,
      });
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.missionVision,
      });
      setVisionEditOpen(false);
    } catch (error) {
      console.error("Failed to update vision:", error);
    }
  };

  const openAddActivity = () => {
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.childrenActivities,
      });
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.childrenActivities,
      });
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

      queryClient.invalidateQueries({
        queryKey: queryKeys.homepage.childrenActivities,
      });
      setRemoveActivityOpen(false);
      setSelectedActivity(null);
    } catch (error) {
      console.error("Failed to remove children activity:", error);
    } finally {
      setActivityLoading(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-egg font-[Poppins]">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <nav aria-label="Website content sections" className="w-full sm:w-fit">
        <ResponsiveFilter
          options={SECONDARY_ITEMS.map((item) => ({
            value: item.key,
            label: item.label,
          }))}
          value={activeTab}
          onChange={setActiveTab}
          label="Website content section"
        />
      </nav>

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-1 pb-4">
        {activeTab === "home" && (
          <div className="flex flex-col gap-5">
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
              selectedProgram={selectedProgramName}
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
          <div className="flex flex-col gap-5">
            <Mission
              image="/image/bb.webp"
              overlay="/image/90.webp"
              label="Our Mission"
              title={missionData?.title || "Raising Godly and Lifelong Learners"}
              description={missionData?.description || ""}
              onEdit={openEditMission}
            />

            <Vision
              image="/image/nut.webp"
              overlay="/image/123.webp"
              label="Our Vision"
              title={visionData?.title || "Teach with Love, Faith, and Excellence"}
              description={visionData?.description || ""}
              onEdit={openEditVision}
            />
          </div>
        )}

        {activeTab === "activities" && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-[PoppinsBold] text-xs uppercase tracking-[0.2em] text-lime-dark">
                  Learn · Play · Grow
                </span>
                <h2 className="text-sm font-[PoppinsBold] text-parent-green sm:text-base">
                  Children Activities
                </h2>
              </div>

              <button
                type="button"
                onClick={openAddActivity}
                className="rounded-xl bg-parent-green px-4 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
              >
                Add activity
              </button>
            </div>

            <div className="grid auto-rows-fr grid-cols-1 content-start gap-4 pb-4 sm:grid-cols-2 lg:grid-cols-3">
              {childrenActivities.map((activity, index) => (
                <ActivityCarouselCard
                  key={activity.activity_id}
                  index={index}
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
        onSave={() => runWithProcessing(saveBanner)}
        loading={processing}
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
        onAdd={() => runWithProcessing(addProgram)}
        loading={processing}
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
        onSave={() => runWithProcessing(saveEditProgram)}
        loading={processing}
      />

      <EditVideoModal
        isOpen={editVideoOpen}
        videoTitle={videoForm.videoTitle}
        video={videoForm.video}
        onChange={(key, value) =>
          setVideoForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setEditVideoOpen(false)}
        onSave={() => runWithProcessing(saveEditVideo)}
        loading={processing}
      />

      <AddReasonModal
        isOpen={addReasonOpen}
        reason={addReasonText}
        onChange={setAddReasonText}
        onClose={() => setAddReasonOpen(false)}
        onAdd={() => runWithProcessing(addReason)}
        loading={processing}
      />

      <EditReasonModal
        isOpen={editReasonOpen}
        reason={editReasonText}
        onChange={setEditReasonText}
        onClose={() => {
          setEditReasonOpen(false);
          setEditingReason(null);
        }}
        onSave={() => runWithProcessing(saveEditReason)}
        loading={processing}
      />

      <EditMissionModal
        isOpen={missionEditOpen}
        title={missionForm.title}
        description={missionForm.description}
        onChange={(key, value) =>
          setMissionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setMissionEditOpen(false)}
        onSave={() => runWithProcessing(saveEditMission)}
        loading={processing}
      />

      <EditVisionModal
        isOpen={visionEditOpen}
        title={visionForm.title}
        description={visionForm.description}
        onChange={(key, value) =>
          setVisionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setVisionEditOpen(false)}
        onSave={() => runWithProcessing(saveEditVision)}
        loading={processing}
      />

      <RemoveModal
        isOpen={removeProgram}
        title="Remove Program"
        itemName={selectedProgramName}
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
