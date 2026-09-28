import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import ScheduleToolbar from "../../Components/AdminComponents/Academic Management/Schedule/ScheduleToolbar";
import ScheduleModal from "../../Components/AdminModal/AcademicManagementPage/ScheduleModal";
import AddScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/AddScheduleModal";
import EditScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/EditScheduleModal";
import RemoveScheduleModal from "../../Components/AdminComponents/Academic Management/Schedule/RemoveScheduleModal";
import DataTable from "../../Components/DataTable.jsx";

import {
  getSectionSchedules,
  getScheduleSubjects,
  getScheduleTeachers,
  getScheduleRooms,
  getScheduleDays,
  getScheduleTimes,
  createSchedule,
  editSchedule,
  deleteSchedule,
} from "../../requests/schedulesRequests.js";

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
const EMPTY_FORM = {
  subject: "",
  teacher: "",
  day: "",
  room: "",
  from: "",
  to: "",
};
const formatTime = (time) => {
  if (!time) return "";
  const [hours, minutes] = String(time).split(":");
  const date = new Date();
  date.setHours(Number(hours), Number(minutes), 0, 0);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const normalizeTime = (time) => {
  if (!time) return "";
  return String(time).slice(0, 5);
};

const getTeacherName = (teacher) => {
  return [teacher.first_name, teacher.middle_name, teacher.last_name]
    .filter(Boolean)
    .join(" ");
};

const ScheduleSetUp = () => {
  const [searchParams] = useSearchParams();
  const sectionId = Number(searchParams.get("section_id"));
  const level = searchParams.get("level") || "";
  const section = searchParams.get("section") || "";
  const [activeDay, setActiveDay] = useState("monday");
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAddScheduleOpen, setIsAddScheduleOpen] = useState(false);
  const [isEditScheduleOpen, setIsEditScheduleOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [scheduleToRemove, setScheduleToRemove] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [days, setDays] = useState([]);
  const [times, setTimes] = useState([]);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [editData, setEditData] = useState(EMPTY_FORM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sectionId || sectionId <= 0) {
      setLoading(false);
      return;
    }
    const loadScheduleData = async () => {
      try {
        setLoading(true);
        const [
          schedulesData,
          subjectsData,
          teachersData,
          roomsData,
          daysData,
          timesData,
        ] = await Promise.all([
          getSectionSchedules(sectionId),
          getScheduleSubjects(sectionId),
          getScheduleTeachers(),
          getScheduleRooms(),
          getScheduleDays(),
          getScheduleTimes(),
        ]);
        setSchedules(schedulesData);
        setSubjects(subjectsData);
        setTeachers(teachersData);
        setRooms(roomsData);
        setDays(daysData);
        setTimes(timesData);
      } catch (error) {
        console.error("Failed to load schedule setup data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadScheduleData();
  }, [sectionId]);
  const subjectOptions = useMemo(
    () =>
      subjects.map((subject) => ({
        id: subject.subject_id,
        name: subject.subject_name,
      })),
    [subjects],
  );
  const teacherOptions = useMemo(
    () =>
      teachers.map((teacher) => ({
        id: teacher.teacher_id,
        name: getTeacherName(teacher),
      })),
    [teachers],
  );
  const roomOptions = useMemo(
    () => rooms.map((room) => ({ id: room.room_id, name: room.room_name })),
    [rooms],
  );
  const dayOptions = useMemo(
    () => days.map((day) => ({ id: day.day_id, name: day.day_name })),
    [days],
  );
  const timeOptions = useMemo(
    () =>
      times.map((time) => ({
        id: time.sched_time_id,
        start: normalizeTime(time.sched_start_time),
        end: normalizeTime(time.sched_end_time),
        startLabel: formatTime(time.sched_start_time),
        endLabel: formatTime(time.sched_end_time),
        label: `${formatTime(time.sched_start_time)} - ${formatTime(
          time.sched_end_time,
        )}`,
      })),
    [times],
  );
  const handleAddSchedule = () => {
    setFormData(EMPTY_FORM);
    setIsAddScheduleOpen(true);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleAdd = async () => {
    if (
      !formData.subject ||
      !formData.teacher ||
      !formData.day ||
      !formData.room ||
      !formData.from ||
      !formData.to
    ) {
      return;
    }
    const selectedTime = timeOptions.find(
      (time) => time.start === formData.from && time.end === formData.to,
    );
    if (!selectedTime) {
      console.error("Selected schedule time was not found.");
      return;
    }
    try {
      const result = await createSchedule({
        section_id: sectionId,
        subject_id: Number(formData.subject),
        teacher_id: Number(formData.teacher),
        day_id: Number(formData.day),
        room_id: Number(formData.room),
        sched_time_id: Number(selectedTime.id),
      });
      console.log("Schedule created:", result);
      const updatedSchedules = await getSectionSchedules(sectionId);
      setSchedules(updatedSchedules);
      setIsAddScheduleOpen(false);
      setFormData(EMPTY_FORM);
    } catch (error) {
      console.error("Failed to create schedule:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to create schedule.";
      alert(message);
    }
  };
  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setEditData({
      subject: String(schedule.subject_id),
      teacher: String(schedule.teacher_id),
      day: String(schedule.day_id),
      room: String(schedule.room_id),
      from: normalizeTime(schedule.sched_start_time),
      to: normalizeTime(schedule.sched_end_time),
    });
    setIsEditScheduleOpen(true);
  };
  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSave = async () => {
    if (!editingSchedule) return;
    if (
      !editData.subject ||
      !editData.teacher ||
      !editData.day ||
      !editData.room ||
      !editData.from ||
      !editData.to
    ) {
      return;
    }
    const selectedTime = timeOptions.find(
      (time) => time.start === editData.from && time.end === editData.to,
    );
    if (!selectedTime) {
      console.error("Selected schedule time was not found.");
      return;
    }
    try {
      const result = await editSchedule(editingSchedule.schedule_id, {
        section_id: sectionId,
        subject_id: Number(editData.subject),
        teacher_id: Number(editData.teacher),
        day_id: Number(editData.day),
        room_id: Number(editData.room),
        sched_time_id: Number(selectedTime.id),
      });
      console.log("Schedule updated:", result);
      const updatedSchedules = await getSectionSchedules(sectionId);
      setSchedules(updatedSchedules);
      setIsEditScheduleOpen(false);
      setEditingSchedule(null);
      setEditData(EMPTY_FORM);
    } catch (error) {
      console.error("Failed to update schedule:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to update schedule.";
      alert(message);
    }
  };
  const handleRemove = (schedule) => {
    setScheduleToRemove(schedule);
    setIsRemoveOpen(true);
  };
  const confirmRemove = async () => {
    if (!scheduleToRemove) return;
    try {
      await deleteSchedule(scheduleToRemove.schedule_id);
      const updatedSchedules = await getSectionSchedules(sectionId);
      setSchedules(updatedSchedules);
      setIsRemoveOpen(false);
      setScheduleToRemove(null);
    } catch (error) {
      console.error("Failed to delete schedule:", error);
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        "Failed to delete schedule.";
      alert(message);
    }
  };
  const activeDayId = days.find(
    (day) => day.day_name.toLowerCase() === activeDay,
  )?.day_id;
  const filteredSchedules = schedules.filter(
    (schedule) => Number(schedule.day_id) === Number(activeDayId),
  );
  const columns = useMemo(
    () => [
      { accessorKey: "subject_name", header: "SUBJECT" },
      {
        id: "teacher",
        header: "TEACHER",
        accessorFn: (row) =>
          [row.first_name, row.middle_name, row.last_name]
            .filter(Boolean)
            .join(" "),
      },
      { accessorKey: "day_name", header: "DAY" },
      { accessorKey: "room_name", header: "ROOM" },
      {
        accessorKey: "sched_start_time",
        header: "START TIME",
        cell: ({ row }) => formatTime(row.original.sched_start_time),
      },
      {
        accessorKey: "sched_end_time",
        header: "END TIME",
        cell: ({ row }) => formatTime(row.original.sched_end_time),
      },
      {
        id: "actions",
        header: "ACTIONS",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleEdit(row.original)}
              className="rounded-full border border-gray-300 px-3 py-1 text-xs text-gray-600 transition hover:bg-gray-100"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={() => handleRemove(row.original)}
              className="rounded-full px-3 py-1 text-xs text-egg transition bg-reject hover:bg-reject/80"
            >
              Remove
            </button>
          </div>
        ),
      },
    ],
    [],
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
        onViewSchedule={() => setIsScheduleOpen(true)}
        onAddSchedule={handleAddSchedule}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-4 py-2">
        <DataTable
          data={filteredSchedules}
          columns={columns}
          loading={loading}
          emptyMessage="No schedules found for this day."
          getRowId={(row) => String(row.schedule_id)}
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
          subjects={subjectOptions}
          teachers={teacherOptions}
          days={dayOptions}
          rooms={roomOptions}
          times={timeOptions}
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
          subjects={subjectOptions}
          teachers={teacherOptions}
          days={dayOptions}
          rooms={roomOptions}
          times={timeOptions}
          formData={editData}
          onChange={handleEditChange}
          onCancel={() => {
            setIsEditScheduleOpen(false);
            setEditingSchedule(null);
          }}
          onSave={handleSave}
        />
      )}

      {isRemoveOpen && (
        <RemoveScheduleModal
          isOpen={isRemoveOpen}
          onClose={() => {
            setIsRemoveOpen(false);
            setScheduleToRemove(null);
          }}
          scheduleName={
            scheduleToRemove
              ? `${scheduleToRemove.subject_name} on ${scheduleToRemove.day_name}`
              : ""
          }
          onRemove={confirmRemove}
        />
      )}
    </div>
  );
};

export default ScheduleSetUp;
