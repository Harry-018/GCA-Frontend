import React, { useState } from "react";

const EditContactInformationModal = ({
  isOpen,
  onClose,
  onSave,
  initialData = {
    contactNo: "+63-992-641-8081",
    emailAddress: "grace.cslife@gmail.com",
    schoolAddress:
      "306, Purok 4, Barangay Cabuco, Trece Martires, Philippines, 4109",
  },
}) => {
  const [contactNo, setContactNo] = useState(initialData.contactNo);
  const [emailAddress, setEmailAddress] = useState(
    initialData.emailAddress
  );
  const [schoolAddress, setSchoolAddress] = useState(
    initialData.schoolAddress
  );

  if (!isOpen) return null;

  const handleSave = () => {
    onSave?.({
      contactNo,
      emailAddress,
      schoolAddress,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 px-4 font-[Poppins]">
      <div className="w-full max-w-83 rounded-2xl bg-[#f4f5fc] px-3.5 py-4 shadow-[0_2px_5px_rgba(0,0,0,0.25)]">
        <h2 className="text-sm font-semibold text-[#91a875]">
          Edit Contact Information
        </h2>

        {/* Form */}
        <div className="flex flex-col gap-5 py-5">
          {/* Contact Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">
              Contact No:
            </label>

            <input
              type="text"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
              className="h-7 w-full rounded-md border border-[#c8c8c8] bg-white px-3 text-2xs text-[#555555] outline-none focus:border-[#a0b884]"
            />
          </div>

          {/* Email Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">
              Email Address:
            </label>

            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              className="h-7 w-full rounded-md border border-[#c8c8c8] bg-white px-3 text-2xs text-[#555555] outline-none focus:border-[#a0b884]"
            />
          </div>

          {/* School Address */}
          <div className="flex flex-col gap-1.5">
            <label className="text-2xs text-[#555555]">
              School Address:
            </label>

            <input
              type="text"
              value={schoolAddress}
              onChange={(e) => setSchoolAddress(e.target.value)}
              className="h-7 w-full rounded-md border border-[#c8c8c8] bg-white px-3 text-2xs text-[#555555] outline-none focus:border-[#a0b884]"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="h-7 flex-1 rounded-full border border-[#bdbdbd] bg-transparent text-2xs font-semibold text-[#707070] transition hover:bg-[#e8e8e8]"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="h-7 flex-1 rounded-full bg-[#a0b884] text-2xs font-semibold text-white transition hover:bg-[#91a875]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditContactInformationModal;