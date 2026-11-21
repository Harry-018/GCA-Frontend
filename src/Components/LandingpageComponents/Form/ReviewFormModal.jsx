import React from "react";

import { getStudentLabel } from "./formUtils";

const ReviewField = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-1 text-[9px] sm:text-xs text-neutral-600">{label}</p>

    <div className="truncate rounded-md border border-[#d4d5d9] bg-bone px-2.5 py-1.5 text-2xs text-neutral-700">
      {value || "N/A"}
    </div>
  </div>
);

const ReviewSection = ({ title, children, layered = false }) => (
  <section>
    <h2 className="mb-3 text-[9px] sm:text-xs font-[PoppinsBold] uppercase text-parent-green">
      {title}
    </h2>

    {layered ? (
      <div className="flex flex-col gap-y-3">{children}</div>
    ) : (
      <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
        {children}
      </div>
    )}
  </section>
);

const ReviewRow = ({ children }) => (
  <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-3">
    {children}
  </div>
);

const ReviewFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  data = {},
  gradeLevels = [],
  paymentOptionsMap = {},
}) => {
  if (!isOpen) return null;

  const isLegacy = !Array.isArray(data.students);

  const students = isLegacy
    ? [{ ...data, parents: (data.parents || []).slice(0, 2) }]
    : data.students || [];

  const guardian = isLegacy ? data.parents?.[2] || {} : data.guardian || {};

  const getGradeLevelName = (student) =>
    gradeLevels.find(
      (grade) =>
        Number(grade.grade_level_id) === Number(student.grade_level_id),
    )?.grade_level_name;

  const getPaymentOptionName = (student) => {
    const options = paymentOptionsMap[student.grade_level_id] || [];

    return options.find(
      (option) =>
        Number(option.gradelevel_paymentoption_id) ===
        Number(student.gradelevel_paymentoption_id),
    )?.option_name;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
    >
      <div className="flex max-h-[calc(100dvh-40px)] w-full max-w-200 flex-col rounded-xl bg-[#f2f4fd] p-4 shadow-xl sm:p-6">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h1
            id="review-form-title"
            className="text-sm font-[PoppinsBold] uppercase tracking-wide text-parent-green"
          >
            Review Application
          </h1>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="-m-1 px-2 py-1.5 text-lg leading-none text-neutral-500 hover:text-neutral-800"
          >
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto pr-1">
          {students.map((student, index) => {
            const parents = student.parents || [];
            const father = parents[0] || {};
            const mother = parents[1] || {};
            const studentLabel = getStudentLabel(student, index);

            return (
              <React.Fragment key={student._id || index}>
                {index > 0 && (
                  <div className="my-6 border-t-2 border-parent-green/30" />
                )}

                <ReviewSection
                  title={`Student Information${studentLabel}`}
                  layered
                >
                  <ReviewRow>
                    <ReviewField
                      label="Grade Level"
                      value={getGradeLevelName(student)}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField
                      label="Last Name"
                      value={student.s_last_name}
                    />

                    <ReviewField
                      label="First Name"
                      value={student.s_first_name}
                    />

                    <ReviewField
                      label="Middle Name"
                      value={student.s_mid_name}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField label="Gender" value={student.s_gender} />

                    <ReviewField
                      label="Date of Birth"
                      value={student.s_bdate}
                    />

                    <ReviewField
                      label="Place of Birth"
                      value={student.s_birthplace}
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField label="Religion" value={student.s_religion} />

                    <ReviewField
                      label="Nationality"
                      value={student.s_nationality}
                    />

                    <ReviewField
                      label="Is the student disabled?"
                      value={
                        student.s_disabled === "yes"
                          ? "Yes"
                          : student.s_disabled === "no"
                            ? "No"
                            : "N/A"
                      }
                    />
                  </ReviewRow>

                  <ReviewRow>
                    <ReviewField
                      label="Student disability"
                      value={student.s_disability}
                    />
                  </ReviewRow>
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Student Address${studentLabel}`}
                >
                  <ReviewField label="Province" value={student.province} />

                  <ReviewField label="Zip Code" value={student.zipcode} />

                  <ReviewField
                    label="City / Municipality"
                    value={student.city_municipality}
                  />

                  <ReviewField
                    label="House No. / Street"
                    value={student.house_no}
                  />

                  <ReviewField label="Barangay" value={student.barangay} />
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Father Information${studentLabel}`}
                >
                  <ReviewField label="Last Name" value={father.p_last_name} />

                  <ReviewField label="First Name" value={father.p_first_name} />

                  <ReviewField
                    label="Middle Name"
                    value={father.p_middle_name}
                  />

                  <ReviewField
                    label="Occupation"
                    value={father.p_occupation}
                  />

                  <ReviewField
                    label="Contact Number"
                    value={father.p_contact_number}
                  />

                  <ReviewField label="Email" value={father.p_email} />
                </ReviewSection>

                <div className="my-5 border-t border-[#d6d9e2]" />

                <ReviewSection
                  title={`Mother Information${studentLabel}`}
                >
                  <ReviewField label="Last Name" value={mother.p_last_name} />

                  <ReviewField label="First Name" value={mother.p_first_name} />

                  <ReviewField
                    label="Middle Name"
                    value={mother.p_middle_name}
                  />

                  <ReviewField
                    label="Occupation"
                    value={mother.p_occupation}
                  />

                  <ReviewField
                    label="Contact Number"
                    value={mother.p_contact_number}
                  />

                  <ReviewField label="Email" value={mother.p_email} />
                </ReviewSection>

                {index === students.length - 1 && (
                  <div className="my-5 border-t border-[#d6d9e2]" />
                )}
              </React.Fragment>
            );
          })}

          {/* ================= GUARDIAN ================= */}
          <ReviewSection title="Guardian Information">
            <ReviewField label="Last Name" value={guardian.p_last_name} />

            <ReviewField label="First Name" value={guardian.p_first_name} />

            <ReviewField label="Middle Name" value={guardian.p_middle_name} />

            <ReviewField
              label="Relation w/ Student"
              value={guardian.relationship_type}
            />

            <ReviewField
              label="Contact Number"
              value={guardian.p_contact_number}
            />

            <ReviewField label="Email" value={guardian.p_email} />
          </ReviewSection>

          <div className="my-5 border-t border-[#d6d9e2]" />

          {/* ================= PAYMENT ================= */}
          <ReviewSection title="Payment Method">
            {students.map((student, index) => (
              <ReviewField
                key={student._id || index}
                label={`Payment Option${getStudentLabel(student, index)}`}
                value={getPaymentOptionName(student)}
              />
            ))}
          </ReviewSection>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-bone px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-neutral-600 shadow-sm sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-md bg-parent-green px-5 py-2.5 text-xs font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
