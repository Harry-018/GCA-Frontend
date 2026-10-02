import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import NotificationTable from "../../Components/AdminComponents/Communication/Notification/NotificationTable";
import SendNotificationModal from "../../Components/AdminComponents/Communication/Notification/SendNotificationModal";

const DEFAULT_NOTIFICATIONS = [
  {
    id: 1,
    reminder: "Tuition Reminder - Paylite",
    sentBy: "Admin",
    sentTo: "Parent",
    sentAt: "Jul 27, 2028",
    status: "Sent",
  },
  {
    id: 2,
    reminder: "Tuition Reminder - All-In",
    sentBy: "Admin",
    sentTo: "Parent",
    sentAt: "Jul 27, 2027",
    status: "Sent",
  },
  {
    id: 3,
    reminder: "Tuition Reminder - Paylite",
    sentBy: "Admin",
    sentTo: "Parent",
    sentAt: "Jul 27, 2026",
    status: "Sent",
  },
  {
    id: 4,
    reminder: "Tuition Reminder - All-In",
    sentBy: "Admin",
    sentTo: "Parent",
    sentAt: "Jul 27, 2025",
    status: "Sent",
  },
];

const Notification = ({
  notifications: initialNotifications = DEFAULT_NOTIFICATIONS,
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Notifications");
  const [isSendOpen, setIsSendOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleSend = ({ reminder, sentTo, paymentOption }) => {
    setNotifications((prev) => [
      {
        id: Date.now(),
        reminder: `${reminder} - ${paymentOption}`,
        sentBy: "Admin",
        sentTo,
        sentAt: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        status: "Sent",
      },
      ...prev,
    ]);

    setIsSendOpen(false);
  };

  return (
    <div className="flex min-h-0 flex-1 gap-4 cursor-default flex-col bg-[#ebe9e4] font-[Poppins]">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);

          if (tab === "Announcements") {
            navigate("/admin/communication");
          }
        }}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {/* Email Logs Header */}
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-sm font-medium text-[#91a77c]">
            Email Logs
          </h2>

          <button
            type="button"
            onClick={() => setIsSendOpen(true)}
            className="rounded-full bg-swamp-green px-5 py-2 text-[11px] font-[Poppins] text-white transition-colors hover:bg-[#7f966a]"
          >
            Send Notification
          </button>
        </div>

        <NotificationTable notifications={notifications} />
      </div>

      <SendNotificationModal
        isOpen={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        onSubmit={handleSend}
      />
    </div>
  );
};

export default Notification;