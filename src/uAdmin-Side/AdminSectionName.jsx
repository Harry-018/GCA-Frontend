import React, { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X, Check, RotateCcw } from "lucide-react";
import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";
import {
  getSectionNames,
  getArchivedSectionNames,
  createSectionName,
  renameSectionName,
  archiveSectionName,
  restoreSectionName,
} from "../requests/settingsRequests.js";

const inputClass =
  "w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-2 font-[Poppins] text-xs sm:text-sm text-[#555555] outline-none placeholder:text-[#999999] focus:border-lime-green focus:ring-1 focus:ring-lime-green";

const labelClass = "font-[Poppins] text-xs sm:text-sm text-[#555555]";

const AdminSectionName = () => {
  const [sectionNames, setSectionNames] = useState([]);
  const [archivedSectionNames, setArchivedSectionNames] = useState([]);

  const [newSection, setNewSection] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editingValue, setEditingValue] = useState("");

  const [pendingArchive, setPendingArchive] = useState(null);
  const [pendingRestore, setPendingRestore] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingArchived, setLoadingArchived] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSectionNames = async () => {
    try {
      setLoading(true);

      const response = await getSectionNames();

      setSectionNames(response.data);
    } catch (error) {
      console.error("Failed to load section names:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadArchivedSectionNames = async () => {
    try {
      setLoadingArchived(true);

      const response = await getArchivedSectionNames();

      setArchivedSectionNames(response.data);
    } catch (error) {
      console.error("Failed to load archived section names:", error);
    } finally {
      setLoadingArchived(false);
    }
  };

  useEffect(() => {
    loadSectionNames();
    loadArchivedSectionNames();
  }, []);

  const handleAddSection = async () => {
    const name = newSection.trim();

    if (!name || saving) return;

    try {
      setSaving(true);

      const response = await createSectionName({
        section_name: name,
      });

      setSectionNames((prev) => [...prev, response.data]);
      setNewSection("");
    } catch (error) {
      console.error("Failed to create section name:", error);

      alert(error.response?.data?.message || "Failed to create section name.");
    } finally {
      setSaving(false);
    }
  };

  const startEditSection = (section) => {
    setPendingArchive(null);
    setPendingRestore(null);
    setEditingId(section.section_name_id);
    setEditingValue(section.section_name);
  };

  const cancelEditSection = () => {
    setEditingId(null);
    setEditingValue("");
  };

  const handleSaveSection = async () => {
    const name = editingValue.trim();

    if (!name || editingId === null || saving) return;

    try {
      setSaving(true);

      const response = await renameSectionName(editingId, {
        section_name: name,
      });

      setSectionNames((prev) =>
        prev.map((section) =>
          section.section_name_id === editingId
            ? {
                ...section,
                ...response.data,
              }
            : section,
        ),
      );

      setEditingId(null);
      setEditingValue("");
    } catch (error) {
      console.error("Failed to rename section name:", error);

      alert(error.response?.data?.message || "Failed to rename section name.");
    } finally {
      setSaving(false);
    }
  };

  const requestArchiveSection = (section) => {
    setEditingId(null);
    setPendingRestore(null);
    setPendingArchive(section);
  };

  const confirmArchiveSection = async () => {
    if (!pendingArchive || saving) return;

    try {
      setSaving(true);

      await archiveSectionName(pendingArchive.section_name_id);

      setSectionNames((prev) =>
        prev.filter(
          (section) =>
            section.section_name_id !== pendingArchive.section_name_id,
        ),
      );

      setArchivedSectionNames((prev) => [
        ...prev,
        {
          ...pendingArchive,
          section_name_status: "archived",
        },
      ]);

      setPendingArchive(null);
    } catch (error) {
      console.error("Failed to archive section name:", error);

      alert(error.response?.data?.message || "Failed to archive section name.");
    } finally {
      setSaving(false);
    }
  };

  const requestRestoreSection = (section) => {
    setEditingId(null);
    setPendingArchive(null);
    setPendingRestore(section);
  };

  const confirmRestoreSection = async () => {
    if (!pendingRestore || saving) return;

    try {
      setSaving(true);

      const response = await restoreSectionName(pendingRestore.section_name_id);

      const restoredSection = {
        ...pendingRestore,
        ...response.data,
        section_name_status: "active",
      };

      setArchivedSectionNames((prev) =>
        prev.filter(
          (section) =>
            section.section_name_id !== pendingRestore.section_name_id,
        ),
      );

      setSectionNames((prev) => [...prev, restoredSection]);

      setPendingRestore(null);
    } catch (error) {
      console.error("Failed to restore section name:", error);

      alert(error.response?.data?.message || "Failed to restore section name.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto">
        {/* ===================== */}
        {/* ACTIVE SECTION NAMES */}
        {/* ===================== */}

        <div className="rounded-2xl">
          <div className="flex w-full max-w-md flex-col gap-1.5">
            <label className={labelClass}>New section name</label>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSection}
                onChange={(e) => setNewSection(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddSection();
                  }
                }}
                placeholder="Type a section name"
                className={inputClass}
                aria-label="New section name"
              />

              <button
                type="button"
                onClick={handleAddSection}
                disabled={!newSection.trim() || saving}
                className="flex shrink-0 items-center gap-1 rounded-full bg-swamp-green px-5 py-2 font-[Poppins] text-xs font-semibold text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Plus size={14} strokeWidth={2.5} />

                {saving ? "Saving..." : "Add"}
              </button>
            </div>
          </div>

          <div className="pt-6">
            {loading ? (
              <div className="rounded-2xl border border-dashed border-[#cfcfcf] px-6 py-10 text-center">
                <p className="font-[Poppins] text-sm text-[#999999]">
                  Loading section names...
                </p>
              </div>
            ) : sectionNames.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-[#cfcfcf] px-6 py-10 text-center">
                <p className="font-[Poppins] text-sm text-[#999999]">
                  No section names yet. Add one above to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {sectionNames.map((section) => {
                  const isEditing = editingId === section.section_name_id;

                  const isPendingArchive =
                    pendingArchive?.section_name_id === section.section_name_id;

                  return (
                    <div
                      key={section.section_name_id}
                      className={`flex w-full flex-col gap-y-4 rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${
                        isEditing
                          ? "border-lime-green ring-1 ring-lime-green"
                          : isPendingArchive
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
                              if (e.key === "Enter") {
                                handleSaveSection();
                              }

                              if (e.key === "Escape") {
                                cancelEditSection();
                              }
                            }}
                            autoFocus
                            className="w-full rounded-lg border border-[#cfcfcf] bg-white px-3 py-1.5 text-xs font-[Poppins] text-[#555555] outline-none focus:border-lime-green"
                            aria-label={`Edit section name ${section.section_name}`}
                          />

                          <button
                            type="button"
                            onClick={handleSaveSection}
                            disabled={saving}
                            aria-label="Save section name"
                            className="shrink-0 rounded-full bg-swamp-green p-2 text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Check size={14} />
                          </button>

                          <button
                            type="button"
                            onClick={cancelEditSection}
                            disabled={saving}
                            aria-label="Cancel editing"
                            className="shrink-0 rounded-full p-2 text-gray-400 transition hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ) : isPendingArchive ? (
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-[Poppins] text-xs text-[#555555]">
                            Archive{" "}
                            <span className="font-[PoppinsBold]">
                              {section.section_name}
                            </span>
                            ?
                          </p>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={confirmArchiveSection}
                              disabled={saving}
                              className="rounded-full bg-red-400 px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Archive
                            </button>

                            <button
                              type="button"
                              onClick={() => setPendingArchive(null)}
                              disabled={saving}
                              className="rounded-full px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center justify-between gap-2">
                          <h2 className="truncate font-[PoppinsBold] text-md text-swamp-green">
                            {section.section_name}
                          </h2>

                          <div className="flex shrink-0 items-center gap-1">
                            <button
                              type="button"
                              onClick={() => startEditSection(section)}
                              aria-label={`Edit ${section.section_name}`}
                              className="rounded-full p-2 text-gray-500 transition hover:text-swamp-green"
                            >
                              <Pencil size={15} />
                            </button>

                            <button
                              type="button"
                              onClick={() => requestArchiveSection(section)}
                              aria-label={`Archive ${section.section_name}`}
                              className="rounded-full p-2 text-gray-500 transition hover:text-red-400"
                            >
                              <Trash2 size={15} className="text-red-400" />
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

        {/* ===================== */}
        {/* ARCHIVED SECTION NAMES */}
        {/* ===================== */}

        <div className="rounded-2xl border-t border-[#d4d2cd] pt-6">
          <div className="mb-4">
            <h2 className="font-[PoppinsBold] text-sm text-[#555555]">
              Archived Section Names
            </h2>

            <p className="mt-1 font-[Poppins] text-xs text-[#999999]">
              Archived names can be restored and used again.
            </p>
          </div>

          {loadingArchived ? (
            <div className="rounded-2xl border border-dashed border-[#cfcfcf] px-6 py-10 text-center">
              <p className="font-[Poppins] text-sm text-[#999999]">
                Loading archived section names...
              </p>
            </div>
          ) : archivedSectionNames.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#cfcfcf] px-6 py-10 text-center">
              <p className="font-[Poppins] text-sm text-[#999999]">
                No archived section names.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {archivedSectionNames.map((section) => {
                const isPendingRestore =
                  pendingRestore?.section_name_id === section.section_name_id;

                return (
                  <div
                    key={section.section_name_id}
                    className={`flex w-full flex-col gap-y-4 rounded-2xl border bg-white p-4 shadow-sm transition sm:p-5 ${
                      isPendingRestore
                        ? "border-swamp-green ring-1 ring-swamp-green"
                        : "border-gray-100"
                    }`}
                  >
                    {isPendingRestore ? (
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-[Poppins] text-xs text-[#555555]">
                          Restore{" "}
                          <span className="font-[PoppinsBold]">
                            {section.section_name}?
                          </span>
                        </p>

                        <div className="flex shrink-0 items-center gap-1">
                          <button
                            type="button"
                            onClick={confirmRestoreSection}
                            disabled={saving}
                            className="rounded-full bg-swamp-green px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-white transition hover:bg-lime-green disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Restore
                          </button>

                          <button
                            type="button"
                            onClick={() => setPendingRestore(null)}
                            disabled={saving}
                            className="rounded-full px-3 py-1.5 text-[9px] font-[Poppins] font-semibold text-gray-500 transition hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2">
                        <h2 className="truncate font-[PoppinsBold] text-md text-gray-400">
                          {section.section_name}
                        </h2>

                        <button
                          type="button"
                          onClick={() => requestRestoreSection(section)}
                          aria-label={`Restore ${section.section_name}`}
                          className="rounded-full p-2 text-gray-400 transition hover:text-swamp-green"
                        >
                          <RotateCcw size={15} />
                        </button>
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
  );
};

export default AdminSectionName;
