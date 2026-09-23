import React, { useState } from "react";
import Header from "../../Components/AdminComponents/Website Management/Header";
import GradeLevelHeader from "../../Components/AdminComponents/Website Management/Tuition/GradeLevelHeader";
import GradeLevelCard from "../../Components/AdminComponents/Website Management/Tuition/GradeLevelCard";
import PaymentOptionCard from "../../Components/AdminComponents/Website Management/Tuition/PaymentOptionCard";
import AddGradeLevelModal from "../../Components/AdminComponents/Website Management/Tuition/AddGradeLevelModal";
import EditGradeLevelModal from "../../Components/AdminComponents/Website Management/Tuition/EditGradeLevelModal";
import AddPaymentOptionModal from "../../Components/AdminComponents/Website Management/Tuition/AddPaymentOptionModal";
import EditPaymentOptionModal from "../../Components/AdminComponents/Website Management/Tuition/EditPaymentOptionModal";
import RemoveModal from "../../Components/AdminComponents/Website Management/RemoveModal";

const TUITION_DATA = {
  Nursery: {
    tuition: "₱12,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱18,200 - ₱18,300",
  },

  "Pre-Kinder": {
    tuition: "₱13,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱19,200 - ₱19,300",
  },

  Kinder: {
    tuition: "₱14,000",
    books: "₱4,000",
    boysUniform: "₱1,000",
    boysPE: "₱1,200",
    girlsUniform: "₱800",
    girlsPE: "₱1,000",
    subtotal: "₱20,200 - ₱20,300",
  },
};

const FIELDS = [
  {
    name: "Tuition Fee",
    key: "tuition",
    description: "One-time / per semester",
  },
  {
    name: "Books",
    key: "books",
  },
  {
    name: "Uniform (Boys)",
    key: "boysUniform",
  },
  {
    name: "P.E. Uniform (Boys)",
    key: "boysPE",
  },
  {
    name: "Uniform (Girls)",
    key: "girlsUniform",
  },
  {
    name: "P.E. Uniform (Girls)",
    key: "girlsPE",
  },
];

const parsePesoRange = (str) => {
  const nums = str.replace(/[₱,\s]/g, "").split("-").map(Number);

  return nums.length === 2 ? nums : [nums[0] || 0, nums[0] || 0];
};

