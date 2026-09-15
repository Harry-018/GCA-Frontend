import {
  CalendarDays,
  GraduationCap,
  HeartHandshake,
  UserRound,
  VenusAndMars,
} from "lucide-react";

const TeacherInformation = ({ teacher }) => {
  const teacherDetails = [
    {
      label: "Teacher ID",
      value: teacher.teacherId,
    },
    {
      label: "Gender",
      value: teacher.gender,
    },
    {
      label: "Birthdate",
      value: teacher.birthdate,
    },
    {
      label: "Civil Status",
      value: teacher.civilStatus,
    },
  ];

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[#0c2423] text-white shadow-lg">
      <div className="flex flex-col gap-7 bg-linear-to-br from-[#0c2423] via-[#123b35] to-[#279257] px-5 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime-green ring-1 ring-white/20 sm:size-14">
            <UserRound size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="py-2 text-[9px] font-[PoppinsBold] uppercase tracking-widest text-lime-green sm:text-2xs sm:tracking-[0.18em]">
              Teacher information
            </p>
            <h2 className="font-[PoppinsBold] text-lg uppercase leading-tight sm:text-2xl lg:text-3xl">
              {teacher.fullName}
            </h2>
            <p className="py-1 text-xs font-medium tracking-wide text-white/75 sm:text-base">
              Faculty member
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-5 sm:gap-6 lg:min-w-124 lg:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {teacherDetails.map((detail) => (
            <div key={detail.label} className="flex min-w-0 items-start gap-3">
              {detail.label === "Teacher ID" ? (
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-swamp-green" />
              ) : detail.label === "Gender" ? (
                <VenusAndMars size={16} className="mt-0.5 shrink-0 text-swamp-green" />
              ) : detail.label === "Birthdate" ? (
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-swamp-green" />
              ) : (
                <HeartHandshake size={16} className="mt-0.5 shrink-0 text-swamp-green" />
              )}
              <div className="min-w-0">
                <span className="text-2xs font-medium uppercase tracking-wide text-white/60">
                  {detail.label}
                </span>
                <span className="wrap-break-word block text-xs font-[Poppins] text-white sm:whitespace-nowrap sm:text-sm">
                  {detail.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeacherInformation;