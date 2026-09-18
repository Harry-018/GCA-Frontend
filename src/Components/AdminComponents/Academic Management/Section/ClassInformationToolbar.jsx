import React from "react";
import { Pencil } from "lucide-react";

const ClassInformationToolbar = ({
  teacher,
  onChangeTeacher,
  onGoBack,
  onPromoteStudent,
  onAddStudent,
  searchValue,
  onSearchChange,
  onSearch,
}) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#f4f5fc] p-6 shadow-md md:flex-nowrap">
        <div className="flex shrink-0 flex-wrap items-center gap-x-3 gap-y-2">
          <span className="font-[PoppinsBold] text-[11px] text-[#9caf7e] sm:text-sm">
            Teacher:
          </span>

          <span className="text-[11px] text-gray-600 sm:text-sm">
            {teacher}
          </span>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onChangeTeacher}
            className="flex shrink-0 items-center gap-1 rounded-full px-3 py-2 text-[10px] text-gray-600 transition hover:border-[#9caf7e] hover:text-[#9caf7e] sm:text-xs"
          >
            <Pencil size={11} />
            Change
          </button>

          <button
            type="button"
            onClick={onGoBack}
            className="shrink-0 rounded-full border border-gray-300 px-4 py-2 text-[10px] text-gray-600 transition hover:bg-gray-100 sm:text-xs"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Class List Toolbar */}
      <div className="flex flex-col gap-3 px-1 md:flex-row md:items-center md:justify-between md:gap-3">
        <h2 className="font-[PoppinsBold] text-base text-[#9caf7e]">
          Class List
        </h2>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-none md:flex-row md:items-center md:gap-3">
          <div className="flex flex-wrap items-center justify-start gap-2 sm:gap-3 md:justify-end md:ml-auto">
            <button
              type="button"
              onClick={onPromoteStudent}
              className="shrink-0 rounded-full bg-[#9caf7e] px-4 py-2 font-[PoppinsBold] text-[11px] text-white transition hover:bg-[#899d6d] sm:px-5 sm:text-xs"
            >
              Promote Student
            </button>

            <button
              type="button"
              onClick={onAddStudent}
              className="shrink-0 rounded-full bg-[#9caf7e] px-4 py-2 font-[PoppinsBold] text-[11px] text-white transition hover:bg-[#899d6d] sm:px-5 sm:text-xs"
            >
              Add Student
            </button>
          </div>

          <div className="flex w-full items-center gap-2 sm:gap-3 md:w-auto md:flex-none">
            <input
              type="text"
              value={searchValue}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search Student"
              className="h-9 min-w-0 flex-1 rounded-full border border-gray-300 bg-[#f4f5fc] px-4 text-[11px] text-gray-600 outline-none focus:border-[#9caf7e] sm:text-xs md:w-48 md:flex-none lg:w-52"
            />

            <button
              type="button"
              onClick={onSearch}
              className="h-9 shrink-0 rounded-full bg-[#9caf7e] px-5 font-[PoppinsBold] text-[11px] text-white transition hover:bg-[#899d6d] sm:px-6 sm:text-xs"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassInformationToolbar;