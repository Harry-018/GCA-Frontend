import { readStore, writeStore } from "../core";

const DEFAULT_QUARTERS = [
  { value: 1, label: "Quarter 1" },
  { value: 2, label: "Quarter 2" },
  { value: 3, label: "Quarter 3" },
  { value: 4, label: "Quarter 4" },
];

const DEFAULT_ROSTER = [
  { schoolId: "GCA-2026-001", lrn: "1204567891011", name: "Rosaline Romasanta", gender: "Female" },
  { schoolId: "GCA-2026-002", lrn: "1204567891012", name: "Angela Cruz", gender: "Female" },
  { schoolId: "GCA-2026-003", lrn: "1204567891013", name: "Miguel Santos", gender: "Male" },
  { schoolId: "GCA-2026-004", lrn: "1345698721234", name: "Jake Macasinag", gender: "Male" },
  { schoolId: "GCA-2026-005", lrn: "1345698721235", name: "Bella Reyes", gender: "Female" },
];

const DEFAULT_DEVELOPMENTS = {
  1: [
    {
      id: 1,
      name: "Physical Development",
      grades: [
        { skill: "Gross Motor Skills", description: "Hopping, Skipping, Catching, Jumping, Balance", grade: "A" },
        { skill: "Fine Motor Skills", description: "Tying Shoes, Pegs, Beads, Crayons, Scissors", grade: "A" },
        { skill: "Drawing Recognize Pictures", grade: "B" },
        { skill: "Coloring with Lines", grade: "A" },
        { skill: "Printing Own Name", grade: "B" },
      ],
    },
    {
      id: 2,
      name: "Socio-Emotional Development",
      grades: [
        { skill: "Social Interaction", grade: "A" },
        { skill: "Emotional Expression", grade: "B" },
      ],
    },
    {
      id: 3,
      name: "Cognitive Development",
      grades: [
        { skill: "Problem Solving", grade: "A" },
        { skill: "Memory Skills", grade: "B" },
      ],
    },
    {
      id: 4,
      name: "Spiritual",
      grades: [
        { skill: "Prayer", grade: "A" },
        { skill: "Bible Knowledge", grade: "A" },
      ],
    },
  ],
  2: [
    {
      id: 1,
      name: "Physical Development",
      grades: [
        { skill: "Gross Motor Skills", description: "Runs and jumps with confidence", grade: "A" },
        { skill: "Fine Motor Skills", description: "Writes and cuts with precision", grade: "A" },
        { skill: "Drawing Recognize Pictures", grade: "A" },
        { skill: "Coloring with Lines", grade: "A" },
        { skill: "Printing Own Name", grade: "A" },
      ],
    },
    {
      id: 2,
      name: "Socio-Emotional Development",
      grades: [
        { skill: "Social Interaction", grade: "A" },
        { skill: "Emotional Expression", grade: "A" },
      ],
    },
    {
      id: 3,
      name: "Cognitive Development",
      grades: [
        { skill: "Problem Solving", grade: "A" },
        { skill: "Memory Skills", grade: "A" },
      ],
    },
    {
      id: 4,
      name: "Spiritual",
      grades: [
        { skill: "Prayer", grade: "A" },
        { skill: "Bible Knowledge", grade: "A" },
      ],
    },
  ],
  3: [
    {
      id: 1,
      name: "Physical Development",
      grades: [
        { skill: "Gross Motor Skills", description: "Demonstrates excellent coordination", grade: "A" },
        { skill: "Fine Motor Skills", description: "Writes neatly and accurately", grade: "A" },
        { skill: "Drawing Recognize Pictures", grade: "A" },
        { skill: "Coloring with Lines", grade: "A" },
        { skill: "Printing Own Name", grade: "A" },
      ],
    },
    {
      id: 2,
      name: "Socio-Emotional Development",
      grades: [
        { skill: "Social Interaction", grade: "A" },
        { skill: "Emotional Expression", grade: "A" },
      ],
    },
    {
      id: 3,
      name: "Cognitive Development",
      grades: [
        { skill: "Problem Solving", grade: "A" },
        { skill: "Memory Skills", grade: "A" },
      ],
    },
    {
      id: 4,
      name: "Spiritual",
      grades: [
        { skill: "Prayer", grade: "A" },
        { skill: "Bible Knowledge", grade: "A" },
      ],
    },
  ],
};

const DEFAULT_REMARKS = {
  1: "The student has shown good progress in the first quarter. Keep up the good work!",
  2: "Excellent improvement this quarter. The student continues to develop key skills.",
  3: "Outstanding performance throughout the year. Well-prepared for the next level.",
};

const DEFAULT_GRADE_REPORT_STUDENTS = [
  { schoolId: "GCA-2026-001", lrn: "1204567891011", name: "Rosaline Romasanta", gender: "Female", gradeLevel: "Nursery" },
  { schoolId: "GCA-2026-002", lrn: "1204567891012", name: "Angela Cruz", gender: "Female", gradeLevel: "Nursery" },
  { schoolId: "GCA-2026-003", lrn: "1204567891013", name: "Miguel Santos", gender: "Male", gradeLevel: "Nursery" },
  { schoolId: "GCA-2026-004", lrn: "1345698721234", name: "Jake Macasinag", gender: "Male", gradeLevel: "Nursery" },
  { schoolId: "GCA-2026-005", lrn: "1345698721235", name: "Bella Reyes", gender: "Female", gradeLevel: "Nursery" },
];

export function getQuarters() {
  return DEFAULT_QUARTERS;
}

export function getGradeRoster() {
  return readStore().gradeRoster ?? DEFAULT_ROSTER;
}

export function saveGradeRoster(students) {
  writeStore({ gradeRoster: students });
  return students;
}

export function getBulkGradeRecords() {
  const records = readStore().teacherBulkGradeRecords;
  return Array.isArray(records) ? records : [];
}

const normalizeRecordId = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s/g, "")
    .toUpperCase();

const getRecordKey = (record) =>
  [
    String(record.sectionId ?? ""),
    normalizeRecordId(record.studentId),
    String(record.subject ?? "").trim().toLowerCase(),
    String(record.skill ?? "").trim().toLowerCase(),
    String(record.quarter ?? ""),
  ].join("|");

export function updateBulkGradeRecords(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("At least one grade record is required.");
  }

  const existingRecords = getBulkGradeRecords();
  const updates = new Map(
    records.map((record) => [getRecordKey(record), record]),
  );
  let updatedCount = 0;

  const nextRecords = existingRecords.map((record) => {
    const update = updates.get(getRecordKey(record));

    if (!update) return record;

    updatedCount += 1;

    return {
      ...record,
      grade: update.grade,
      remarks: update.remarks ?? record.remarks,
      updatedAt: new Date().toISOString(),
    };
  });

  if (updatedCount === 0) {
    throw new Error("No matching grade records were found to update.");
  }

  writeStore({ teacherBulkGradeRecords: nextRecords });
  return nextRecords;
}

export function saveBulkGradeRecords(records) {
  if (!Array.isArray(records) || records.length === 0) {
    throw new Error("At least one grade record is required.");
  }

  const existingRecords = getBulkGradeRecords();
  const existingKeys = new Set(existingRecords.map(getRecordKey));
  const submissionKeys = new Set();

  for (const record of records) {
    const key = getRecordKey(record);

    if (existingKeys.has(key) || submissionKeys.has(key)) {
      throw new Error(
        "This upload contains a duplicate grade for a student, subject, skill, and quarter.",
      );
    }

    submissionKeys.add(key);
  }

  const nextRecords = [...existingRecords, ...records];
  writeStore({ teacherBulkGradeRecords: nextRecords });
  return records;
}

export function getGradeRemarks(sectionId, studentId) {
  const stored = readStore().teacherGradeRemarks;

  if (!Array.isArray(stored)) return {};

  return stored.reduce((remarks, record) => {
    if (
      String(record.sectionId) === String(sectionId) &&
      normalizeRecordId(record.studentId) === normalizeRecordId(studentId)
    ) {
      remarks[String(record.quarter)] = String(record.remarks ?? "");
    }

    return remarks;
  }, {});
}

export function saveGradeRemarks({ sectionId, studentId, remarks = {} }) {
  const stored = readStore().teacherGradeRemarks;
  const existing = Array.isArray(stored) ? stored : [];
  const nextRecords = existing.filter(
    (record) =>
      !(
        String(record.sectionId) === String(sectionId) &&
        normalizeRecordId(record.studentId) === normalizeRecordId(studentId)
      ),
  );

  Object.entries(remarks).forEach(([quarter, text]) => {
    const value = String(text ?? "").trim();

    if (!value) return;

    nextRecords.push({
      sectionId,
      studentId,
      quarter: Number(quarter),
      remarks: value,
      updatedAt: new Date().toISOString(),
    });
  });

  writeStore({ teacherGradeRemarks: nextRecords });
  return nextRecords;
}

export function getGradeReportStudents() {
  return readStore().gradeReportStudents ?? DEFAULT_GRADE_REPORT_STUDENTS;
}

export function saveGradeReportStudents(students) {
  writeStore({ gradeReportStudents: students });
  return students;
}

export function getDevelopments() {
  const stored = readStore().developments;
  if (stored && !Array.isArray(stored)) return stored;
  return DEFAULT_DEVELOPMENTS;
}

export function getRemarks() {
  const stored = readStore().remarks;
  if (stored && !Array.isArray(stored)) return stored;
  return DEFAULT_REMARKS;
}

export function saveDevelopments(developments) {
  writeStore({ developments });
  return developments;
}
