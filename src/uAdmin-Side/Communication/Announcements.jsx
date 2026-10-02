import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import SchoolYearLabel from "../../Components/AdminComponents/Academic Management/Schedule/SchoolYearLabel";
import YearCard from "../../Components/AdminComponents/Communication/Announcement/YearCard";

import { getGradeLevelsWithAnnouncementCount } from "../../requests/communicationRequests.js";

const Announcement = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("Announcements");
  const [gradeLevels, setGradeLevels] = useState([]);
  const [loading, setLoading] = useState(true);

  // =====================
  // LOAD GRADE LEVELS
  // =====================

  const loadGradeLevels = async () => {
    try {
      setLoading(true);

      const data = await getGradeLevelsWithAnnouncementCount();

      setGradeLevels(data);
    } catch (error) {
      console.error("Failed to load announcement grade levels:", error);

      alert(
        error.response?.data?.message ||
          "Failed to load announcement grade levels.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGradeLevels();
  }, []);

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <Header
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);

          if (tab === "Notifications") {
            navigate("/admin/communication/notifications");
          }
        }}
      />

      <div className="flex min-h-0 flex-1 flex-col">
        <SchoolYearLabel schoolYear="2026 - 2027" />

        <div className="flex flex-wrap gap-3 py-4 sm:gap-4">
          {loading ? (
            <div className="px-2 text-sm text-gray-500">
              Loading grade levels...
            </div>
          ) : gradeLevels.length === 0 ? (
            <div className="px-2 text-sm text-gray-500">
              No active grade levels found.
            </div>
          ) : (
            gradeLevels.map((gradeLevel) => (
              <YearCard
                key={gradeLevel.sy_grade_level_id}
                title={gradeLevel.grade_level_name}
                count={Number(gradeLevel.announcement_count)}
                label="Current Announcement"
                onClick={() =>
                  navigate(
                    `/admin/communication/announcements?sy_grade_level_id=${gradeLevel.sy_grade_level_id}`,
                  )
                }
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
