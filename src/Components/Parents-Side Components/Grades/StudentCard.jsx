import { GraduationCap, IdCard, UserRound } from "lucide-react";
import DaysCard from "./DaysCard";
import AttendanceCard from "./AbsentCard";

const StudentCard = ({ lastName, firstName, learnerReferenceNumber, studentId, totalDays, absences }) => {
  return (
    <div className="flex w-full flex-col gap-3 font-[Poppins] lg:flex-row">
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-linear-to-br from-[#0c2423] via-[#123b35] to-[#479257] px-4 py-4 text-white shadow-lg sm:rounded-3xl sm:px-5 sm:py-5 lg:grid lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-4 lg:px-6 lg:py-6 xl:px-8 xl:py-8">
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-swamp-green ring-1 ring-white/20 lg:size-12">
            <UserRound size={20} className="lg:hidden" />
            <UserRound size={24} className="hidden lg:block" />
          </div>
          <div className="min-w-0">
            <span className="text-[8px] font-bold uppercase text-white/60 md:text-[9px]">
              Enrolled Student
            </span>
            <h2 className="text-sm font-bold leading-tight sm:text-base lg:text-xl">
              <span className="block">{lastName},</span>
              <span className="block">{firstName}</span>
            </h2>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 border-t border-white/15 pt-4 min-[360px]:grid-cols-2 lg:mt-0 lg:contents lg:border-0 lg:p-0">
          <div className="flex min-w-0 items-center gap-2 lg:mt-0 lg:gap-3 lg:border-l lg:border-white/15 lg:pl-5 xl:pl-8">
            <GraduationCap size={15} className="shrink-0 text-swamp-green" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[8px] font-[PoppinsBold] uppercase leading-tight text-white/60 lg:text-[9px] xl:whitespace-nowrap">
                Learner Reference Number
              </span>
              <span className="truncate text-2xs font-[PoppinsBold] uppercase sm:text-xs">
                {learnerReferenceNumber}
              </span>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2 lg:mt-0 lg:gap-3 lg:border-l lg:border-white/15 lg:pl-5 xl:pl-8">
            <IdCard size={15} className="shrink-0 text-swamp-green" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="text-[8px] font-bold uppercase leading-tight text-white/60 lg:text-[9px]">
                Student ID Number
              </span>
              <span className="truncate text-2xs font-[PoppinsBold] uppercase sm:text-xs">
                {studentId}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid shrink-0 grid-cols-2 gap-3 lg:flex lg:gap-3">
        <DaysCard totalDays={totalDays} />
        <AttendanceCard absences={absences} />
      </div>
    </div>
  );
};

export default StudentCard;
