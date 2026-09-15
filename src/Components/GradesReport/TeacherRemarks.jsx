import { useEffect, useState } from "react";
import { MessageSquareText, Pencil, Save } from "lucide-react";

const TeacherRemarks = ({ remark, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [remarks, setRemarks] = useState(remark);

  useEffect(() => {
    setRemarks(remark);
    setIsEditing(false);
  }, [remark]);

  const handleSave = () => {
    onSave(remarks);
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (value) => {
    setRemarks(value);
  };

  return (
    <div className="rounded-2xl bg-slate-50 px-3 py-3 shadow-md sm:rounded-3xl sm:px-5 sm:py-5 md:px-6 md:py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#9caf7d]/15 sm:h-8 sm:w-8">
            <MessageSquareText size={10} className="text-swamp-green" />
          </div>
          <h2 className="text-2xs font-[PoppinsBold] uppercase text-swamp-green sm:text-sm">
            Teacher Remarks
          </h2>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            type="button"
            onClick={handleEdit}
            disabled={isEditing}
            className="flex items-center gap-1 rounded-full border border-gray-300 px-2 py-1 text-[8px] font-[PoppinsBold] uppercase text-swamp-green transition-all duration-300 ease-in-out hover:bg-gray-100 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-[9px]"
          >
            <Pencil size={8} />
            Edit
          </button>

          <button
            type="button"
            onClick={handleSave}
            disabled={!isEditing}
            className="flex items-center gap-1 rounded-full bg-swamp-green px-2 py-1 text-[8px] font-[PoppinsBold] uppercase text-white transition-all duration-300 ease-in-out hover:opacity-90 disabled:opacity-50 sm:px-4 sm:py-2 sm:text-[9px]"
          >
            <Save size={8} />
            Save
          </button>
        </div>
      </div>

      {/* Remarks */}
      <div className="py-3 sm:py-6">
        <textarea
          value={remarks}
          onChange={(e) => handleChange(e.target.value)}
          disabled={!isEditing}
          rows={3}
          placeholder="Write your remarks here..."
          className="w-full resize-none rounded-xl border border-gray-400 bg-transparent px-2.5 py-2.5 text-2xs leading-relaxed text-gray-600 outline-none transition-all duration-300 ease-in-out placeholder:text-gray-300 focus:border-swamp-green focus:shadow-[0_0_0_3px_rgba(156,175,125,0.15)] disabled:cursor-default sm:rounded-2xl sm:px-4 sm:py-4 sm:text-xs"
        />
      </div>
    </div>
  );
};

export default TeacherRemarks;
