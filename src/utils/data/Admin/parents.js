import { readAcademicStore, writeAcademicStore } from "../core";

const DEFAULT_PARENTS = [
  { id: 1, lastName: "Dela Cruz", firstName: "Maria", student: 2, email: "maria@gmail.com" },
  { id: 2, lastName: "Ramos", firstName: "Antonio", student: 1, email: "antonio@gmail.com" },
  { id: 3, lastName: "Villanueva", firstName: "Bella", student: 3, email: "bella@gmail.com" },
  { id: 4, lastName: "Santos", firstName: "Elena", student: 1, email: "elena@gmail.com" },
  { id: 5, lastName: "Mendoza", firstName: "Dante", student: 2, email: "dante@gmail.com" },
];

export function getParents() {
  return readAcademicStore().parents ?? DEFAULT_PARENTS;
}

export function saveParents(parents) {
  writeAcademicStore({ parents });
  return parents;
}