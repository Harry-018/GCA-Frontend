import { useState } from "react";
import { ChevronDown } from "lucide-react";
import SidePanel from "./SidePanel";

const DevelopmentCards = ({ developments, onGradeChange }) => {
  const [activeId, setActiveId] = useState(null);
  const [openGradeId, setOpenGradeId] = useState(null);

  const activeDevelopment = developments.find((d) => d.id === activeId);

  const handleOpen = (id) => {
    setActiveId(id);
    setOpenGradeId(null);
  };

  const handleClose = () => {
    setActiveId(null);
    setOpenGradeId(null);
  };

  const toggleGrade = (id) => {
    setOpenGradeId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {developments.map((development) => (
          <div
            key={development.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#082d2a]">
                  <span className="text-2xs font-[PoppinsBold] text-white">
                    {development.id}
                  </span>
                </div>
                <h3 className="text-2xs font-[PoppinsBold] uppercase leading-tight tracking-wide text-[#082d2a]">
                  {development.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => handleOpen(development.id)}
                className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full border border-[#9caf7d]/30 bg-[#9caf7d]/10 px-2.5 py-1.5 text-[9px] font-[PoppinsBold] uppercase text-[#082d2a] transition hover:bg-[#9caf7d]/20"
              >
                See More
                <ChevronDown size={12} className="-rotate-90" />
              </button>
            </div>

            {/* Skill count preview */}
            <div className="border-t border-gray-100 px-5 py-3">
              <p className="text-2xs text-gray-400">
                {(development.grades || []).length} skills available
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Side Panel */}
      {activeDevelopment && (
        <SidePanel
          id={activeDevelopment.id}
          title={activeDevelopment.name}
          skills={activeDevelopment.grades || []}
          onClose={handleClose}
          openGradeId={openGradeId}
          toggleGrade={toggleGrade}
          onGradeChange={onGradeChange}
        />
      )}
    </>
  );
};

export default DevelopmentCards;
