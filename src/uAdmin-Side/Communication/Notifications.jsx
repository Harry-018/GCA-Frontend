import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import SendNotificationModal from "../../Components/AdminComponents/Communication/Notification/SendNotificationModal";
import DataTable from "../../Components/DataTable.jsx";

import {
  getNotifications,
  getNotificationTemplates,
  getNotificationAudiences,
  getPaymentOptions,
  sendTuitionReminder,
} from "../../requests/communicationRequests.js";

const Notification = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Notifications");
  const [isSendOpen, setIsSendOpen] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [notificationTemplates, setNotificationTemplates] = useState([]);
  const [notificationAudiences, setNotificationAudiences] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await getNotifications();

      setNotifications(data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotificationAudiences = async () => {
    try {
      const data = await getNotificationAudiences();

      setNotificationAudiences(data);
    } catch (error) {
      console.error("Failed to fetch notification audiences:", error);
    }
  };

  const fetchNotificationTemplates = async () => {
    try {
      const data = await getNotificationTemplates();

      setNotificationTemplates(data);
    } catch (error) {
      console.error("Failed to fetch notification templates:", error);
    }
  };

  const fetchPaymentOptions = async () => {
    try {
      const data = await getPaymentOptions();

      setPaymentOptions(data);
    } catch (error) {
      console.error("Failed to fetch payment options:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    fetchNotificationTemplates();
    fetchNotificationAudiences();
    fetchPaymentOptions();
  }, []);

  const columns = [
    {
      accessorKey: "purpose_name",
      header: "REMINDER",
      cell: ({ getValue, row }) => {
        const purpose = getValue();
        const paymentOption = row.original.payment_option;

        return paymentOption ? `${purpose} - ${paymentOption}` : purpose || "—";
      },
    },

    {
      accessorKey: "created_by_first_name",
      header: "SENT BY",
      cell: ({ row }) => {
        const { created_by_first_name, created_by_last_name } = row.original;

        return (
          `${created_by_first_name || ""} ${
            created_by_last_name || ""
          }`.trim() || "—"
        );
      },
    },

    {
      accessorKey: "audience",
      header: "SENT TO",
      cell: ({ getValue }) => {
        const audience = getValue();

        if (!audience) return "—";

        return audience.charAt(0).toUpperCase() + audience.slice(1);
      },
    },

    {
      accessorKey: "sent_at",
      header: "SENT AT",
      cell: ({ getValue }) => {
        const value = getValue();

        if (!value) return "—";

        return new Date(value).toLocaleDateString("en-PH", {
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
      },
    },

    {
      accessorKey: "status",
      header: "STATUS",
      cell: () => (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs text-green-700">
          Sent
        </span>
      ),
    },
  ];

  const handleSend = async ({ templateId, sentTo, paymentOptionId }) => {
    try {
      await sendTuitionReminder({
        templateId,
        audience: sentTo,
        paymentOptionId,
      });

      await fetchNotifications();

      setIsSendOpen(false);
    } catch (error) {
      console.error("Failed to send notification:", error);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
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
          <h2 className="text-sm font-[PoppinsBold] text-[#91a77c]">
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

        <DataTable
          data={notifications}
          columns={columns}
          loading={loading}
          emptyMessage="No notification logs found."
          getRowId={(row) => String(row.notification_id)}
        />
      </div>

      <SendNotificationModal
        isOpen={isSendOpen}
        onClose={() => setIsSendOpen(false)}
        onSubmit={handleSend}
        paymentOptions={paymentOptions}
        notificationTemplates={notificationTemplates}
        notificationAudiences={notificationAudiences}
      />
    </div>
  );
};

export default Notification;
