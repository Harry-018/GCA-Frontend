import * as XLSX from "xlsx";

const normalizeHeader = (value) =>
  String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

// Treat commas as plain separators so "Last, First, Middle" matches
// "Last, First Middle" from the generated template.
const normalizeComparisonText = (value) =>
  normalizeText(String(value ?? "").replace(/,/g, " "));

// Format as "Last Name, First Name Middle Name" (one comma only).
export const formatStudentName = (value) => {
  if (Array.isArray(value)) {
    const [lastName, ...givenNames] = value
      .filter(Boolean)
      .map((part) => String(part).trim())
      .filter(Boolean);

    return [lastName, givenNames.join(" ")].filter(Boolean).join(", ");
  }

  if (value && typeof value === "object") {
    return formatStudentName([
      value.last_name ?? value.lastName,
      value.first_name ?? value.firstName,
      value.middle_name ?? value.middleName,
    ]);
  }

  const parts = String(value ?? "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length === 0) return "";

  const [lastName, ...givenNames] = parts;
  return [lastName, givenNames.join(" ")].filter(Boolean).join(", ");
};

// The model accepts letter grades a, b, c, d, e.
export const parseGrade = (value) => {
  const text = String(value ?? "").trim();

  if (!text) {
    return { value: null, error: "Grade is required." };
  }

  if (/^[A-E]$/i.test(text)) {
    return { value: text.toLowerCase(), error: "" };
  }

  return { value: null, error: "Grade must be a letter from A to E." };
};

export const downloadGradeTemplate = (
  students = [],
  { subject, quarter, skills = [] } = {},
) => {
  if (!subject || !quarter || !Array.isArray(skills) || skills.length === 0) {
    throw new Error("Select a quarter and subject with skills before downloading.");
  }

  if (!Array.isArray(students) || students.length === 0) {
    throw new Error("No students are enrolled in this section.");
  }

  const skillNames = skills.map((skill) => skill.skill_name ?? String(skill));
  const headers = [
    "Student ID",
    "Student Name",
    "Subject",
    "Quarter",
    ...skillNames,
  ];
  const workbook = XLSX.utils.book_new();
  const gradeRows = [
    headers,
    ...students.map((student) => [
      String(student.stu_id ?? student.student_id ?? ""),
      formatStudentName(student.student_name ?? student),
      String(subject),
      String(quarter),
      ...skillNames.map(() => ""),
    ]),
  ];
  const gradesSheet = XLSX.utils.aoa_to_sheet(gradeRows);

  gradesSheet["!cols"] = [
    { wch: 16 },
    { wch: 32 },
    { wch: 22 },
    { wch: 16 },
    ...skillNames.map(() => ({ wch: 24 })),
  ];

  XLSX.utils.book_append_sheet(workbook, gradesSheet, "Grades");
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet([
      ["Instructions"],
      [`Subject: ${subject}`],
      [`Quarter: ${quarter}`],
      ["Each row is one student. Enter a grade under each skill column."],
      ["Grades must be a single letter: A, B, C, D, or E."],
      ["Do not change the column headings, the student IDs, or the roster."],
    ]),
    "Instructions",
  );

  const subjectFileName =
    String(subject)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "subject";
  const quarterFileName =
    String(quarter)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "quarter";

  XLSX.writeFile(
    workbook,
    `teacher-grade-${subjectFileName}-${quarterFileName}.xlsx`,
  );
};

