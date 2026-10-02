import React, { useState } from "react";
import { X } from "lucide-react";

const AddAnnouncementModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "title" || name === "venue" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onAdd?.(formData);

    setFormData({
      title: "",
      eventDate: "",
      startTime: "",
      endTime: "",
      venue: "",
      description: "",
    });
  };

  if (!isOpen) return null;

  const inputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-700 outline-none focus:border-[#9bb184] focus:ring-1 focus:ring-[#9bb184]";

  const labelStyle = "text-2xs text-gray-600";

  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";

    return `${String(hour).padStart(2, "0")}:${minute}`;
  });

  const formatTime = (time) => {
    const [hour, minute] = time.split(":");

    const date = new Date();
    date.setHours(Number(hour), Number(minute));

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative flex max-h-[95vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl border border-gray-200 bg-[#f4f6ff] p-5 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#91a978]">Add Announcement</h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title + Event Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1.2fr]">
            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="title" className={labelStyle}>
                Title:
              </label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>

            {/* Event Date */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="eventDate" className={labelStyle}>
                Event Date:
              </label>

              <input
                id="eventDate"
                name="eventDate"
                type="date"
                value={formData.eventDate}
                onChange={handleChange}
                className={inputStyle}
                required
              />
            </div>
          </div>

          {/* Start Time + End Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Start Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="startTime" className={labelStyle}>
                Start Time:
              </label>

              <select
                id="startTime"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select Time</option>

                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="endTime" className={labelStyle}>
                End Time:
              </label>

              <select
                id="endTime"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className={inputStyle}
                required
              >
                <option value="">Select Time</option>

                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {formatTime(time)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Venue */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="venue" className={labelStyle}>
              Venue:
            </label>

            <input
              id="venue"
              name="venue"
              type="text"
              value={formData.venue}
              onChange={handleChange}
              className={inputStyle}
              required
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="description" className={labelStyle}>
              Description:
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={8}
              className={`${inputStyle} resize-none`}
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 rounded-full border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 rounded-full bg-[#9bb184] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#879f70]"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
