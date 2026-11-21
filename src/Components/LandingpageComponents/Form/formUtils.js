const CONTACT_NUMBER_PATTERN = /^09\d{9}$/;

const createId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const STUDENT_FIELD_KEYS = [
  "grade_level_id",
  "gradelevel_paymentoption_id",
  "s_last_name",
  "s_first_name",
  "s_mid_name",
  "s_gender",
  "s_bdate",
  "s_birthplace",
  "s_religion",
  "s_nationality",
  "s_disabled",
  "s_disability",
  "province",
  "city_municipality",
  "barangay",
  "house_no",
  "zipcode",
];

// Old drafts stored PSGC codes in the address fields. Convert them to the
// display names that the form now keeps (and that the backend should store).
const LEGACY_PSGC_NAMES = {
  "0402100000": "Cavite",
  "0402120000": "Tanza",
  "0402122000": "City of Trece Martires",
};

const resolveAddressValue = (key, value) =>
  ["province", "city_municipality"].includes(key)
    ? LEGACY_PSGC_NAMES[value] || value
    : value;

export const createParent = (relationship_type = "") => ({
  p_first_name: "",
  p_last_name: "",
  p_middle_name: "",
  p_contact_number: "09",
  p_occupation: "",
  p_email: "",
  relationship_type,
  will_receive_account: false,
});

export const ensureContactNumber = (parent) => ({
  ...parent,
  p_contact_number: parent?.p_contact_number || "09",
});

export const createStudent = () => ({
  _id: createId(),
  ...STUDENT_FIELD_KEYS.reduce((fields, key) => {
    fields[key] = "";
    return fields;
  }, {}),
  parents: [createParent("Father"), createParent("Mother")],
});

export const createInitialData = () => ({
  students: [createStudent()],
  guardian: createParent(""),
});

export const isValidContactNumber = (value) =>
  CONTACT_NUMBER_PATTERN.test(String(value || ""));

const PARENT_INFO_KEYS = [
  "p_first_name",
  "p_last_name",
  "p_middle_name",
  "p_contact_number",
  "p_occupation",
  "p_email",
  "relationship_type",
  "will_receive_account",
];

const hasParentInformation = (parent, blankParent) =>
  PARENT_INFO_KEYS.some(
    (key) => String(parent?.[key] ?? "") !== String(blankParent?.[key] ?? ""),
  );

export const hasFormInformation = (data, agreed = false) => {
  if (agreed) return true;

  const blank = applyVerifiedParent(createInitialData());
  const students = Array.isArray(data?.students) ? data.students : [];

  if (students.length !== blank.students.length) {
    return true;
  }

  const hasStudentInformation = students.some((student, index) => {
    const blankStudent = blank.students[index] || {};

    const hasStudentFields = STUDENT_FIELD_KEYS.some(
      (key) => String(student?.[key] ?? "") !== String(blankStudent[key] ?? ""),
    );

    const parents = Array.isArray(student?.parents) ? student.parents : [];
    const blankParents = Array.isArray(blankStudent.parents)
      ? blankStudent.parents
      : [];

    const hasParentFields = parents.some((parent, parentIndex) =>
      hasParentInformation(parent, blankParents[parentIndex]),
    );

    return hasStudentFields || hasParentFields;
  });

  return (
    hasStudentInformation ||
    hasParentInformation(data?.guardian, blank.guardian)
  );
};

export const getStudentLabel = (student, index) => {
  const name = [student?.s_last_name, student?.s_first_name]
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .join(", ");

  return ` - ${name || `Student ${index + 1}`}`;
};

export const formatDateInput = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const getMaxBirthDate = () => {
  const cutoff = new Date();

  cutoff.setHours(0, 0, 0, 0);
  cutoff.setFullYear(cutoff.getFullYear() - 3);

  return formatDateInput(cutoff);
};

export const isAtLeast3YearsOld = (value) => {
  if (!value) return false;

  const birthDate = new Date(`${value}T00:00:00`);

  if (Number.isNaN(birthDate.getTime())) return false;

  const cutoff = new Date();

  cutoff.setHours(0, 0, 0, 0);
  cutoff.setFullYear(cutoff.getFullYear() - 3);

  return birthDate <= cutoff;
};

const normalizeParent = (parent, relationshipType) =>
  ensureContactNumber({
    ...createParent(relationshipType),
    ...(parent || {}),
    relationship_type: parent?.relationship_type || relationshipType,
  });

export const normalizeFormData = (saved) => {
  if (!saved || typeof saved !== "object") {
    return createInitialData();
  }

  if (Array.isArray(saved.students) && saved.students.length > 0) {
    return {
      students: saved.students.map((student) => {
        const normalized = createStudent();

        STUDENT_FIELD_KEYS.forEach((key) => {
          if (student?.[key] !== undefined) {
            normalized[key] = resolveAddressValue(key, student[key]);
          }
        });

        normalized._id = student?._id || normalized._id;
        normalized.parents = [
          normalizeParent(student?.parents?.[0], "Father"),
          normalizeParent(student?.parents?.[1], "Mother"),
        ];

        return normalized;
      }),
      guardian: normalizeParent(saved.guardian, ""),
    };
  }

  const parents = Array.isArray(saved.parents) ? saved.parents : [];

  const father =
    parents.find((parent) => parent.relationship_type === "Father") ||
    parents[0] ||
    {};

  const mother =
    parents.find((parent) => parent.relationship_type === "Mother") ||
    parents[1] ||
    {};

  const guardian =
    parents.find(
      (parent) => !["Father", "Mother"].includes(parent.relationship_type),
    ) ||
    parents[2] ||
    {};

  const student = createStudent();

  STUDENT_FIELD_KEYS.forEach((key) => {
    if (saved[key] !== undefined) {
      student[key] = resolveAddressValue(key, saved[key]);
    }
  });

  student.parents = [
    normalizeParent(father, "Father"),
    normalizeParent(mother, "Mother"),
  ];

  return {
    students: [student],
    guardian: normalizeParent(guardian, guardian.relationship_type || ""),
  };
};

export const applyVerifiedParent = (data) => {
  const verifiedEmail = localStorage.getItem("verified_email");
  const accountParent = localStorage.getItem("account_parent_relationship");

  const accountParentIndex = {
    Father: 0,
    Mother: 1,
    Guardian: 2,
  }[accountParent];

  if (!verifiedEmail || accountParentIndex === undefined) {
    return data;
  }

  return {
    ...data,
    students: data.students.map((student) => ({
      ...student,
      parents: (student.parents || []).map((parent, index) => ({
        ...parent,
        p_email: index === accountParentIndex ? verifiedEmail : parent.p_email,
        will_receive_account: index === accountParentIndex,
      })),
    })),
    guardian: {
      ...data.guardian,
      p_email:
        accountParentIndex === 2
          ? verifiedEmail
          : data.guardian?.p_email || "",
      will_receive_account: accountParentIndex === 2,
    },
  };
};

export const applyVerifiedParentToStudent = (student) => {
  const verifiedEmail = localStorage.getItem("verified_email");
  const accountParent = localStorage.getItem("account_parent_relationship");

  const accountParentIndex = {
    Father: 0,
    Mother: 1,
  }[accountParent];

  if (!verifiedEmail || accountParentIndex === undefined) {
    return student;
  }

  return {
    ...student,
    parents: student.parents.map((parent, index) =>
      index === accountParentIndex
        ? {
            ...parent,
            p_email: verifiedEmail,
            will_receive_account: true,
          }
        : parent,
    ),
  };
};

export const buildStudentPayload = (student, guardian) => {
  const studentFields = { ...student };

  delete studentFields._id;
  delete studentFields.parents;

  const parents = student.parents || [];

  return {
    ...studentFields,
    parents: [
      parents[0] || createParent("Father"),
      parents[1] || createParent("Mother"),
      { ...(guardian || createParent("")) },
    ],
  };
};

export const buildSubmissionData = (formData, verificationId) => {
  const students = (formData.students || []).map((student) =>
    buildStudentPayload(student, formData.guardian),
  );

  return {
    verification_id: verificationId,
    students:
      students.length > 0
        ? students
        : [buildStudentPayload(createStudent(), formData.guardian)],
  };
};
