import React, { useState } from "react";

const EditTeacherModal = ({ teacher, onClose, onSave, saving = false }) => {
  const [formData, setFormData] = useState({
    teacher_status: teacher?.teacher_status ?? "active",
  });

  const statusOptions = ["active", "on_leave", "resigned"];

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  if (!teacher) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-3xl rounded-2xl border border-gray-300 bg-[#f4f6ff] p-5 shadow-lg">
        <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
          Teacher Information
        </h2>

        {/* Information */}
        <div className="grid grid-cols-1 gap-x-8 py-5 text-[11px] text-gray-500 md:grid-cols-3">
          {/* Teacher Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Teacher ID:</span>
              <span>{teacher.teacher_num || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Last Name:</span>
              <span>{teacher.last_name || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">First Name:</span>
              <span>{teacher.first_name || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Middle Name:</span>
              <span>{teacher.middle_name || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Gender:</span>
              <span>{teacher.gender || "—"}</span>
            </div>
          </div>

          {/* Additional Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Status:</span>

              <select
                name="teacher_status"
                value={formData.teacher_status}
                onChange={handleChange}
                disabled={saving}
                className="h-7 w-36 border border-gray-300 bg-[#f5f5f5] rounded-2xl  px-2 text-2xs leading-none text-egg-dark outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status === "on_leave"
                      ? "On Leave"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Date of Birth:</span>
              <span>
                {teacher.bdate
                  ? (() => {
                      const [year, month, day] = teacher.bdate
                        .split("T")[0]
                        .split("-");

                      return `${month}-${day}-${year}`;
                    })()
                  : "—"}
              </span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Place of Birth:</span>
              <span>{teacher.birthplace || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Religion:</span>
              <span>{teacher.religion || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Civil Status:</span>
              <span>{teacher.civil_status || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Contact No.:</span>
              <span>{teacher.contact_num || "—"}</span>
            </div>
          </div>

          {/* Address Information */}
          <div className="flex flex-col gap-y-2">
            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Email:</span>
              <span className="w-20 wrap-break-word">
                {teacher.email || "—"}
              </span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">House No. / Street:</span>
              <span>{teacher.address?.street || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Barangay:</span>
              <span>{teacher.address?.barangay || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">City / Municipality:</span>
              <span>{teacher.address?.city || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Zip Code:</span>
              <span>{teacher.address?.zipCode || "—"}</span>
            </div>

            <div className="flex min-h-5 items-center">
              <span className="w-36 shrink-0">Province:</span>
              <span>{teacher.address?.province || "—"}</span>
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

export default EditTeacherModal;
