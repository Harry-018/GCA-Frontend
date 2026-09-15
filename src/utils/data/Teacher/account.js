import { readStore, writeStore } from "../core";

const DEFAULT_TEACHER = {
  fullName: "DELA CRUZ, JUAN P.",
  teacherId: "GCA-T4545",
  gender: "Male",
  birthdate: "January 1, 1990",
  civilStatus: "Married",
};

const DEFAULT_TEACHER_CONTACT = {
  address: "Blk 48 Lot 100 Brgy.Cabuco,\nTrece Martires City, Cavite",
  email: "juancruz@gmail.com",
  contactNumber: "09123456789",
};

const DEFAULT_TEACHER_ACCOUNT = {
  email: "juancruz@gmail.com",
};

export function getTeacher() {
  return readStore().teacher ?? DEFAULT_TEACHER;
}

export function saveTeacher(teacher) {
  writeStore({ teacher });
  return teacher;
}

export function getTeacherContact() {
  return readStore().teacherContact ?? DEFAULT_TEACHER_CONTACT;
}

export function saveTeacherContact(contact) {
  writeStore({ teacherContact: contact });
  return contact;
}

export function getTeacherAccount() {
  return readStore().teacherAccount ?? DEFAULT_TEACHER_ACCOUNT;
}
