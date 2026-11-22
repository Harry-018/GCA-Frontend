import React from "react";

const ViewApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  const {
    student = applicant,
    father = {},
    mother = {},
    guardian = {},
    address = {},
  } = applicant;

  const sections = [
    {
      title: "Student Information",
      className: "sm:col-span-2",
      columns: 2,
      fields: [
        ["Grade Level", student.gradeLevel],
        ["Last Name", student.lastName],
        ["First Name", student.firstName],
        ["Middle Name", student.middleName],
        ["Age", student.age],
        ["Gender", student.gender],
        ["Date of Birth", student.dateOfBirth],
        ["Place of Birth", student.placeOfBirth],
        ["Religion", student.religion],
        ["Nationality", student.nationality],
        ["Disability", student.disability],
      ],
    },

    {
      title: "Student Address",
      fields: [
        ["House No. / Street", address.street],
        ["Barangay", address.barangay],
        ["City / Municipality", address.city],
        ["Province", address.province],
        ["Zip Code", address.zipCode],
      ],
    },
    {
      title: "Father Information",
      fields: [
        ["Last Name", father.lastName],
        ["First Name", father.firstName],
        ["Middle Name", father.middleName],
        ["Occupation", father.occupation],
        ["Contact No.", father.contactNo],
        ["Email", father.email],
      ],
    },
    {
      title: "Mother Information",
      fields: [
        ["Last Name", mother.lastName],
        ["First Name", mother.firstName],
        ["Middle Name", mother.middleName],
        ["Occupation", mother.occupation],
        ["Contact No.", mother.contactNo],
        ["Email", mother.email],
      ],
    },
    {
      title: "Guardian Information",
      fields: [
        ["Last Name", guardian.lastName],
        ["First Name", guardian.firstName],
        ["Middle Name", guardian.middleName],
        ["Occupation", guardian.occupation],
        ["Contact No.", guardian.contactNo],
        ["Email", guardian.email],
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-2 py-3 sm:px-4">
      <div className="max-h-[calc(100dvh-1.5rem)] w-full max-h-5xl max-w-7xl overflow-y-auto rounded-xl bg-bone p-3 shadow-[0_4px_12px_rgba(0,0,0,0.2)] sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-2xl sm:p-4">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`rounded-xl border border-gray-400 px-3 py-3 ${
                section.className || ""
              }`}
            >
              <h2 className="py-4 text-xs font-[Poppins] text-parent-green">
                {section.title}
              </h2>

              <div
                className={
                  section.columns === 2
                    ? "grid grid-cols-1 gap-x-4 sm:grid-cols-2"
                    : "flex flex-col"
                }
              >
                {section.fields.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[72px_1fr] gap-x-2 text-[11px] text-gray-600 sm:grid-cols-[100px_1fr] sm:gap-x-0 lg:text-xs xl:text-sm"
                  >
                    <span>{label}:</span>

                    <span className="min-w-0 wrap-break-word">
                      {value || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {applicant.status === "Rejected" && applicant.rejectionReason && (
            <div className="sm:col-span-3 rounded-xl border border-reject px-3 py-3">
              <h2 className="py-3 text-xs font-[Poppins] text-reject">
                Reason for Rejection
              </h2>
              <p className="text-xs text-gray-600">
                {applicant.rejectionReason}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end px-1 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full border border-gray-400 px-6 py-1.5 text-[11px] text-gray-700 transition hover:bg-gray-100 sm:w-auto sm:px-9 lg:text-xs xl:text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantModal;
