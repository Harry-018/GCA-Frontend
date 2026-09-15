import { readStore, writeStore } from "../core";

const DEFAULT_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DEFAULT_DATES = [
  "Jul 31", "Jul 30", "Jul 29", "Jul 28", "Jul 27", "Jul 26", "Jul 25", "Jul 24",
];

const DEFAULT_YEARS = ["2026", "2027", "2028"];

const DEFAULT_STUDENTS = [
  {
    schoolId: "GCA-2026-001",
    name: "Rosaline Romasanta",
    attendance: {
      "Jul 31": true, "Jul 30": true, "Jul 29": false, "Jul 28": true,
      "Jul 27": true, "Jul 26": true, "Jul 25": true, "Jul 24": true,
    },
  },
  {
    schoolId: "GCA-2026-002",
    name: "Jake Macasing",
    attendance: {
      "Jul 31": false, "Jul 30": true, "Jul 29": true, "Jul 28": false,
      "Jul 27": true, "Jul 26": true, "Jul 25": true, "Jul 24": false,
    },
  },
];

export function getReportMonths() {
  return DEFAULT_MONTHS;
}

export function getReportDates() {
  return DEFAULT_DATES;
}

export function getReportYears() {
  return DEFAULT_YEARS;
}

export function getReportStudents() {
  return readStore().reportStudents ?? DEFAULT_STUDENTS;
}

export function saveReportStudents(students) {
  writeStore({ reportStudents: students });
  return students;
}
