import InfoField from "./InfoField";
import InfoSection from "./InfoSection";
import { getStudentLabel, isValidContactNumber } from "./formUtils";

const contactError = (value) =>
  value && value.length > 3 && !isValidContactNumber(value)
    ? "Enter a valid 11-digit mobile number starting with 09."
    : "";

const SameInformationButton = ({ onClick, locked = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={
      locked
        ? "rounded-md border border-parent-green bg-transparent px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-parent-green transition hover:bg-parent-pale"
        : "rounded-md bg-parent-green px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent"
    }
  >
    {locked ? "Cancel Same Information" : "Same Information"}
  </button>
);

const ParentInfoSections = ({
  student,
  index,
  fatherIsAccountParent,
  motherIsAccountParent,
  fatherLocked = false,
  motherLocked = false,
  onParentChange,
  onSameInformation,
  onCancelSameInformation,
}) => {
  const parents = student.parents || [];
  const father = parents[0] || {};
  const mother = parents[1] || {};

  const studentLabel = getStudentLabel(student, index);

  const field = (parentIndex, key) => (e) => {
    onParentChange?.(index, parentIndex, key, e.target.value);
  };

  const canReuseFather = index > 0 || fatherLocked;
  const canReuseMother = index > 0 || motherLocked;

  return (
    <>
      <InfoSection
        title={`Father Information${studentLabel}`}
        action={
          canReuseFather ? (
            <SameInformationButton
              onClick={() =>
                fatherLocked
                  ? onCancelSameInformation?.(index, 0)
                  : onSameInformation?.(index, 0)
              }
              locked={fatherLocked}
            />
          ) : null
        }
      >
        <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <InfoField
              label="Last Name"
              value={father.p_last_name}
              onChange={field(0, "p_last_name")}
              disabled={fatherLocked}
              required
            />

            <InfoField
              label="First Name"
              value={father.p_first_name}
              onChange={field(0, "p_first_name")}
              disabled={fatherLocked}
              required
            />

            <InfoField
              label="Middle Name"
              value={father.p_middle_name}
              optional
              onChange={field(0, "p_middle_name")}
              disabled={fatherLocked}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <InfoField
              label="Occupation"
              value={father.p_occupation}
              onChange={field(0, "p_occupation")}
              disabled={fatherLocked}
              required
            />

            <InfoField
              label="Contact Number"
              name="contact_number"
              value={father.p_contact_number}
              onChange={field(0, "p_contact_number")}
              inputMode="numeric"
              placeholder="09XXXXXXXXX"
              error={contactError(father.p_contact_number)}
              disabled={fatherLocked}
              required
            />

            <InfoField
              label="Email"
              type="email"
              value={father.p_email}
              optional={!fatherIsAccountParent}
              readOnly={fatherIsAccountParent}
              disabled={fatherLocked}
              onChange={field(0, "p_email")}
            />
          </div>
        </div>
      </InfoSection>

      <InfoSection
        title={`Mother Information${studentLabel}`}
        action={
          canReuseMother ? (
            <SameInformationButton
              onClick={() =>
                motherLocked
                  ? onCancelSameInformation?.(index, 1)
                  : onSameInformation?.(index, 1)
              }
              locked={motherLocked}
            />
          ) : null
        }
      >
        <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <InfoField
              label="Last Name"
              value={mother.p_last_name}
              onChange={field(1, "p_last_name")}
              disabled={motherLocked}
              required
            />

            <InfoField
              label="First Name"
              value={mother.p_first_name}
              onChange={field(1, "p_first_name")}
              disabled={motherLocked}
              required
            />

            <InfoField
              label="Middle Name"
              value={mother.p_middle_name}
              optional
              onChange={field(1, "p_middle_name")}
              disabled={motherLocked}
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <InfoField
              label="Occupation"
              value={mother.p_occupation}
              onChange={field(1, "p_occupation")}
              disabled={motherLocked}
              required
            />

            <InfoField
              label="Contact Number"
              name="contact_number"
              value={mother.p_contact_number}
              onChange={field(1, "p_contact_number")}
              inputMode="numeric"
              placeholder="09XXXXXXXXX"
              error={contactError(mother.p_contact_number)}
              disabled={motherLocked}
              required
            />

            <InfoField
              label="Email"
              type="email"
              value={mother.p_email}
              optional={!motherIsAccountParent}
              readOnly={motherIsAccountParent}
              disabled={motherLocked}
              onChange={field(1, "p_email")}
            />
          </div>
        </div>
      </InfoSection>
    </>
  );
};

export default ParentInfoSections;
