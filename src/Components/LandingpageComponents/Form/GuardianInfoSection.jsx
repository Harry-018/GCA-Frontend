import InfoField from "./InfoField";
import InfoSection from "./InfoSection";
import { isValidContactNumber } from "./formUtils";

const GuardianInfoSection = ({
  guardian = {},
  guardianIsAccountParent,
  onChange,
}) => {
  const field = (key) => (e) => {
    onChange?.(key, e.target.value);
  };

  const contactError =
    guardian.p_contact_number &&
    guardian.p_contact_number.length > 3 &&
    !isValidContactNumber(guardian.p_contact_number)
      ? "Enter a valid 11-digit mobile number starting with 09."
      : "";

  return (
    <InfoSection title="Guardian Information">
      <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
          <InfoField
            label="Last Name"
            value={guardian.p_last_name}
            required={guardianIsAccountParent}
            optional={!guardianIsAccountParent}
            onChange={field("p_last_name")}
          />

          <InfoField
            label="First Name"
            value={guardian.p_first_name}
            required={guardianIsAccountParent}
            optional={!guardianIsAccountParent}
            onChange={field("p_first_name")}
          />

          <InfoField
            label="Middle Name"
            value={guardian.p_middle_name}
            optional
            onChange={field("p_middle_name")}
          />

          <InfoField
            label="Relation to Student"
            value={guardian.relationship_type}
            options={[
              "Father",
              "Mother",
              "Grandparent",
              "Aunt",
              "Uncle",
              "Sibling",
            ]}
            required={guardianIsAccountParent}
            optional={!guardianIsAccountParent}
            onChange={field("relationship_type")}
          />

          <InfoField
            label="Contact Number"
            name="contact_number"
            value={guardian.p_contact_number}
            onChange={field("p_contact_number")}
            inputMode="numeric"
            placeholder="09XXXXXXXXX"
            required={guardianIsAccountParent}
            optional={!guardianIsAccountParent}
            error={contactError}
          />

          <InfoField
            label="Email"
            type="email"
            value={guardian.p_email}
            required={guardianIsAccountParent}
            optional={!guardianIsAccountParent}
            readOnly={guardianIsAccountParent}
            onChange={field("p_email")}
          />
        </div>
      </div>
    </InfoSection>
  );
};

export default GuardianInfoSection;
