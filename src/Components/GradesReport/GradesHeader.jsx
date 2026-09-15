import { GraduationCap, IdCard, Layers3, UserRound } from "lucide-react";

const GradesHeader = ({ student, onBack }) => {
  return (
    <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
      <div className="flex items-center justify-between px-1 py-1 sm:px-2 sm:py-2">
        <h1 className="text-[11px] font-[PoppinsBold] uppercase text-[#9caf7d] sm:text-xs md:text-sm">
          Student Grades
        </h1>

        <button
          type="button"
          onClick={onBack}
          className="rounded-full border border-gray-300 bg-slate-50 px-3 py-1.5 text-[9px] font-[PoppinsBold] uppercase text-gray-600 transition hover:bg-gray-100 sm:px-4 sm:py-2 sm:text-2xs md:px-5 md:text-xs"
        >
          Back
        </button>
      </div>

      {/* Mobile: stacked layout */}
      <div className="flex flex-col gap-4 overflow-hidden rounded-2xl bg-linear-to-br from-[#0c2423] via-[#123b35] to-[#479257] px-4 py-4 shadow-lg sm:rounded-3xl sm:px-5 sm:py-5 md:hidden">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-green ring-1 ring-white/20">
            <UserRound size={20} />
          </div>
          <div className="min-w-0">
          <span className="text-[8px] font-[PoppinsBold] uppercase text-white/60">
            Selected Student
          </span>
          <h2 className="truncate text-sm font-[PoppinsBold] leading-tight text-white sm:text-base">
            {student.name}
          </h2>
          </div>
        </div>

        {/* LRN + Student ID + Grade Level on one line */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-[PoppinsBold] uppercase text-white/60">
              LRN
            </span>
            <span className="text-2xs font-[PoppinsBold] uppercase text-white">
              {student.lrn}
            </span>
          </div>

          <div className="h-6 w-px bg-white/20" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-[PoppinsBold] uppercase text-white/60">
              Student ID
            </span>
            <span className="text-2xs font-[PoppinsBold] uppercase text-white">
              {student.schoolId}
            </span>
          </div>

          <div className="h-6 w-px bg-white/20" />

          <div className="flex flex-col gap-0.5">
            <span className="text-[8px] font-[PoppinsBold] uppercase text-white/60">
              Grade Level
            </span>
            <span className="text-2xs font-[PoppinsBold] uppercase text-white">
              {student.gradeLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Tablet/Desktop: grid layout */}
      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr] items-center gap-4 overflow-hidden rounded-3xl bg-linear-to-br from-[#073b32] via-[#123b35] to-[#449957] px-5 py-5 shadow-lg sm:px-6 sm:py-6 md:grid lg:px-8 lg:py-8">
        <div className="flex items-center gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-swamp-green ring-1 ring-white/20">
            <UserRound size={24} />
          </div>
          <div className="min-w-0">
            <span className="text-[9px] font-[PoppinsBold] uppercase text-white/60">
              Selected Student
            </span>
            <div className="truncate text-base font-[PoppinsBold] leading-tight text-white lg:text-xl">
              {student.name}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 border-l border-white/15 pl-5 lg:pl-8">
          <span className="flex items-center gap-1.5 text-[9px] font-[PoppinsBold] uppercase text-white/60">
            <GraduationCap size={15} className="text-lime-green" />
            Learner Reference Number
          </span>
          <span className="text-[11px] font-[PoppinsBold] uppercase text-white sm:text-xs">
            {student.lrn}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-[PoppinsBold] uppercase text-white/60">
            <IdCard size={15} className="mr-1.5 inline text-lime-green" />
            Student ID Number
          </span>
          <span className="text-[11px] font-[PoppinsBold] uppercase text-white sm:text-xs">
            {student.schoolId}
          </span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[9px] font-[PoppinsBold] uppercase text-white/60">
            <Layers3 size={15} className="mr-1.5 inline text-lime-green" />
            Grade Level
          </span>
          <span className="text-[11px] font-[PoppinsBold] uppercase text-white sm:text-xs">
            {student.gradeLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GradesHeader;
