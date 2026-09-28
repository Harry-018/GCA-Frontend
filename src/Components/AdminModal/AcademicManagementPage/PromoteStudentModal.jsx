import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const PromoteStudentModal = ({
  isOpen,
  onClose,
  selectedStudentIds,
  gradeLevels = [],
  currentSyGradeLevelId,
  onPromote,
}) => {
  const [targetSchoolYearId, setTargetSchoolYearId] = useState("");
  const [targetGradeLevelId, setTargetGradeLevelId] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    setTargetSchoolYearId("");
    setTargetGradeLevelId("");
  }, [isOpen]);

  // Get unique school years
  const schoolYears = [];

  gradeLevels.forEach((item) => {
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

  // Get grade levels for selected school year
  const availableGradeLevels = gradeLevels.filter(
    (item) =>
      Number(item.school_year_id) === Number(targetSchoolYearId) &&
      Number(item.sy_grade_level_id) !== Number(currentSyGradeLevelId),
  );

  // Find the actual school-year + grade-level record
  const selectedAcademicPlacement = gradeLevels.find(
    (item) =>
      Number(item.school_year_id) === Number(targetSchoolYearId) &&
      Number(item.grade_level_id) === Number(targetGradeLevelId) &&
      Number(item.sy_grade_level_id) !== Number(currentSyGradeLevelId),
  );

  const formatSchoolYear = (startDate, endDate) => {
    if (!startDate || !endDate) {
      return "Unknown School Year";
    }

    return `${new Date(startDate).getFullYear()} - ${new Date(
      endDate,
    ).getFullYear()}`;
  };

  const handleSchoolYearChange = (event) => {
    setTargetSchoolYearId(event.target.value);
    setTargetGradeLevelId("");
  };

  const handlePromote = async () => {
    if (!selectedAcademicPlacement) return;

    await onPromote(Number(selectedAcademicPlacement.sy_grade_level_id));
  };

  // Conditional return AFTER all hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-md rounded-2xl bg-bone shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="font-[PoppinsBold] text-base text-swamp-green">
              Promote Students
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Select the target school year and grade level.
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
          <div className="rounded-xl bg-white p-4">
            <p className="text-xs text-gray-500">Selected students</p>

            <p className="mt-1 font-[PoppinsBold] text-sm text-gray-700">
              {selectedStudentIds.length}
            </p>
          </div>

          {/* School Year */}
          <div>
            <label className="mb-2 block text-xs font-medium text-gray-600">
              Target School Year
            </label>

            <select
              value={targetSchoolYearId}
              onChange={handleSchoolYearChange}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green"
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
            <label className="mb-2 block text-xs font-medium text-gray-600">
              Target Grade Level
            </label>

            <select
              value={targetGradeLevelId}
              onChange={(event) => setTargetGradeLevelId(event.target.value)}
              disabled={!targetSchoolYearId}
              className="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green disabled:cursor-not-allowed disabled:bg-gray-100"
            >
              <option value="">Select grade level</option>

              {availableGradeLevels.map((item) => (
                <option
                  key={item.sy_grade_level_id}
                  value={item.grade_level_id}
                >
                  {item.grade_level_name}
                </option>
              ))}
            </select>
          </div>

          <p className="text-[11px] leading-5 text-gray-500">
            Students will be promoted to the selected school year and grade
            level. They will not be assigned to a section automatically.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-gray-300 px-5 py-2 text-xs text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!selectedAcademicPlacement}
            onClick={handlePromote}
            className="rounded-full bg-swamp-green px-5 py-2 text-xs text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            Promote Students
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteStudentModal;
