import { readStore, writeStore } from "../core";

const DEFAULT_STUDENTS = [
  { id: 1, sectionId: "sampaguita", schoolId: "GCA-2026-001", lrn: "1204567891011", fullName: "Rosaline Romasanta", gender: "Female", birthdate: "10/20/2021", age: 4 },
  { id: 2, sectionId: "sampaguita", schoolId: "GCA-2026-002", lrn: "1204567891012", fullName: "Angela Cruz", gender: "Female", birthdate: "11/02/2021", age: 4 },
  { id: 3, sectionId: "sampaguita", schoolId: "GCA-2026-003", lrn: "1204567891013", fullName: "Miguel Santos", gender: "Male", birthdate: "01/15/2022", age: 3 },
  { id: 4, sectionId: "gumamela", schoolId: "GCA-2026-004", lrn: "1345698721234", fullName: "Jake Macasinag", gender: "Male", birthdate: "09/15/2022", age: 3 },
  { id: 5, sectionId: "gumamela", schoolId: "GCA-2026-005", lrn: "1345698721235", fullName: "Bella Reyes", gender: "Female", birthdate: "02/28/2022", age: 3 },
  { id: 6, sectionId: "hope", schoolId: "GCA-2026-006", lrn: "1232173271321", fullName: "Harold Mendez", gender: "Male", birthdate: "09/25/2022", age: 3 },
  { id: 7, sectionId: "hope", schoolId: "GCA-2026-007", lrn: "1232173271322", fullName: "Liza Bautista", gender: "Female", birthdate: "05/14/2022", age: 3 },
];

export function getTeacherDashboardStudents() {
  return readStore().teacherDashboardStudents ?? DEFAULT_STUDENTS;
}

export function saveTeacherDashboardStudents(students) {
  writeStore({ teacherDashboardStudents: students });
  return students;
}
