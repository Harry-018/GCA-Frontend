import { readStore, writeStore } from "../core";

const ATTENDANCE_OPTIONS = [
  { value: "Present", label: "Present" },
  { value: "Absent", label: "Absent" },
];

const DEFAULT_STUDENTS = [
  { id: 1, sectionId: "sampaguita", schoolId: "GCA-2026-001", lrn: "1204567891011", fullName: "Rosaline Romasanta", gender: "Female", attendance: "Present" },
  { id: 2, sectionId: "sampaguita", schoolId: "GCA-2026-002", lrn: "1204567891012", fullName: "Angela Cruz", gender: "Female", attendance: "Present" },
  { id: 3, sectionId: "sampaguita", schoolId: "GCA-2026-003", lrn: "1204567891013", fullName: "Miguel Santos", gender: "Male", attendance: "" },
  { id: 4, sectionId: "gumamela", schoolId: "GCA-2026-004", lrn: "1345698721234", fullName: "Jake Macasinag", gender: "Male", attendance: "Absent" },
  { id: 5, sectionId: "gumamela", schoolId: "GCA-2026-005", lrn: "1345698721235", fullName: "Bella Reyes", gender: "Female", attendance: "" },
  { id: 6, sectionId: "hope", schoolId: "GCA-2026-006", lrn: "1232173271321", fullName: "Harold Mendez", gender: "Male", attendance: "Absent" },
  { id: 7, sectionId: "hope", schoolId: "GCA-2026-007", lrn: "1232173271322", fullName: "Liza Bautista", gender: "Female", attendance: "" },
];

export function getAttendanceOptions() {
  return ATTENDANCE_OPTIONS;
}

export function getAttendanceStudents() {
  return readStore().attendanceStudents ?? DEFAULT_STUDENTS;
}

export function saveAttendanceStudents(students) {
  writeStore({ attendanceStudents: students });
  return students;
}
