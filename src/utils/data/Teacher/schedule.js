import { readStore, writeStore } from "../core";

const DEFAULT_SCHEDULE = [
  {
    time: "7:30 AM - 8:30 AM",
    monday: { section: "Kinder - Sunflower", subject: "Reading" },
    tuesday: null,
    wednesday: { section: "Kinder - Sunflower", subject: "Reading" },
    thursday: null,
    friday: { section: "Kinder - Sunflower", subject: "Reading" },
  },
  {
    time: "8:30 AM - 9:30 AM",
    monday: null,
    tuesday: { section: "Kinder - Rose", subject: "Numbers" },
    wednesday: null,
    thursday: { section: "Kinder - Rose", subject: "Numbers" },
    friday: { section: "Kinder - Rose", subject: "Numbers" },
  },
  {
    time: "9:30 AM - 10:30 AM",
    monday: { section: "Kinder - Sunflower", subject: "Arts and Crafts" },
    tuesday: { section: "Kinder - Sunflower", subject: "Arts and Crafts" },
    wednesday: null,
    thursday: null,
    friday: null,
  },
  {
    time: "10:30 AM - 11:30 AM",
    monday: null,
    tuesday: { section: "Kinder - Rose", subject: "Shapes and Colors" },
    wednesday: { section: "Kinder - Rose", subject: "Shapes and Colors" },
    thursday: { section: "Kinder - Rose", subject: "Shapes and Colors" },
    friday: { section: "Kinder - Sunflower", subject: "Story Time" },
  },
  {
    time: "11:30 AM - 1:00 PM",
    monday: { section: "Lunch Time", subject: "" },
    tuesday: { section: "Lunch Time", subject: "" },
    wednesday: { section: "Lunch Time", subject: "" },
    thursday: { section: "Lunch Time", subject: "" },
    friday: { section: "Lunch Time", subject: "" },
  },
  {
    time: "1:00 PM - 2:00 PM",
    monday: { section: "Kinder - Sunflower", subject: "Story Time" },
    tuesday: null,
    wednesday: { section: "Kinder - Sunflower", subject: "Story Time" },
    thursday: null,
    friday: null,
  },
  {
    time: "2:00 PM - 3:00 PM",
    monday: null,
    tuesday: { section: "Kinder - Rose", subject: "Music and Movement" },
    wednesday: null,
    thursday: { section: "Kinder - Rose", subject: "Music and Movement" },
    friday: { section: "Kinder - Rose", subject: "Music and Movement" },
  },
  {
    time: "3:00 PM - 4:00 PM",
    monday: { section: "Play Time", subject: "" },
    tuesday: { section: "Play Time", subject: "" },
    wednesday: { section: "Play Time", subject: "" },
    thursday: { section: "Play Time", subject: "" },
    friday: { section: "Play Time", subject: "" },
  },
];

export function getSchedule() {
  return readStore().teacherSchedule ?? DEFAULT_SCHEDULE;
}

export function saveSchedule(schedule) {
  writeStore({ teacherSchedule: schedule });
  return schedule;
}
