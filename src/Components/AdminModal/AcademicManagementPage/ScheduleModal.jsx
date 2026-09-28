import React, { useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
const DAY_INDEX = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-5 backdrop-blur-sm">
      <div className="flex max-h-[calc(100dvh-2.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-[#f4f5fc] shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
          <div>
            <h2 className="font-[PoppinsBold] text-lg text-[#9caf7e]">
              SCHEDULE
            </h2>
            <p className="mt-1 font-[Poppins] text-base text-gray-500">
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
        <div className="min-h-0 flex-1 overflow-auto px-4 py-4 sm:px-6">
          <div className="gca-calendar w-full">
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
              dayHeaderFormat={{
                weekday: "short",
                month: "short",
                day: "numeric",
              }}
              events={events}
              eventContent={(eventInfo) => {
                const { event } = eventInfo;
                return (
                  <div className="flex event-card w-full h-full flex-col overflow-hidden rounded-lg border border-[#7f9464] bg-[#9caf7e] px-2 py-1.5 text-white shadow-sm justify-between ">
                    <p className="truncate font-[PoppinsBold] text-[14px] text-wrap leading-tight text-white">
                      {event.title}
                    </p>
                    <div>
                      <p className="truncate font-[PoppinsBold] text-[12px] leading-tight text-white">
                        {event.extendedProps.room}
                      </p>
                      <p className="truncate font-[PoppinsBold] text-[12px] leading-tight text-white">
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
        <div className="flex justify-end border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="h-9 rounded-full bg-[#9caf7e] px-8 font-[PoppinsBold] text-xs text-white transition hover:bg-[#899d6d]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
export default ScheduleModal;
