import React from "react";

const ViewApplicantModal = ({ applicant, onClose }) => {
  if (!applicant) return null;

  const {
    student = applicant,
    father = {},
    mother = {},
    address = {},
    emergencyContact = {},
  } = applicant;

  const sections = [
    {
      title: "Student Information",
      className: "col-span-2",
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
      title: "Student Address",
      fields: [
        ["House No. / Street", address.street],
        ["Barangay", address.barangay],
        ["City / Municipality", address.city],
        ["Province", address.province],
        ["Region", address.region],
        ["Zip Code", address.zipCode],
      ],
    },
    {
      title: "Emergency Contact",
      fields: [
        ["Last Name", emergencyContact.lastName],
        ["First Name", emergencyContact.firstName],
        ["Relation w/ student", emergencyContact.relationship],
        ["Contact No.", emergencyContact.contactNo],
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
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4">
      <div className="w-full max-w-175 rounded-2xl bg-bone p-4 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
        <div className="grid grid-cols-3 gap-2.5">
          {sections.map((section) => (
            <div
              key={section.title}
              className={`rounded-xl border border-gray-400 px-3 py-3 ${
                section.className || ""
              }`}
            >
              <h2 className="py-4 text-xs font-[PoppinsBold] text-swamp-green">
                {section.title}
              </h2>

              <div
                className={
                  section.columns === 2
                    ? "grid grid-cols-2 gap-x-4"
                    : "flex flex-col"
                }
              >
                {section.fields.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[100px_1fr] text-[11px] text-gray-600"
                  >
                    <span>{label}:</span>

                    <span className="wrap-break-word">
                      {value || "-"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {applicant.status === "Rejected" && applicant.rejectionReason && (
            <div className="col-span-3 rounded-xl border border-[#f47773] px-3 py-3">
              <h2 className="py-3 text-xs font-[PoppinsBold] text-[#f47773]">
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
            className="rounded-full border border-gray-400 px-9 py-1.5 text-[11px] font-medium text-gray-700 transition hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewApplicantModal;