import React from "react";

const ReviewField = ({ label, value }) => (
  <div className="min-w-0">
    <p className="mb-1 text-[9px] font-medium text-neutral-600">{label}</p>

    <div className="truncate rounded-md border border-[#d4d5d9] bg-white px-2.5 py-1.5 text-2xs text-neutral-700">
      {value || "N/A"}
    </div>
  </div>
);

const ReviewSection = ({ title, children, layered = false }) => (
  <section>
    <h2 className="mb-3 text-[9px] font-bold uppercase text-[#88a06f]">
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
  paymentOptions,
}) => {
  if (!isOpen) return null;

  const selectedGradeLevel = gradeLevels.find(
    (grade) => Number(grade.grade_level_id) === Number(data.grade_level_id),
  );

  const selectedPaymentOption = paymentOptions.find(
    (option) =>
      Number(option.gradelevel_paymentoption_id) ===
      Number(data.gradelevel_paymentoption_id),
  );

  const student = data;

  const parents = student.parents || [];

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

  console.log("CURRENT GRADE:", student.grade_level_id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 px-4 py-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-form-title"
    >
      <div className="flex max-h-[calc(100vh-40px)] w-full max-w-200 flex-col rounded-xl bg-[#f2f4fd] p-4 shadow-xl sm:p-6">
        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between">
          <h1
            id="review-form-title"
            className="text-sm font-bold uppercase tracking-wide text-[#88a06f]"
          >
            Review Application
          </h1>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close review"
            className="text-lg leading-none text-neutral-500 hover:text-neutral-800"
          >
            &times;
          </button>
        </div>

        {/* CONTENT */}
        <div className="overflow-y-auto pr-1">
          {/* ================= STUDENT ================= */}
          <ReviewSection title="Student Information" layered>
            <ReviewRow>
              <ReviewField
                label="Grade Level"
                value={selectedGradeLevel?.grade_level_name}
              />
            </ReviewRow>

            <ReviewRow>
              <ReviewField label="Last Name" value={student.s_last_name} />

              <ReviewField label="First Name" value={student.s_first_name} />

              <ReviewField label="Middle Name" value={student.s_mid_name} />
            </ReviewRow>

            <ReviewRow>
              <ReviewField label="Gender" value={student.s_gender} />

              <ReviewField label="Date of Birth" value={student.s_bdate} />

              <ReviewField
                label="Place of Birth"
                value={student.s_birthplace}
              />
            </ReviewRow>

            <ReviewRow>
              <ReviewField label="Religion" value={student.s_religion} />

              <ReviewField label="Nationality" value={student.s_nationality} />

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

          {/* ================= ADDRESS ================= */}
          <ReviewSection title="Student Address">
            <ReviewField label="Province" value={student.province} />

            <ReviewField label="Zip Code" value={student.zipcode} />

            <ReviewField
              label="City / Municipality"
              value={student.city_municipality}
            />

            <ReviewField label="House No. / Street" value={student.house_no} />

            <ReviewField label="Barangay" value={student.barangay} />
          </ReviewSection>

          <div className="my-5 border-t border-[#d6d9e2]" />

          {/* ================= FATHER ================= */}
          <ReviewSection title="Father Information">
            <ReviewField label="Last Name" value={father.p_last_name} />

            <ReviewField label="First Name" value={father.p_first_name} />

            <ReviewField label="Middle Name" value={father.p_middle_name} />

            <ReviewField label="Occupation" value={father.p_occupation} />

            <ReviewField
              label="Contact Number"
              value={father.p_contact_number}
            />

            <ReviewField label="Email" value={father.p_email} />
          </ReviewSection>

          <div className="my-5 border-t border-[#d6d9e2]" />

          {/* ================= MOTHER ================= */}
          <ReviewSection title="Mother Information">
            <ReviewField label="Last Name" value={mother.p_last_name} />

            <ReviewField label="First Name" value={mother.p_first_name} />

            <ReviewField label="Middle Name" value={mother.p_middle_name} />

            <ReviewField label="Occupation" value={mother.p_occupation} />

            <ReviewField
              label="Contact Number"
              value={mother.p_contact_number}
            />

            <ReviewField label="Email" value={mother.p_email} />
          </ReviewSection>

          <div className="my-5 border-t border-[#d6d9e2]" />

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
            <ReviewField
              label="Payment Option"
              value={selectedPaymentOption?.option_name}
            />
          </ReviewSection>
        </div>

        {/* FOOTER */}
        <div className="flex flex-col gap-2 pt-5 sm:flex-row sm:justify-between">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-md bg-white px-5 py-2.5 text-xs font-bold uppercase text-neutral-600 shadow-sm sm:w-auto"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSubmit}
            className="w-full rounded-md bg-[#9aae80] px-5 py-2.5 text-xs font-bold uppercase text-white shadow-sm sm:w-auto"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewFormModal;
