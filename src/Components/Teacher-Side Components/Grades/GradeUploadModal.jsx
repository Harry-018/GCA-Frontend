import { useEffect, useRef, useState } from "react";
import { Download, Upload, X } from "lucide-react";
import {
  getBulkGradeRecords,
  saveBulkGradeRecords,
} from "../../../utils/data/Teacher/grades.js";
import {
  downloadGradeTemplate,
  parseGradeWorkbook,
} from "../../../utils/data/Teacher/gradeUpload.js";

const UPLOAD_QUARTERS = [1, 2, 3];

const DEMO_SUBJECTS = [
  {
    subject_id: "english",
    subject_name: "English",
    skills: [
      "Letter Recognition",
      "Letter Sounds",
      "Vocabulary",
      "Listening Comprehension",
      "Reading Readiness",
    ],
  },
  {
    subject_id: "mathematics",
    subject_name: "Mathematics",
    skills: [
      "Number Recognition",
      "Counting",
      "Shapes",
      "Patterns",
      "Comparing Quantities",
    ],
  },
  {
    subject_id: "filipino",
    subject_name: "Filipino",
    skills: [
      "Pagkilala sa mga Titik",
      "Tunog ng mga Titik",
      "Talasalitaan",
      "Pakikinig at Pag-unawa",
      "Kahandaan sa Pagbasa",
    ],
  },
  {
    subject_id: "science",
    subject_name: "Science",
    skills: [
      "Living and Nonliving Things",
      "Parts of the Body",
      "Plants and Animals",
      "Weather",
      "Caring for the Environment",
    ],
  },
  {
    subject_id: "values-education",
    subject_name: "Values Education",
    skills: [
      "Respect",
      "Responsibility",
      "Sharing",
      "Honesty",
      "Self-Discipline",
    ],
  },
];

