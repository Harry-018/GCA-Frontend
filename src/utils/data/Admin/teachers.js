import { readAcademicStore, writeAcademicStore } from "../core";

const DEFAULT_TEACHERS = [
  {
    id: 1,
    teacherId: "141420",
    lastName: "Agassi",
    firstName: "Carlos",
    gender: "Male",
    status: "Active",
    email: "carlos@gmail.com",
  },
  {
    id: 2,
    teacherId: "145236",
    lastName: "Bernado",
    firstName: "Kathryn",
    gender: "Female",
    status: "Active",
    email: "kathrynrn@gmail.com",
  },
  {
    id: 3,
    teacherId: "147444",
    lastName: "Jumagesa",
    firstName: "Henry",
    gender: "Male",
    status: "Active",
    email: "hendry@gmail.com",
  },
];

export function getTeachers() {
  return readAcademicStore().teachers ?? DEFAULT_TEACHERS;
}

export function saveTeachers(teachers) {
  writeAcademicStore({ teachers });
  return teachers;
}