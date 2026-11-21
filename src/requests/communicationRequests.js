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

// =====================
// NOTIFICATION RECIPIENTS
// =====================

export const getNotificationRecipients = async ({
  audience,
  payment_option_id,
}) => {
  const response = await API.get("/api/communications/recipients", {
    params: { audience, payment_option_id },
  });

  return response.data;
};

// =====================
// TUITION REMINDERS
// =====================

export const getTuitionReminders = async () => {
  const response = await API.get("/api/communications/tuition-reminders");

  return response.data;
};

export const getTuitionReminderById = async (reminder_id) => {
  const response = await API.get(
    `/api/communications/tuition-reminders/${reminder_id}`,
  );

  return response.data;
};

export const createTuitionReminder = async (data) => {
  const response = await API.post("/api/communications/tuition-reminders", data);

  return response.data;
};

export const updateTuitionReminder = async (reminder_id, data) => {
  const response = await API.put(
    `/api/communications/tuition-reminders/${reminder_id}`,
    data,
  );

  return response.data;
};

export const deleteTuitionReminder = async (reminder_id) => {
  const response = await API.delete(
    `/api/communications/tuition-reminders/${reminder_id}`,
  );

  return response.data;
};
