import API from "../api/api.js";

// =====================
// ANNOUNCEMENTS
// =====================

export const getGradeLevelsWithAnnouncementCount = async () => {
  const response = await API.get("/api/communications");

  return response.data;
};

export const getAnnouncementsByGradeLevel = async (sy_grade_level_id) => {
  const response = await API.get(`/api/communications/${sy_grade_level_id}`);

  return response.data;
};

export const createAnnouncement = async (sy_grade_level_id, data) => {
  const response = await API.post(
    `/api/communications/${sy_grade_level_id}`,
    data,
  );

  return response.data;
};

export const editAnnouncement = async (
  sy_grade_level_id,
  announcement_id,
  data,
) => {
  const response = await API.put(
    `/api/communications/${sy_grade_level_id}/${announcement_id}`,
    data,
  );

  return response.data;
};

export const deleteAnnouncement = async (
  sy_grade_level_id,
  announcement_id,
) => {
  const response = await API.delete(
    `/api/communications/${sy_grade_level_id}/${announcement_id}`,
  );

  return response.data;
};

export const getNotifications = async () => {
  const response = await API.get("/api/communications/notifications");
  return response.data;
};

export const getPaymentOptions = async () => {
  const response = await API.get("/api/communications/payment-options");

  return response.data;
};

export const sendTuitionReminder = async ({
  templateId,
  audience,
  paymentOptionId,
}) => {
  const response = await API.post("/api/communications/notifications/send", {
    template_id: templateId,
    audience,
    payment_option_id: paymentOptionId,
  });

  return response.data;
};
export const getNotificationTemplates = async () => {
  const response = await API.get("/api/communications/notification-templates");

  return response.data;
};

export const getNotificationAudiences = async () => {
  const response = await API.get("/api/communications/notification-audiences");

  return response.data;
};
