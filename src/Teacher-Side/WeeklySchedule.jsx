import React, { useEffect, useMemo, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import { getTeacherSchedules } from "../requests/teacherRequests";

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

const WeeklySchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialDate = useMemo(() => {
    return formatDate(getCurrentMonday());
  }, []);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTeacherSchedules();
        setSchedules(response.data ?? []);
      } catch (err) {
        console.error("Failed to fetch teacher schedules:", err);

        setError(
          err.response?.data?.message ||
            "Failed to load your schedule. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
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
      <div className="flex min-h-60 items-center justify-center">
        <p className="font-[Poppins] text-sm text-gray-500">
          Loading your schedule...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full rounded-xl border border-red-200 bg-red-50 p-4 sm:p-5">
        <p className="break-words font-[Poppins] text-sm text-red-600">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full min-w-0 flex-col items-center rounded-2xl bg-egg p-3 shadow-sm sm:p-5 md:p-6">
      {/* Header */}
      <div className="mb-4 w-full max-w-7xl sm:mb-5">
        <h2 className="font-[PoppinsBold] text-base text-[#9caf7e] sm:text-lg">
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
        <div className="gca-calendar w-full max-w-7xl min-w-0 overflow-x-auto  bg-bone">
          <div className="min-w-[600px] sm:min-w-0">
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
                const { event, timeText } = eventInfo;

                return (
                  <div className="event-card flex h-full w-full flex-col justify-between overflow-hidden rounded-md border border-[#7f9464] bg-[#9caf7e] px-1 py-1 text-white shadow-sm sm:rounded-lg sm:px-2 sm:py-1.5">
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
