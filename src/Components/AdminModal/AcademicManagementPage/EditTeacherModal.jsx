import React from "react";

const EditTeacherModal = ({
  teacher,
  onChange,
  onCancel,
  onSave,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-300 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Edit Teacher Information
        </h2>

        {/* Teacher Information */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-2 py-5 text-[11px] text-gray-600 md:grid-cols-3">
          <div className="flex flex-col gap-y-2">
            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">Teacher ID:</span>

              <input
                type="text"
                name="teacherId"
                value={teacher.teacherId}
                onChange={onChange}
                className="h-6 w-32 rounded-lg border border-gray-300 bg-white px-2 text-2xs outline-none"
              />
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Last Name:</span>
              <span>{teacher.lastName|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">First Name:</span>
              <span>{teacher.firstName|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Middle Name:</span>
              <span>{teacher.middleName|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Age:</span>
              <span>{teacher.age|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Gender:</span>
              <span>{teacher.gender|| "—"}</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-y-2">
            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">Status:</span>

              <select
                name="status"
                value={teacher.status}
                onChange={onChange}
                className="h-7 w-32 border border-gray-300 bg-bone px-2 text-2xs leading-none text-gray-600 outline-none"
              >
                {teacher.statusOptions.map((status) => (
                  <option
                    key={status}
                    value={status}
                  >
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Date of Birth:</span>
              <span>{teacher.dateOfBirth || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Place of Birth:</span>
              <span>{teacher.placeOfBirth || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Religion:</span>
              <span>{teacher.religion || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Nationality:</span>
              <span>{teacher.nationality || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Contact No.:</span>
              <span>{teacher.contactNo || "—"}</span>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-y-2">
            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">Email:</span>
              <span>{teacher.email || "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">House No. / Street:</span>
              <span>{teacher.address.street|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Barangay:</span>
              <span>{teacher.address.barangay|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">City / Municipality:</span>
              <span>{teacher.address.city|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Zip Code:</span>
              <span>{teacher.address.zipCode|| "—"}</span>
            </div>

            <div className="flex h-5 items-center">
              <span className="w-36">Province:</span>
              <span>{teacher.address.province|| "—"}</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="h-8 w-36 rounded-full border border-gray-400 bg-white font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onSave}
            className="h-8 w-36 rounded-full bg-[#9caf7d] font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherModal;