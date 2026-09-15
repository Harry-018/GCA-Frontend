import { readStore, writeStore } from "../core";

const DEFAULT_STUDENTS = [
  {
    lastName: "SANTIAGO",
    firstName: "Maria Margarett",
    lrn: "4023-1234-5678",
    studentId: "GCA-S01",
    sy: "2025 - 2026",
    classSchedule: "Monday - Friday",
    gradeLevel: "Nursery",
    room: "Mahogany - 3",
    classTime: "7:00 AM - 11:00 AM",
    adviser: "Ms. Rosary Mendez",
  },
];

const DEFAULT_ANNOUNCEMENTS = [
  {
    title: "AWARDING CEREMONY",
    posted: "June 1, 2026",
    message:
      "Dear [Team/Colleagues/Community], We are thrilled to announce that our Annual Awarding Ceremony is just around the corner! Join us as we celebrate excellence, hard work, and outstanding achievements within our organization, We will Incourage and Expecting all of you is Join this Oppurtunity.",
    date: "[Day of week], [Month, Date, Year]",
    time: "[Start Time] to [End Time]",
    venue: "[Location Name, Address] / [Virtual Platform Link]",
  },
  {
    title: "FIELD TRIP",
    posted: "June 1, 2026",
    message:
      "Dear Parents and Guardians, We are excited to announce an upcoming educational field trip for [Grade Level/Class] students to [Destination] on [Date]. This trip is designed to complement our current curriculum in [Subject] by providing students with hands-on, real-world experiences outside the classroom.",
    date: "[Day of week], [Month, Date, Year]",
    time: "[Start Time] to [End Time]",
    venue: "[Location Name, Address] / [Virtual Platform Link]",
  },
];

export function getParentStudents() {
  return readStore().parentStudents ?? DEFAULT_STUDENTS;
}

export function saveParentStudents(students) {
  writeStore({ parentStudents: students });
  return students;
}

export function getAnnouncements() {
  return readStore().announcements ?? DEFAULT_ANNOUNCEMENTS;
}

export function saveAnnouncements(announcements) {
  writeStore({ announcements });
  return announcements;
}
