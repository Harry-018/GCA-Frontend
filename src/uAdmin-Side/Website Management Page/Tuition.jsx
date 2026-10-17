import React, { useState, useEffect } from "react";

import Header from "../../Components/AdminComponents/Website Management/Header";
import GradeLevelHeader from "../../Components/AdminComponents/Website Management/Tuition/GradeLevelHeader";
import GradeLevelCard from "../../Components/AdminComponents/Website Management/Tuition/GradeLevelCard";
import PaymentOptionCard from "../../Components/AdminComponents/Website Management/Tuition/PaymentOptionCard";

import AddGradeLevelModal from "../../Components/AdminComponents/Website Management/Tuition/AddGradeLevelModal";
import EditGradeLevelModal from "../../Components/AdminComponents/Website Management/Tuition/EditGradeLevelModal";

import EditPaymentOptionModal from "../../Components/AdminComponents/Website Management/Tuition/EditPaymentOptionModal";

import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal";

import {
  getGradeLevel,
  getTuition,
  getTuitionGradeLevels,
  createGrade,
  patchFees,
  patchGradePaymentOption,
  patchPaymentOption,
  deleteGrade,
} from "../../requests/tuitionRequests.js";

const FIELDS = [
  {
    name: "Tuition Fee",
    key: "tuition_fee",
    description: "One-time / per semester",
  },
  { name: "Books", key: "books" },
  { name: "Uniform (Boys)", key: "uniform_boys" },
  { name: "P.E. Uniform (Boys)", key: "pe_uniform_boys" },
  { name: "Uniform (Girls)", key: "uniform_girls" },
  { name: "P.E. Uniform (Girls)", key: "pe_uniform_girls" },
];

const EMPTY_LEVEL_FORM = {
  grade_level_id: "",
  tuition_fee: "",
  books: "",
  uniform_boys: "",
  uniform_girls: "",
  pe_uniform_boys: "",
  pe_uniform_girls: "",
};

const EMPTY_OPTION_FORM = {
  name: "",
  dueDate: "",
  discount: "0",
  installment: "",
};