const GradeUploadModal = ({ students, section, onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState("");
  const [selectedQuarter, setSelectedQuarter] = useState("");
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState([]);
  const [fileError, setFileError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const selectedSubject = DEMO_SUBJECTS.find(
    (subject) => String(subject.subject_id) === String(selectedSubjectId),
  );
  const skills = selectedSubject?.skills ?? [];
  const canDownloadTemplate = Boolean(
    selectedQuarter &&
      selectedSubject &&
      skills.length > 0,
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || isSubmitting || isParsing) return;

      if (isPreviewOpen) {
        setIsPreviewOpen(false);
      } else {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isParsing, isPreviewOpen, isSubmitting, onClose]);

  const validCount = preview.filter((row) => row.errors.length === 0).length;
  const invalidCount = preview.length - validCount;
  const canSubmit =
    preview.length > 0 &&
    invalidCount === 0 &&
    !isParsing &&
    !isSubmitting &&
    !successMessage;

  const resetImport = () => {
    setFileName("");
    setPreview([]);
    setFileError("");
    setSubmissionError("");
    setSuccessMessage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleQuarterChange = (quarter) => {
    setSelectedQuarter(String(quarter));
    resetImport();
  };

  const handleSubjectSelect = (subjectId) => {
    const nextSubjectId = String(subjectId);
    if (nextSubjectId === String(selectedSubjectId)) return;

    setSelectedSubjectId(nextSubjectId);
    resetImport();
  };

  const handleTemplateDownload = () => {
    if (!canDownloadTemplate || !selectedSubject) return;

    try {
      setFileError("");
      downloadGradeTemplate(students, {
        subject: selectedSubject.subject_name,
        quarter: selectedQuarter,
        skills,
      });
    } catch (error) {
      console.error("Failed to download the grade template:", error);
      setFileError(
        error instanceof Error
          ? error.message
          : "Unable to download the template. Please try again.",
      );
    }
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setFileName(file.name);
    setPreview([]);
    setFileError("");
    setSubmissionError("");
    setSuccessMessage("");
    setIsParsing(true);

    try {
      const rows = await parseGradeWorkbook(
        file,
        students,
        getBulkGradeRecords(),
        section.id,
        {
          subject: selectedSubject?.subject_name,
          quarter: selectedQuarter,
        },
      );
      setPreview(rows);
      setIsPreviewOpen(true);
    } catch (error) {
      setFileError(
        error instanceof Error
          ? error.message
          : "Unable to read the Excel file.",
      );
    } finally {
      setIsParsing(false);
    }
  };

  const handleCancelPreview = () => {
    setIsPreviewOpen(false);
    resetImport();
  };

  const handleSubmit = () => {
    if (!canSubmit || !selectedSubject || !selectedQuarter) return;

    setIsSubmitting(true);
    setSubmissionError("");

    try {
      const submittedAt = new Date().toISOString();
      const records = preview.map((row) => ({
        ...row.record,
        sectionId: String(section.id),
        sectionName: section.name,
        submittedAt,
      }));

      saveBulkGradeRecords(records);
      setSuccessMessage(
        `${records.length} grade${records.length === 1 ? "" : "s"} saved for ${selectedSubject.subject_name}, Quarter ${selectedQuarter}. This demo stores uploads in this browser.`,
      );
      setIsPreviewOpen(false);
    } catch (error) {
      console.error("Failed to save uploaded grades:", error);
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Unable to save these grades. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/50 px-3 py-4 font-[Poppins] sm:px-5"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isParsing &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="grade-upload-title"
        className="my-auto flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-parent-green/10 px-4 py-4 sm:px-6">
          <div>
            <h2
              id="grade-upload-title"
              className="font-[PoppinsBold] text-base text-parent-green sm:text-lg"
            >
              Upload Grades by Subject
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {section.name} · {section.level} · Select a quarter and subject,
              then download its Excel template.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isParsing || isSubmitting}
            aria-label="Close grade upload"
            className="rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-6">
          <div className="flex flex-col gap-3 rounded-xl bg-[#f0f1f5] p-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-[PoppinsBold] text-parent-green">
                Select Quarter
              </span>
              <div
                role="group"
                aria-label="Select quarter"
                className="flex flex-wrap gap-2"
              >
                {UPLOAD_QUARTERS.map((quarter) => {
                  const isSelected = String(quarter) === selectedQuarter;

                  return (
                    <button
                      key={quarter}
                      type="button"
                      onClick={() => handleQuarterChange(quarter)}
                      aria-pressed={isSelected}
                      disabled={isParsing || isSubmitting}
                      className={`min-w-24 rounded-xl border px-4 py-2.5 text-xs font-[PoppinsBold] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-parent-green disabled:cursor-not-allowed ${
                        isSelected
                          ? "border-parent-green bg-parent-green text-white shadow-sm"
                          : "border-parent-accent/20 bg-bone text-gray-600 hover:border-parent-green/50 hover:bg-parent-pale/30"
                      }`}
                    >
                      Quarter {quarter}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleTemplateDownload}
              disabled={!canDownloadTemplate || isParsing || isSubmitting}
              className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-parent-green px-5 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Download size={15} />
              Download Excel
            </button>
          </div>

          <section aria-labelledby="grade-upload-subjects-title">
            <h3
              id="grade-upload-subjects-title"
              className="mb-2 text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green"
            >
              Select Subject · Sample Data
            </h3>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {DEMO_SUBJECTS.map((subject) => {
                const isSelected =
                  String(subject.subject_id) === String(selectedSubjectId);

                return (
                  <button
                    key={subject.subject_id}
                    type="button"
                    onClick={() => handleSubjectSelect(subject.subject_id)}
                    aria-pressed={isSelected}
                    disabled={isParsing || isSubmitting}
                    className={`flex h-36 flex-col justify-between rounded-2xl border p-5 text-left shadow-[0_2px_4px_rgba(0,0,0,0.12)] transition focus:outline-none focus-visible:ring-2 focus-visible:ring-parent-green disabled:cursor-not-allowed ${
                      isSelected
                        ? "border-parent-green bg-parent-green text-white shadow-md"
                        : "border-parent-accent/20 bg-bone text-gray-700 hover:border-parent-green/50 hover:bg-parent-pale/30"
                    }`}
                  >
                    <span className="text-base font-[PoppinsBold]">
                      {subject.subject_name}
                    </span>
                    <span
                      className={`text-xs ${
                        isSelected ? "text-white/80" : "text-gray-500"
                      }`}
                    >
                      {isSelected
                        ? `${subject.skills.length} skills`
                        : "Select subject"}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {canDownloadTemplate && selectedSubject && (
            <div className="rounded-xl border border-parent-green/15 bg-parent-pale/20 px-4 py-3 text-xs text-gray-600">
              The Excel file will include all students in this section and the
              {` ${skills.length} `}skills for{" "}
              <span className="font-[PoppinsBold] text-parent-green">
                {selectedSubject.subject_name}
              </span>{" "}
              in Quarter {selectedQuarter}. Enter one grade per student for
              each skill.
            </div>
          )}

          {canDownloadTemplate && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                onChange={handleFileChange}
                disabled={!canDownloadTemplate || isParsing || isSubmitting}
                className="sr-only"
                aria-label="Choose an Excel grade file"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={!canDownloadTemplate || isParsing || isSubmitting}
                className="flex w-fit items-center justify-center gap-2 rounded-full bg-parent-green px-5 py-2.5 text-xs font-[PoppinsBold] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Upload size={15} />
                Choose Excel File
              </button>
              <p className="min-w-0 break-all text-xs text-gray-500">
                {isParsing
                  ? "Reading workbook..."
                  : fileName || "Upload the completed subject template."}
              </p>
            </div>
          )}

          {fileError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-2 py-2 sm:px-3 text-xs text-red-700"
            >
              {fileError}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              className="rounded-lg bg-green-50 px-2 py-2 sm:px-3 text-xs text-green-700"
            >
              {successMessage}
            </p>
          )}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-parent-green/10 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isParsing || isSubmitting}
            className="rounded-full border border-gray-500 px-5 py-2 text-xs text-gray-600 transition hover:bg-gray-100 disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </section>

      {isPreviewOpen && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/60 px-3 py-4 sm:px-5">
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="grade-preview-title"
            className="flex max-h-[calc(100dvh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone shadow-2xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-parent-green/10 px-4 py-4 sm:px-6">
              <div>
                <h2
                  id="grade-preview-title"
                  className="font-[PoppinsBold] text-base text-parent-green sm:text-lg"
                >
                  Preview Grades Before Upload
                </h2>
                <p className="mt-1 text-xs text-gray-500">
                  {selectedSubject?.subject_name} · Quarter {selectedQuarter} ·{" "}
                  {fileName}
                </p>
              </div>
              <p
                className={`text-xs ${
                  invalidCount > 0 ? "text-red-700" : "text-green-700"
                }`}
              >
                {validCount} valid · {invalidCount} need
                {invalidCount === 1 ? "s" : ""} attention
              </p>
            </div>

            <div className="min-h-0 flex-1 overflow-auto p-4 sm:p-6">
              <div className="mb-3 rounded-xl bg-parent-pale/30 px-4 py-3 text-xs text-gray-600">
                Review the student, skill, and grade rows below. You can cancel
                and choose another file, or upload these grades if all rows are
                ready.
              </div>

              <div className="overflow-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-225 border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-parent-pale/60 font-[PoppinsBold] uppercase tracking-wide text-parent-green">
                    <tr>
                      <th className="px-3 py-2">Row</th>
                      <th className="px-3 py-2">Student ID / LRN</th>
                      <th className="px-3 py-2">Student Name</th>
                      <th className="px-3 py-2">Subject</th>
                      <th className="px-3 py-2">Skill</th>
                      <th className="px-3 py-2">Quarter</th>
                      <th className="px-3 py-2">Grade</th>
                      <th className="px-3 py-2">Validation</th>
                    </tr>
                  </thead>
                  <tbody>
                    {preview.map((row, index) => (
                      <tr
                        key={`${row.rowNumber}-${row.skill}-${index}`}
                        className={
                          row.errors.length
                            ? "border-t border-red-100 bg-red-50/80"
                            : "border-t border-gray-100"
                        }
                      >
                        <td className="px-3 py-2">{row.rowNumber}</td>
                        <td className="px-3 py-2">{row.studentIdentifier || "—"}</td>
                        <td className="px-3 py-2">{row.studentName || "—"}</td>
                        <td className="px-3 py-2">{row.subject || "—"}</td>
                        <td className="px-3 py-2">{row.skill || "—"}</td>
                        <td className="px-3 py-2">{row.quarter || "—"}</td>
                        <td className="px-3 py-2">{row.grade || "—"}</td>
                        <td className="max-w-72 wrap-break-word px-3 py-2">
                          {row.errors.length ? (
                            <ul className="list-inside list-disc text-red-700">
                              {row.errors.map((error) => (
                                <li key={error}>{error}</li>
                              ))}
                            </ul>
                          ) : (
                            <span className="text-green-700">Ready</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {submissionError && (
                <p
                  role="alert"
                  className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
                >
                  {submissionError}
                </p>
              )}
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-parent-green/10 px-4 py-4 sm:flex-row sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={handleCancelPreview}
                disabled={isSubmitting}
                className="rounded-full border border-gray-400 px-5 py-2 text-xs text-gray-600 transition hover:bg-parent-pale/40 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="rounded-full bg-parent-green px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isSubmitting
                  ? "Uploading..."
                  : `Upload ${validCount} Grade${validCount === 1 ? "" : "s"}`}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default GradeUploadModal;
