import React, { useEffect } from "react";
import { X } from "lucide-react";

const RescheduleModal = ({
  applicant,
  schedule = { date: "", from: "", to: "" },
  onScheduleChange,
  onSubmit,
  onClose,
  title = "Reschedule Applicant",
}) => {
  useEffect(() => {
    if (applicant) {
      onScheduleChange("date", schedule.date || "");
      onScheduleChange("from", schedule.from || "");
      onScheduleChange("to", schedule.to || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicant]);

  if (!applicant) return null;

  const isScheduleComplete =
    Boolean(schedule.date) && Boolean(schedule.from) && Boolean(schedule.to);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
      <div className="relative w-full max-w-102.5 rounded-2xl bg-[#f5f6fd] px-6 py-5 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>

        <h2 className="text-base font-[PoppinsBold] text-swamp-green">{title}</h2>

        <div className="flex flex-col gap-2 py-5 text-xs text-gray-600">
          <div className="grid grid-cols-[105px_1fr]">
            <span>Applicant:</span>
            <span className="font-bold text-gray-700">
              {applicant.lastName}, {applicant.firstName}
            </span>
          </div>
          <div className="grid grid-cols-[105px_1fr]">
            <span>Applicant ID:</span>
            <span className="font-bold text-gray-700">{applicant.id}</span>
          </div>
          <div className="grid grid-cols-[105px_1fr]">
            <span>Grade Level:</span>
            <span className="font-bold text-gray-700">{applicant.gradeLevel}</span>
          </div>
        </div>

        <div>
          <h3 className="pb-3 text-sm font-[PoppinsBold] text-swamp-green">
            New submission and assessment schedule:
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block pb-1 text-[11px] text-gray-600">
                Select Date:
              </label>
              <input
                type="date"
                value={schedule.date}
                onChange={(event) => onScheduleChange("date", event.target.value)}
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 text-center text-[11px] text-gray-600 outline-none"
              />
            </div>
            <div>
              <label className="block pb-1 text-[11px] text-gray-600">From:</label>
              <select
                value={schedule.from}
                onChange={(event) => onScheduleChange("from", event.target.value)}
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 py-0 text-start text-[11px] leading-8 text-gray-600 outline-none"
              >
                <option value="">select time</option>
                {[
                  "08:00",
                  "08:30",
                  "09:00",
                  "09:30",
                  "10:00",
                  "10:30",
                  "11:00",
                  "11:30",
                ].map((t) => (
                  <option key={t} value={t}>
                    {formatTime(t)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block pb-1 text-[11px] text-gray-600">To:</label>
              <select
                value={schedule.to}
                onChange={(event) => onScheduleChange("to", event.target.value)}
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 py-0 text-start text-[11px] leading-8 text-gray-600 outline-none"
              >
                <option value="">select time</option>
                {[
                  "08:30",
                  "09:00",
                  "09:30",
                  "10:00",
                  "10:30",
                  "11:00",
                  "11:30",
                  "12:00",
                ].map((t) => (
                  <option key={t} value={t}>
                    {formatTime(t)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-7">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-400 px-8 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isScheduleComplete}
            className="rounded-full bg-swamp-green px-8 py-2 text-xs font-[Poppins] text-white transition hover:bg-swamp-green disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-swamp-green"
          >
            Confirm Schedule
          </button>
        </div>
      </div>
    </div>
  );
};

const formatTime = (t) => {
  const [h, m] = t.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")} ${period}`;
};

export default RescheduleModal;
