import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellRing,
  CalendarDays,
  ChevronDown,
  Clock3,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";

import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import ResponsiveFilter from "../../Components/AdminComponents/ResponsiveFilter";
import {
  createTuitionReminder,
  deleteTuitionReminder,
  getPaymentOptions,
  getTuitionReminders,
  updateTuitionReminder,
} from "../../requests/communicationRequests.js";

const PAYMENT_TYPES = [
  { id: "fullcash", label: "Fullcash" },
  { id: "paylite", label: "Paylite" },
  { id: "allin", label: "All in" },
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (month) => {
  if (month === "February") return 29;
  if (["April", "June", "September", "November"].includes(month)) return 30;
  return 31;
};

const emptyReminders = () =>
  Object.fromEntries(PAYMENT_TYPES.map((type) => [type.id, []]));

const normalizeList = (response) =>
  Array.isArray(response) ? response : (response?.data ?? []);

const normalizeRecord = (response) => response?.data ?? response;

const mapReminder = (reminder, index) => ({
  id: reminder.reminder_id,
  name: `Reminder ${index + 1}`,
  dueMonth: MONTHS[Number(reminder.due_month) - 1] ?? "",
  dueDay: Number(reminder.due_day),
  daysBefore: Number(reminder.days_before),
});

const formatDueDate = (month, day) =>
  month && day ? `${month.slice(0, 3)} ${day}` : "No due date";

const ReminderModal = ({ reminder, onClose, onSave, serverError = "" }) => {
  const inputStyle =
    "w-full rounded-lg border border-parent-accent/25 bg-bone px-3 py-2 font-[Poppins] text-[9px] text-[#555555] outline-none focus:border-parent-accent sm:text-2xs";
  const labelStyle = "font-[Poppins] text-[9px] text-[#555555] sm:text-2xs";
  const [form, setForm] = useState(() => ({
    dueMonth: reminder?.dueMonth ?? "",
    dueDay: reminder?.dueDay ? String(reminder.dueDay) : "",
    daysBefore: String(reminder?.daysBefore ?? 7),
  }));
  const [error, setError] = useState("");
  const [isDayOpen, setIsDayOpen] = useState(false);
  const daySelectRef = useRef(null);

  useEffect(() => {
    if (!isDayOpen) return;

    const handlePointerDown = (event) => {
      if (!daySelectRef.current?.contains(event.target)) {
        setIsDayOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.stopImmediatePropagation();
        setIsDayOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isDayOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const daysBefore = Number(form.daysBefore);
    const dueDay = Number(form.dueDay);

    if (
      !form.dueMonth ||
      !Number.isInteger(dueDay) ||
      dueDay < 1 ||
      dueDay > getDaysInMonth(form.dueMonth) ||
      !Number.isInteger(daysBefore) ||
      daysBefore < 0
    ) {
      setError("Select a valid month and day, and enter a valid reminder lead time.");
      return;
    }

    onSave({ dueMonth: form.dueMonth, dueDay, daysBefore });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="reminder-modal-title"
        className="w-full max-w-md rounded-2xl border border-parent-accent/20 bg-bone p-5 shadow-lg"
      >
        <h2
          id="reminder-modal-title"
          className="text-[9px] font-[PoppinsBold] text-parent-green sm:text-sm"
        >
          {reminder
            ? "Edit Tuition Fee Notification Reminder"
            : "Add Tuition Fee Notification Reminder"}
        </h2>

        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelStyle} htmlFor="reminder-days-before">
                Send reminder:
              </label>
              <input
                id="reminder-days-before"
                type="number"
                min="0"
                step="1"
                required
                autoFocus
                value={form.daysBefore}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    daysBefore: event.target.value,
                  }))
                }
                className={inputStyle}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelStyle} htmlFor="reminder-due-month">
                Due month
              </label>
              <select
                id="reminder-due-month"
                required
                value={form.dueMonth}
                onChange={(event) => {
                  const dueMonth = event.target.value;
                  const day = Number(form.dueDay);

                  setIsDayOpen(false);
                  setForm((current) => ({
                    ...current,
                    dueMonth,
                    dueDay:
                      day > 0 && day <= getDaysInMonth(dueMonth)
                        ? current.dueDay
                        : "",
                  }));
                }}
                className={inputStyle}
              >
                <option value="">Select month</option>
                {MONTHS.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelStyle} htmlFor="reminder-due-day">
                Due day
              </label>
              <div className="relative" ref={daySelectRef}>
                <button
                  id="reminder-due-day"
                  type="button"
                  disabled={!form.dueMonth}
                  aria-haspopup="listbox"
                  aria-expanded={isDayOpen}
                  onClick={() => setIsDayOpen((open) => !open)}
                  className={`${inputStyle} flex items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:bg-gray-100`}
                >
                  <span>{form.dueDay || "Select day"}</span>
                  <ChevronDown className="h-3 w-3 shrink-0 text-[#555555]" />
                </button>

                {isDayOpen && form.dueMonth && (
                  <ul
                    role="listbox"
                    aria-labelledby="reminder-due-day"
                    className="absolute inset-x-0 top-full z-20 mt-1 max-h-[180px] overflow-y-auto rounded-lg border border-parent-accent/25 bg-bone py-1 shadow-lg"
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setForm((current) => ({ ...current, dueDay: "" }));
                          setIsDayOpen(false);
                        }}
                        className="flex w-full px-3 py-1.5 text-left font-[Poppins] text-[9px] text-[#555555] hover:bg-blue-500 hover:text-white sm:text-2xs"
                      >
                        Select day
                      </button>
                    </li>
                    {Array.from(
                      {
                        length: form.dueMonth
                          ? getDaysInMonth(form.dueMonth)
                          : 0,
                      },
                      (_, index) => index + 1,
                    ).map((day) => (
                      <li key={day}>
                        <button
                          type="button"
                          onClick={() => {
                            setForm((current) => ({
                              ...current,
                              dueDay: String(day),
                            }));
                            setIsDayOpen(false);
                          }}
                          className={`flex w-full px-3 py-1.5 text-left font-[Poppins] text-[9px] hover:bg-blue-500 hover:text-white sm:text-2xs ${
                            String(day) === form.dueDay
                              ? "bg-blue-500 text-white"
                              : "text-[#555555]"
                          }`}
                        >
                          {day}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {(error || serverError) && (
            <p role="alert" className="pt-3 text-xs text-reject">
              {error || serverError}
            </p>
          )}

          <div className="grid grid-cols-2 gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-parent-accent/30 px-5 py-2 text-[9px] font-[PoppinsBold] text-[#555555] transition hover:bg-bone sm:text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-parent-green px-5 py-2 text-[9px] font-[PoppinsBold] text-white transition hover:bg-parent-accent sm:text-xs"
            >
              {reminder ? "Save" : "Add"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const Notification = () => {
  const navigate = useNavigate();
  const [paymentTypes, setPaymentTypes] = useState(PAYMENT_TYPES);
  const [activePaymentType, setActivePaymentType] = useState("paylite");
  const [reminders, setReminders] = useState(emptyReminders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminderId, setEditingReminderId] = useState(null);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadReminders = async () => {
      try {
        const [paymentOptionsResponse, remindersResponse] = await Promise.all([
          getPaymentOptions(),
          getTuitionReminders(),
        ]);

        if (!isMounted) return;

        const options = normalizeList(paymentOptionsResponse);
        const types = options.length
          ? options.map((option) => ({
              id: option.payment_option_id,
              label: option.option_name,
            }))
          : PAYMENT_TYPES;
        const reminderList = normalizeList(remindersResponse);
        const knownIds = new Set(types.map((type) => String(type.id)));

        reminderList.forEach((reminder) => {
          const id = Number(reminder.payment_option_id);

          if (!knownIds.has(String(id))) {
            types.push({
              id,
              label: reminder.option_name ?? `Payment option ${id}`,
            });
            knownIds.add(String(id));
          }
        });

        const grouped = Object.fromEntries(types.map((type) => [type.id, []]));

        reminderList.forEach((reminder) => {
          const group = grouped[Number(reminder.payment_option_id)];

          group.push(mapReminder(reminder, group.length));
        });

        setPaymentTypes(types);
        setReminders(grouped);
        setActivePaymentType((current) =>
          types.some((type) => String(type.id) === String(current))
            ? current
            : (types[0]?.id ?? "paylite"),
        );
      } catch (error) {
        console.error("Failed to load tuition reminders:", error);
      }
    };

    loadReminders();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeReminders = reminders[activePaymentType] ?? [];
  const editingReminder =
    activeReminders.find((reminder) => reminder.id === editingReminderId) ?? null;

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReminderId(null);
    setSaveError("");
  };

  const openAddModal = () => {
    setEditingReminderId(null);
    setSaveError("");
    setIsModalOpen(true);
  };

  const openEditModal = (reminderId) => {
    setEditingReminderId(reminderId);
    setSaveError("");
    setIsModalOpen(true);
  };

  const saveReminder = async (reminderData) => {
    const payload = {
      payment_option_id: Number(activePaymentType),
      due_month: MONTHS.indexOf(reminderData.dueMonth) + 1,
      due_day: reminderData.dueDay,
      days_before: reminderData.daysBefore,
    };

    if (!Number.isInteger(payload.payment_option_id)) {
      setSaveError("Payment option is unavailable.");
      return;
    }

    try {
      const response = editingReminderId
        ? await updateTuitionReminder(editingReminderId, payload)
        : await createTuitionReminder(payload);

      const savedReminder = normalizeRecord(response);

      setReminders((current) => {
        const currentReminders = current[activePaymentType] ?? [];
        const saved = mapReminder(
          {
            reminder_id:
              savedReminder?.reminder_id ?? editingReminderId ?? Date.now(),
            due_month: savedReminder?.due_month ?? payload.due_month,
            due_day: savedReminder?.due_day ?? payload.due_day,
            days_before: savedReminder?.days_before ?? payload.days_before,
          },
          currentReminders.length,
        );

        if (editingReminderId) {
          return {
            ...current,
            [activePaymentType]: currentReminders.map((reminder) =>
              reminder.id === editingReminderId
                ? { ...reminder, ...saved, name: reminder.name }
                : reminder,
            ),
          };
        }

        return {
          ...current,
          [activePaymentType]: [...currentReminders, saved],
        };
      });

      closeModal();
    } catch (error) {
      console.error("Failed to save tuition reminder:", error);

      setSaveError(
        error.response?.data?.message ||
          error.message ||
          "Failed to save reminder.",
      );
    }
  };

  const removeReminder = async (reminderId) => {
    try {
      await deleteTuitionReminder(reminderId);

      setReminders((current) => ({
        ...current,
        [activePaymentType]: (current[activePaymentType] ?? []).filter(
          (reminder) => reminder.id !== reminderId,
        ),
      }));
    } catch (error) {
      console.error("Failed to delete tuition reminder:", error);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 bg-egg font-[Poppins]">
      <Header
        activeTab="Notifications"
        onTabChange={(tab) => {
          if (tab === "Announcements") navigate("/admin/communication");
        }}
      />

      <div
        role="toolbar"
        aria-label="Notification filters"
        className="flex w-full flex-wrap items-center justify-between gap-3"
      >
        <ResponsiveFilter
          options={paymentTypes.map((paymentType) => ({
            value: paymentType.id,
            label: paymentType.label,
          }))}
          value={activePaymentType}
          onChange={setActivePaymentType}
          label="Filter payment type"
        />

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center gap-2 rounded-full bg-parent-green px-5 py-2 font-[Poppins] text-xs text-white transition hover:bg-parent-accent"
        >
          <Plus className="h-4 w-4" />
          Add reminder
        </button>
      </div>

      <main className="flex min-h-0 flex-1 flex-col rounded-3xl border border-parent-accent/15 bg-bone p-4 shadow-sm sm:p-5">
        <div className="flex-1 space-y-3 overflow-y-auto">
          {activeReminders.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-parent-accent/25 bg-white/70 px-4 py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-parent-pale/40 text-parent-green">
                <BellRing className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-[PoppinsBold] text-parent-green">
                No reminders yet
              </p>
              <p className="mt-1 max-w-xs text-xs leading-relaxed text-gray-500">
                Add a reminder for this payment type to get started.
              </p>
            </div>
          ) : (
            activeReminders.map((reminder) => (
              <article
                key={reminder.id}
                className="grid grid-cols-2 items-center gap-x-3 gap-y-3 rounded-2xl border border-parent-accent/15 bg-white p-3 shadow-sm transition hover:border-parent-accent/30 hover:shadow-md sm:gap-x-4 sm:p-4 md:grid-cols-[minmax(140px,1.2fr)_minmax(110px,1fr)_minmax(135px,1fr)_88px_88px]"
              >
                <h2 className="col-span-2 flex items-center gap-3 text-sm font-[PoppinsBold] text-parent-green sm:text-base md:col-span-1">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-parent-pale/40 text-parent-green">
                    <BellRing className="h-4 w-4" />
                  </span>
                  {reminder.name}
                </h2>

                <div>
                  <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                    Due date
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-[PoppinsBold] text-gray-700">
                    <CalendarDays className="h-3.5 w-3.5 text-parent-accent" />
                    {formatDueDate(reminder.dueMonth, reminder.dueDay)}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                    Send reminder
                  </p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-[PoppinsBold] text-gray-700">
                    <Clock3 className="h-3.5 w-3.5 text-parent-accent" />
                    {reminder.daysBefore} days
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openEditModal(reminder.id)}
                  aria-label={`Edit ${reminder.name}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-parent-pale/50 px-3 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-pale sm:text-xs"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>

                <button
                  type="button"
                  onClick={() => removeReminder(reminder.id)}
                  aria-label={`Remove ${reminder.name}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-reject/15 bg-reject/5 px-3 py-2 text-xs font-[PoppinsBold] text-reject transition hover:bg-reject/10 sm:text-xs"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Remove
                </button>
              </article>
            ))
          )}
        </div>
      </main>

      {isModalOpen && (
        <ReminderModal
          reminder={editingReminder}
          onClose={closeModal}
          onSave={saveReminder}
          serverError={saveError}
        />
      )}
    </div>
  );
};

export default Notification;
