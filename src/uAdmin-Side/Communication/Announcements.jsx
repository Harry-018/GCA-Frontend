import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/AdminComponents/Communication/Announcement/Header";
import SchoolYearLabel from "../../Components/AdminComponents/Academic Management/Schedule/SchoolYearLabel";
import YearCard from "../../Components/AdminComponents/Communication/Announcement/YearCard";

const SCHOOL_YEAR = "2026 - 2027";

const yearcard = [
  { id: 1, title: "Pre - School", count: 3 },
  { id: 2, title: "Pre - Kinder", count: 2 },
  { id: 3, title: "Kinder", count: 1 },
];

const Announcement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Announcements");

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
        <SchoolYearLabel schoolYear={SCHOOL_YEAR} />

        <div className="flex flex-wrap gap-3 py-4 sm:gap-4">
          {yearcard.map((card) => (
            <YearCard
              key={card.id}
              title={card.title}
              count={card.count}
              label="Current Announcement"
              onClick={() =>
                navigate(
                  `/admin/communication/announcements?year=${encodeURIComponent(
                    card.title
                  )}`
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;