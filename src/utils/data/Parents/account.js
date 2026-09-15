import { readStore, writeStore } from "../core";

const DEFAULT_PARENT_CONTACT = {
  contactNumber: "0912345678910",
  email: "romasanta@gmail.com",
  address: "",
};

const DEFAULT_PARENT_PROFILE = {
  fullName: "ROMASANTA, ROSALINE M.",
  contactNumber: "0912345678910",
  email: "romasanta@gmail.com",
  emergencyFullName: "ROMASANTA, ROSALINE",
  relationship: "MOTHER",
};

export function getParentContact() {
  return readStore().parentContact ?? DEFAULT_PARENT_CONTACT;
}

export function saveParentContact(contact) {
  writeStore({ parentContact: contact });
  return contact;
}

export function getParentProfile() {
  return readStore().parentProfile ?? DEFAULT_PARENT_PROFILE;
}
