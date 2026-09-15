import { readStore, writeStore } from "../core";

const DEFAULT_SECTIONS = [
  { id: "sampaguita", name: "Sampaguita", level: "Nursery" },
  { id: "gumamela", name: "Gumamela", level: "Nursery" },
  { id: "hope", name: "Hope", level: "Nursery" },
];

export function getSections() {
  return readStore().teacherSections ?? DEFAULT_SECTIONS;
}

export function saveSections(sections) {
  writeStore({ teacherSections: sections });
  return sections;
}
