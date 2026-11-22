import React, { useState } from "react";
import { X } from "lucide-react";

const RetainStudentModal = ({
  isOpen,
  onClose,
  selectedStudentIds,
  gradeLevels = [],
  currentSyGradeLevelId,
  currentGradeLevelId,
  currentGradeLevelName,
  onRetain,
}) => {
  const [targetSchoolYearId, setTargetSchoolYearId] = useState("");
  const [submitting, setSubmitting] = useState(false);

  /*
   * Retention keeps students in their current grade level and targets a
   * draft school year, so only draft placements for that grade level are valid.
   */
  const eligiblePlacements = gradeLevels.filter(
    (item) =>
      item.sy_status === "draft" &&
      Number(item.sy_grade_level_id) !== Number(currentSyGradeLevelId) &&
      Number(item.grade_level_id) === Number(currentGradeLevelId),
  );

  const schoolYears = [];

  eligiblePlacements.forEach((item) => {
    const exists = schoolYears.some(
      (year) => Number(year.school_year_id) === Number(item.school_year_id),
    );

    if (!exists) {
      schoolYears.push({
        school_year_id: item.school_year_id,
        start_date: item.start_date,
        end_date: item.end_date,
      });
    }
  });

  const selectedAcademicPlacement = eligiblePlacements.find(
    (item) =>
      Number(item.school_year_id) === Number(targetSchoolYearId),
  );

  const formatSchoolYear = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return "Unknown School Year";
    }

    return `${new Date(startDate).getFullYear()} - ${new Date(
      endDate,
    ).getFullYear()}`;
  };

  const handleRetain = async () => {
    if (!selectedAcademicPlacement || submitting) return;

    try {
      setSubmitting(true);

      await onRetain(Number(selectedAcademicPlacement.sy_grade_level_id));
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-bone shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-parent-accent/15 px-6 py-4">
          <div>
            <h2 className="font-[Poppins] text-base text-parent-green">
              Retain Students
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select the target school year. Students stay in their current
              grade level.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <div className="rounded-xl bg-bone p-4">
            <p className="text-xs text-gray-500">Selected students</p>

            <p className="mt-1 font-[Poppins] text-sm text-gray-700">
              {selectedStudentIds.length}
            </p>
          </div>

          {/* School Year */}
          <div>
            <label className="mb-2 block text-xs text-gray-600">
              Target School Year
            </label>

            <select
              value={targetSchoolYearId}
              onChange={(event) => setTargetSchoolYearId(event.target.value)}
              className="h-10 w-full rounded-lg border border-parent-accent/25 bg-bone px-3 text-xs text-gray-700 outline-none focus:border-parent-green"
            >
              <option value="">Select school year</option>

              {schoolYears.map((item) => (
                <option key={item.school_year_id} value={item.school_year_id}>
                  {formatSchoolYear(item.start_date, item.end_date)}
                </option>
              ))}
            </select>
          </div>

          {/* Grade Level */}
          <div>
            <label className="mb-2 block text-xs text-gray-600">
              Grade Level
            </label>

            <input
              type="text"
              readOnly
              value={currentGradeLevelName || "Current grade level"}
              className="h-10 w-full rounded-lg border border-parent-accent/25 bg-gray-100 px-3 text-xs text-gray-700 outline-none"
            />
          </div>

          <p className="text-[11px] leading-5 text-gray-500 lg:text-xs xl:text-sm">
            Students will be retained in {currentGradeLevelName || "their current grade level"} for the selected school year. They will not be
            assigned to a section automatically.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-parent-accent/15 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-parent-accent/25 px-5 py-2 text-xs text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedAcademicPlacement || submitting}
            onClick={handleRetain}
            className="rounded-full bg-reject px-5 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {submitting ? "Retaining..." : "Retain Students"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RetainStudentModal;
