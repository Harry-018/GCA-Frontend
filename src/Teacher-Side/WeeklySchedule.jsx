import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useTeacherSchedules } from "../hooks/queries/usePortalData.js";

const getCurrentMonday = () => {
  const date = new Date();
  const day = date.getDay();
  const difference = day === 0 ? -6 : 1 - day;

  date.setDate(date.getDate() + difference);
  date.setHours(0, 0, 0, 0);

  return date;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const DAY_INDEX = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
};

const MOBILE_QUERY = "(max-width: 639px)";

const WeeklySchedule = () => {
  const {
    data: schedulesResponse,
    isLoading: loading,
    error: schedulesError,
  } = useTeacherSchedules();

  const schedules = useMemo(
    () => schedulesResponse?.data ?? [],
    [schedulesResponse],
  );

  const error =
    schedulesError?.response?.data?.message ||
    schedulesError?.message ||
    "";
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

        eventDate.setDate(monday.getDate() + dayNumber - 1);

        const date = formatDate(eventDate);

        return {
          id: String(schedule.schedule_id),
          title: schedule.subject_name,
          start: `${date}T${schedule.sched_start_time}`,
          end: `${date}T${schedule.sched_end_time}`,
          extendedProps: {
            room: schedule.room_name,
            section: schedule.section_name,
          },
        };
      });
  }, [schedules]);

  if (loading) {
    return (
      <div className="mx-auto mt-4 flex min-h-60 w-full items-center justify-center sm:mt-6 sm:w-3/4">
        <p className="font-[Poppins] text-sm text-gray-500">
          Loading your schedule...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto mt-4 w-full rounded-xl border border-red-200 bg-red-50 p-4 sm:mt-6 sm:w-3/4 sm:p-5">
        <p className="break-words font-[Poppins] text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mx-auto mt-4 flex w-full min-w-0 flex-col items-center overflow-hidden rounded-2xl border border-parent-accent/15 bg-bone p-3 shadow-[0_2px_4px_rgba(0,0,0,0.18)] sm:mt-6 sm:w-3/4 sm:p-5 md:p-6">
      <div className="absolute inset-x-0 top-0 h-1.5 bg-linear-to-r from-parent-green via-parent-accent to-parent-mint" />
      {/* Header */}
      <div className="mb-4 w-full sm:mb-5">
        <h2 className="font-[PoppinsBold] text-base text-parent-green sm:text-lg">
          WEEKLY SCHEDULE
        </h2>

        <p className="mt-1 font-[Poppins] text-xs text-gray-500 sm:text-sm">
          Your teaching schedule for Monday to Friday
        </p>
      </div>

      {/* Calendar */}
      {schedules.length === 0 ? (
        <div className="flex min-h-40 w-full items-center justify-center">
          <p className="text-center font-[Poppins] text-sm text-gray-500">
            No schedules found for the active school year.
          </p>
        </div>
      ) : (
        <div className="gca-calendar teacher-calendar w-full min-w-0 overflow-x-auto bg-bone">
          <div className="min-w-0">
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
                const { event, timeText } = eventInfo;

                return (
                  <div className="event-card flex h-full w-full flex-col justify-between overflow-hidden rounded-md border border-parent-green/80 bg-parent-green px-1 py-1 text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:rounded-lg sm:px-2 sm:py-1.5">
                    <p className="break-words font-[PoppinsBold] text-[10px] leading-tight text-white sm:text-xs md:text-sm">
                      {event.title}
                    </p>

                    <div className="mt-1 min-w-0">
                      <p className="truncate font-[PoppinsBold] text-[9px] leading-tight text-white sm:text-[10px] md:text-xs">
                        {event.extendedProps.room}
                      </p>

                      <p className="truncate font-[PoppinsBold] text-[9px] leading-tight text-white sm:text-[10px] md:text-xs">
                        {event.extendedProps.section}
                      </p>

                      <p className="truncate font-[Poppins] text-[9px] leading-tight text-white sm:text-[10px] md:text-xs">
                        {timeText}
                      </p>
                    </div>
                  </div>
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WeeklySchedule;
