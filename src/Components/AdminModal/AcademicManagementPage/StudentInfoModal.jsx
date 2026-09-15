import React from "react";

const StudentInfoModal = ({
  applicant,
  onClose,
  onSave,
  onChange,
}) => {
    
  const statusOptions = Array.from(
    new Set([
      ...(applicant.statusOptions || []),
      ...(applicant.status ? [applicant.status] : []),
    ])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-300 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Student Information
        </h2>

        {/* Information */}
        <div className="grid grid-cols-1 gap-x-8 py-5 text-[11px] text-gray-500 md:grid-cols-3">
          <div className="flex flex-col gap-y-2">
            <div className="flex h-5 items-center">
              <span className="w-36">Grade Level:</span>
              <span>{applicant.gradeLevel}</span>
            </div>

            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">LRN:</span>

              <input
                type="text"
                name="lrn"
                value={applicant.lrn}
                onChange={onChange}
                className="h-6 w-25 rounded-lg border border-gray-300 bg-white px-2 text-2xs outline-none"
              />
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Last Name:</span>
              <span>{applicant.lastName || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">First Name:</span>
              <span>{applicant.firstName}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Middle Name:</span>
              <span>{applicant.middleName || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Age:</span>
              <span>{applicant.age || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Gender:</span>
              <span>{applicant.gender || "—"}</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex h-5 items-center">
              <span className="w-36">Student No.:</span>
              <span>{applicant.studentNo}</span>
            </div>

            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">Status:</span>

              <select
                name="status"
                value={applicant.status}
                onChange={onChange}
                className="h-7 w-32 border border-gray-300 bg-bone px-2 text-2xs leading-none text-gray-500 outline-none"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Date of Birth:</span>
              <span>{applicant.dateOfBirth || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Place of Birth:</span>
              <span>{applicant.placeOfBirth || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Religion:</span>
              <span>{applicant.religion || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Nationality:</span>
              <span>{applicant.nationality || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Disability:</span>
              <span>{applicant.disability || "—"}</span>
            </div>
          </div>

          {/* Address Information */}
          <div className="flex flex-col gap-y-2 pt-19">
            <div className="flex h-5 items-center">
              <span className="w-36">House No. / Street:</span>
              <span>{applicant.address.street || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Barangay:</span>
              <span>{applicant.address.barangay || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">City / Municipality:</span>
              <span>{applicant.address.city || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Zip Code:</span>
              <span>{applicant.address.zipCode || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Province:</span>
              <span>{applicant.address.province || "—"}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 flex-1 items-center justify-center rounded-full border border-gray-400 bg-white font-[PoppinsBold] text-xs text-gray-500 hover:bg-gray-100"
          >
            Close
          </button>

          <button
            type="button"
            onClick={onSave}
            className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#9caf7d] font-[PoppinsBold] text-xs text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentInfoModal;