import { useRef, useState, useEffect, useMemo } from "react";
import {
  CalendarDays,
  School,
  DoorOpen,
  Clock3,
  UserRound,
  Loader2,
} from "lucide-react";
import {
  useParentAnnouncements,
  useParentStudents,
} from "../hooks/queries/usePortalData.js";
import StudentInfo from "../Components/Parents-Side Components/Dashboard/StudentInfo";
import Announcement from "../Components/Parents-Side Components/Dashboard/Announcement";

const INFO_FIELDS = [
  { key: "classSchedule", label: "Class Schedule", icon: CalendarDays },
  { key: "classTime", label: "Class Time", icon: Clock3 },
  { key: "gradeLevel", label: "Grade Level", icon: School },
  { key: "room", label: "Room", icon: DoorOpen },
  { key: "adviser", label: "Adviser", icon: UserRound },
];

const ID_FIELDS = [
  { key: "lrn", label: "Learner Reference Number" },
  { key: "studentId", label: "Student ID Number" },
];

const SCHOOL_YEAR_FIELD = {
  key: "sy",
  label: "School Year",
};

const DAY_ORDER = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const parseTimeToMinutes = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value.getHours() * 60 + value.getMinutes();
  }

  const match = String(value).match(/^(\d{1,2}):(\d{2})/);
  if (!match) return null;

  return Number(match[1]) * 60 + Number(match[2]);
};

