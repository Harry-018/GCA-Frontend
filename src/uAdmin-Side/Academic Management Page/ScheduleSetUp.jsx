import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ScheduleToolbar from "../../Components/AdminComponents/Academic Management/Schedule/ScheduleToolbar";
import ScheduleTable from "../../Components/AdminComponents/Academic Management/Schedule/ScheduleTable";
import ScheduleModal from "../../Components/AdminModal/AcademicManagementPage/ScheduleModal";
import AddScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/AddScheduleModal";
import EditScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/EditScheduleModal";
import RemoveScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/RemoveScheduleModal";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SCHOOL_YEAR = "2026 - 2027";

const DAYS = [
  { label: "Mon", value: "monday" },
  { label: "Tue", value: "tuesday" },
  { label: "Wed", value: "wednesday" },
  { label: "Thu", value: "thursday" },
  { label: "Fri", value: "friday" },
];

const DAY_OPTIONS = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
];

const SUBJECT_OPTIONS = [
  { id: 1, name: "Physical Development" },
  { id: 2, name: "Socio-Emotional Development" },
  { id: 3, name: "Cognitive Development" },
  { id: 4, name: "Spiritual Development" },
  { id: 5, name: "Reading" },
  { id: 6, name: "Numbers" },
  { id: 7, name: "Arts and Crafts" },
  { id: 8, name: "Story Time" },
  { id: 9, name: "Music and Movement" },
];

const ROOM_OPTIONS = [
  { id: 1, name: "Covered Court" },
  { id: 2, name: "Mahogany - 3" },
  { id: 3, name: "Sampaguita Room" },
  { id: 4, name: "Library" },
];

const TIME_OPTIONS = [
  { id: 1, label: "07:30 AM", value: "07:30 AM" },
  { id: 2, label: "08:00 AM", value: "08:00 AM" },
  { id: 3, label: "09:00 AM", value: "09:00 AM" },
  { id: 4, label: "10:30 AM", value: "10:30 AM" },
  { id: 5, label: "11:30 AM", value: "11:30 AM" },
  { id: 6, label: "01:00 PM", value: "01:00 PM" },
  { id: 7, label: "02:00 PM", value: "02:00 PM" },
  { id: 8, label: "03:00 PM", value: "03:00 PM" },
];

const TEACHER_OPTIONS = [
  { id: 1, name: "Carlos Agassi" },
  { id: 2, name: "Kathryn Bernardo" },
  { id: 3, name: "Henry Cavill" },
  { id: 4, name: "Michelle Jones" },
];

const EMPTY_FORM = {
  subject: "",
  teacher: "",
  day: "",
  room: "",
  from: "",
  to: "",
};

const scheduleData = [
  {
    id: 1,
    subject: "Physical Development",
    teacher: "Carlos Agassi",
    day: "Monday",
    time: "08:00 AM - 09:00 AM",
    room: "Covered Court",
  },
  {
    id: 2,
    subject: "Socio-Emotional Development",
    teacher: "Kathryn Bernardo",
    day: "Monday",
    time: "09:00 AM - 09:30 AM",
    room: "Mahogany - 3",
  },
  {
    id: 3,
    subject: "Cognitive Development",
    teacher: "Henry Cavill",
    day: "Monday",
    time: "09:30 AM - 10:30 AM",
    room: "Mahogany - 3",
  },
  {
    id: 4,
    subject: "Spiritual Development",
    teacher: "Michelle Jones",
    day: "Monday",
    time: "10:30 AM - 11:00 AM",
    room: "Mahogany - 3",
  },
  {
    id: 5,
    subject: "Physical Development",
    teacher: "Carlos Agassi",
    day: "Tuesday",
    time: "08:00 AM - 09:00 AM",
    room: "Covered Court",
  },
  {
    id: 6,
    subject: "Socio-Emotional Development",
    teacher: "Kathryn Bernardo",
    day: "Tuesday",
    time: "09:00 AM - 09:30 AM",
    room: "Mahogany - 3",
  },
  {
    id: 7,
    subject: "Cognitive Development",
    teacher: "Henry Cavill",
    day: "Tuesday",
    time: "09:30 AM - 10:30 AM",
    room: "Mahogany - 3",
  },
];

const ScheduleSetUp = () => {
  const [searchParams] = useSearchParams();
  const [activeDay, setActiveDay] = useState("monday");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [scheduleToRemove, setScheduleToRemove] = useState(null);
  const [schedules, setSchedules] = useState(scheduleData);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editData, setEditData] = useState(EMPTY_FORM);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const level = searchParams.get("level") || "";
  const section = searchParams.get("section") || "";

  const handleSchedule = () => {
    setIsScheduleOpen(true);
  };

  const handleAddSchedule = () => {
    setFormData(EMPTY_FORM);
    setIsAddScheduleOpen(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    if (
      !formData.subject ||
      !formData.teacher ||
      !formData.day ||
      !formData.room ||
      !formData.from
    ) {
      return;
    }

    const time = formData.to
      ? `${formData.from} - ${formData.to}`
      : formData.from;

    setSchedules((prev) => [
      ...prev,
      {
        id: Date.now(),
        subject: formData.subject,
        teacher: formData.teacher,
        day: formData.day,
        time,
        room: formData.room,
      },
    ]);
    setIsAddScheduleOpen(false);
    setFormData(EMPTY_FORM);
  };

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);

    const [from, to] = schedule.time.split(" - ");

    setEditData({
      subject: schedule.subject,
      teacher: schedule.teacher,
      day: schedule.day,
      room: schedule.room,
      from,
      to: to ?? "",
    });
    setIsEditScheduleOpen(true);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!editingSchedule) return;

    const time = editData.to
      ? `${editData.from} - ${editData.to}`
      : editData.from;

    setSchedules((prev) =>
      prev.map((item) =>
        item.id === editingSchedule.id
          ? {
              ...item,
              subject: editData.subject,
              teacher: editData.teacher,
              day: editData.day,
              room: editData.room,
              time,
            }
          : item
      )
    );
    setIsEditScheduleOpen(false);
    setEditingSchedule(null);
  };

  const handleRemove = (schedule) => {
    setScheduleToRemove(schedule);
    setIsRemoveOpen(true);
  };

  const confirmRemove = () => {
    if (!scheduleToRemove) return;

    setSchedules((prev) => prev.filter((item) => item.id !== scheduleToRemove.id));
    setIsRemoveOpen(false);
    setScheduleToRemove(null);
  };

  const filteredSchedules = schedules.filter(
    (schedule) => schedule.day.toLowerCase() === activeDay
  );

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <ScheduleToolbar
        sectionName={section}
        schoolYear={SCHOOL_YEAR}
        days={DAYS}
        activeDay={activeDay}
        onDayChange={setActiveDay}
        onViewSchedule={handleSchedule}
        onAddSchedule={handleAddSchedule}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-4 py-2">
        <ScheduleTable
          schedules={filteredSchedules}
          onEdit={handleEdit}
          onRemove={handleRemove}
        />
      </div>

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        sectionName={section}
        schedules={schedules}
      />

      {isAddScheduleOpen && (
        <AddScheduleModal
          gradeLevel={level}
          schoolYear={SCHOOL_YEAR}
          section={section}
          subjects={SUBJECT_OPTIONS}
          teachers={TEACHER_OPTIONS}
          days={DAY_OPTIONS}
          rooms={ROOM_OPTIONS}
          times={TIME_OPTIONS}
          formData={formData}
          onChange={handleChange}
          onCancel={() => setIsAddScheduleOpen(false)}
          onAdd={handleAdd}
        />
      )}

      {isEditScheduleOpen && (
        <EditScheduleModal
          gradeLevel={level}
          schoolYear={SCHOOL_YEAR}
          section={section}
          subjects={SUBJECT_OPTIONS}
          teachers={TEACHER_OPTIONS}
          days={DAY_OPTIONS}
          rooms={ROOM_OPTIONS}
          times={TIME_OPTIONS}
          formData={editData}
          onChange={handleEditChange}
          onCancel={() => setIsEditScheduleOpen(false)}
          onSave={handleSave}
        />
      )}

      {isRemoveOpen && (
        <RemoveScheduleModal
          isOpen={isRemoveOpen}
          onClose={() => setIsRemoveOpen(false)}
          scheduleName={
            scheduleToRemove
              ? `${scheduleToRemove.subject} on ${scheduleToRemove.day}`
              : ""
          }
          onRemove={confirmRemove}
        />
      )}
    </div>
  );
};

export default ScheduleSetUp;