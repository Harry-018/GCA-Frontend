import { useEffect, useState } from "react";
import {
  BookOpen,
  GraduationCap,
  IdCard,
  Layers3,
  Pencil,
  Save,
  UserRound,
  X,
} from "lucide-react";
import {
  getBulkGradeRecords,
  getGradeRemarks,
  saveGradeRemarks,
  updateBulkGradeRecords,
} from "../../../utils/data/Teacher/grades.js";
import { parseGrade } from "../../../utils/data/Teacher/gradeUpload.js";

const REMARKS_LIMIT = 500;
const QUARTER_OPTIONS = [1, 2, 3, 4];

const normalizeId = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .toUpperCase();

const recordKey = (record) =>
  [
    String(record.sectionId ?? ""),
    normalizeId(record.studentId),
    String(record.subject ?? "").trim().toLowerCase(),
    String(record.skill ?? "").trim().toLowerCase(),
    String(record.quarter ?? ""),
  ].join("|");

const matchesStudent = (record, student) =>
  [student.schoolId, student.lrn]
    .filter(Boolean)
    .some(
      (identifier) =>
        normalizeId(record.studentId) === normalizeId(identifier) ||
        normalizeId(record.lrn) === normalizeId(identifier),
    );

const sortRecords = (records) =>
  [...records].sort(
    (first, second) =>
      Number(first.quarter) - Number(second.quarter) ||
      String(first.subject ?? "").localeCompare(String(second.subject ?? "")) ||
      String(first.skill ?? "").localeCompare(String(second.skill ?? "")),
  );

const loadStudentRecords = (student, section) =>
  sortRecords(
    getBulkGradeRecords().filter(
      (record) =>
        matchesStudent(record, student) &&
        (!section?.id || String(record.sectionId) === String(section.id)),
    ),
  );

const getQuarters = (records) =>
  [...new Set(records.map((record) => String(record.quarter ?? "")))].sort(
    (first, second) => Number(first) - Number(second),
  );