const formatMinutes = (totalMinutes) => {
  const hours = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const suffix = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${suffix}`;
};

const formatClassSchedule = (schedules) => {
  const dayAbbreviations = {
    Sunday: "Sun",
    Monday: "Mon",
    Tuesday: "Tue",
    Wednesday: "Wed",
    Thursday: "Thu",
    Friday: "Fri",
    Saturday: "Sat",
  };

  const days = [
    ...new Set(
      schedules
        .map((schedule) => dayAbbreviations[schedule.day] || schedule.day)
        .filter(Boolean),
    ),
  ].sort((a, b) => DAY_ORDER.indexOf(a) - DAY_ORDER.indexOf(b));

  if (days.length === 0) return "—";

  const isRegularWeek =
    days.length === WEEK_DAYS.length &&
    days.every((day, index) => day === WEEK_DAYS[index]);

  return isRegularWeek ? "Mon - Fri" : days.join(", ");
};

const parseClassTime = (value) => {
  if (!value) return null;

  // The API returns a combined "start - end" range per schedule.
  const [start, end] = String(value).split(" - ");
  const startMinutes = parseTimeToMinutes(start);
  const endMinutes = parseTimeToMinutes(end);

  if (startMinutes === null || endMinutes === null) return null;

  return { start: startMinutes, end: endMinutes };
};

const formatClassTime = (schedules) => {
  const ranges = schedules
    .map((schedule) => parseClassTime(schedule.class_time))
    .filter(Boolean);

  if (ranges.length === 0) return "—";

  return `${formatMinutes(
    Math.min(...ranges.map((range) => range.start)),
  )} - ${formatMinutes(Math.max(...ranges.map((range) => range.end)))}`;
};

const formatRooms = (schedules) => {
  const rooms = [
    ...new Set(
      schedules
        .map((schedule) => schedule.room?.replace(/^Room\b/i, "RM"))
        .filter(Boolean),
    ),
  ];

  return rooms.length > 0 ? rooms.join(" | ") : "—";
};

const parseDate = (value) => {
  if (!value) return null;

  if (value instanceof Date) return value;

  // Treat date-only strings as local dates to avoid timezone shifts.
  const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
};

const formatDate = (value) => {
  const date = parseDate(value);

  if (!date) return "—";

  return new Intl.DateTimeFormat("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
};

const formatTimeRange = (value) => {
  if (!value) return "—";

  if (value instanceof Date) {
    const minutes = parseTimeToMinutes(value);
    return minutes === null ? "—" : formatMinutes(minutes);
  }

  // The API returns a combined "start - end" range.
  return String(value)
    .split(" - ")
    .map((part) => {
      const minutes = parseTimeToMinutes(part);
      return minutes === null ? part : formatMinutes(minutes);
    })
    .join(" - ");
};

// Map the parent dashboard API response to the fields used by StudentInfo.
const mapStudent = (student) => {
  const schedules = Array.isArray(student.schedules) ? student.schedules : [];

  return {
    stuId: student.stuId,
    studentId: student.studentId || "",
    lrn: student.lrn || "",
    firstName: student.firstName || "",
    lastName: student.lastName || "",
    sy: student.schoolYear?.schoolYear || "—",
    classSchedule: formatClassSchedule(schedules),
    classTime: formatClassTime(schedules),
    gradeLevel: student.gradeLevel || "—",
    room: formatRooms(schedules),
    adviser: student.adviser || "—",
  };
};

// Map the parent announcements API response to the fields used by Announcement.
const mapAnnouncement = (announcement) => ({
  id: announcement.announcement_id,
  title: announcement.title || "Untitled Announcement",
  posted: formatDate(announcement.posted),
  message: announcement.message || "",
  date: formatDate(announcement.date),
  time: formatTimeRange(announcement.time),
  venue: announcement.venue || "—",
});

const ParentsDashboard = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const {
    data: studentsResponse,
    isLoading: loading,
    error: studentsError,
  } = useParentStudents();
  const {
    data: announcementsResponse,
    isLoading: announcementsLoading,
    error: announcementsFetchError,
  } = useParentAnnouncements();

  // The API wraps lists in the "data" property.
  const students = useMemo(
    () =>
      (Array.isArray(studentsResponse?.data) ? studentsResponse.data : []).map(
        mapStudent,
      ),
    [studentsResponse],
  );

  const announcements = useMemo(
    () =>
      (
        Array.isArray(announcementsResponse?.data)
          ? announcementsResponse.data
          : []
      ).map(mapAnnouncement),
    [announcementsResponse],
  );

  const error =
    studentsError?.response?.data?.message ||
    studentsError?.message ||
    "";

  const announcementsError =
    announcementsFetchError?.response?.data?.message ||
    announcementsFetchError?.message ||
    "";

  useEffect(() => {
    const element = scrollRef.current;
    if (!element || announcements.length === 0) return;
    const handleScroll = () => {
      const index = Math.round(element.scrollLeft / element.clientWidth);
      setActiveIndex(Math.min(index, announcements.length - 1));
    };

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [announcements.length]);

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-green" />
        <p className="text-sm text-gray-500">
          Loading Dashboard
          <span className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-egg px-5 py-6 font-[Poppins] cursor-default">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        {/* Students */}
        <div className="flex flex-col gap-4 rounded-3xl">
          {students.length > 0 ? (
            students.map((s, i) => (
              <StudentInfo
                key={s.stuId || s.studentId || i}
                student={s}
                infoFields={INFO_FIELDS}
                idFields={ID_FIELDS}
                schoolYearField={SCHOOL_YEAR_FIELD}
              />
            ))
          ) : (
            <p className="rounded-3xl border border-parent-accent/15 bg-bone px-5 py-8 text-center text-sm text-gray-500">
              No enrolled student found for the active school year.
            </p>
          )}
        </div>

        <span className="mx-auto max-w-7xl w-full text-sm font-[PoppinsBold] text-parent-green sm:text-lg md:text-md uppercase">
          Recent Announcements
        </span>

        {announcementsLoading ? (
          <div className="flex items-center justify-center gap-2 py-6 text-sm text-gray-500">
            <Loader2 size={18} className="animate-spin text-parent-green" />
            Loading announcements...
          </div>
        ) : announcementsError ? (
          <p className="rounded-2xl border border-parent-accent/15 bg-bone px-5 py-6 text-center text-sm text-red-400">
            {announcementsError}
          </p>
        ) : announcements.length === 0 ? (
          <p className="rounded-2xl border border-parent-accent/15 bg-bone px-5 py-6 text-center text-sm text-gray-500">
            No announcements for the active school year.
          </p>
        ) : (
          <>
            <div
              ref={scrollRef}
              className="mx-auto max-w-7xl w-full overflow-x-auto lg:overflow-visible no-scrollbar snap-mandatory transition-smooth"
            >
              <div className="flex gap-4 lg:grid lg:grid-cols-2 lg:gap-5">
                {announcements.map((a, i) => (
                  <Announcement key={a.id ?? i} {...a} />
                ))}
              </div>
            </div>

            <div className="flex justify-center gap-2 pb-4 lg:hidden">
              {announcements.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all ${
                    i === activeIndex
                      ? "w-4 bg-parent-accent"
                      : "bg-parent-accent/30"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ParentsDashboard;