const formatPesoRange = ([min, max]) =>
  `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;

const buildPaymentOptions = (subtotal) => {
  const [min, max] = parsePesoRange(subtotal);

  return [
    {
      id: 1,
      name: "Full Cash",
      dueDate: "N/A",
      discount: "₱1,500",
      installment: "No Monthly Installment",
      total: formatPesoRange([min - 1500, max - 1500]),
    },
    {
      id: 2,
      name: "Pay Lite",
      dueDate: "Every 10th of the month (June '26 - March '27)",
      discount: "₱1,500",
      installment: "₱1,100.00",
      total: formatPesoRange([min - 1000, max - 1000]),
    },
    {
      id: 3,
      name: "All In",
      dueDate: "Every 10th of the month (June '26 - March '27)",
      discount: "No Discount Available",
      installment: "₱1,800",
      total: subtotal,
    },
  ];
};

const parseAmount = (str = "") =>
  Number(String(str).replace(/[₱,\s]/g, "") || 0);

const computeSubtotal = ({ tuition, books, boysUniform, boysPE, girlsUniform, girlsPE }) => {
  const min =
    parseAmount(tuition) +
    parseAmount(books) +
    parseAmount(boysUniform) +
    parseAmount(boysPE);

  const max = min + parseAmount(girlsUniform) + parseAmount(girlsPE);

  return formatPesoRange([min, max]);
};

const EMPTY_LEVEL_FORM = {
  name: "",
  tuition: "",
  books: "",
  boysUniform: "",
  boysPE: "",
  girlsUniform: "",
  girlsPE: "",
};

const EMPTY_OPTION_FORM = {
  name: "",
  dueDate: "",
  discount: "",
  installment: "",
  total: "",
};

const Tuition = () => {
  const [activeLevel, setActiveLevel] = useState("Nursery");
  const [tuitionData, setTuitionData] = useState(TUITION_DATA);
  const [customOptions, setCustomOptions] = useState([]);

  const [addLevelOpen, setAddLevelOpen] = useState(false);
  const [addLevelForm, setAddLevelForm] = useState(EMPTY_LEVEL_FORM);

  const [editLevelOpen, setEditLevelOpen] = useState(false);
  const [editLevelForm, setEditLevelForm] = useState(EMPTY_LEVEL_FORM);

  const [removeLevel, setRemoveLevel] = useState(null);

  const [addOptionOpen, setAddOptionOpen] = useState(false);
  const [addOptionForm, setAddOptionForm] = useState(EMPTY_OPTION_FORM);

  const [editOptionOpen, setEditOptionOpen] = useState(false);
  const [editOptionForm, setEditOptionForm] = useState(EMPTY_OPTION_FORM);
  const [editingOptionId, setEditingOptionId] = useState(null);

  const [removeOption, setRemoveOption] = useState(null);

  const data = tuitionData[activeLevel];

  const gradeLevels = Object.keys(tuitionData);

  const fees = FIELDS.map((field) => ({
    key: field.key,
    name: field.name,
    description: field.description,
    amount: data?.[field.key] ?? "",
  }));

  const paymentOptions = [
    ...buildPaymentOptions(data?.subtotal ?? "₱0 - ₱0"),
    ...customOptions,
  ];

  const openAddLevel = () => {
    setAddLevelForm(EMPTY_LEVEL_FORM);
    setAddLevelOpen(true);
  };

  const addLevel = () => {
    const name = addLevelForm.name.trim();
    if (!name) return;

    setTuitionData((prev) => ({
      ...prev,
      [name]: {
        tuition: addLevelForm.tuition,
        books: addLevelForm.books,
        boysUniform: addLevelForm.boysUniform,
        boysPE: addLevelForm.boysPE,
        girlsUniform: addLevelForm.girlsUniform,
        girlsPE: addLevelForm.girlsPE,
        subtotal: computeSubtotal(addLevelForm),
      },
    }));

    setActiveLevel(name);
    setAddLevelOpen(false);
  };

  const openEditLevel = () => {
    setEditLevelForm({
      name: activeLevel,
      tuition: data?.tuition ?? "",
      books: data?.books ?? "",
      boysUniform: data?.boysUniform ?? "",
      boysPE: data?.boysPE ?? "",
      girlsUniform: data?.girlsUniform ?? "",
      girlsPE: data?.girlsPE ?? "",
    });
    setEditLevelOpen(true);
  };

  const saveEditLevel = () => {
    const name = editLevelForm.name.trim() || activeLevel;

    setTuitionData((prev) => {
      const next = { ...prev };

      next[name] = {
        tuition: editLevelForm.tuition,
        books: editLevelForm.books,
        boysUniform: editLevelForm.boysUniform,
        boysPE: editLevelForm.boysPE,
        girlsUniform: editLevelForm.girlsUniform,
        girlsPE: editLevelForm.girlsPE,
        subtotal: computeSubtotal(editLevelForm),
      };

      if (name !== activeLevel) delete next[activeLevel];

      return next;
    });

    setActiveLevel(name);
    setEditLevelOpen(false);
  };

  const confirmRemoveLevel = () => {
    setTuitionData((prev) => {
      const next = { ...prev };

      delete next[removeLevel];

      return next;
    });

    if (activeLevel === removeLevel) {
      const remaining = gradeLevels.filter((level) => level !== removeLevel);

      setActiveLevel(remaining[0] || "");
    }

    setRemoveLevel(null);
  };

  const openAddOption = () => {
    setAddOptionForm(EMPTY_OPTION_FORM);
    setAddOptionOpen(true);
  };

  const addOption = () => {
    setCustomOptions((prev) => [
      ...prev,
      { id: Date.now(), ...addOptionForm },
    ]);
    setAddOptionOpen(false);
  };

  const openEditOption = (option) => {
    setEditingOptionId(option.id);
    setEditOptionForm({
      name: option.name,
      dueDate: option.dueDate,
      discount: option.discount,
      installment: option.installment,
      total: option.total,
    });
    setEditOptionOpen(true);
  };

  const saveEditOption = () => {
    setCustomOptions((prev) =>
      prev.map((option) =>
        option.id === editingOptionId
          ? { ...option, ...editOptionForm }
          : option
      )
    );

    setEditOptionOpen(false);
    setEditingOptionId(null);
  };

  const confirmRemoveOption = () => {
    setCustomOptions((prev) =>
      prev.filter((option) => option.id !== removeOption.id)
    );

    setRemoveOption(null);
  };

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-4 overflow-hidden bg-[#ebe9e4] font-[Poppins]">
      <Header activeTab="tuition" />

      <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto p-4">
        <div className="flex w-full flex-1 flex-col gap-5">
          {/* Page Header */}
          <GradeLevelHeader
            onAddGradeLevel={openAddLevel}
            onAddPaymentOption={openAddOption}
          />

          {/* Content */}
          <div className="grid w-full flex-1 grid-cols-1 gap-6 xl:auto-rows-fr xl:grid-cols-2">
            <GradeLevelCard
              title={activeLevel}
              gradeLevels={gradeLevels}
              activeGrade={activeLevel}
              onGradeChange={setActiveLevel}
              fees={fees}
              subtotal={data?.subtotal ?? "₱0 - ₱0"}
              onEdit={openEditLevel}
              onRemove={() => setRemoveLevel(activeLevel)}
            />

            <div className="flex h-full flex-col">
              <div className="hidden h-11.5 shrink-0 xl:block" />
              <PaymentOptionCard
                options={paymentOptions}
                onEdit={openEditOption}
                onRemove={(option) => setRemoveOption(option)}
              />
            </div>
          </div>
        </div>
      </div>

      <AddGradeLevelModal
        isOpen={addLevelOpen}
        {...addLevelForm}
        onChange={(key, value) =>
          setAddLevelForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setAddLevelOpen(false)}
        onAdd={addLevel}
      />

      <EditGradeLevelModal
        isOpen={editLevelOpen}
        {...editLevelForm}
        onChange={(key, value) =>
          setEditLevelForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setEditLevelOpen(false)}
        onSave={saveEditLevel}
      />

      <RemoveModal
        isOpen={removeLevel !== null}
        title="Remove Grade Level"
        itemName={removeLevel}
        message={
          removeLevel
            ? `Clicking "Remove" will remove the ${removeLevel} grade level and all of its fee information.`
            : undefined
        }
        onClose={() => setRemoveLevel(null)}
        onRemove={confirmRemoveLevel}
      />

      <AddPaymentOptionModal
        isOpen={addOptionOpen}
        {...addOptionForm}
        onChange={(key, value) =>
          setAddOptionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => setAddOptionOpen(false)}
        onAdd={addOption}
      />

      <EditPaymentOptionModal
        isOpen={editOptionOpen}
        {...editOptionForm}
        onChange={(key, value) =>
          setEditOptionForm((prev) => ({ ...prev, [key]: value }))
        }
        onClose={() => {
          setEditOptionOpen(false);
          setEditingOptionId(null);
        }}
        onSave={saveEditOption}
      />

      <RemoveModal
        isOpen={removeOption !== null}
        title="Remove Payment Option"
        itemName={removeOption?.name}
        message={
          removeOption
            ? `Clicking "Remove" will remove the ${removeOption.name} payment option and all of its information.`
            : undefined
        }
        onClose={() => setRemoveOption(null)}
        onRemove={confirmRemoveOption}
      />
    </div>
  );
};

export default Tuition;