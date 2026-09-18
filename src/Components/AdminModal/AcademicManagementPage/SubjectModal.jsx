import React from "react";

const SubjectModal = ({ isOpen, onClose }) => {
  const subjects = [
    {
      code: "PE-1",
      name: "Physical Development",
    },
    {
      code: "SED-1",
      name: "Socio-Emotional Development",
    },
    {
      code: "CD-1",
      name: "Cognitive Development",
    },
    {
      code: "SPD-1",
      name: "Spiritual Development",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-3 sm:p-5">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-md flex-col gap-y-4 overflow-y-auto rounded-2xl bg-[#f4f5fc] p-4 shadow-lg sm:p-6">
        <h2 className="font-[PoppinsBold] text-sm text-[#9caf7e] sm:text-base">
          Subjects
        </h2>

        {/* Table */}
        <div className="overflow-hidden">
          <div className="grid grid-cols-[90px_1fr] bg-[#9caf7e] text-xs text-white sm:grid-cols-[120px_1fr]">
            <div className="border-r border-white/50 px-2 py-3 font-[PoppinsBold] sm:px-4">
              Subject Code
            </div>

            <div className="px-2 py-3 font-[PoppinsBold] sm:px-4">
              Subject Name
            </div>
          </div>

          {/* Rows */}
          {subjects.map((subject) => (
            <div
              key={subject.code}
              className="grid grid-cols-[90px_1fr] border-b border-gray-200 bg-white text-xs text-gray-500 sm:grid-cols-[120px_1fr]"
            >
              <div className="border-r border-gray-200 px-2 py-3 sm:px-4">
                {subject.code}
              </div>

              <div className="px-2 py-3 sm:px-4">
                {subject.name}
              </div>
            </div>
          ))}
        </div>

        {/* Close */}
        <button
          type="button"
          onClick={onClose}
          className="h-9 rounded-full border border-gray-300 bg-transparent font-[PoppinsBold] text-xs text-gray-500 transition hover:bg-gray-100"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SubjectModal;