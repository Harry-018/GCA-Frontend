import { useEffect, useMemo, useState } from "react";
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
import { getTeacherRemarksStudents } from "../../../requests/teacherRequests.js";

const REMARKS_LIMIT = 500;
const QUARTER_OPTIONS = [1, 2, 3];

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
        (!section?.id || String(record.sectionId) === String(section.id)) &&
        QUARTER_OPTIONS.includes(Number(record.quarter)),
    ),
  );

const getQuarterId = (option) =>
  typeof option === "object" ? option.quarter_id : option;

const StudentGradeModal = ({
  student,
  section,
  records: initialRecords,
  quarters = [],
  onClose,
}) => {
  const isReadOnly = Boolean(initialRecords);
  const quarterOptions = quarters.length > 0 ? quarters : QUARTER_OPTIONS;
  const quarterLabels = new Map(
    quarterOptions.map((option) => {
      const id = Number(getQuarterId(option));
      const label =
        typeof option === "object"
          ? option.quarter_name ?? `Quarter ${id}`
          : `Quarter ${id}`;

      return [id, label];
    }),
  );

  const visibleQuarters = useMemo(() => {
    const options = quarters.length > 0 ? quarters : QUARTER_OPTIONS;
    const ids = options
      .map((option) => Number(getQuarterId(option)))
      .filter((id) => Number.isFinite(id));

    return [...new Set(ids)].sort((first, second) => first - second);
  }, [quarters]);

  const [records, setRecords] = useState(() =>
    initialRecords ?? loadStudentRecords(student, section),
  );
  const [remarks, setRemarks] = useState(() =>
    getGradeRemarks(section?.id, student.schoolId),
  );
  const [isEditing, setIsEditing] = useState(false);
  const [gradeDrafts, setGradeDrafts] = useState({});
  const [remarkDrafts, setRemarkDrafts] = useState({});
  const [gradeErrors, setGradeErrors] = useState({});
  const [remarkErrors, setRemarkErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const subjectsWithSkills = useMemo(() => {
    const subjects = new Map();

    records.forEach((record) => {
      const subject = String(record.subject ?? "");
      const skill = String(record.skill ?? "");

      if (!subjects.has(subject)) subjects.set(subject, new Map());

      const skills = subjects.get(subject);

      if (!skills.has(skill)) skills.set(skill, {});

      skills.get(skill)[Number(record.quarter)] = record;
    });

    return [...subjects.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([subject, skills]) => ({
        subject,
        skills: [...skills.entries()]
          .sort(([first], [second]) => first.localeCompare(second))
          .map(([skill, byQuarter]) => ({ skill, byQuarter })),
      }));
  }, [records]);

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

  // FETCH THE TEACHER REMARKS FOR EACH QUARTER OF THE SELECTED SECTION AND STUDENT
  useEffect(() => {
    const sectionId = section?.id;
    const enrollmentId = student?.enrollment_id;

    if (!sectionId || !enrollmentId || visibleQuarters.length === 0) return;

    let cancelled = false;

    const fetchRemarks = async (quarter) => {
      try {
        const response = await getTeacherRemarksStudents({
          section_id: sectionId,
          quarter_id: quarter,
        });

        if (response?.success === false) {
          throw new Error(response?.message || "Failed to retrieve remarks.");
        }

        const payload = response?.data ?? {};
        const list = Array.isArray(payload)
          ? payload
          : (payload.remarks ?? payload.students ?? []);
        const entry =
          list.find(
            (item) =>
              String(item.enrollment_id ?? "") === String(enrollmentId),
          ) ??
          list.find((item) =>
            [item.stu_id, item.stu_num, item.lrn].some(
              (identifier) =>
                identifier != null &&
                String(identifier) === String(student.schoolId),
            ),
          );
        const comment = entry?.comment ?? entry?.remark;

        if (!cancelled && comment != null && String(comment).trim() !== "") {
          setRemarks((previous) => ({
            ...previous,
            [quarter]: String(comment),
          }));
        }
      } catch (err) {
        console.error("getTeacherRemarksStudents error:", err);
      }
    };

    visibleQuarters.forEach(fetchRemarks);

    return () => {
      cancelled = true;
    };
  }, [section?.id, student, visibleQuarters]);

  const startEditing = () => {
    const nextGradeDrafts = {};
    const nextRemarkDrafts = {};

    records.forEach((record) => {
      nextGradeDrafts[recordKey(record)] = {
        grade: String(record.grade ?? ""),
      };
    });

    visibleQuarters.forEach((quarter) => {
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

    records.forEach((record) => {
      const key = recordKey(record);
      const draft = gradeDrafts[key] ?? { grade: "" };
      const parsedGrade = parseGrade(draft.grade);

      if (parsedGrade.error) {
        nextGradeErrors[key] = parsedGrade.error;
      }
    });

    visibleQuarters.forEach((quarter) => {
      if (String(remarkDrafts[quarter] ?? "").trim().length > REMARKS_LIMIT) {
        nextRemarkErrors[quarter] =
          `Remarks must be ${REMARKS_LIMIT} characters or fewer.`;
      }
    });

    setGradeErrors(nextGradeErrors);
    setRemarkErrors(nextRemarkErrors);

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
            {!isEditing && !isReadOnly && records.length > 0 && (
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
              <div className="px-3 py-2 sm:px-4">
                <span className="text-xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                  Quarter Grades at a Glance
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-parent-accent/15">
                {subjectsWithSkills.map(({ subject, skills }) => (
                  <div
                    key={subject}
                    className="border-b border-parent-accent/10 last:border-b-0"
                  >
                    <div className="bg-parent-pale/30 px-3 py-2.5 sm:px-4">
                      <p className="text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green sm:text-sm">
                        {subject || "—"}
                      </p>
                    </div>

                    <div className="min-w-140 px-3 py-3 sm:px-4">
                      <table className="w-full border-collapse text-left">
                        <thead>
                          <tr className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                            <th className="pb-2 pr-3 font-[PoppinsBold]">
                              Skill
                            </th>

                            {visibleQuarters.map((quarter) => (
                              <th
                                key={quarter}
                                className="px-2 pb-2 text-center font-[PoppinsBold]"
                              >
                                {quarterLabels.get(quarter) ??
                                  `Quarter ${quarter}`}
                              </th>
                            ))}

                          </tr>
                        </thead>

                        <tbody>
                          {skills.map(({ skill, byQuarter }, skillIndex) => {
                            return (
                              <tr
                                key={`${skill}-${skillIndex}`}
                                className="border-t border-parent-accent/10 align-top"
                              >
                                <td className="py-2.5 pr-3 text-xs text-gray-600 sm:text-sm">
                                  {skill || "General"}
                                </td>

                                {visibleQuarters.map((quarter) => {
                                  const record = byQuarter[quarter];
                                  const quarterName =
                                    quarterLabels.get(quarter) ??
                                    `Quarter ${quarter}`;
                                  const key = record
                                    ? recordKey(record)
                                    : `${subject}|${skill}|${quarter}`;
                                  const draft = gradeDrafts[key] ?? {
                                    grade: "",
                                  };
                                  const error = gradeErrors[key];

                                  return (
                                    <td
                                      key={quarter}
                                      className="px-2 py-2.5 text-center"
                                    >
                                      {record && isEditing ? (
                                        <div className="flex flex-col items-center gap-1">
                                          <input
                                            type="text"
                                            value={draft.grade}
                                            onChange={(event) =>
                                              handleGradeChange(
                                                key,
                                                event.target.value,
                                              )
                                            }
                                            aria-label={`Grade for ${skill || subject}, ${quarterName}`}
                                            className={`h-9 w-16 rounded-lg border bg-transparent px-2 text-xs text-gray-700 outline-none ${
                                              error
                                                ? "border-red-400 focus:border-red-500"
                                                : "border-gray-400 focus:border-parent-green"
                                            }`}
                                          />
                                          {error && (
                                            <span className="text-[9px] text-red-600">
                                              {error}
                                            </span>
                                          )}
                                        </div>
                                      ) : record ? (
                                        <span className="inline-flex min-w-11 justify-center rounded-full bg-parent-green px-3 py-1 text-xs font-[PoppinsBold] text-white">
                                          {String(record.grade ?? "").toUpperCase()}
                                        </span>
                                      ) : (
                                        <span className="text-xs text-gray-400">
                                          —
                                        </span>
                                      )}
                                    </td>
                                  );
                                })}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}

                <div className="min-w-140 border-t border-parent-accent/10 bg-parent-pale/20 px-4 py-3">
                  <p className="text-2xs font-[PoppinsBold] uppercase tracking-wide text-parent-green">
                    Teacher Remarks
                  </p>

                  <div className="mt-2 grid gap-3 sm:grid-cols-3">
                    {visibleQuarters.map((quarter) => {
                      const quarterName =
                        quarterLabels.get(quarter) ?? `Quarter ${quarter}`;
                      const error = remarkErrors[quarter];

                      return (
                        <div
                          key={quarter}
                          className="rounded-xl border border-parent-accent/15 bg-bone p-3"
                        >
                          <p className="mb-1 text-[9px] font-[PoppinsBold] uppercase tracking-wide text-gray-500">
                            {quarterName}
                          </p>

                          {isEditing ? (
                            <>
                              <textarea
                                id={`remarks-${quarter}`}
                                value={remarkDrafts[quarter] ?? ""}
                                maxLength={REMARKS_LIMIT}
                                rows={2}
                                onChange={(event) =>
                                  handleRemarkChange(
                                    quarter,
                                    event.target.value,
                                  )
                                }
                                placeholder={`Remarks for ${quarterName}`}
                                className={`w-full resize-y rounded-lg border bg-transparent px-3 py-2 text-xs text-gray-700 outline-none placeholder:text-gray-400 ${
                                  error
                                    ? "border-red-400 focus:border-red-500"
                                    : "border-gray-400 focus:border-parent-green"
                                }`}
                              />
                              {error && (
                                <p className="mt-1 text-[9px] text-red-600">
                                  {error}
                                </p>
                              )}
                            </>
                          ) : (
                            <p className="whitespace-pre-line text-xs text-gray-600">
                              {remarks[quarter] || "No remarks yet."}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
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
