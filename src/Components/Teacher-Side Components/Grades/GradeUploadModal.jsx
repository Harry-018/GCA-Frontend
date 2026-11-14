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

const GradeUploadModal = ({ students, section, onClose }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [preview, setPreview] = useState([]);
  const [fileError, setFileError] = useState("");
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isParsing, setIsParsing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !isSubmitting && !isParsing) onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isParsing, isSubmitting, onClose]);

  const validCount = preview.filter((row) => row.errors.length === 0).length;
  const invalidCount = preview.length - validCount;
  const canSubmit =
    preview.length > 0 &&
    invalidCount === 0 &&
    !isParsing &&
    !isSubmitting &&
    !successMessage;

  const handleTemplateDownload = () => {
    try {
      downloadGradeTemplate(students);
    } catch (error) {
      console.error("Failed to download the grade template:", error);
      setFileError("Unable to download the template. Please try again.");
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
      );
      setPreview(rows);
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

  const handleSubmit = () => {
    if (!canSubmit) return;

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
        `${records.length} grade${records.length === 1 ? "" : "s"} saved for ${section.name}. This demo stores uploads in this browser.`,
      );
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
              Upload Class Grades
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              {section.name} · {section.level}
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
          <div className="flex flex-col gap-3 rounded-xl bg-[#f0f1f5] p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs leading-relaxed text-gray-600">
              <p className="font-[PoppinsBold] text-parent-green">
                Use an .xlsx file with the template columns.
              </p>
              <p>
                Each row is one skill grade. Grades may be 0–100 or A–F.
                Student ID/LRN and name must match this class roster.
              </p>
            </div>
            <button
              type="button"
              onClick={handleTemplateDownload}
              className="flex shrink-0 items-center justify-center gap-2 rounded-full border border-parent-green/30 px-4 py-2 text-xs font-[PoppinsBold] text-parent-green transition hover:bg-parent-green/10"
            >
              <Download size={15} />
              Download Template
            </button>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
              className="sr-only"
              aria-label="Choose an Excel grade file"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isParsing || isSubmitting}
              className="flex w-fit items-center justify-center gap-2 rounded-full bg-parent-green px-5 py-2.5 text-xs font-[PoppinsBold] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Upload size={15} />
              Choose Excel File
            </button>
            <p className="min-w-0 break-all text-xs text-gray-500">
              {isParsing
                ? "Reading workbook..."
                : fileName || "No file selected"}
            </p>
          </div>

          {fileError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {fileError}
            </p>
          )}

          {preview.length > 0 && (
            <div className="flex min-h-0 flex-col gap-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-[PoppinsBold] text-sm text-parent-green">
                  Preview
                </h3>
                <p
                  className={`text-xs ${
                    invalidCount > 0 ? "text-red-700" : "text-green-700"
                  }`}
                >
                  {validCount} valid · {invalidCount} need
                  {invalidCount === 1 ? "s" : ""} attention
                </p>
              </div>

              <div className="max-h-72 overflow-auto rounded-xl border border-gray-200">
                <table className="w-full min-w-225 border-collapse text-left text-xs">
                  <thead className="sticky top-0 bg-parent-pale/60 text-xs font-[PoppinsBold] uppercase tracking-wide text-parent-green">
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
                    {preview.map((row) => (
                      <tr
                        key={row.rowNumber}
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
                        <td className="max-w-72 px-3 py-2">
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
            </div>
          )}

          {submissionError && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-3 py-2 text-xs text-red-700"
            >
              {submissionError}
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
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="rounded-full bg-parent-green px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting
              ? "Submitting..."
              : successMessage
                ? "Submitted"
                : `Submit ${validCount} Grade${validCount === 1 ? "" : "s"}`}
          </button>
        </div>
      </section>
    </div>
  );
};

export default GradeUploadModal;
