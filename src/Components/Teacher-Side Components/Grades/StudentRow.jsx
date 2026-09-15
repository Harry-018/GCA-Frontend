import React from "react";

const StudentRow = ({ student, columns, colCount, onGradesClick }) => {
  return (
    <div
      className="grid items-center gap-6 rounded-xl bg-bone px-6 py-3 text-left text-xs text-slate-600"
      style={{ gridTemplateColumns: `repeat(${colCount}, 1fr)` }}
    >
      {columns.map((col) => (
        <span key={col.key} className="min-w-0 truncate">
          {col.key === "actions" ? (
            <button
              type="button"
              onClick={() => onGradesClick(student)}
              className="rounded-full bg-[#9caf7d] px-5 py-2 text-xs font-[PoppinsBold] text-white transition hover:opacity-90"
            >
              Grades
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
