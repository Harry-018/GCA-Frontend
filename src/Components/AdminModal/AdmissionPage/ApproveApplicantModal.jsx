import React from "react";

const ApproveApplicantModal = ({
  applicant,
  schedule = { date: "", from: "", to: "" },
  onScheduleChange,
  onCancel,
  onApprove,
  title = "Approve Applicant",
  purpose = applicant?.purpose || "Enrollment & Assessment",
  email = applicant?.email || (applicant?.firstName && applicant?.lastName ? `${applicant.firstName} ${applicant.lastName}` : "-"),
  scheduleTitle = "Submission and assessment schedule:",
  cancelLabel = "Cancel",
  approveLabel = "Approve",
}) => {

  if (!applicant) return null;

  const isScheduleComplete =
    Boolean(schedule.date) && Boolean(schedule.from) && Boolean(schedule.to);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-102.5 rounded-2xl bg-[#f5f6ff] px-6 py-5 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
        <h2 className="text-base font-[PoppinsBold] text-swamp-green">
          {title}
        </h2>

        <div className="flex flex-col gap-2 py-6 text-xs text-gray-600">
          <div className="grid grid-cols-[105px_1fr]">
            <span>Send confirmation to:</span>
            <span className="font-bold text-gray-700">
              {email}
            </span>
          </div>

          <div className="grid grid-cols-[105px_1fr]">
            <span>Purpose:</span>
            <span className="font-bold text-gray-700">
              {purpose}
            </span>
          </div>
        </div>

        <div>
          <h3 className="pb-3 text-sm font-[PoppinsBold] text-swamp-green">
            {scheduleTitle}
          </h3>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block pb-1 text-[11px] text-gray-600">
                Select Date:
              </label>

              <input
                type="date"
                value={schedule.date}
                onChange={(event) =>
                  onScheduleChange("date", event.target.value)
                }
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 text-center text-[11px] text-gray-600 outline-none"
              />
            </div>

            <div>
              <label className="block pb-1 text-[11px] text-gray-600">
                From:
              </label>

              <select
                value={schedule.from}
                onChange={(event) =>
                  onScheduleChange("from", event.target.value)
                }
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 py-0 text-start text-[11px] leading-8 text-gray-600 outline-none"
              >
                <option value="">select time</option>
                <option value="08:00">08:00 AM</option>
                <option value="08:30">08:30 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
              </select>
            </div>

            <div>
              <label className="block pb-1 text-[11px] text-gray-600">
                To:
              </label>

              <select
                value={schedule.to}
                onChange={(event) =>
                  onScheduleChange("to", event.target.value)
                }
                className="h-8 w-full rounded-lg border border-gray-400 bg-transparent px-2 py-0 text-start text-[11px] leading-8 text-gray-600 outline-none"
              >
                <option value="">select time</option>
                <option value="08:30">08:30 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="09:30">09:30 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="10:30">10:30 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="11:30">11:30 AM</option>
                <option value="12:00">12:00 PM</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-7">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-gray-400 px-8 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
          >
            {cancelLabel}
          </button>

          <button
            type="button"
            onClick={onApprove}
            disabled={!isScheduleComplete}
            className="rounded-full bg-swamp-green px-8 py-2 text-xs font-[Poppins] text-white transition hover:bg-swamp-green disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-swamp-green"
          >
            {approveLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApproveApplicantModal;