import * as XLSX from "xlsx";
import { getQuarters } from "./grades.js";

const TEMPLATE_HEADERS = [
  "Student ID / LRN",
  "Student Name",
  "Subject",
  "Skill",
  "Quarter",
  "Grade",
];

const normalizeHeader = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const normalizeIdentifier = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .toUpperCase();

const normalizeName = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

const getGradeKey = (record, sectionId) =>
  [
    String(sectionId ?? ""),
    normalizeIdentifier(record.studentId),
    normalizeHeader(record.subject),
    normalizeHeader(record.skill),
    String(record.quarter),
  ].join("|");

const getQuarterNumber = (value) => {
  const text = String(value ?? "").trim();
  const match =
    text.match(/\bquarter\s*([1-4])\b/i) ||
    text.match(/\bq\s*([1-4])\b/i) ||
    text.match(/\b([1-4])(?:st|nd|rd|th)?\s*quarter\b/i) ||
    text.match(/^([1-4])$/);

  return match ? Number(match[1]) : null;
};

export const parseGrade = (value) => {
  const text = String(value ?? "").trim();

  if (!text) {
    return { value: null, error: "Grade is required." };
  }

  const numericText = text.endsWith("%") ? text.slice(0, -1).trim() : text;

  if (/^(?:\d+(?:\.\d+)?|\.\d+)$/.test(numericText)) {
    const numericGrade = Number(numericText);

    if (numericGrade < 0 || numericGrade > 100) {
      return { value: null, error: "Grade must be between 0 and 100." };
    }

    return { value: numericGrade, error: "" };
  }

  if (/^[A-F][+-]?$/i.test(text)) {
    return { value: text.toUpperCase(), error: "" };
  }

  return {
    value: null,
    error: "Enter a grade from 0 to 100 or a letter grade from A to F.",
  };
};

export const downloadGradeTemplate = (students = []) => {
  const workbook = XLSX.utils.book_new();
  const gradeRows = [
    TEMPLATE_HEADERS,
    ...students.map((student) => [
      String(student.schoolId || student.lrn || ""),
      String(student.name || ""),
      "",
      "",
      "",
      "",
    ]),
  ];
  const gradesSheet = XLSX.utils.aoa_to_sheet(gradeRows);

  gradesSheet["!cols"] = [
    { wch: 22 },
    { wch: 28 },
    { wch: 22 },
    { wch: 26 },
    { wch: 14 },
    { wch: 12 },
  ];
  XLSX.utils.book_append_sheet(workbook, gradesSheet, "Grades");
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet([
      ["Instructions"],
      ["Fill in Subject, Skill, Quarter, and Grade for each student."],
      ["Use the Student ID / LRN and Student Name from the roster."],
      ["Quarter must match an available quarter (for example, 1 or Quarter 1)."],
      ["Grade may be a number from 0 to 100 or a letter from A to F."],
      ["Do not change the column headings."],
    ]),
    "Instructions",
  );
  XLSX.writeFile(workbook, "teacher-grade-upload-template.xlsx");
};

export const parseGradeWorkbook = async (
  file,
  students,
  existingGrades,
  sectionId,
) => {
  if (!file?.name?.toLowerCase().endsWith(".xlsx")) {
    throw new Error("Please choose an Excel .xlsx file.");
  }

  const workbook = XLSX.read(await file.arrayBuffer(), { type: "array" });
  const firstSheetName = workbook.SheetNames[0];

  if (!firstSheetName) {
    throw new Error("The workbook does not contain a worksheet.");
  }

  const rows = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheetName], {
    header: 1,
    raw: false,
    defval: "",
    blankrows: true,
  });
  const headers = rows[0] || [];
  const headerIndexes = headers.map(normalizeHeader);
  const findHeader = (...names) =>
    headerIndexes.findIndex((header) => names.includes(header));

  const combinedIdIndex = findHeader(
    "studentidlrn",
    "studentidorlrn",
    "idlrn",
  );
  const studentIdIndex = findHeader("studentid", "schoolid");
  const lrnIndex = findHeader("lrn");
  const nameIndex = findHeader("studentname", "name", "fullname");
  const subjectIndex = findHeader("subject", "subjectname");
  const skillIndex = findHeader("skill", "skillname");
  const quarterIndex = findHeader("quarter");
  const gradeIndex = findHeader("grade", "finalgrade");
  const missingHeaders = [];

  if (combinedIdIndex < 0 && studentIdIndex < 0 && lrnIndex < 0) {
    missingHeaders.push("Student ID / LRN");
  }
  if (nameIndex < 0) missingHeaders.push("Student Name");
  if (subjectIndex < 0) missingHeaders.push("Subject");
  if (skillIndex < 0) missingHeaders.push("Skill");
  if (quarterIndex < 0) missingHeaders.push("Quarter");
  if (gradeIndex < 0) missingHeaders.push("Grade");

  if (missingHeaders.length) {
    throw new Error(
      `Missing required column${missingHeaders.length > 1 ? "s" : ""}: ${missingHeaders.join(", ")}.`,
    );
  }

  const dataRows = rows
    .slice(1)
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) =>
      row.some((cell) => String(cell ?? "").trim() !== ""),
    );

  if (!dataRows.length) {
    throw new Error("The worksheet does not contain any grade rows.");
  }

  const availableQuarters = getQuarters();
  const existingKeys = new Set(
    existingGrades
      .filter((record) => String(record.sectionId) === String(sectionId))
      .map((record) => getGradeKey(record, sectionId)),
  );
  const fileKeys = new Set();

  return dataRows.map(({ row, rowNumber }) => {
    const cell = (columnIndex) =>
      columnIndex < 0 ? "" : String(row[columnIndex] ?? "").trim();
    const identifiers = [
      cell(studentIdIndex),
      cell(lrnIndex),
      cell(combinedIdIndex),
    ].filter(Boolean);
    const studentIdentifier = identifiers.join(" / ");
    const student = students.find((item) =>
      identifiers.some((identifier) =>
        [item.schoolId, item.lrn].some(
          (knownId) =>
            normalizeIdentifier(knownId) ===
            normalizeIdentifier(identifier),
        ),
      ),
    );
    const studentName = cell(nameIndex);
    const subject = cell(subjectIndex);
    const skill = cell(skillIndex);
    const quarterText = cell(quarterIndex);
    const quarter = getQuarterNumber(quarterText);
    const gradeText = cell(gradeIndex);
    const parsedGrade = parseGrade(gradeText);
    const errors = [];

    if (!studentIdentifier) {
      errors.push("Student ID / LRN is required.");
    } else if (!student) {
      errors.push("Student ID / LRN was not found in this class roster.");
    }

    if (!studentName) {
      errors.push("Student Name is required.");
    } else if (student && normalizeName(studentName) !== normalizeName(student.name)) {
      errors.push(`Name does not match the roster (${student.name}).`);
    }

    if (!subject) errors.push("Subject is required.");

    if (!skill) errors.push("Skill is required.");

    if (
      quarter === null ||
      !availableQuarters.some(
        (availableQuarter) => Number(availableQuarter.value) === quarter,
      )
    ) {
      errors.push(
        `Quarter must be one of ${availableQuarters
          .map((item) => item.label)
          .join(", ")}.`,
      );
    }

    if (parsedGrade.error) errors.push(parsedGrade.error);

    const record = {
      studentId: student?.schoolId || studentIdentifier,
      lrn: student?.lrn || "",
      studentName: student?.name || studentName,
      subject,
      skill,
      quarter,
      grade: parsedGrade.value,
    };

    if (student && subject && skill && quarter !== null) {
      const key = getGradeKey(record, sectionId);

      if (fileKeys.has(key)) {
        errors.push("Duplicate student, subject, skill, and quarter in this file.");
      } else if (existingKeys.has(key)) {
        errors.push(
          "A grade for this student, subject, skill, and quarter already exists.",
        );
      }

      fileKeys.add(key);
    }

    return {
      rowNumber,
      studentIdentifier,
      studentName,
      subject,
      skill,
      quarter: quarter === null ? quarterText : `Quarter ${quarter}`,
      grade: gradeText,
      errors,
      record,
    };
  });
};
