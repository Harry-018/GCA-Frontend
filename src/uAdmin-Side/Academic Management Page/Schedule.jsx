import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Schedule/SectionCard";

import {
  getScheduleSchoolYears,
  getScheduleGradeLevels,
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

const Schedule = () => {
  const navigate = useNavigate();

  const [schoolYears, setSchoolYears] = useState([]);
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState("");
  const [gradeLevels, setGradeLevels] = useState([]);

  const [loadingYears, setLoadingYears] = useState(true);
  const [loadingGradeLevels, setLoadingGradeLevels] = useState(false);
  const [error, setError] = useState("");

  // Load school years and select the active year by default.
  useEffect(() => {
    const loadSchoolYears = async () => {
      try {
        setLoadingYears(true);
        setError("");

        const result = await getScheduleSchoolYears();
        const years = result.data || [];

        setSchoolYears(years);

        const activeYear = years.find(
          (year) => year.sy_status?.toLowerCase() === "active",
        );

        const defaultYearId =
          activeYear?.school_year_id ??
          result.selected_school_year_id ??
          years[0]?.school_year_id;

        setSelectedSchoolYearId(
          defaultYearId != null ? String(defaultYearId) : "",
        );
      } catch (error) {
        console.error("Failed to load schedule school years:", error);
        setError("Failed to load school years.");
      } finally {
        setLoadingYears(false);
      }
    };

    loadSchoolYears();
  }, []);

  // Reload grade levels whenever the selected school year changes.
  useEffect(() => {
    if (!selectedSchoolYearId) {
      setGradeLevels([]);
      setLoadingGradeLevels(false);
      return;
    }

    let cancelled = false;

    const loadGradeLevels = async () => {
      try {
        setLoadingGradeLevels(true);
        setError("");

        const data = await getScheduleGradeLevels(selectedSchoolYearId);

        if (!cancelled) {
          setGradeLevels(data || []);
        }
      } catch (error) {
        console.error("Failed to load schedule grade levels:", error);

        if (!cancelled) {
          setGradeLevels([]);
          setError("Failed to load grade levels for this school year.");
        }
      } finally {
        if (!cancelled) {
          setLoadingGradeLevels(false);
        }
      }
    };

    loadGradeLevels();

    return () => {
      cancelled = true;
    };
  }, [selectedSchoolYearId]);

  const loading = loadingYears || loadingGradeLevels;

  const selectedYear = schoolYears.find(
    (year) => String(year.school_year_id) === String(selectedSchoolYearId),
  );

  const schoolYear =
    selectedYear?.start_date && selectedYear?.end_date
      ? `${new Date(selectedYear.start_date).getUTCFullYear()} - ${new Date(selectedYear.end_date).getUTCFullYear()}`
      : "";

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col py-2 text-[14px]">
        <SectionToolbar
          pageTitle="Schedules"
          schoolYears={schoolYears}
          selectedSchoolYearId={selectedSchoolYearId}
          onSchoolYearChange={setSelectedSchoolYearId}
          loading={loadingYears}
        />

        {error ? (
          <div className="py-10 text-center text-sm text-red-600">{error}</div>
        ) : loading ? (
          <div className="py-10 text-center text-sm text-gray-500">
            Loading grade levels...
          </div>
        ) : gradeLevels.length === 0 ? (
          <div className="py-10 text-center text-sm text-gray-500">
            No grade levels available for this school year.
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 py-4">
            {gradeLevels.map((grade) => (
              <SectionCard
                key={grade.sy_grade_level_id}
                gradeLevel={grade.grade_level_name}
                count={Number(grade.section_count)}
                schoolYear={schoolYear}
                onClick={() =>
                  navigate(
                    `/admin/academic/schedulesection?sy_grade_level_id=${grade.sy_grade_level_id}&level=${encodeURIComponent(grade.grade_level_name)}&school_year_id=${selectedSchoolYearId}&schoolYear=${encodeURIComponent(schoolYear)}`,
                  )
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Schedule;