const Tuition = () => {
  /* ---------------------------------------- */
  /* Backend Data                             */
  /* ---------------------------------------- */

  const [allGradeLevels, setAllGradeLevels] = useState([]);
  const [gradeLevels, setGradeLevels] = useState([]);
  const [activeLevel, setActiveLevel] = useState(null);
  const [tuitionData, setTuitionData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------------------------------- */
  /* Add Grade Level                          */
  /* ---------------------------------------- */

  const [addLevelOpen, setAddLevelOpen] = useState(false);
  const [addLevelForm, setAddLevelForm] = useState(EMPTY_LEVEL_FORM);
  const [savingLevel, setSavingLevel] = useState(false);
  const [levelError, setLevelError] = useState("");

  /* ---------------------------------------- */
  /* Edit Grade Level                         */
  /* ---------------------------------------- */

  const [editLevelOpen, setEditLevelOpen] = useState(false);
  const [editLevelForm, setEditLevelForm] = useState(EMPTY_LEVEL_FORM);
  const [savingEditLevel, setSavingEditLevel] = useState(false);
  const [editLevelError, setEditLevelError] = useState("");

  /* ---------------------------------------- */
  /* Edit Payment Option                      */
  /* ---------------------------------------- */

  const [editOptionOpen, setEditOptionOpen] = useState(false);
  const [editOptionForm, setEditOptionForm] = useState(EMPTY_OPTION_FORM);
  const [editingOptionId, setEditingOptionId] = useState(null);

  const [editingGradePaymentOptionId, setEditingGradePaymentOptionId] =
    useState(null);
  const [savingEditOption, setSavingEditOption] = useState(false);
  const [editOptionError, setEditOptionError] = useState("");

  /* ---------------------------------------- */
  /* Remove Grade Level                       */
  /* ---------------------------------------- */

  const [removeLevelOpen, setRemoveLevelOpen] = useState(false);
  const [deletingLevel, setDeletingLevel] = useState(false);
  const [removeLevelError, setRemoveLevelError] = useState("");

  /* ---------------------------------------- */
  /* Remove Payment Option                    */
  /* ---------------------------------------- */

  /* ---------------------------------------- */
  /* Load Configured Grade Levels             */
  /* ---------------------------------------- */

  const loadGradeLevels = async () => {
    const result = await getTuitionGradeLevels();
    const levels = Array.isArray(result) ? result : [];

    setGradeLevels(levels);

    return levels;
  };

  /* ---------------------------------------- */
  /* Initial Grade Level Load                 */
  /* ---------------------------------------- */

  useEffect(() => {
    const initialize = async () => {
      try {
        setLoading(true);

        const [configuredResult, allResult] = await Promise.all([
          getTuitionGradeLevels(),
          getGradeLevel(),
        ]);

        const levels = Array.isArray(configuredResult) ? configuredResult : [];

        setGradeLevels(levels);
        setAllGradeLevels(Array.isArray(allResult) ? allResult : []);

        setActiveLevel((current) => {
          const currentExists = levels.some(
            (grade) => String(grade.grade_level_id) === String(current),
          );

          if (currentExists) return current;

          return levels[0]?.grade_level_id ?? null;
        });
      } catch (error) {
        console.error("Failed to initialize tuition:", error);

        setGradeLevels([]);
        setAllGradeLevels([]);
        setActiveLevel(null);
        setTuitionData([]);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  /* ---------------------------------------- */
  /* Load Tuition for Selected Grade          */
  /* ---------------------------------------- */

  useEffect(() => {
    if (activeLevel === null || activeLevel === undefined) {
      setTuitionData([]);
      return;
    }

    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);

        const result = await getTuition(activeLevel);

        if (!cancelled) {
          setTuitionData(Array.isArray(result) ? result : []);
        }
      } catch (error) {
        console.error("Failed to load tuition:", error);

        if (!cancelled) {
          setTuitionData([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [activeLevel]);

  /* ---------------------------------------- */
  /* Current Grade Level                      */
  /* ---------------------------------------- */

  const availableGradeLevels = allGradeLevels.filter(
    (grade) =>
      !gradeLevels.some(
        (configuredGrade) =>
          String(configuredGrade.grade_level_id) ===
          String(grade.grade_level_id),
      ),
  );

  const activeGrade = gradeLevels.find(
    (grade) => String(grade.grade_level_id) === String(activeLevel),
  );

  const data = tuitionData[0];

  /* ---------------------------------------- */
  /* Fee Summary                              */
  /* ---------------------------------------- */

  const fees = FIELDS.map((field) => ({
    key: field.key,
    name: field.name,
    description: field.description,
    amount: data?.[field.key] ?? 0,
  }));

  const subtotalBoys = data
    ? Number(data.tuition_fee || 0) +
      Number(data.books || 0) +
      Number(data.uniform_boys || 0) +
      Number(data.pe_uniform_boys || 0)
    : 0;

  const subtotalGirls = data
    ? Number(data.tuition_fee || 0) +
      Number(data.books || 0) +
      Number(data.uniform_girls || 0) +
      Number(data.pe_uniform_girls || 0)
    : 0;

  const formatCurrency = (amount) =>
    Number(amount || 0).toLocaleString("en-PH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  /* ---------------------------------------- */
  /* Payment Options                          */
  /* ---------------------------------------- */

  const paymentOptions = tuitionData.map((option) => {
    const discount = Number(option.discount || 0);

    return {
      ...option,
      id: option.gradelevel_paymentoption_id,
      name: option.option_name,
      dueDate: option.due_date_display,
      discount,
      installment: option.installment,
      totalBoys: subtotalBoys - discount,
      totalGirls: subtotalGirls - discount,
    };
  });

  /* ---------------------------------------- */
  /* Add Grade Level                          */
  /* ---------------------------------------- */

  const openAddLevel = () => {
    setAddLevelForm({
      ...EMPTY_LEVEL_FORM,
      grade_level_id: availableGradeLevels[0]
        ? String(availableGradeLevels[0].grade_level_id)
        : "",
    });

    setLevelError("");
    setAddLevelOpen(true);
  };

  const addLevel = async () => {
    if (!addLevelForm.grade_level_id) {
      setLevelError("Please select a grade level.");
      return;
    }

    const selectedGrade = availableGradeLevels.find(
      (grade) =>
        String(grade.grade_level_id) === String(addLevelForm.grade_level_id),
    );

    if (!selectedGrade) {
      setLevelError("This grade level is unavailable or already configured.");
      return;
    }

    const tuitionFee = Number(addLevelForm.tuition_fee);

    if (
      addLevelForm.tuition_fee === "" ||
      !Number.isFinite(tuitionFee) ||
      tuitionFee < 0
    ) {
      setLevelError("Please enter a valid tuition fee.");
      return;
    }

    const payload = {
      grade_level_id: Number(addLevelForm.grade_level_id),
      tuition_fee: tuitionFee,
      books: Number(addLevelForm.books || 0),
      uniform_boys: Number(addLevelForm.uniform_boys || 0),
      uniform_girls: Number(addLevelForm.uniform_girls || 0),
      pe_uniform_boys: Number(addLevelForm.pe_uniform_boys || 0),
      pe_uniform_girls: Number(addLevelForm.pe_uniform_girls || 0),
    };

    try {
      setSavingLevel(true);
      setLevelError("");

      await createGrade(payload);

      const updatedLevels = await loadGradeLevels();

      setActiveLevel(
        updatedLevels.find(
          (grade) =>
            String(grade.grade_level_id) ===
            String(selectedGrade.grade_level_id),
        )?.grade_level_id ?? null,
      );

      setAddLevelOpen(false);
      setAddLevelForm(EMPTY_LEVEL_FORM);
    } catch (error) {
      console.error("Failed to add tuition grade:", error);

      setLevelError(
        error.response?.data?.message ||
          "Failed to add the tuition configuration. Please try again.",
      );
    } finally {
      setSavingLevel(false);
    }
  };

  /* ---------------------------------------- */
  /* Edit Grade Level                         */
  /* ---------------------------------------- */

  const openEditLevel = () => {
    if (!data?.fees_id) {
      setEditLevelError("Unable to find the fee record for this grade level.");
      return;
    }

    setEditLevelForm({
      name: activeGrade?.grade_level_name ?? "",
      tuition_fee: String(data.tuition_fee ?? ""),
      books: String(data.books ?? ""),
      uniform_boys: String(data.uniform_boys ?? ""),
      pe_uniform_boys: String(data.pe_uniform_boys ?? ""),
      uniform_girls: String(data.uniform_girls ?? ""),
      pe_uniform_girls: String(data.pe_uniform_girls ?? ""),
    });

    setEditLevelError("");
    setEditLevelOpen(true);
  };

  const saveEditLevel = async () => {
    if (!data?.fees_id) {
      setEditLevelError("Unable to find the fee record for this grade level.");
      return;
    }

    const feeKeys = [
      "tuition_fee",
      "books",
      "uniform_boys",
      "pe_uniform_boys",
      "uniform_girls",
      "pe_uniform_girls",
    ];

    const payload = {};

    for (const key of feeKeys) {
      const value = editLevelForm[key];

      if (value === "" || value === undefined || value === null) {
        setEditLevelError("Please fill in all fee amounts.");
        return;
      }

      const amount = Number(value);

      if (!Number.isFinite(amount) || amount < 0) {
        setEditLevelError("Fee amounts must be valid nonnegative numbers.");
        return;
      }

      payload[key] = amount;
    }

    try {
      setSavingEditLevel(true);
      setEditLevelError("");

      await patchFees(data.fees_id, payload);

      const result = await getTuition(activeLevel);
      setTuitionData(Array.isArray(result) ? result : []);

      setEditLevelOpen(false);
    } catch (error) {
      console.error("Failed to update tuition fees:", error);

      setEditLevelError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update tuition fees. Please try again.",
      );
    } finally {
      setSavingEditLevel(false);
    }
  };

  /* ---------------------------------------- */
  /* Remove Grade Level Fee                   */
  /* ---------------------------------------- */

  const openRemoveLevel = () => {
    if (activeLevel === null || activeLevel === undefined) {
      return;
    }

    setRemoveLevelError("");
    setRemoveLevelOpen(true);
  };

  const confirmRemoveLevel = async () => {
    if (activeLevel === null || activeLevel === undefined) {
      setRemoveLevelError("No grade level selected.");
      return;
    }

    try {
      setDeletingLevel(true);
      setRemoveLevelError("");

      await deleteGrade(activeLevel);

      const updatedLevels = await loadGradeLevels();

      setRemoveLevelOpen(false);

      const nextLevel = updatedLevels[0]?.grade_level_id ?? null;

      setActiveLevel(nextLevel);

      if (nextLevel === null) {
        setTuitionData([]);
      }
    } catch (error) {
      console.error("Failed to remove tuition configuration:", error);

      setRemoveLevelError(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove the tuition configuration. Please try again.",
      );
    } finally {
      setDeletingLevel(false);
    }
  };

  /* ---------------------------------------- */
  /* Add Payment Option                       */
  /* ---------------------------------------- */

  /* ---------------------------------------- */
  /* Edit Payment Option                      */
  /* ---------------------------------------- */

  const openEditOption = (option) => {
    setEditingOptionId(option.payment_option_id);
    setEditingGradePaymentOptionId(option.gradelevel_paymentoption_id);

    setEditOptionForm({
      name: option.option_name ?? option.name ?? "",
      dueDate: option.due_date_display ?? option.dueDate ?? "",
      discount: String(option.discount ?? 0),
      installment: String(option.installment ?? 0),
    });

    setEditOptionError("");
    setEditOptionOpen(true);
  };

  const saveEditOption = async () => {
    if (!editingOptionId || !editingGradePaymentOptionId) {
      setEditOptionError("Unable to identify the payment option.");
      return;
    }

    const optionName = editOptionForm.name.trim();
    const installment = Number(editOptionForm.installment);
    const discount = Number(editOptionForm.discount);

    if (!optionName) {
      setEditOptionError("Payment option name is required.");
      return;
    }

    if (
      editOptionForm.installment === "" ||
      !Number.isFinite(installment) ||
      installment < 0
    ) {
      setEditOptionError("Enter a valid nonnegative installment amount.");
      return;
    }

    if (
      editOptionForm.discount === "" ||
      !Number.isFinite(discount) ||
      discount < 0
    ) {
      setEditOptionError("Enter a valid nonnegative discount.");
      return;
    }

    try {
      setSavingEditOption(true);
      setEditOptionError("");

      // Update shared payment-option fields.
      await patchPaymentOption(editingOptionId, {
        option_name: optionName,
        due_date_display: editOptionForm.dueDate.trim(),
        installment,
      });

      // Update the discount for this grade level only.
      await patchGradePaymentOption(editingGradePaymentOptionId, {
        discount,
      });

      // Reload the selected grade level's tuition data.
      const result = await getTuition(activeLevel);
      setTuitionData(Array.isArray(result) ? result : []);

      setEditOptionOpen(false);
      setEditingOptionId(null);
      setEditingGradePaymentOptionId(null);
      setEditOptionForm(EMPTY_OPTION_FORM);
    } catch (error) {
      console.error("Failed to update payment option:", error);

      setEditOptionError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update the payment option. Please try again.",
      );
    } finally {
      setSavingEditOption(false);
    }
  };

  /* ---------------------------------------- */
  /* Remove Payment Option                    */
  /* ---------------------------------------- */

  const confirmRemoveOption = async () => {
    const paymentOptionId = removeOption?.payment_option_id;

    if (!paymentOptionId) {
      setRemoveOptionError("Unable to identify the payment option.");
      return;
    }

    try {
      setDeletingOption(true);
      setRemoveOptionError("");

      await deleteOption(paymentOptionId);

      const updatedLevels = await loadGradeLevels();

      const currentLevelExists = updatedLevels.some(
        (grade) => String(grade.grade_level_id) === String(activeLevel),
      );

      if (currentLevelExists) {
        const result = await getTuition(activeLevel);
        setTuitionData(Array.isArray(result) ? result : []);
      } else {
        const nextLevel = updatedLevels[0]?.grade_level_id ?? null;

        setActiveLevel(nextLevel);

        if (nextLevel === null) {
          setTuitionData([]);
        }
      }

      setRemoveOption(null);
      setRemoveOptionError("");
    } catch (error) {
      console.error("Failed to remove payment option:", error);

      setRemoveOptionError(
        error.response?.data?.message ||
          error.message ||
          "Failed to remove the payment option. Please try again.",
      );
    } finally {
      setDeletingOption(false);
    }
  };

  /* ---------------------------------------- */
  /* Loading                                  */
  /* ---------------------------------------- */

  if (loading && gradeLevels.length === 0) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <p className="text-sm text-neutral-500">Loading tuition...</p>
      </div>
    );
  }

  /* ---------------------------------------- */
  /* Render                                   */
  /* ---------------------------------------- */

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-[#ebe9e4] font-[Poppins]">
      <Header activeTab="tuition" />

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
        <div className="flex w-full flex-1 flex-col gap-5">
          <GradeLevelHeader onAddGradeLevel={openAddLevel} />

          <div className="grid w-full flex-1 grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-2">
            <GradeLevelCard
              title={activeGrade?.grade_level_name ?? ""}
              gradeLevels={gradeLevels}
              subtotal={`₱${formatCurrency(subtotalBoys)} - ₱${formatCurrency(subtotalGirls)}`}
              activeGrade={activeLevel}
              onGradeChange={setActiveLevel}
              fees={fees}
              onEdit={openEditLevel}
              onRemove={openRemoveLevel}
            />

            <div className="flex h-full flex-col">
              <div className="hidden h-11.5 shrink-0 xl:block" />

              <PaymentOptionCard
                options={paymentOptions}
                onEdit={openEditOption}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add Grade Level */}

      <AddGradeLevelModal
        isOpen={addLevelOpen}
        {...addLevelForm}
        availableGradeLevels={availableGradeLevels}
        error={levelError}
        saving={savingLevel}
        onChange={(key, value) =>
          setAddLevelForm((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
        onClose={() => {
          if (savingLevel) return;

          setAddLevelOpen(false);
          setLevelError("");
        }}
        onAdd={addLevel}
      />

      {/* Edit Grade Level */}

      <EditGradeLevelModal
        isOpen={editLevelOpen}
        {...editLevelForm}
        error={editLevelError}
        saving={savingEditLevel}
        onChange={(key, value) =>
          setEditLevelForm((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
        onClose={() => {
          if (savingEditLevel) return;

          setEditLevelOpen(false);
          setEditLevelError("");
        }}
        onSave={saveEditLevel}
      />

      {/* Add Payment Option */}

      {/* Edit Payment Option */}

      <EditPaymentOptionModal
        isOpen={editOptionOpen}
        {...editOptionForm}
        error={editOptionError}
        saving={savingEditOption}
        onChange={(key, value) =>
          setEditOptionForm((prev) => ({
            ...prev,
            [key]: value,
          }))
        }
        onClose={() => {
          if (savingEditOption) return;

          setEditOptionOpen(false);
          setEditingOptionId(null);
          setEditingGradePaymentOptionId(null);
          setEditOptionError("");
        }}
        onSave={saveEditOption}
      />

      {/* Remove Grade Level Fee */}

      <RemoveModal
        isOpen={removeLevelOpen}
        title="Remove Grade Level Fee"
        itemName={activeGrade?.grade_level_name ?? ""}
        message={
          activeGrade
            ? `This will permanently remove the tuition configuration and associated fee records for ${activeGrade.grade_level_name}. The master grade level and payment options will not be deleted.`
            : "This will permanently remove the selected tuition configuration."
        }
        error={removeLevelError}
        deleting={deletingLevel}
        onClose={() => {
          if (deletingLevel) return;

          setRemoveLevelOpen(false);
          setRemoveLevelError("");
        }}
        onRemove={confirmRemoveLevel}
      />

      {/* Remove Payment Option */}
    </div>
  );
};

export default Tuition;
