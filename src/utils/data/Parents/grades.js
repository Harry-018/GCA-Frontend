import { readStore, writeStore } from "../core";

const DEFAULT_QUARTERS = ["QUARTER 1", "QUARTER 2", "QUARTER 3"];

const DEFAULT_ALL_STUDENTS = {
  "GCA-S01": {
    student: {
      lastName: "Santiago",
      firstName: "Maria Margarett",
      learnerReferenceNumber: "4023-1234-5678",
      studentId: "GCA-S01",
    },
    attendance: {
      totalDays: 120,
      absences: 3,
    },
    developments: {
      1: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Comprehends simple instructions", grade: "A" },
            { skill: "Speaking", description: "Expresses ideas clearly", grade: "A" },
            { skill: "Reading", description: "Reads with understanding", grade: "A" },
            { skill: "Writing", description: "Writes legibly", grade: "B" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Coordination and balance", grade: "A" },
            { skill: "Fine Motor Skills", description: "Hand-eye coordination", grade: "A" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Manages emotions", grade: "A" },
            { skill: "Social Skills", description: "Cooperates with peers", grade: "A" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Solves age-appropriate tasks", grade: "A" },
            { skill: "Mathematical Thinking", description: "Counts and recognizes numbers", grade: "B" },
          ],
        },
      ],
      2: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Follows multi-step directions", grade: "A" },
            { skill: "Speaking", description: "Narrates experiences clearly", grade: "A" },
            { skill: "Reading", description: "Reads simple sentences", grade: "A" },
            { skill: "Writing", description: "Writes simple words", grade: "A" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Runs and jumps with confidence", grade: "A" },
            { skill: "Fine Motor Skills", description: "Writes and cuts with precision", grade: "A" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Controls impulses well", grade: "A" },
            { skill: "Social Skills", description: "Resolves conflicts peacefully", grade: "A" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Applies logic to new situations", grade: "A" },
            { skill: "Mathematical Thinking", description: "Performs simple addition", grade: "A" },
          ],
        },
      ],
      3: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Understands complex instructions", grade: "A" },
            { skill: "Speaking", description: "Communicates fluently", grade: "A" },
            { skill: "Reading", description: "Reads with fluency and comprehension", grade: "A" },
            { skill: "Writing", description: "Writes sentences independently", grade: "A" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Demonstrates excellent coordination", grade: "A" },
            { skill: "Fine Motor Skills", description: "Writes neatly and accurately", grade: "A" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Exhibits strong emotional control", grade: "A" },
            { skill: "Social Skills", description: "Leads group activities positively", grade: "A" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Solves problems independently", grade: "A" },
            { skill: "Mathematical Thinking", description: "Understands basic operations", grade: "A" },
          ],
        },
      ],
    },
    remarks: {
      1: "Maria Margarett is a bright and attentive student. She consistently performs well across all areas.",
      2: "Excellent progress this quarter. Maria Margarett shows strong skills in language and social development.",
      3: "Outstanding performance throughout the year. Maria Margarett is well-prepared for the next level.",
    },
  },
  "GCA-S02": {
    student: {
      lastName: "Dela Cruz",
      firstName: "Juan Carlos",
      learnerReferenceNumber: "4023-5678-9012",
      studentId: "GCA-S02",
    },
    attendance: {
      totalDays: 120,
      absences: 5,
    },
    developments: {
      1: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Comprehends simple instructions", grade: "A" },
            { skill: "Speaking", description: "Expresses ideas clearly", grade: "B" },
            { skill: "Reading", description: "Reads with understanding", grade: "A" },
            { skill: "Writing", description: "Writes legibly", grade: "B" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Coordination and balance", grade: "A" },
            { skill: "Fine Motor Skills", description: "Hand-eye coordination", grade: "C" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Manages emotions", grade: "A" },
            { skill: "Social Skills", description: "Cooperates with peers", grade: "B" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Solves age-appropriate tasks", grade: "B" },
            { skill: "Mathematical Thinking", description: "Counts and recognizes numbers", grade: "C" },
          ],
        },
      ],
      2: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Follows multi-step directions", grade: "A" },
            { skill: "Speaking", description: "Narrates experiences clearly", grade: "A" },
            { skill: "Reading", description: "Reads simple sentences", grade: "B" },
            { skill: "Writing", description: "Writes simple words", grade: "B" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Runs and jumps with confidence", grade: "A" },
            { skill: "Fine Motor Skills", description: "Writes and cuts with precision", grade: "A" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Controls impulses well", grade: "B" },
            { skill: "Social Skills", description: "Resolves conflicts peacefully", grade: "A" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Applies logic to new situations", grade: "A" },
            { skill: "Mathematical Thinking", description: "Performs simple addition", grade: "B" },
          ],
        },
      ],
      3: [
        {
          title: "Language Development",
          grades: [
            { skill: "Listening", description: "Understands complex instructions", grade: "A" },
            { skill: "Speaking", description: "Communicates fluently", grade: "A" },
            { skill: "Reading", description: "Reads with fluency and comprehension", grade: "A" },
            { skill: "Writing", description: "Writes sentences independently", grade: "B" },
          ],
        },
        {
          title: "Physical Development",
          grades: [
            { skill: "Gross Motor Skills", description: "Demonstrates excellent coordination", grade: "A" },
            { skill: "Fine Motor Skills", description: "Writes neatly and accurately", grade: "A" },
          ],
        },
        {
          title: "Socio-Emotional Development",
          grades: [
            { skill: "Self-Regulation", description: "Exhibits strong emotional control", grade: "A" },
            { skill: "Social Skills", description: "Leads group activities positively", grade: "B" },
          ],
        },
        {
          title: "Cognitive Development",
          grades: [
            { skill: "Problem Solving", description: "Solves problems independently", grade: "A" },
            { skill: "Mathematical Thinking", description: "Understands basic operations", grade: "A" },
          ],
        },
      ],
    },
    remarks: {
      1: "Juan Carlos has shown great improvement this quarter. Keep up the good work!",
      2: "Juan Carlos continues to excel and demonstrates a positive attitude toward learning.",
      3: "Excellent performance throughout the year. Juan Carlos is well-prepared for the next level.",
    },
  },
};

export function getParentQuarters() {
  return DEFAULT_QUARTERS;
}

export function getParentGrades() {
  return readStore().parentGrades ?? DEFAULT_ALL_STUDENTS;
}

export function getParentGradeData(studentId) {
  const all = getParentGrades();
  return all[studentId] || all["GCA-S01"];
}

export function saveParentGrades(grades) {
  writeStore({ parentGrades: grades });
  return grades;
}
