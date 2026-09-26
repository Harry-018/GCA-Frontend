import React, { useState } from "react";
const StudentInfoModal = ({ student, onClose, onSave, saving = false }) => {
  const [formData, setFormData] = useState({
    lrn: student?.lrn ?? "",
    stu_status: student?.stu_status ?? "active",
  });
  const statusOptions = ["active", "dropout", "transferred"];
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };
  if (!student) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-300 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Student Information
        </h2>
        {/* Information */}
        <div className="grid grid-cols-1 gap-x-8 py-5 text-[11px] text-gray-500 md:grid-cols-3">
          {/* Student Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex h-5 items-center">
              <span className="w-36">Grade Level:</span>
              <span>{student.grade_level_name || "—"}</span>
            </div>
            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">LRN:</span>
              <input
                type="text"
                name="lrn"
                value={formData.lrn}
                onChange={handleChange}
                disabled={saving}
                className="h-6 w-25 rounded-lg border border-gray-300 bg-white px-2 text-2xs text-gray-700 outline-none focus:border-swamp-green disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Last Name:</span>
              <span>{student.last_name || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">First Name:</span>
              <span>{student.first_name || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Middle Name:</span>
              <span>{student.middle_name || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Age:</span>
              <span>{student.age || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Gender:</span>
              <span>{student.gender || "—"}</span>
            </div>
          </div>
          {/* Additional Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex h-5 items-center">
              <span className="w-36">Student No.:</span>
              <span>{student.stu_num || "—"}</span>
            </div>
            <div className="mb-5 flex h-5 items-center">
              <span className="w-36">Status:</span>
              <select
                name="stu_status"
                value={formData.stu_status}
                onChange={handleChange}
                disabled={saving}
                className="h-7 w-36 border border-gray-300 bg-[#f5f5f5] rounded-2xl  px-2 text-2xs leading-none text-egg-dark outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Date of Birth:</span>
              <span>
                {student.bdate
                  ? (() => {
                      const [year, month, day] = student.bdate
                        .split("T")[0]
                        .split("-");
                      return `${month}-${day}-${year}`;
                    })()
                  : "—"}
              </span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Place of Birth:</span>
              <span>{student.birthplace || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Religion:</span>
              <span>{student.religion || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Nationality:</span>
              <span>{student.nationality || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Disability:</span>
              <span>
                {student.disabled ? student.disability || "Yes" : "None"}
              </span>
            </div>
          </div>
          {/* Address Information */}
          <div className="flex flex-col gap-y-2 pt-19">
            <div className="flex h-5 items-center">
              <span className="w-36">House No. / Street:</span>
              <span>{student.house_no || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Barangay:</span>
              <span>{student.barangay || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">City / Municipality:</span>
              <span>{student.city_municipality || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Zip Code:</span>
              <span>{student.zipcode || "—"}</span>
            </div>
            <div className="flex h-5 items-center">
              <span className="w-36">Province:</span>
              <span>{student.province || "—"}</span>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="flex h-8 flex-1 items-center justify-center rounded-full border border-gray-400 bg-white font-[PoppinsBold] text-xs text-gray-500 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="flex h-8 flex-1 items-center justify-center rounded-full bg-[#9caf7d] font-[PoppinsBold] text-xs text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default StudentInfoModal;
