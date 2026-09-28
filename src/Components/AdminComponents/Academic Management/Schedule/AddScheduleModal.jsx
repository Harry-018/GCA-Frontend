import React from "react";

const AddScheduleModal = ({
  gradeLevel,
  schoolYear,
  section,
  subjects = [],
  teachers = [],
  days = [],
  rooms = [],
  times = [],
  formData,
  onChange,
  onCancel,
  onAdd,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-5">
      <div className="flex w-full max-w-md flex-col gap-1 rounded-2xl bg- p-5">
        {/* Header */}
        <div className="mb-3">
          <h2 className="font-[PoppinsBold] text-sm text-swamp-green">
            Add Schedule
          </h2>
          <p className="mt-1 font-[Poppins] text-2xs text-gray-500">
            {gradeLevel} • {section} • S.Y. {schoolYear}
          </p>
        </div>
        {/* Subject */}
        <div className="flex flex-col gap-1">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Subject:
          </label>
          <select
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
          >
            <option value="">Select Subject</option>
            {subjects.map((subject) => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        {/* Teacher */}
        <div className="flex flex-col gap-1 pt-3">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Teacher:
          </label>
          <select
            name="teacher"
            value={formData.teacher}
            onChange={onChange}
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
          >
            <option value="">Select Teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        {/* Day / Room */}
        <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          {/* Day */}
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              Day:
            </label>
            <select
              name="day"
              value={formData.day}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
            >
              <option value="">Select Day</option>
              {days.map((day) => (
                <option key={day.id} value={day.id}>
                  {day.name}
                </option>
              ))}
            </select>
          </div>
          {/* Room */}
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              Room:
            </label>
            <select
              name="room"
              value={formData.room}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
            >
              <option value="">Select Room</option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* From / To */}
        <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          {/* From */}
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              From:
            </label>
            <select
              name="from"
              value={formData.from}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
            >
              <option value="">Select Time</option>
              {times.map((time) => (
                <option key={time.id} value={time.start}>
                  {time.startLabel}
                </option>
              ))}
            </select>
          </div>
          {/* To */}
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">To:</label>
            <select
              name="to"
              value={formData.to}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 py-1 text-left font-[Poppins] text-2xs leading-none text-gray-600 outline-none"
            >
              <option value="">Select Time</option>
              {times.map((time) => (
                <option key={time.id} value={time.end}>
                  {time.endLabel}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Buttons */}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 px-4 py-2 font-[Poppins] text-2xs text-gray-600 transition hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onAdd}
            className="rounded-lg bg-swamp-green px-4 py-2 font-[PoppinsBold] text-2xs text-white transition hover:opacity-90"
          >
            Add Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
export default AddScheduleModal;
