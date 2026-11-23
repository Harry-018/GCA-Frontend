export const queryKeys = {
  schoolInformation: ["school-information"],

  homepage: {
    all: ["homepage"],
    banner: ["homepage", "banner"],
    academicPrograms: ["homepage", "academic-programs"],
    childrenActivities: ["homepage", "children-activities"],
    missionVision: ["homepage", "mission-vision"],
    reasons: ["homepage", "reasons"],
    video: ["homepage", "video"],
  },

  tuition: {
    all: ["tuition"],
    gradeLevels: ["tuition", "grade-levels"],
    fees: (gradeLevelId) => ["tuition", "fees", gradeLevelId],
    paymentOptions: (gradeLevelId) => [
      "tuition",
      "payment-options",
      gradeLevelId,
    ],
  },

  dashboard: (schoolYearId = null) => ["dashboard", schoolYearId],
  recentApplicants: ["dashboard", "recent-applicants"],

  preEnrollment: {
    all: ["pre-enrollment"],
    // Prefix keys invalidate every filter/page variant of a list without
    // touching sibling lists in the same namespace.
    applicationsAll: ["pre-enrollment", "applications"],
    applications: (filters) => ["pre-enrollment", "applications", filters],
    approvedApplicantsAll: ["pre-enrollment", "approved-applicants"],
    approvedApplicants: (filters) => [
      "pre-enrollment",
      "approved-applicants",
      filters,
    ],
    rejectionReasons: ["pre-enrollment", "rejection-reasons"],
  },

  academics: {
    schoolYears: (filters) => ["academics", "school-years", filters],
    gradeLevels: ["academics", "grade-levels"],
    sectionNames: ["academics", "section-names"],
    advisers: ["academics", "advisers"],
  },

  teachers: {
    all: ["teachers"],
    me: ["teachers", "me"],
    assignedSections: ["teachers", "assigned-sections"],
    schedules: ["teachers", "schedules"],
    attendance: (sectionId, date) => ["teachers", "attendance", sectionId, date],
    attendanceReport: (sectionId, month, year) => [
      "teachers",
      "attendance",
      "report",
      sectionId,
      month,
      year,
    ],
    gradingQuarters: ["teachers", "grading", "quarters"],
    gradingSubjects: (quarterId) => [
      "teachers",
      "grading",
      "subjects",
      quarterId,
    ],
    studentGrades: (filters) => ["teachers", "grading", "students", filters],
  },

  parents: {
    all: ["parents"],
    me: ["parents", "me"],
    students: ["parents", "students"],
    announcements: ["parents", "announcements"],
    subjects: (studentId) => ["parents", "subjects", studentId],
    subjectGrades: (studentId, subjectId, quarterId) => [
      "parents",
      "grades",
      studentId,
      subjectId,
      quarterId,
    ],
    teacherRemarks: (studentId, quarterId) => [
      "parents",
      "remarks",
      studentId,
      quarterId,
    ],
  },

  sections: {
    all: ["sections"],
    list: (filters) => ["sections", "list", filters],
    detail: (sectionId) => ["sections", "detail", sectionId],
  },

  schedules: {
    all: ["schedules"],
    section: (sectionId) => ["schedules", "section", sectionId],
    referenceData: ["schedules", "reference-data"],
  },

  transportation: ["transportation", "routes"],

  inquiries: ["inquiries"],

  communications: {
    announcements: (filters) => ["communications", "announcements", filters],
    announcementCount: ["communications", "announcements", "count"],
    notifications: ["communications", "notifications"],
  },

  userAccounts: (filters) => ["user-accounts", filters],
  activityLogs: (filters) => ["activity-logs", filters],
};