export const parseGradeWorkbook = async (
  file,
  { students = [], skills = [], subjectName, quarterName, quarterId } = {},
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

  const studentIdIndex = findHeader(
    "studentid",
    "studentidnumber",
    "enrollmentid",
    "enrollment",
    "studentidlrn",
    "idlrn",
  );
  const nameIndex = findHeader("studentname", "name", "fullname");
  const subjectIndex = findHeader("subject", "subjectname");
  const quarterIndex = findHeader("quarter", "quarter name");

  const fixedColumnIndexes = new Set(
    [studentIdIndex, nameIndex, subjectIndex, quarterIndex].filter(
      (index) => index >= 0,
    ),
  );
  const skillColumns = headers
    .map((header, index) => ({ index, name: String(header ?? "").trim() }))
    .filter(({ index, name }) => name && !fixedColumnIndexes.has(index))
    .map((column) => ({
      ...column,
      skill: skills.find(
        (item) =>
          normalizeText(item.skill_name ?? item) === normalizeText(column.name),
      ),
    }));

  const missingHeaders = [];

  if (studentIdIndex < 0) missingHeaders.push("Student ID");
  if (nameIndex < 0) missingHeaders.push("Student Name");
  if (subjectIndex < 0) missingHeaders.push("Subject");
  if (quarterIndex < 0) missingHeaders.push("Quarter");
  if (skillColumns.length === 0) {
    missingHeaders.push("at least one skill column");
  }

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

  const previewRows = [];
  const groupedGrades = new Map();

  for (const { row, rowNumber } of dataRows) {
    const cell = (columnIndex) =>
      columnIndex < 0 ? "" : String(row[columnIndex] ?? "").trim();
    const studentIdText = cell(studentIdIndex);
    const studentName = cell(nameIndex);
    const subject = cell(subjectIndex);
    const quarter = cell(quarterIndex);

    const student =
      students.find(
        (item) => String(item.stu_id ?? item.student_id ?? "") === studentIdText,
      ) ||
      students.find(
        (item) => String(item.enrollment_id ?? "") === studentIdText,
      ) ||
      students.find((item) =>
        [item.stu_num, item.lrn].some(
          (identifier) =>
            normalizeText(identifier) === normalizeText(studentIdText),
        ),
      );

    const sharedErrors = [];

    if (!studentIdText) {
      sharedErrors.push("Student ID is required.");
    } else if (!student) {
      sharedErrors.push("Student ID was not found in this section.");
    }

    if (!studentName) {
      sharedErrors.push("Student Name is required.");
    } else if (
      student &&
      normalizeComparisonText(studentName) !==
      normalizeComparisonText(student.student_name)
    ) {
      sharedErrors.push(
        `Name does not match the roster (${formatStudentName(student.student_name)}).`,
      );
    }

    if (
      subjectName &&
      normalizeText(subject) !== normalizeText(subjectName)
    ) {
      sharedErrors.push(`Subject must be ${subjectName} for this upload.`);
    }

    if (
      quarterName &&
      normalizeText(quarter) !== normalizeText(quarterName) &&
      String(quarterId ?? "") !== quarter
    ) {
      sharedErrors.push(`Quarter must be ${quarterName} for this upload.`);
    }

    for (const column of skillColumns) {
      const errors = [...sharedErrors];
      const gradeText = cell(column.index);
      const parsedGrade = parseGrade(gradeText);

      if (!column.skill) {
        errors.push(`"${column.name}" is not a skill for this subject.`);
      }

      if (parsedGrade.error) errors.push(parsedGrade.error);

      let entry = student ? groupedGrades.get(student.enrollment_id) : null;

      if (entry && column.skill && entry.skillIds.has(column.skill.skill_id)) {
        errors.push(
          `Duplicate skill "${column.name}" for this student.`,
        );
      }

      previewRows.push({
        rowNumber,
        studentIdentifier: studentIdText,
        studentName,
        subject,
        skill: column.skill?.skill_name ?? column.name,
        quarter,
        grade: gradeText,
        errors,
      });

      if (errors.length === 0 && student && column.skill) {
        if (!entry) {
          entry = {
            enrollment_id: Number(student.enrollment_id),
            grades: [],
            skillIds: new Set(),
          };
          groupedGrades.set(student.enrollment_id, entry);
        }

        entry.grades.push({
          skill_id: Number(column.skill.skill_id),
          grade: parsedGrade.value,
        });
        entry.skillIds.add(column.skill.skill_id);
      }
    }
  }

  const grades = Array.from(groupedGrades.values()).map(
    ({ enrollment_id, grades: studentGrades }) => ({
      enrollment_id,
      grades: studentGrades,
    }),
  );

  return { rows: previewRows, grades };
};

const REMARKS_LIMIT = 255;

