import { readAcademicStore, writeAcademicStore } from "../core";

const DEFAULT_STUDENTS = [
  { id: "1601", lrn: "123456789001", lastName: "Reyes", firstName: "John", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1602", lrn: "123456789002", lastName: "Santos", firstName: "Maria", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1603", lrn: "123456789003", lastName: "Torres", firstName: "Kevin", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1604", lrn: "123456789004", lastName: "Garcia", firstName: "Paul", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "All In" },
  { id: "1605", lrn: "123456789005", lastName: "Molina", firstName: "Anne", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1606", lrn: "123456789006", lastName: "Dela Cruz", firstName: "Liam", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1607", lrn: "123456789007", lastName: "Ramos", firstName: "Sofia", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1608", lrn: "123456789008", lastName: "Bautista", firstName: "Miguel", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "All In" },
  { id: "1609", lrn: "123456789009", lastName: "Aquino", firstName: "Ella", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1610", lrn: "123456789010", lastName: "Mendoza", firstName: "James", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1611", lrn: "123456789011", lastName: "Villanueva", firstName: "Luna", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1612", lrn: "123456789012", lastName: "Navarro", firstName: "Ethan", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "All In" },
  { id: "1613", lrn: "123456789013", lastName: "Soriano", firstName: "Isabella", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1614", lrn: "123456789014", lastName: "Dizon", firstName: "Noah", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1615", lrn: "123456789015", lastName: "Manalo", firstName: "Amara", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1616", lrn: "123456789016", lastName: "Velasco", firstName: "Gabriel", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1617", lrn: "123456789017", lastName: "Salazar", firstName: "Ariana", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "All In" },
  { id: "1618", lrn: "123456789018", lastName: "Padilla", firstName: "Lucas", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1619", lrn: "123456789019", lastName: "Rosario", firstName: "Mia", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Pay Lite" },
  { id: "1620", lrn: "123456789020", lastName: "Domingo", firstName: "Adrian", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Sampaguita", status: "Active", payment: "Full Cash" },
  { id: "1621", lrn: "123456789021", lastName: "Fernandez", firstName: "Chloe", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Gumamela", status: "Active", payment: "Full Cash" },
  { id: "1622", lrn: "123456789022", lastName: "Castillo", firstName: "Diego", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Gumamela", status: "Active", payment: "Pay Lite" },
  { id: "1623", lrn: "123456789023", lastName: "Roxas", firstName: "Zoe", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Gumamela", status: "Active", payment: "All In" },
  { id: "1624", lrn: "123456789024", lastName: "Ibarra", firstName: "Crisostomo", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Gumamela", status: "Active", payment: "Full Cash" },
  { id: "1625", lrn: "123456789025", lastName: "Basilio", firstName: "Sisa", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Gumamela", status: "Active", payment: "Pay Lite" },
  { id: "1626", lrn: "123456789026", lastName: "Cruz", firstName: "Mateo", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Orchid", status: "Active", payment: "Full Cash" },
  { id: "1627", lrn: "123456789027", lastName: "Riego", firstName: "Lucia", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Orchid", status: "Active", payment: "Full Cash" },
  { id: "1628", lrn: "123456789028", lastName: "Balderama", firstName: "Rafael", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Orchid", status: "Active", payment: "Pay Lite" },
  { id: "1629", lrn: "123456789029", lastName: "Lopez", firstName: "Valentina", gender: "Female", age: "5", gradeLevel: "Kinder", section: "Orchid", status: "Active", payment: "All In" },
  { id: "1630", lrn: "123456789030", lastName: "Ramos", firstName: "Sebastian", gender: "Male", age: "6", gradeLevel: "Kinder", section: "Orchid", status: "Active", payment: "Full Cash" },
];

const DEFAULT_ENROLLED = [
  { id: "1509", lastName: "Gomez", firstName: "Luis", gradeLevel: "Nursery", section: "Nursery-1", status: "Active", payment: "Full Cash" },
  { id: "1511", lastName: "Ramos", firstName: "Ana", gradeLevel: "Kinder", section: "Kinder-1", status: "Active", payment: "Pay Lite" },
];

export function getStudents() {
  return readAcademicStore().students ?? DEFAULT_STUDENTS;
}

export function saveStudents(students) {
  writeAcademicStore({ students });
  return students;
}

export function getEnrolled() {
  return readAcademicStore().enrolledStudents ?? DEFAULT_ENROLLED;
}

export function addEnrolled(student) {
  const enrolled = getEnrolled();
  if (enrolled.some((s) => s.id === student.id)) return enrolled;
  writeAcademicStore({ enrolledStudents: [...enrolled, student] });
  return [...enrolled, student];
}