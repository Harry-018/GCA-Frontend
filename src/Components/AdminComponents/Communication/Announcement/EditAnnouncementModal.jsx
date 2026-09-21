import React, { useState } from "react";
import { X } from "lucide-react";

const EditAnnouncementModal = ({
  isOpen,
  onClose,
  onSave,
  announcement,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    eventDate: "",
    startTime: "",
    endTime: "",
    venue: "",
    description: "",
  });
  const [prevAnnouncement, setPrevAnnouncement] = useState(null);

  if (announcement !== prevAnnouncement) {
    setPrevAnnouncement(announcement);

    if (announcement) {
      setFormData({
        title: announcement.title || "",
        eventDate: announcement.eventDate || "",
        startTime: announcement.startTime || "",
        endTime: announcement.endTime || "",
        venue: announcement.venue || "",
        description: announcement.description || "",
      });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave?.({ ...announcement, ...formData });
  };

  if (!isOpen) return null;

  const inputStyle =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-600 outline-none focus:border-[#9bb184] focus:ring-1 focus:ring-[#9bb184]";

  const labelStyle = "text-2xs text-gray-600";

  const timeOptions = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? "00" : "30";

    return `${String(hour).padStart(2, "0")}:${minute}`;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 p-4">
      <div className="relative flex max-h-[95vh] w-full max-w-md flex-col gap-5 overflow-y-auto rounded-2xl border border-gray-200 bg-[#f4f6ff] p-5 shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#91a978]">
            Edit Announcement
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Title and Event Date */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[2fr_1.2fr]">
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

          {/* Start Time and End Time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    {new Date(`2000-01-01T${time}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
                  </option>
                ))}
              </select>
            </div>

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
                    {new Date(`2000-01-01T${time}`).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }
                    )}
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
              rows={5}
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAnnouncementModal;