import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import AnnouncementCard from "../../Components/AdminComponents/Communication/Announcement/AnnouncementCard";
import AddAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/AddAnnouncementModal";
import EditAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/EditAnnouncementModal";
import RemoveAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/RemoveAnnouncementModal";

import {
  getAnnouncementsByGradeLevel,
  createAnnouncement,
  editAnnouncement,
  deleteAnnouncement,
} from "../../requests/communicationRequests.js";

const AnnouncementList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const sy_grade_level_id = searchParams.get("sy_grade_level_id");

  const [activeTab] = useState("Announcements");

  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);

  const loadAnnouncements = async () => {
    if (!sy_grade_level_id) {
      setAnnouncements([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const data = await getAnnouncementsByGradeLevel(
        Number(sy_grade_level_id),
      );

      setAnnouncements(data);
    } catch (error) {
      console.error("Failed to load announcements:", error);

      alert(error.response?.data?.message || "Failed to load announcements.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, [sy_grade_level_id]);

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate)) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatAnnouncement = (announcement) => {
    return {
      id: announcement.announcement_id,
      title: announcement.title,
      postedDate: formatDate(announcement.posted_at),
      greeting: "Dear Parents and Guardians,",
      description: announcement.body,
      details: [],
      firstName: announcement.first_name,
      lastName: announcement.last_name,
    };
  };

  const handleAdd = async (data) => {
    if (!sy_grade_level_id) return;

    try {
      const response = await createAnnouncement(Number(sy_grade_level_id), {
        title: data.title,
        event_date: data.eventDate,
        start_time: data.startTime,
        end_time: data.endTime,
        venue: data.venue,
        body: data.description,
      });

      setAnnouncements((prev) => [response, ...prev]);

      setIsAddOpen(false);
    } catch (error) {
      console.error("Failed to create announcement:", error);

      alert(error.response?.data?.message || "Failed to create announcement.");
    }
  };

  const openEdit = (announcement) => {
    setEditTarget(announcement);
  };

  const handleSave = async (data) => {
    if (!editTarget || !sy_grade_level_id) return;

    try {
      const response = await editAnnouncement(
        Number(sy_grade_level_id),
        editTarget.announcement_id,
        {
          title: data.title,
          event_date: data.eventDate,
          start_time: data.startTime,
          end_time: data.endTime,
          venue: data.venue,
          body: data.description,
        },
      );

      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.announcement_id === editTarget.announcement_id
            ? {
                ...announcement,
                title: response.title,
                event_date: response.event_date,
                start_time: response.start_time,
                end_time: response.end_time,
                venue: response.venue,
                body: response.body,
              }
            : announcement,
        ),
      );

      setEditTarget(null);
    } catch (error) {
      console.error("Failed to edit announcement:", error);

      alert(error.response?.data?.message || "Failed to edit announcement.");
    }
  };

  const handleRemove = async () => {
    if (!removeTarget || !sy_grade_level_id) return;

    try {
      await deleteAnnouncement(
        Number(sy_grade_level_id),
        removeTarget.announcement_id,
      );

      setAnnouncements((prev) =>
        prev.filter(
          (announcement) =>
            announcement.announcement_id !== removeTarget.announcement_id,
        ),
      );

      setRemoveTarget(null);
    } catch (error) {
      console.error("Failed to delete announcement:", error);

      alert(error.response?.data?.message || "Failed to delete announcement.");
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          if (tab === "Notifications") {
            navigate("/admin/communication/notifications");
          } else {
            navigate("/admin/communication");
          }
        }}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 px-2 pb-4 sm:px-4">
        <div className="flex w-full flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-[PoppinsBold] text-sm text-swamp-green sm:text-base">
            <h2>Announcements</h2>

            <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
              S.Y 2026 - 2027
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-2">
            <button
              type="button"
              onClick={() => navigate("/admin/communication")}
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-[11px] text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={() => setIsAddOpen(true)}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 text-[11px] font-[PoppinsBold] text-white hover:bg-[#899d6d]"
            >
              + Add Announcement
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-bone p-10 shadow-sm">
            <span className="font-[Poppins] text-sm text-gray-500">
              Loading announcements...
            </span>
          </div>
        ) : announcements.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-bone p-10 shadow-sm">
            <span className="font-[Poppins] text-sm text-gray-500">
              No announcements for this grade level.
            </span>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 content-start grid-cols-1 gap-3 overflow-y-auto thin-scrollbar sm:grid-cols-2 sm:gap-4">
            {announcements.map((announcement) => {
              const formatted = formatAnnouncement(announcement);

              return (
                <AnnouncementCard
                  key={announcement.announcement_id}
                  title={formatted.title}
                  postedDate={formatted.postedDate}
                  greeting={formatted.greeting}
                  description={formatted.description}
                  details={formatted.details}
                  onEdit={() => openEdit(announcement)}
                  onRemove={() => setRemoveTarget(announcement)}
                />
              );
            })}
          </div>
        )}
      </div>

      <AddAnnouncementModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdd={handleAdd}
      />

      <EditAnnouncementModal
        isOpen={editTarget !== null}
        onClose={() => setEditTarget(null)}
        onSave={handleSave}
        announcement={
          editTarget
            ? {
                id: editTarget.announcement_id,
                title: editTarget.title,
                eventDate: editTarget.event_date,
                startTime: editTarget.start_time,
                endTime: editTarget.end_time,
                venue: editTarget.venue,
                description: editTarget.body,
              }
            : null
        }
      />

      <RemoveAnnouncementModal
        isOpen={removeTarget !== null}
        onClose={() => setRemoveTarget(null)}
        onRemove={handleRemove}
        announcement={
          removeTarget
            ? {
                id: removeTarget.announcement_id,
                title: removeTarget.title,
              }
            : null
        }
      />
    </div>
  );
};

export default AnnouncementList;
