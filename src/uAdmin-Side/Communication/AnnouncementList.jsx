import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import AnnouncementCard from "../../Components/AdminComponents/Communication/Announcement/AnnouncementCard";
import AddAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/AddAnnouncementModal";
import EditAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/EditAnnouncementModal";
import RemoveAnnouncementModal from "../../Components/AdminComponents/Communication/Announcement/RemoveAnnouncementModal";

const YEAR_ANNOUNCEMENTS = {
  "Pre - School": [
    {
      id: 1,
      title: "AWARDING CEREMONY",
      postedDate: "June 20, 2026",
      greeting: "Dear [Team/Colleagues/Community],",
      description:
        "We are thrilled to announce that our Annual Awarding Ceremony is just around the corner! Join us as we celebrate excellence, hard work, and outstanding achievements within our organization.",
      details: [
        "Date: [Day of week], [Month, Date, Year]",
        "Time: [Start Time] to [End Time]",
        "Venue: [Location Name, Address] / [Virtual Platform Link]",
      ],
    },
    {
      id: 2,
      title: "BOOK FAIR",
      postedDate: "September 12, 2026",
      greeting: "Dear Parents and Guardians,",
      description:
        "Our school library will host its annual Book Fair! Explore a wide selection of books and encourage your children to build their own home library.",
      details: [
        "Date: Friday, September 12, 2026",
        "Time: 9:00 AM to 4:00 PM",
        "Venue: School Library",
      ],
    },
    {
      id: 3,
      title: "CHRISTMAS PROGRAM",
      postedDate: "December 18, 2026",
      greeting: "Dear [Team/Colleagues/Community],",
      description:
        "Get ready to spread the holiday cheer! Our Christmas Program will feature performances from students, a gift-giving activity, and a special visit from Santa.",
      details: [
        "Date: Friday, December 18, 2026",
        "Time: 5:00 PM to 8:00 PM",
        "Venue: School Gymnasium",
      ],
    },
  ],
  "Pre - Kinder": [
    {
      id: 1,
      title: "INTRAMURALS 2026",
      postedDate: "October 9, 2026",
      greeting: "Dear [Team/Colleagues/Community],",
      description:
        "Join us for a week full of fun, sports, and friendly competition! Cheer for your favorite teams and win exciting prizes.",
      details: [
        "Date: Monday - Friday, October 9-13, 2026",
        "Time: 8:00 AM to 5:00 PM",
        "Venue: School Grounds",
      ],
    },
    {
      id: 2,
      title: "SEMESTRAL BREAK",
      postedDate: "December 19, 2026",
      greeting: "Dear [Team/Colleagues/Community],",
      description:
        "Please be informed that classes will be suspended in observance of the semestral break. Enjoy the holiday and see you next semester!",
      details: ["Date: Saturday, December 19, 2026"],
    },
  ],
  Kinder: [
    {
      id: 1,
      title: "PARENTS-TEACHERS CONFERENCE",
      postedDate: "September 12, 2026",
      greeting: "Dear Parents and Guardians,",
      description:
        "We invite you to attend the upcoming Parents-Teachers Conference to discuss your child's progress and school activities for the current school year.",
      details: [
        "Date: Saturday, September 12, 2026",
        "Time: 9:00 AM to 12:00 PM",
        "Venue: Room 101, Kinder Building",
      ],
    },
  ],
};

const formatDate = (iso) => {
  const date = new Date(iso);
  return isNaN(date)
    ? iso
    : date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
};

const formatTime = (time) =>
  time
    ? new Date(`2000-01-01T${time}`).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

const AnnouncementList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "";
  const activeTab = "Announcements";
  const [announcements, setAnnouncements] = useState(
    YEAR_ANNOUNCEMENTS[year] ?? []
  );
  const [prevYear, setPrevYear] = useState(year);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [removeTarget, setRemoveTarget] = useState(null);

  if (year !== prevYear) {
    setPrevYear(year);
    setAnnouncements(YEAR_ANNOUNCEMENTS[year] ?? []);
  }

  const handleAdd = (data) => {
    const newAnnouncement = {
      id: Date.now(),
      title: data.title,
      postedDate: formatDate(data.eventDate),
      greeting: "Dear [Team/Colleagues/Community],",
      description: data.description,
      details: [
        `Date: ${formatDate(data.eventDate)}`,
        `Time: ${formatTime(data.startTime)} to ${formatTime(data.endTime)}`,
        `Venue: ${data.venue}`,
      ],
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
    setIsAddOpen(false);
  };

  const openEdit = (announcement) => {
    setEditTarget({
      ...announcement,
      eventDate: announcement.eventDate || announcement.postedDate,
    });
  };

  const handleSave = (data) => {
    setAnnouncements((prev) =>
      prev.map((announcement) => {
        if (announcement.id !== editTarget.id) return announcement;

        const updated = {
          ...announcement,
          title: data.title,
          description: data.description,
        };

        if (data.eventDate) {
          updated.postedDate = formatDate(data.eventDate);
          updated.details = [
            `Date: ${formatDate(data.eventDate)}`,
            `Time: ${formatTime(data.startTime)} to ${formatTime(data.endTime)}`,
            `Venue: ${data.venue}`,
          ];
        }

        return updated;
      })
    );
    setEditTarget(null);
  };

  const handleRemove = () => {
    setAnnouncements((prev) =>
      prev.filter((announcement) => announcement.id !== removeTarget.id)
    );
    setRemoveTarget(null);
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
            <h2>{year} :</h2>
            <span className="font-[Poppins] text-xs text-gray-600 sm:text-sm">
              Current Announcements
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

        {announcements.length === 0 ? (
          <div className="flex flex-1 items-center justify-center rounded-2xl border border-gray-200 bg-bone p-10 shadow-sm">
            <span className="font-[Poppins] text-sm text-gray-500">
              No announcements for this grade level.
            </span>
          </div>
        ) : (
          <div className="grid min-h-0 flex-1 content-start grid-cols-1 gap-3 overflow-y-auto thin-scrollbar sm:grid-cols-2 sm:gap-4">
            {announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                title={announcement.title}
                postedDate={announcement.postedDate}
                greeting={announcement.greeting}
                description={announcement.description}
                details={announcement.details}
                onEdit={() => openEdit(announcement)}
                onRemove={() => setRemoveTarget(announcement)}
              />
            ))}
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
        announcement={editTarget}
      />

      <RemoveAnnouncementModal
        isOpen={removeTarget !== null}
        onClose={() => setRemoveTarget(null)}
        onRemove={handleRemove}
        announcement={removeTarget}
      />
    </div>
  );
};

export default AnnouncementList;