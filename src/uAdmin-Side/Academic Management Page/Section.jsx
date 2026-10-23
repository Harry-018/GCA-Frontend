import React, { useEffect, useState } from "react";
import Header from "../../Components/AdminComponents/Academic Management/Header";
import SectionToolbar from "../../Components/AdminComponents/Academic Management/Section/SectionToolbar";
import SectionCard from "../../Components/AdminComponents/Academic Management/Section/SectionCard";
import {
  getSectionSchoolYears,
  getSectionGradeLevels,
} from "../../requests/sectionsRequests";

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const Section = () => {
  const [schoolYears, setSchoolYears] = useState([]);
  const [selectedSchoolYearId, setSelectedSchoolYearId] = useState("");
  const [gradeLevels, setGradeLevels] = useState([]);

  const [loadingYears, setLoadingYears] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load school years and select the active school year.

  useEffect(() => {
    const loadSchoolYears = async () => {
      try {
        setLoadingYears(true);
        setError("");

        const result = await getSectionSchoolYears();
        const years = result.data || [];

        setSchoolYears(years);

        const activeYear = years.find(
          (year) => year.sy_status?.toLowerCase() === "active",
        );

        const defaultYear =
          activeYear?.school_year_id ?? result.selected_school_year_id;

        if (defaultYear != null) {
          setSelectedSchoolYearId(String(defaultYear));
        } else if (years.length > 0) {
          setSelectedSchoolYearId(String(years[0].school_year_id));
        } else {
          setSelectedSchoolYearId("");
        }
      } catch (error) {
        console.error("Failed to load school years:", error);
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
      return;
    }

    let cancelled = false;

    const loadGradeLevels = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await getSectionGradeLevels(selectedSchoolYearId);

        if (!cancelled) {
          setGradeLevels(result.data || []);
        }
      } catch (error) {
        console.error("Failed to load section grade levels:", error);

        if (!cancelled) {
          setGradeLevels([]);
          setError("Failed to load grade levels.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadGradeLevels();

    return () => {
      cancelled = true;
    };
  }, [selectedSchoolYearId]);

  const selectedYear = schoolYears.find(
    (year) => String(year.school_year_id) === selectedSchoolYearId,
  );

  const schoolYearLabel = selectedYear
    ? (selectedYear.school_year_name ??
      selectedYear.school_year ??
      selectedYear.school_year_label ??
      selectedYear.year_name ??
      `${selectedYear.start_year ?? ""} - ${selectedYear.end_year ?? ""}`)
    : "";

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-2 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-2 text-[14px]">
        <SectionToolbar
          pageTitle={"Sections"}
          schoolYears={schoolYears}
          selectedSchoolYearId={selectedSchoolYearId}
          onSchoolYearChange={setSelectedSchoolYearId}
          schoolYear={schoolYearLabel}
          loading={loadingYears}
        />

        <div
          className="grid w-full  grid-cols-1 gap-4 p-4 sm:grid-cols-2 lg:grid-cols-5
        "
        >
          {loadingYears ? (
            <p className="p-4 text-xs text-gray-500">Loading...</p>
          ) : error ? (
            <p className="p-4 text-xs text-red-600">{error}</p>
          ) : !selectedSchoolYearId ? (
            <p className="p-4 text-xs text-gray-500">No school years found.</p>
          ) : loading ? (
            <p className="p-4 text-xs text-gray-500">Loading grade levels...</p>
          ) : gradeLevels.length === 0 ? (
            <p className="p-4 text-xs text-gray-500">
              No grade levels found for this school year.
            </p>
          ) : (
            gradeLevels.map((item) => (
              <SectionCard
                key={item.sy_grade_level_id}
                level={item.grade_level_name}
                syGradeLevelId={item.sy_grade_level_id}
                sectionCount={Number(item.section_count)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