const StudentGradeModal = ({ student, section, onClose }) => {
  const [records, setRecords] = useState(() =>
    loadStudentRecords(student, section),
  );
  const [remarks, setRemarks] = useState(() =>
    getGradeRemarks(section?.id, student.schoolId),
  );
  const [selectedQuarter, setSelectedQuarter] = useState(() => {
    const firstQuarter = getQuarters(
      loadStudentRecords(student, section),
    )[0];

    return firstQuarter ? Number(firstQuarter) : 1;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [gradeDrafts, setGradeDrafts] = useState({});
  const [remarkDrafts, setRemarkDrafts] = useState({});
  const [gradeErrors, setGradeErrors] = useState({});
  const [remarkErrors, setRemarkErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const selectedRecords = records.filter(
    (record) => Number(record.quarter) === Number(selectedQuarter),
  );

  const startEditing = () => {
    const nextGradeDrafts = {};
    const nextRemarkDrafts = {};

    records.forEach((record) => {
      nextGradeDrafts[recordKey(record)] = {
        grade: String(record.grade ?? ""),
      };
    });

    QUARTER_OPTIONS.forEach((quarter) => {
      nextRemarkDrafts[quarter] = String(remarks[quarter] ?? "");
    });

    setGradeDrafts(nextGradeDrafts);
    setRemarkDrafts(nextRemarkDrafts);
    setGradeErrors({});
    setRemarkErrors({});
    setSaveError("");
    setSuccessMessage("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setGradeDrafts({});
    setRemarkDrafts({});
    setGradeErrors({});
    setRemarkErrors({});
    setSaveError("");
    setIsEditing(false);
  };

  const handleGradeChange = (key, value) => {
    setGradeDrafts((previous) => ({
      ...previous,
      [key]: { ...previous[key], grade: value },
    }));
    setGradeErrors((previous) => ({ ...previous, [key]: "" }));
  };

  const handleRemarkChange = (quarter, value) => {
    setRemarkDrafts((previous) => ({ ...previous, [quarter]: value }));
    setRemarkErrors((previous) => ({ ...previous, [quarter]: "" }));
  };

  const validateDrafts = () => {
    const nextGradeErrors = {};
    const nextRemarkErrors = {};
    let firstInvalidQuarter = null;

    records.forEach((record) => {
      const key = recordKey(record);
      const draft = gradeDrafts[key] ?? { grade: "" };
      const parsedGrade = parseGrade(draft.grade);

      if (parsedGrade.error) {
        nextGradeErrors[key] = parsedGrade.error;

        if (!firstInvalidQuarter) {
          firstInvalidQuarter = Number(record.quarter);
        }
      }
    });

    QUARTER_OPTIONS.forEach((quarter) => {
      if (String(remarkDrafts[quarter] ?? "").trim().length > REMARKS_LIMIT) {
        nextRemarkErrors[quarter] =
          `Remarks must be ${REMARKS_LIMIT} characters or fewer.`;
      }
    });

    setGradeErrors(nextGradeErrors);
    setRemarkErrors(nextRemarkErrors);

    if (firstInvalidQuarter) {
      setSelectedQuarter(firstInvalidQuarter);
    } else if (Object.keys(nextRemarkErrors).length > 0) {
      const [firstRemarkQuarter] = Object.keys(nextRemarkErrors);
      setSelectedQuarter(Number(firstRemarkQuarter));
    }

    return (
      Object.keys(nextGradeErrors).length === 0 &&
      Object.keys(nextRemarkErrors).length === 0
    );
  };

  const handleSave = () => {
    setSaveError("");

    if (!validateDrafts()) return;

    try {
      const updates = records.map((record) => {
        const draft = gradeDrafts[recordKey(record)] ?? { grade: "" };

        return {
          ...record,
          grade: parseGrade(draft.grade).value,
        };
      });

      updateBulkGradeRecords(updates);
      saveGradeRemarks({
        sectionId: section?.id,
        studentId: student.schoolId,
        remarks: remarkDrafts,
      });
      setRecords(loadStudentRecords(student, section));
      setRemarks(getGradeRemarks(section?.id, student.schoolId));
      setGradeDrafts({});
      setRemarkDrafts({});
      setGradeErrors({});
      setRemarkErrors({});
      setSuccessMessage("Grades and remarks updated.");
      setIsEditing(false);
    } catch (error) {
      setSaveError(
        error instanceof Error
          ? error.message
          : "Unable to save the changes. Please try again.",
      );
    }
  };

  const gradeLevel = section
    ? [section.level, section.name].filter(Boolean).join(" - ")
    : "—";

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-4 font-[Poppins] sm:px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-grade-title"
        className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-parent-accent/15 px-4 py-4 sm:px-6">
          <div className="min-w-0">
            <h2
              id="student-grade-title"
              className="font-[PoppinsBold] text-base text-parent-green sm:text-lg"
            >
              Student Grade Details
            </h2>
            <p className="mt-1 truncate text-xs text-gray-500">{student.name}</p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {!isEditing && records.length > 0 && (
              <button
                type="button"
                onClick={startEditing}
                className="flex cursor-pointer items-center gap-1.5 rounded-full bg-parent-green px-3 py-2 text-2xs font-[PoppinsBold] text-white transition hover:bg-parent-accent sm:px-4 sm:text-xs"
              >
                <Pencil size={13} />
                Edit
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              aria-label="Close student grades"
              className="cursor-pointer rounded-full p-2 text-gray-500 transition hover:bg-parent-pale/50 hover:text-gray-800"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="grid gap-3 rounded-2xl border border-parent-accent/15 bg-bone p-4 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex min-w-0 items-start gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-parent-green text-parent-mint">
                <UserRound size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  Student Name
                </p>
                <p className="truncate text-xs text-gray-700 sm:text-sm">
                  {student.name}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-parent-green text-parent-mint">
                <IdCard size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  Student ID
                </p>
                <p className="truncate text-xs text-gray-700 sm:text-sm">
                  {student.schoolId}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-parent-green text-parent-mint">
                <GraduationCap size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  LRN
                </p>
                <p className="truncate text-xs text-gray-700 sm:text-sm">
                  {student.lrn || "—"}
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-start gap-2.5">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-parent-green text-parent-mint">
                <Layers3 size={16} />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  Grade Level / Section
                </p>
                <p className="truncate text-xs text-gray-700 sm:text-sm">
                  {gradeLevel}
                </p>
              </div>
            </div>
          </div>

          {saveError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {saveError}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              className="rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700"
            >
              {successMessage}
            </p>
          )}

          {records.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-parent-accent/25 px-4 py-10 text-center">
              <span className="flex size-11 items-center justify-center rounded-full bg-parent-pale text-parent-green">
                <BookOpen size={20} />
              </span>
              <div>
                <p className="font-[PoppinsBold] text-sm text-parent-green">
                  No uploaded grades yet
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Use the Upload Grades button to add grades from an Excel
                  file, then view them here.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-parent-accent/15 bg-bone p-2 shadow-[0_2px_4px_rgba(0,0,0,0.18)]">
                <span className="px-2 text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  Quarter
                </span>

                {QUARTER_OPTIONS.map((quarter) => {
                  const count = records.filter(
                    (record) => Number(record.quarter) === quarter,
                  ).length;
                  const isActive = Number(selectedQuarter) === quarter;

                  return (
                    <button
                      key={quarter}
                      type="button"
                      onClick={() => setSelectedQuarter(quarter)}
                      aria-pressed={isActive}
                      className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 text-2xs font-[PoppinsBold] transition sm:text-xs ${
                        isActive
                          ? "bg-parent-green text-white"
                          : "border border-parent-accent/20 text-gray-600 hover:bg-parent-pale/40"
                      }`}
                    >
                      Quarter {quarter}
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[9px] ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-parent-pale/70 text-parent-green"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {selectedRecords.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-parent-accent/25 px-4 py-10 text-center">
                  <span className="flex size-11 items-center justify-center rounded-full bg-parent-pale text-parent-green">
                    <BookOpen size={20} />
                  </span>
                  <div>
                    <p className="font-[PoppinsBold] text-sm text-parent-green">
                      No grades for Quarter {selectedQuarter}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Upload grades for this quarter or choose another quarter
                      above.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-parent-accent/15">
                  {[
                    ...new Set(
                      selectedRecords.map((record) =>
                        String(record.subject ?? ""),
                      ),
                    ),
                  ]
                    .sort((first, second) => first.localeCompare(second))
                    .map((subject) => {
                      const subjectRecords = selectedRecords.filter(
                        (record) =>
                          String(record.subject ?? "") === subject,
                      );

                      return (
                        <div
                          key={subject}
                          className="grid gap-2 border-t border-parent-accent/10 px-3 py-3 first:border-t-0 sm:grid-cols-[160px_1fr] sm:gap-4 sm:px-4"
                        >
                          <div className="flex items-center gap-2 sm:items-start sm:pt-0.5">
                            <span className="text-[9px] font-[PoppinsBold] uppercase text-gray-500 sm:hidden">
                              Subject
                            </span>
                            <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-sm">
                              {subject || "—"}
                            </p>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="hidden grid-cols-[1fr_80px] gap-3 text-2xs font-[PoppinsBold] uppercase tracking-wide text-gray-500 sm:grid">
                              <span>Skill</span>
                              <span>Grade</span>
                            </div>

                            {subjectRecords.map((record) => {
                              const key = recordKey(record);
                              const draft = gradeDrafts[key] ?? { grade: "" };
                              const error = gradeErrors[key];

                              return (
                                <div
                                  key={key}
                                  className="grid grid-cols-[1fr_80px] items-start gap-3"
                                >
                                  <div className="min-w-0">
                                    <span className="text-[9px] font-[PoppinsBold] uppercase text-gray-500 sm:hidden">
                                      Skill
                                    </span>
                                    <p className="truncate text-xs text-gray-600 sm:text-sm">
                                      {record.skill || "General"}
                                    </p>
                                  </div>

                                  <div className="min-w-0">
                                    <span className="mb-1 block text-[9px] font-[PoppinsBold] uppercase text-gray-500 sm:hidden">
                                      Grade
                                    </span>
                                    {isEditing ? (
                                      <>
                                        <input
                                          type="text"
                                          value={draft.grade}
                                          onChange={(event) =>
                                            handleGradeChange(
                                              key,
                                              event.target.value,
                                            )
                                          }
                                          aria-label={`Grade for ${record.skill || record.subject}`}
                                          className={`h-9 w-full rounded-lg border bg-transparent px-2.5 text-xs text-gray-700 outline-none sm:w-20 ${
                                            error
                                              ? "border-red-400 focus:border-red-500"
                                              : "border-gray-400 focus:border-parent-green"
                                          }`}
                                        />
                                        {error && (
                                          <p className="mt-1 text-xs text-red-600">
                                            {error}
                                          </p>
                                        )}
                                      </>
                                    ) : (
                                      <span className="inline-flex min-w-11 justify-center rounded-full bg-parent-green px-3 py-1 text-xs font-[PoppinsBold] text-white">
                                        {record.grade}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}

                  <div className="border-t border-parent-accent/10 bg-parent-pale/20 px-4 py-3">
                    <div className="flex items-center justify-between gap-2">
                      <label
                        htmlFor={`remarks-${selectedQuarter}`}
                        className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-parent-green"
                      >
                        Teacher Remarks
                      </label>
                      <span className="text-xs text-gray-500">
                        Overall for Quarter {selectedQuarter}
                      </span>
                    </div>

                    {isEditing ? (
                      <>
                        <textarea
                          id={`remarks-${selectedQuarter}`}
                          value={remarkDrafts[selectedQuarter] ?? ""}
                          maxLength={REMARKS_LIMIT}
                          rows={2}
                          onChange={(event) =>
                            handleRemarkChange(
                              selectedQuarter,
                              event.target.value,
                            )
                          }
                          placeholder="Add overall teacher remarks for this quarter"
                          className={`mt-2 w-full resize-y rounded-lg border bg-transparent px-3 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400 ${
                            remarkErrors[selectedQuarter]
                              ? "border-red-400 focus:border-red-500"
                              : "border-gray-400 focus:border-parent-green"
                          }`}
                        />
                        {remarkErrors[selectedQuarter] && (
                          <p className="mt-1 text-xs text-red-600">
                            {remarkErrors[selectedQuarter]}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="mt-1 whitespace-pre-line text-xs text-gray-600">
                        {remarks[selectedQuarter] || "No remarks yet."}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-parent-accent/15 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={cancelEditing}
                className="cursor-pointer rounded-full border border-gray-400 px-5 py-2 text-xs text-gray-600 transition hover:bg-parent-pale/40"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="flex cursor-pointer items-center justify-center gap-1.5 rounded-full bg-parent-green px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
              >
                <Save size={14} />
                Save Changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded-full border border-gray-400 px-5 py-2 text-xs text-gray-600 transition hover:bg-parent-pale/40"
            >
              Close
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentGradeModal;
