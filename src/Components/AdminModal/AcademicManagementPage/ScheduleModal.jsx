import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
const DAY_INDEX = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};
const MOBILE_QUERY = "(max-width: 639px)";
const getCurrentMonday = () => {
  const date = new Date();
  const day = date.getDay();
  const difference = day === 0 ? -6 : 1 - day;
  date.setDate(date.getDate() + difference);
  return date;
};
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const getTeacherName = (schedule) => {
  return [schedule.first_name, schedule.middle_name, schedule.last_name]
    .filter(Boolean)
    .join(" ");
};
const ScheduleModal = ({ isOpen, onClose, sectionName, schedules = [] }) => {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(MOBILE_QUERY).matches,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event) => setIsMobile(event.matches);

    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const initialDate = useMemo(() => {
    return formatDate(getCurrentMonday());
  }, []);
  const events = useMemo(() => {
    const monday = getCurrentMonday();
    return schedules
      .filter((schedule) => DAY_INDEX[schedule.day_name])
      .map((schedule) => {
        const dayNumber = DAY_INDEX[schedule.day_name];
        const eventDate = new Date(monday);
        eventDate.setDate(monday.getDate() + (dayNumber - 1));
        const date = formatDate(eventDate);
        return {
          id: String(schedule.schedule_id),
          title: schedule.subject_name,
          start: `${date}T${schedule.sched_start_time}`,
          end: `${date}T${schedule.sched_end_time}`,
          extendedProps: {
            teacher: getTeacherName(schedule),
            room: schedule.room_name,
          },
        };
      });
  }, [schedules]);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-3 backdrop-blur-sm sm:p-5">
      <div className="flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-bone shadow-lg sm:max-h-[calc(100dvh-2.5rem)] sm:rounded-2xl">
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-parent-accent/15 px-4 py-3 sm:px-6 sm:py-5">
          <div className="min-w-0">
            <h2 className="font-[Poppins] text-base text-parent-green sm:text-lg">
              SCHEDULE
            </h2>
            <p className="mt-1 break-words font-[Poppins] text-xs text-gray-500 sm:text-base">
              {sectionName}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xl leading-none text-gray-400 transition hover:text-gray-600"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        {/* Calendar */}
        <div className="min-h-0 flex-1 overflow-auto px-2 py-2 sm:px-6 sm:py-4">
          <div className="gca-calendar schedule-modal-calendar w-full min-w-0">
            <FullCalendar
              plugins={[timeGridPlugin]}
              initialView="timeGridWeek"
              initialDate={initialDate}
              weekends={false}
              allDaySlot={false}
              slotMinTime="07:00:00"
              slotMaxTime="17:00:00"
              slotDuration="00:30:00"
              slotLabelInterval="01:00:00"
              expandRows={true}
              height="auto"
              headerToolbar={false}
              dayHeaderFormat={
                isMobile
                  ? { weekday: "short" }
                  : { weekday: "short", month: "short", day: "numeric" }
              }
              events={events}
              eventContent={(eventInfo) => {
                const { event } = eventInfo;
                return (
                  <div className="event-card flex h-full w-full flex-col justify-between overflow-hidden rounded-md border border-parent-green/80 bg-parent-green px-1 py-1 text-white shadow-sm sm:rounded-lg sm:px-2 sm:py-1.5">
                    <p className="line-clamp-2 break-words font-[Poppins] text-[9px] leading-tight text-white sm:line-clamp-none sm:text-[14px]">
                      {event.title}
                    </p>
                    <div className="min-w-0">
                      <p className="truncate font-[Poppins] text-[9px] leading-tight text-white sm:text-[12px] lg:text-xs xl:text-sm">
                        {event.extendedProps.room}
                      </p>
                      <p className="truncate font-[Poppins] text-[9px] leading-tight text-white sm:text-[12px] lg:text-xs xl:text-sm">
                        {event.extendedProps.teacher}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
        {/* Actions */}
        <div className="flex justify-end border-t border-parent-accent/15 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-full bg-parent-green px-6 font-[Poppins] text-xs text-white transition hover:bg-parent-accent sm:px-8"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScheduleModal;
