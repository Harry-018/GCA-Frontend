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
      label: "Teacher Number",
      value: teacher.teacher_num,
    },
    {
      label: "Gender",
      value: teacher.gender,
    },
    {
      label: "Birthdate",
      value: teacher.bdate
        ? new Date(teacher.bdate)
            .toLocaleDateString("en-US", {
              month: "long",
              day: "2-digit",
              year: "numeric",
              timeZone: "UTC",
            })
            .replace(" ", ", ")
        : "N/A",
    },
    {
      label: "Civil Status",
      value: teacher.civil_status,
    },
  ];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone shadow-[0_2px_4px_rgba(0,0,0,0.18)] transition-all duration-300 hover:shadow-lg">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />

      <div className="flex flex-col gap-7 px-5 py-6 pt-8 sm:px-8 sm:py-8 sm:pt-9 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="flex items-start gap-4 sm:gap-5">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-parent-green text-parent-mint shadow-sm ring-1 ring-parent-accent/20 sm:size-14">
            <UserRound size={26} strokeWidth={1.5} />
          </div>
          <div>
            <p className="py-2 text-[9px] font-[PoppinsBold] uppercase tracking-widest text-parent-accent sm:text-2xs sm:tracking-[0.18em]">
              Teacher information
            </p>
            <h2 className="font-[PoppinsBold] text-lg uppercase leading-tight text-parent-green sm:text-2xl lg:text-3xl">
              {teacher.first_name} {teacher.last_name}
            </h2>
            <p className="py-1 text-xs tracking-wide text-gray-500 sm:text-base">
              Faculty member
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-parent-accent/15 pt-5 sm:gap-6 lg:min-w-124 lg:grid-cols-2 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          {teacherDetails.map((detail) => (
            <div key={detail.label} className="flex min-w-0 items-start gap-3">
              {detail.label === "Teacher Number" ? (
                <GraduationCap size={16} className="mt-0.5 shrink-0 text-parent-green" />
              ) : detail.label === "Gender" ? (
                <VenusAndMars size={16} className="mt-0.5 shrink-0 text-parent-green" />
              ) : detail.label === "Birthdate" ? (
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-parent-green" />
              ) : (
                <HeartHandshake size={16} className="mt-0.5 shrink-0 text-parent-green" />
              )}
              <div className="min-w-0">
                <span className="text-2xs uppercase tracking-wide text-gray-500">
                  {detail.label}
                </span>
                <span className="wrap-break-word block text-xs font-[Poppins] text-gray-700 sm:whitespace-nowrap sm:text-sm">
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
