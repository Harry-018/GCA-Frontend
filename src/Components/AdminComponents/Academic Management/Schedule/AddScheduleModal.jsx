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
      <div className="w-full max-w-md rounded-2xl bg-[#f4f5fc] px-5 py-4.25 shadow-lg sm:px-5.5 sm:py-4.25">
        <h2 className="font-[PoppinsBold] text-[12px] text-swamp-green">
          Add Schedule
        </h2>

        {/* Fixed Information */}
        <div className="grid grid-cols-1 gap-4 pt-5 sm:grid-cols-3">
          <div>
            <p className="font-[PoppinsMedium] text-2xs text-gray-600">
              Grade Level:
            </p>

            <p className="font-[Poppins] text-2xs text-gray-600">
              {gradeLevel}
            </p>
          </div>

          <div>
            <p className="font-[PoppinsMedium] text-2xs text-gray-600">
              School Year:
            </p>

            <p className="font-[Poppins] text-2xs text-gray-600">
              {schoolYear}
            </p>
          </div>

          <div>
            <p className="font-[PoppinsMedium] text-2xs text-gray-600">
              Section:
            </p>

            <p className="font-[Poppins] text-2xs text-gray-600">
              {section}
            </p>
          </div>
        </div>

        {/* Subject */}
        <div className="flex flex-col gap-1 pt-5">
          <label className="font-[Poppins] text-2xs text-gray-600">
            Subject:
          </label>

          <select
            name="subject"
            value={formData.subject}
            onChange={onChange}
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
          >
            <option value="">Select Subject</option>

            {subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
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
            className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
          >
            <option value="">Select Teacher</option>

            {teachers.map((teacher) => (
              <option key={teacher.id} value={teacher.name}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>

        {/* Day / Room */}
        <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              Day:
            </label>

            <select
              name="day"
              value={formData.day}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
            >
              <option value="">Select Day</option>

              {days.map((day) => (
                <option key={day.id} value={day.name}>
                  {day.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              Room:
            </label>

            <select
              name="room"
              value={formData.room}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
            >
              <option value="">Select Room</option>

              {rooms.map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* From / To */}
        <div className="grid grid-cols-1 gap-2 pt-3 sm:grid-cols-2">
          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              From:
            </label>

            <select
              name="from"
              value={formData.from}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
            >
              <option value="">Select Time</option>

              {times.map((time) => (
                <option key={time.id} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-[Poppins] text-2xs text-gray-600">
              To:
            </label>

            <select
              name="to"
              value={formData.to}
              onChange={onChange}
              className="h-8 w-full rounded-lg border border-gray-300 bg-white px-2.5 text-left font-[Poppins] text-2xs leading-none text-gray-400 outline-none"
            >
              <option value="">Select Time</option>

              {times.map((time) => (
                <option key={time.id} value={time.value}>
                  {time.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="h-7.5 rounded-full border border-gray-400 bg-transparent font-[PoppinsBold] text-[11px] text-gray-500"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onAdd}
            className="h-7.5 rounded-full bg-[#9aae7b] font-[PoppinsBold] text-[11px] text-bone"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddScheduleModal;