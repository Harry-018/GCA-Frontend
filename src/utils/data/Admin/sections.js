import { readAcademicStore, writeAcademicStore } from "../core";

const DEFAULT_SECTIONS = {
  "Pre-School": [
    { id: 1, section: "Sampaguita" },
    { id: 2, section: "Gumamela" },
    { id: 3, section: "Waling Waling" },
    { id: 4, section: "Orchid" },
  ],
  "Pre-Kinder": [
    { id: 1, section: "Sunflower" },
    { id: 2, section: "Rose" },
    { id: 3, section: "Tulip" },
    { id: 4, section: "Daisy" },
  ],
  Kinder: [
    { id: 1, section: "Sunflower" },
    { id: 2, section: "Rose" },
    { id: 3, section: "Tulip" },
    { id: 4, section: "Daisy" },
  ],
};

export function getSections() {
  return readAcademicStore().sections ?? DEFAULT_SECTIONS;
}

export function getSectionsForLevel(level) {
  return getSections()[level] ?? [];
}

export function saveSectionsForLevel(level, sections) {
  const next = { ...getSections(), [level]: sections };
  writeAcademicStore({ sections: next });
  return sections;
}