export const downloadRemarksTemplate = (students = [], { quarter } = {}) => {
  if (!quarter) {
    throw new Error("Select a quarter before downloading the remarks template.");
  }

  if (!Array.isArray(students) || students.length === 0) {
    throw new Error("No students are enrolled in this section.");
  }

  const headers = ["Student ID", "Student Name", "Quarter", "Remarks"];
  const workbook = XLSX.utils.book_new();
  const remarkRows = [
    headers,
    ...students.map((student) => [
      String(student.stu_id ?? student.student_id ?? ""),
      formatStudentName(student.student_name ?? student),
      String(quarter),
      "",
    ]),
  ];
  const remarksSheet = XLSX.utils.aoa_to_sheet(remarkRows);

  remarksSheet["!cols"] = [
    { wch: 16 },
    { wch: 32 },
    { wch: 16 },
    { wch: 60 },
  ];

  XLSX.utils.book_append_sheet(workbook, remarksSheet, "Remarks");
  XLSX.utils.book_append_sheet(
    workbook,
    XLSX.utils.aoa_to_sheet([
      ["Instructions"],
      [`Quarter: ${quarter}`],
      ["Each row is one student. Enter the teacher remark in the Remarks column."],
      [`Remarks must be ${REMARKS_LIMIT} characters or fewer.`],
      ["Do not change the column headings, the student IDs, or the roster."],
    ]),
    "Instructions",
  );

  const quarterFileName =
    String(quarter)
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "quarter";

  XLSX.writeFile(workbook, `teacher-remarks-${quarterFileName}.xlsx`);
};

export const parseRemarksWorkbook = async (
  file,
  { students = [], quarterName, quarterId } = {},
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

  const studentIdIndex = findHeader(
    "studentid",
    "studentidnumber",
    "enrollmentid",
    "enrollment",
  );
  const nameIndex = findHeader("studentname", "name", "fullname");
  const quarterIndex = findHeader("quarter", "quarter name");
  const remarkIndex = findHeader("remarks", "remark", "comment", "teacherremarks");

  const missingHeaders = [];

  if (studentIdIndex < 0) missingHeaders.push("Student ID");
  if (nameIndex < 0) missingHeaders.push("Student Name");
  if (quarterIndex < 0) missingHeaders.push("Quarter");
  if (remarkIndex < 0) missingHeaders.push("Remarks");

  if (missingHeaders.length) {
    throw new Error(
      `Missing required column${missingHeaders.length > 1 ? "s" : ""}: ${missingHeaders.join(", ")}.`,
    );
  }

  const dataRows = rows
    .slice(1)
    .map((row, index) => ({ row, rowNumber: index + 2 }))
    .filter(({ row }) => row.some((cell) => String(cell ?? "").trim() !== ""));

  if (!dataRows.length) {
    throw new Error("The worksheet does not contain any remark rows.");
  }

  const previewRows = [];
  const remarks = [];
  const seen = new Set();

  for (const { row, rowNumber } of dataRows) {
    const cell = (columnIndex) =>
      columnIndex < 0 ? "" : String(row[columnIndex] ?? "").trim();
    const studentIdText = cell(studentIdIndex);
    const studentName = cell(nameIndex);
    const quarter = cell(quarterIndex);
    const remark = cell(remarkIndex);

    const student =
      students.find(
        (item) => String(item.stu_id ?? item.student_id ?? "") === studentIdText,
      ) ||
      students.find(
        (item) => String(item.enrollment_id ?? "") === studentIdText,
      ) ||
      students.find((item) =>
        [item.stu_num, item.lrn].some(
          (identifier) =>
            normalizeText(identifier) === normalizeText(studentIdText),
        ),
      );

    const errors = [];

    if (!studentIdText) {
      errors.push("Student ID is required.");
    } else if (!student) {
      errors.push("Student ID was not found in this section.");
    }

    if (!studentName) {
      errors.push("Student Name is required.");
    } else if (
      student &&
      normalizeComparisonText(studentName) !==
        normalizeComparisonText(student.student_name)
    ) {
      errors.push(
        `Name does not match the roster (${formatStudentName(student.student_name)}).`,
      );
    }

    if (
      quarterName &&
      normalizeComparisonText(quarter) !==
        normalizeComparisonText(quarterName) &&
      String(quarterId ?? "") !== quarter
    ) {
      errors.push(`Quarter must be ${quarterName} for this upload.`);
    }

    if (remark.length > REMARKS_LIMIT) {
      errors.push(`Remarks must be ${REMARKS_LIMIT} characters or fewer.`);
    }

    if (student && seen.has(student.enrollment_id)) {
      errors.push("Duplicate student in the remarks file.");
    }

    if (student) seen.add(student.enrollment_id);

    previewRows.push({
      rowNumber,
      studentIdentifier: studentIdText,
      studentName,
      quarter,
      remark,
      errors,
    });

    if (errors.length === 0 && student && remark) {
      remarks.push({
        enrollment_id: Number(student.enrollment_id),
        comment: remark,
      });
    }
  }

  return { rows: previewRows, remarks };
};
