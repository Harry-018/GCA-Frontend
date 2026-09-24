import React, { useState } from "react";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";

const INITIAL_SECTION_NAMES = ["Grace", "Hope", "Faith", "Peace", "Joy"];

const inputClass =
  "w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-xs sm:text-sm text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green focus:ring-1 focus:ring-lime-green";

const labelClass = "font-[Poppins] text-xs sm:text-sm text-[#555555]";

const AdminSectionName = () => {
  const [sectionNames, setSectionNames] = useState(INITIAL_SECTION_NAMES);
  const [newSection, setNewSection] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [pendingDelete, setPendingDelete] = useState(null); // index awaiting confirmation

  const handleAddSection = () => {
    const name = newSection.trim();
    if (!name) return;

    setSectionNames((prev) => [...prev, name]);
    setNewSection("");
  };

  const startEditSection = (index) => {
    setPendingDelete(null);
    setEditingIndex(index);
    setEditingValue(sectionNames[index]);
  };

  const cancelEditSection = () => {
    setEditingIndex(null);
    setEditingValue("");
  };

  const handleSaveSection = () => {
    const name = editingValue.trim();
    if (!name || editingIndex === null) return;

    setSectionNames((prev) =>
      prev.map((item, i) => (i === editingIndex ? name : item))
    );
    setEditingIndex(null);
    setEditingValue("");
  };

  const requestRemoveSection = (index) => {
    setEditingIndex(null);
    setPendingDelete(index);
  };

  const confirmRemoveSection = (index) => {
    setSectionNames((prev) => prev.filter((_, i) => i !== index));
    setPendingDelete(null);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
        <div className="rounded-2xl">
          <div className="flex w-full max-w-md flex-col gap-1.5">
            <label className={labelClass}>New section name</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddSection();
                }}
                placeholder="Type a section name"
                className={inputClass}
                aria-label="New section name"
              />

              <button
                type="button"
                onClick={handleAddSection}
                disabled={!newSection.trim()}
                className="flex shrink-0 items-center gap-1 rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-xs font-semibold text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={14} strokeWidth={2.5} />
                Add
              </button>
            </div>
          </div>

          <div className="pt-6">
            {sectionNames.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#cfcfcf] px-6 py-10 text-center">
                <p className="font-[Poppins] text-sm text-[#999999]">
                  No sections yet. Add one above to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {sectionNames.map((name, index) => {
                  const isEditing = editingIndex === index;
                  const isPendingDelete = pendingDelete === index;

                  return (
                    <div
                      key={`${name}-${index}`}
                      className={`flex w-full flex-col gap-y-4 rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${
                        isEditing
                          ? "border-lime-green ring-1 ring-lime-green"
                          : isPendingDelete
                            ? "border-red-300"
                            : "border-gray-100"
                      }`}
                    >
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editingValue}
                            onChange={(e) => setEditingValue(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleSaveSection();
                              if (e.key === "Escape") cancelEditSection();
                            }}
                            autoFocus
                            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-1.5 text-xs font-[Poppins] text-[#555555] outline-none focus:border-lime-green"
                            aria-label={`Edit section name ${name}`}
                          />

                          <button
                            type="button"
                            onClick={handleSaveSection}
                            aria-label="Save section name"
                            className="shrink-0 rounded-full bg-swamp-green p-2 text-white transition hover:bg-lime-green"
                          >
                            <Check size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditSection}
                            aria-label="Cancel editing"
                            className="shrink-0 rounded-full p-2 text-gray-400 transition hover:text-gray-600"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : isPendingDelete ? (
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-[Poppins] text-xs text-[#555555]">
                            Remove <span className="font-[PoppinsBold]">{name}</span>?
                          </p>
                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => confirmRemoveSection(index)}
                              className="rounded-full bg-red-400 px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-white transition hover:bg-red-500"
                            >
                              Remove
                            </button>
                            <button
                              type="button"
                              onClick={() => setPendingDelete(null)}
                              className="rounded-full px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-gray-500 transition hover:text-gray-700"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="truncate font-[PoppinsBold] text-md text-swamp-green">
                            {name}
                          </h2>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => startEditSection(index)}
                              aria-label={`Edit ${name}`}
                              className="rounded-full p-2 text-gray-500 transition hover:text-swamp-green"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              onClick={() => requestRemoveSection(index)}
                              aria-label={`Remove ${name}`}
                              className="rounded-full p-2 text-gray-500 transition hover:text-red-400"
                            >
                              <Trash2 size={15} className="text-red-400"/>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSectionName;