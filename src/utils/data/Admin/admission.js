import { readStore, writeStore } from "../core";

const DEFAULT_APPLICANTS = [
  { id: "1452", lastName: "Agassi", firstName: "Carlos", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:00:00", status: "Pending" },
  { id: "1456", lastName: "Bernado", firstName: "Kathryn", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:15:00", status: "Pending" },
  { id: "1478", lastName: "Jumagesa", firstName: "Henry", gradeLevel: "Nursery", dateApplied: "2026-08-24 08:30:00", status: "Pending" },
  { id: "1475", lastName: "Kaligtan", firstName: "Michelle", gradeLevel: "Kinder", dateApplied: "2026-08-24 08:45:00", status: "Pending" },
  { id: "1723", lastName: "Kinalina", firstName: "Rexter", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:00:00", status: "Pending" },
  { id: "1458", lastName: "Macasinag", firstName: "Jake", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:15:00", status: "Pending" },
  { id: "4521", lastName: "Padilla", firstName: "Daniel", gradeLevel: "Kinder", dateApplied: "2026-08-24 09:30:00", status: "Pending" },
  { id: "1493", lastName: "Panaga", firstName: "Diane Mae", gradeLevel: "Nursery", dateApplied: "2026-08-24 09:45:00", status: "Pending" },
  { id: "1465", lastName: "Romasanta", firstName: "Rosaline", gradeLevel: "Kinder", dateApplied: "2026-08-24 10:00:00", status: "Pending" },
  { id: "5256", lastName: "Sy", firstName: "James", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:15:00", status: "Pending" },
  { id: "1485", lastName: "Tumatong", firstName: "Yuna Richelle", gradeLevel: "Nursery", dateApplied: "2026-08-24 10:30:00", status: "Pending" },
  { id: "1457", lastName: "Yap", firstName: "Daniel", gradeLevel: "Kinder", dateApplied: "2026-08-24 10:45:00", status: "Pending" },
  { id: "1510", lastName: "Aquino", firstName: "Bianca", gradeLevel: "Nursery", dateApplied: "2026-08-24 11:00:00", status: "Pending" },
  { id: "1512", lastName: "Balagtas", firstName: "Miguel", gradeLevel: "Kinder", dateApplied: "2026-08-24 11:15:00", status: "Pending" },
  { id: "1515", lastName: "Cruz", firstName: "Angela", gradeLevel: "Nursery", dateApplied: "2026-08-24 11:30:00", status: "Pending" },
  { id: "1518", lastName: "Dela Pena", firstName: "Joshua", gradeLevel: "Kinder", dateApplied: "2026-08-24 11:45:00", status: "Pending" },
  { id: "1521", lastName: "Estrada", firstName: "Sofia", gradeLevel: "Nursery", dateApplied: "2026-08-24 12:00:00", status: "Pending" },
  { id: "1524", lastName: "Flores", firstName: "Kyle", gradeLevel: "Kinder", dateApplied: "2026-08-24 12:15:00", status: "Pending" },
  { id: "1527", lastName: "Garcia", firstName: "Jamie", gradeLevel: "Nursery", dateApplied: "2026-08-24 12:30:00", status: "Pending" },
  { id: "1530", lastName: "Herrera", firstName: "Nico", gradeLevel: "Kinder", dateApplied: "2026-08-24 12:45:00", status: "Pending" },
  { id: "1533", lastName: "Ignacio", firstName: "Patricia", gradeLevel: "Nursery", dateApplied: "2026-08-24 13:00:00", status: "Pending" },
  { id: "1536", lastName: "Jimenez", firstName: "Rafael", gradeLevel: "Kinder", dateApplied: "2026-08-24 13:15:00", status: "Pending" },
  { id: "1539", lastName: "Lopez", firstName: "Camille", gradeLevel: "Nursery", dateApplied: "2026-08-24 13:30:00", status: "Pending" },
  { id: "1542", lastName: "Mendoza", firstName: "Marcus", gradeLevel: "Kinder", dateApplied: "2026-08-24 13:45:00", status: "Pending" },
  { id: "1545", lastName: "Navarro", firstName: "Isabel", gradeLevel: "Nursery", dateApplied: "2026-08-24 14:00:00", status: "Pending" },
  { id: "1548", lastName: "Ocampo", firstName: "Gabriel", gradeLevel: "Kinder", dateApplied: "2026-08-24 14:15:00", status: "Pending" },

  { id: "1602", lastName: "Reyes", firstName: "John", gradeLevel: "Kinder", dateApplied: "2026-08-23 09:00:00", dateApproved: "2026-08-25 09:00:00", status: "Approved" },
  { id: "1603", lastName: "Santos", firstName: "Maria", gradeLevel: "Nursery", dateApplied: "2026-08-23 09:30:00", dateApproved: "2026-08-25 09:30:00", status: "Approved" },
  { id: "1705", lastName: "Torres", firstName: "Kevin", gradeLevel: "Kinder", dateApplied: "2026-08-23 10:00:00", dateApproved: "2026-08-25 10:00:00", status: "Approved" },

  { id: "1701", lastName: "Garcia", firstName: "Paul", gradeLevel: "Nursery", dateApplied: "2026-08-22 09:00:00", status: "Rejected", rejectionReason: "incomplete-documents", dateRejected: "2026-08-24 09:00:00" },
  { id: "1702", lastName: "Molina", firstName: "Anne", gradeLevel: "Kinder", dateApplied: "2026-08-22 09:30:00", status: "Rejected", rejectionReason: "not-qualified", dateRejected: "2026-08-24 10:00:00" },
];

export function getApplicants() {
  return readStore().applicants ?? DEFAULT_APPLICANTS;
}

export function saveApplicants(applicants) {
  writeStore({ applicants });
  return applicants;
}

export function getApprovedApplicants() {
  return getApplicants().filter((a) => a.status === "Approved");
}

export function approveApplicants(ids) {
  const applicants = getApplicants().map((a) =>
    ids.includes(a.id) ? { ...a, status: "Approved" } : a
  );
  saveApplicants(applicants);
  return applicants;
}

export function rejectApplicant(id, reason) {
  const applicants = getApplicants().map((a) =>
    a.id === id
      ? {
          ...a,
          status: "Rejected",
          rejectionReason: reason,
          dateRejected: new Date().toISOString().slice(0, 19).replace("T", " "),
        }
      : a
  );
  saveApplicants(applicants);
  return applicants;
}

export function markEnrolled(id) {
  const applicants = getApplicants().map((a) =>
    a.id === id ? { ...a, status: "Enrolled" } : a
  );
  saveApplicants(applicants);
  return applicants;
}
