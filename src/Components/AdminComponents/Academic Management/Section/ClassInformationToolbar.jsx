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
      <div className="flex items-center justify-between rounded-2xl bg-[#f4f5fc] p-6 shadow-md">
        <div className="flex items-center gap-x-3">
          <span className="font-[PoppinsBold] text-sm text-[#9caf7e]">
            Teacher:
          </span>

          <span className="text-sm text-gray-600">
            {teacher}
          </span>

          <button
            type="button"
            onClick={onChangeTeacher}
            className="ml-8 flex items-center gap-1 rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600 transition hover:border-[#9caf7e] hover:text-[#9caf7e]"
          >
            <Pencil size={11} />
            Change
          </button>
        </div>

        <button
          type="button"
          onClick={onGoBack}
          className="rounded-full border border-gray-300 px-6 py-2.5 text-xs text-gray-600 transition hover:bg-gray-100"
        >
          Go Back
        </button>
      </div>

      {/* Class List Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-1">
        <h2 className="font-[PoppinsBold] text-base text-[#9caf7e]">
          Class List
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPromoteStudent}
            className="rounded-full bg-[#9caf7e] px-5 py-2.5 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Promote Student
          </button>

          <button
            type="button"
            onClick={onAddStudent}
            className="rounded-full bg-[#9caf7e] px-5 py-2.5 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Add Student
          </button>

          <input
            type="text"
            value={searchValue}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Student"
            className="h-9 w-60 rounded-full border border-gray-300 bg-[#f4f5fc] px-4 text-xs text-gray-600 outline-none focus:border-[#9caf7e]"
          />

          <button
            type="button"
            onClick={onSearch}
            className="rounded-full bg-[#9caf7e] px-6 py-2.5 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassInformationToolbar;