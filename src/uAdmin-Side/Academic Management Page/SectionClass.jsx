import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Header from "../../Components/AdminComponents/Academic Management/Header";
import ClassCard from "../../Components/AdminComponents/Academic Management/Section/SectionClass/ClassCard";
import AddSectionModal from "../../Components/AdminModal/AcademicManagementPage/AddSectionModal";
import RemoveSectionModal from "../../Components/AdminModal/AcademicManagementPage/RemoveSectionModal";
import {
  getSectionsByGradeLevel,
  createSection,
  updateSectionStatus,
  getSectionNames,
  getAdviserTeachers,
} from "../../requests/sectionsRequests";

getSectionsByGradeLevel;

const NAV_ITEMS = [
  { name: "Students", path: "/admin/academic" },
  { name: "Teachers", path: "/admin/academic/teachers" },
  { name: "Parents", path: "/admin/academic/parents" },
  { name: "Section", path: "/admin/academic/section" },
  { name: "Schedules", path: "/admin/academic/schedules" },
  { name: "Grade Levels", path: "/admin/academic/grade-levels" },
  { name: "School Years", path: "/admin/academic/school-years" },
];

const SectionClass = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const level = searchParams.get("level") || "Section";
  const syGradeLevelId = searchParams.get("sy_grade_level_id");

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddSectionOpen, setIsAddSectionOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);

  const [removeTarget, setRemoveTarget] = useState(null);

  const [sectionNames, setSectionNames] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [sectionNameId, setSectionNameId] = useState("");
  const [teacherId, setTeacherId] = useState("");

  const availableSectionNames = sectionNames.filter(
    (sectionName) =>
      !classes.some(
        (section) =>
          Number(section.section_name_id) ===
          Number(sectionName.section_name_id),
      ),
  );

  const loadSectionOptions = async () => {
    try {
      const [sectionNamesResult, teachersResult] = await Promise.all([
        getSectionNames(),
        getAdviserTeachers(),
      ]);

      console.log("Section names:", sectionNamesResult);
      console.log("Adviser teachers:", teachersResult);

      setSectionNames(sectionNamesResult.data || []);
      setTeachers(teachersResult.data || []);
    } catch (error) {
      console.error("Failed to load section options:", error);
    }
  };

  const loadSections = async () => {
    try {
      setLoading(true);

      const result = await getSectionsByGradeLevel(Number(syGradeLevelId));

      setClasses(result.data || []);
    } catch (error) {
      console.error("Failed to load sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!syGradeLevelId) return;

    loadSections();
    loadSectionOptions();
  }, [syGradeLevelId]);

  const handleAddSection = () => {
    setSectionNameId("");
    setTeacherId("");
    setIsAddSectionOpen(true);
  };

  const handleCreateSection = async () => {
    if (!sectionNameId || !teacherId) {
      return;
    }

    try {
      await createSection({
        section_name_id: Number(sectionNameId),
        adviser_teacher_id: Number(teacherId),
        sy_grade_level_id: Number(syGradeLevelId),
      });

      setIsAddSectionOpen(false);

      setSectionNameId("");
      setTeacherId("");

      await loadSections();
    } catch (error) {
      console.error("Failed to create section:", error);
    }
  };

  const handleDelete = (section) => {
    setRemoveTarget(section);
    setIsRemoveOpen(true);
  };

  const handleRemove = async () => {
    if (!removeTarget) return;

    try {
      await updateSectionStatus(removeTarget.section_id, "inactive");

      setIsRemoveOpen(false);
      setRemoveTarget(null);

      await loadSections();
    } catch (error) {
      console.error("Failed to deactivate section:", error);
    }
  };

  const handleClassInformation = (section) => {
    navigate(
      `/admin/academic/sectionInformation?level=${encodeURIComponent(
        level,
      )}&section_id=${section.section_id}`,
    );
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 bg-[#ebe9e4] font-[Poppins]">
      <Header navItems={NAV_ITEMS} />

      <div className="flex min-h-0 flex-1 flex-col gap-4 pY-2">
        <div className="flex flex-wrap items-center justify-between gap-x-3 ">
          <div className="flex items-center gap-x-3">
            <h1 className="font-[PoppinsBold] text-sm text-swamp-green">
              {level}
            </h1>
          </div>

          <div className="flex items-center gap-x-2">
            <button
              type="button"
              onClick={() => navigate("/admin/academic/section")}
              className="h-8 shrink-0 rounded-full border border-gray-300 bg-white px-4 text-xs text-gray-500 hover:bg-gray-100"
            >
              Go Back
            </button>

            <button
              type="button"
              onClick={handleAddSection}
              className="h-8 shrink-0 rounded-full bg-swamp-green px-4 font-[Poppins] text-xs text-white hover:bg-[#899d6d]"
            >
              + Assign Section
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {loading ? (
            <p className="p-4 text-xs text-gray-500">Loading sections...</p>
          ) : classes.length === 0 ? (
            <p className="p-4 text-xs text-gray-500">No sections assigned.</p>
          ) : (
            classes.map((item) => (
              <ClassCard
                key={item.section_id}
                section={item.section_name}
                onDelete={() => handleDelete(item)}
                onClassInformation={() => handleClassInformation(item)}
              />
            ))
          )}
        </div>
      </div>

      <AddSectionModal
        isOpen={isAddSectionOpen}
        onClose={() => setIsAddSectionOpen(false)}
        sectionNames={availableSectionNames}
        teachers={teachers}
        sectionNameId={sectionNameId}
        teacherId={teacherId}
        onSectionNameChange={setSectionNameId}
        onTeacherChange={setTeacherId}
        onCreate={handleCreateSection}
      />

      <RemoveSectionModal
        isOpen={isRemoveOpen}
        onClose={() => {
          setIsRemoveOpen(false);
          setRemoveTarget(null);
        }}
        sectionName={removeTarget ? removeTarget.section_name : ""}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default SectionClass;
