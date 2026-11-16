import React from "react";

const StudentRow = ({ student, columns, colCount, onViewClick }) => {
  return (
    <div
      className="grid items-center gap-6 rounded-xl border border-parent-accent/10 bg-bone px-6 py-3 text-left text-xs text-slate-600 transition-colors duration-200 hover:bg-parent-pale/30"
      style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
    >
      {columns.map((col) => (
        <span key={col.key} className="min-w-0 truncate">
          {col.key === "actions" ? (
            <button
              type="button"
              onClick={() => onViewClick(student)}
              className="cursor-pointer rounded-full bg-parent-green px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:bg-parent-accent"
            >
              View
            </button>
          ) : (
            student[col.key]
          )}
        </span>
      ))}
    </div>
  );
};

export default StudentRow;
