import { useState, useEffect } from "react";
import { philippines } from "@ianlabicani/geoph-lite";

import InfoField from "./InfoField";
import InfoSection from "./InfoSection";
import { getPaymentOptionsInGradeLevel } from "../../../loaders/services/preEnrollmentService";

const StudentInfo = ({
  formData,
  step = 1,
  agreed = false,
  gradeLevels = [],
  paymentOptions = [],
  setPaymentOptions,
  onAgreeChange,
  onChange,
}) => {
  const ZIP_CODES = {
    Tanza: "4108",
    "City of Trece Martires": "4109",
  };

  const field = (key) => (e) => {
    onChange?.(key, e.target.value);
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;

    onChange?.("province", province);

    // Reset children of province
    onChange?.("city_municipality", "");
    onChange?.("barangay", "");
    onChange?.("zipcode", "");

    setBarangayOptions([]);
  };

  const handleCityChange = (e) => {
    const cityCode = e.target.value;

    const selectedCity = cityOptions.find((city) => city.value === cityCode);

    const cityName = selectedCity?.label || "";

    onChange?.("city_municipality", cityCode);

    // Reset barangay whenever city changes
    onChange?.("barangay", "");

    // Automatically set ZIP code
    onChange?.("zipcode", ZIP_CODES[cityName] || "");
  };

  const accountParent = localStorage.getItem("account_parent_relationship");

  const accountParentIndex = {
    Father: 0,
    Mother: 1,
    Guardian: 2,
  };

  const verifiedParentIndex = accountParentIndex[accountParent];
  const student = formData;
  const parents = student.parents || [];

  const [provinceOptions, setProvinceOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [barangayOptions, setBarangayOptions] = useState([]);

  useEffect(() => {
    const loadAddressData = async () => {
      try {
        // CALABARZON
        const region = await philippines.region("0400000000");

        const cavite = region.provinces.find(
          (province) => province.name === "Cavite",
        );

        if (!cavite) {
          console.error("Cavite was not found.");
          return;
        }

        // We only allow Cavite.
        setProvinceOptions([
          {
            label: cavite.name,
            value: cavite.psgc_code,
          },
        ]);

        const localities = await philippines.localities(cavite.psgc_code);

        const allowedCities = localities.filter((locality) => {
          const name = locality.name.toLowerCase();

          return name === "tanza" || name.includes("trece martires");
        });

        setCityOptions(
          allowedCities.map((city) => ({
            label: city.name,
            value: city.psgc_code,
          })),
        );
      } catch (error) {
        console.error("Failed to load Philippine address data:", error);
      }
    };

    loadAddressData();
  }, []);

  useEffect(() => {
    const loadBarangays = async () => {
      if (!student.city_municipality) {
        setBarangayOptions([]);
        return;
      }

      try {
        const selectedCity = cityOptions.find(
          (city) => city.value === student.city_municipality,
        );

        if (!selectedCity) {
          setBarangayOptions([]);
          return;
        }

        const barangays = await philippines.barangays(selectedCity.value);

        setBarangayOptions(
          barangays.map((barangay) => ({
            label: barangay.name,
            value: barangay.name,
          })),
        );
      } catch (error) {
        console.error("Failed to load barangays:", error);
        setBarangayOptions([]);
      }
    };

    loadBarangays();
  }, [student.city_municipality, cityOptions]);
  useEffect(() => {
    const loadPaymentOptions = async () => {
      if (!student.grade_level_id) {
        setPaymentOptions?.([]);
        return;
      }

      try {
        const response = await getPaymentOptionsInGradeLevel(
          student.grade_level_id,
        );

        console.log("PAYMENT OPTIONS RESPONSE:", response);

        console.log("PAYMENT OPTIONS DATA:", response.data.data);

        setPaymentOptions?.(response.data.data);
      } catch (error) {
        console.error("Failed to load payment options:", error);

        setPaymentOptions?.([]);
      }
    };

    loadPaymentOptions();
  }, [student.grade_level_id, setPaymentOptions]);

  /*
   * ============================================================
   * GRADE LEVEL CHANGE
   * ============================================================
   */
  const handleGradeLevelChange = (e) => {
    const gradeLevelId = e.target.value;

    onChange?.("grade_level_id", gradeLevelId);
    onChange?.("gradelevel_paymentoption_id", "");

    if (!gradeLevelId) {
      setPaymentOptions?.([]);
    }
  };

  /*
   * ============================================================
   * PARENT FIELD
   * ============================================================
   */
  const parentField = (index, key) => (e) => {
    const value = e.target.value;

    onChange?.("parents", (parents) =>
      parents.map((parent, i) =>
        i === index
          ? {
              ...parent,
              [key]: value,
            }
          : parent,
      ),
    );
  };

  /*
   * ============================================================
   * FORM DATA
   * ============================================================
   */
  const gradeLevelOptions = Array.isArray(gradeLevels) ? gradeLevels : [];

  const father =
    parents.find((parent) => parent.relationship_type === "Father") ||
    parents[0] ||
    {};

  const mother =
    parents.find((parent) => parent.relationship_type === "Mother") ||
    parents[1] ||
    {};

  /*
   * IMPORTANT:
   *
   * The Guardian's relationship_type can become:
   *
   * Grandparent
   * Aunt
   * Uncle
   * Sibling
   * Other
   *
   * Therefore, do not use relationship_type to determine
   * which parent is the verified account holder.
   *
   * The third parent slot is always the Guardian slot.
   */
  const guardian = parents[2] || {};

  /*
   * ============================================================
   * ACCOUNT HOLDER CHECKS
   * ============================================================
   */
  const fatherIsAccountParent = verifiedParentIndex === 0;

  const motherIsAccountParent = verifiedParentIndex === 1;

  const guardianIsAccountParent = verifiedParentIndex === 2;

  console.log("ACCOUNT PARENT:", accountParent);
  console.log("ACCOUNT PARENT INDEX:", verifiedParentIndex);
  console.log("GUARDIAN ACCOUNT PARENT:", guardianIsAccountParent);

  return (
    <div className="flex flex-col gap-6 font-[Poppins]">
      {step === 1 ? (
        <>
          {/* ================================ STUDENT INFORMATION ================================= */}
          <InfoSection title="Student Information">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Grade Level"
                  value={student.grade_level_id}
                  options={gradeLevels.map((grade) => ({
                    label: grade.grade_level_name,
                    value: grade.grade_level_id,
                  }))}
                  onChange={handleGradeLevelChange}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Last Name"
                  value={student.s_last_name}
                  onChange={field("s_last_name")}
                />

                <InfoField
                  label="First Name"
                  value={student.s_first_name}
                  onChange={field("s_first_name")}
                />

                <InfoField
                  label="Middle Name"
                  value={student.s_mid_name}
                  optional
                  onChange={field("s_mid_name")}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Gender"
                  value={student.s_gender}
                  options={["MALE", "FEMALE"]}
                  onChange={field("s_gender")}
                />

                <InfoField
                  label="Date of Birth"
                  value={student.s_bdate}
                  type="date"
                  onChange={field("s_bdate")}
                />

                <InfoField
                  label="Place of Birth"
                  value={student.s_birthplace || ""}
                  onChange={field("s_birthplace")}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Religion"
                  value={student.s_religion}
                  options={[
                    "CHRISTIAN",
                    "CATHOLIC",
                    "MUSLIM",
                    "BORN AGAIN",
                    "IGLESIA NI CRISTO",
                  ]}
                  onChange={field("s_religion")}
                />

                <InfoField
                  label="Nationality"
                  value={student.s_nationality}
                  options={["FILIPINO"]}
                  onChange={field("s_nationality")}
                />
              </div>

              {/* Disability */}
              <div className="flex flex-col gap-3 rounded-lg border border-[#d4d5d9] bg-white px-4 py-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-6 sm:gap-y-3">
                <div className="flex w-full flex-col gap-2 sm:w-auto">
                  <span className="text-sm font-medium text-neutral-600">
                    Is this Student disabled?
                  </span>

                  <div className="flex items-center gap-6 text-sm text-neutral-700">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="disabled"
                        value="yes"
                        checked={student.s_disabled === "yes"}
                        onChange={() => onChange?.("s_disabled", "yes")}
                        className="h-4 w-4 text-swamp-green"
                      />
                      Yes
                    </label>

                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="disabled"
                        value="no"
                        checked={student.s_disabled === "no"}
                        onChange={() => onChange?.("s_disabled", "no")}
                        className="h-4 w-4 text-swamp-green"
                      />
                      No
                    </label>
                  </div>
                </div>

                <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-auto sm:flex-1 sm:flex-row sm:items-center sm:gap-2">
                  <span className="text-xs font-medium text-neutral-600">
                    If yes, what is his/her disability?
                    <b className="text-red-400"> *</b>
                  </span>

                  <input
                    type="text"
                    value={student.s_disability || ""}
                    disabled={student.s_disabled !== "yes"}
                    onChange={field("s_disability")}
                    className="h-10 w-full rounded-md border border-[#d4d5d9] bg-white px-3 text-sm text-neutral-700 outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 focus:border-swamp-green focus:ring-1 focus:ring-lime-dark sm:min-w-0 sm:flex-1"
                  />
                </div>
              </div>
            </div>
          </InfoSection>

          {/* ================================ STUDENT ADDRESS ================================= */}
          <InfoSection title="Student Address">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Province"
                  type="select"
                  value={student.province}
                  options={provinceOptions}
                  placeholder="Select province"
                  onChange={handleProvinceChange}
                  required
                />

                <InfoField label="Zip Code" value={student.zipcode} readOnly />

                <InfoField
                  label="City / Municipality"
                  type="select"
                  value={student.city_municipality}
                  options={cityOptions}
                  placeholder="Select city / municipality"
                  onChange={handleCityChange}
                  disabled={!student.province}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                <InfoField
                  label="House No. / Street"
                  value={student.house_no}
                  onChange={field("house_no")}
                />

                <InfoField
                  label="Barangay"
                  type="select"
                  value={student.barangay}
                  options={barangayOptions}
                  placeholder="Select barangay"
                  onChange={field("barangay")}
                  disabled={!student.city_municipality}
                  required
                />
              </div>
            </div>
          </InfoSection>
        </>
      ) : (
        <>
          {/* ================================ FATHER ================================= */}
          <InfoSection title="Father Information">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Last Name"
                  value={father.p_last_name}
                  onChange={parentField(0, "p_last_name")}
                  required
                />

                <InfoField
                  label="First Name"
                  value={father.p_first_name}
                  onChange={parentField(0, "p_first_name")}
                  required
                />

                <InfoField
                  label="Middle Name"
                  value={father.p_middle_name}
                  optional
                  onChange={parentField(0, "p_middle_name")}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Occupation"
                  value={father.p_occupation}
                  onChange={parentField(0, "p_occupation")}
                  required
                />

                <InfoField
                  label="Contact Number"
                  name="contact_number"
                  value={father.p_contact_number}
                  onChange={parentField(0, "p_contact_number")}
                  required
                />

                <InfoField
                  label="Email"
                  type="email"
                  value={father.p_email}
                  optional={!fatherIsAccountParent}
                  readOnly={fatherIsAccountParent}
                  onChange={parentField(0, "p_email")}
                />
              </div>
            </div>
          </InfoSection>

          {/* ================================ MOTHER ================================= */}
          <InfoSection title="Mother Information">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Last Name"
                  value={mother.p_last_name}
                  onChange={parentField(1, "p_last_name")}
                  required
                />

                <InfoField
                  label="First Name"
                  value={mother.p_first_name}
                  onChange={parentField(1, "p_first_name")}
                  required
                />

                <InfoField
                  label="Middle Name"
                  value={mother.p_middle_name}
                  optional
                  onChange={parentField(1, "p_middle_name")}
                />
              </div>

              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Occupation"
                  value={mother.p_occupation}
                  onChange={parentField(1, "p_occupation")}
                  required
                />

                <InfoField
                  label="Contact Number"
                  name="contact_number"
                  value={mother.p_contact_number}
                  onChange={parentField(1, "p_contact_number")}
                  required
                />

                <InfoField
                  label="Email"
                  type="email"
                  value={mother.p_email}
                  optional={!motherIsAccountParent}
                  readOnly={motherIsAccountParent}
                  onChange={parentField(1, "p_email")}
                />
              </div>
            </div>
          </InfoSection>

          {/* ================================ GUARDIAN ================================= */}
          <InfoSection title="Guardian Information">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
                <InfoField
                  label="Last Name"
                  value={guardian.p_last_name}
                  required={guardianIsAccountParent}
                  optional={!guardianIsAccountParent}
                  onChange={parentField(2, "p_last_name")}
                />
                <InfoField
                  label="First Name"
                  value={guardian.p_first_name}
                  required={guardianIsAccountParent}
                  optional={!guardianIsAccountParent}
                  onChange={parentField(2, "p_first_name")}
                />
                <InfoField
                  label="Middle Name"
                  value={guardian.p_middle_name}
                  optional
                  onChange={parentField(2, "p_middle_name")}
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
                  onChange={parentField(2, "relationship_type")}
                />

                <InfoField
                  label="Contact Number"
                  name="contact_number"
                  value={guardian.p_contact_number}
                  onChange={parentField(2, "p_contact_number")}
                  required={guardianIsAccountParent}
                  optional={!guardianIsAccountParent}
                />
                <InfoField
                  label="Email"
                  type="email"
                  value={guardian.p_email}
                  required={guardianIsAccountParent}
                  optional={!guardianIsAccountParent}
                  readOnly={guardianIsAccountParent}
                  onChange={parentField(2, "p_email")}
                />
              </div>
            </div>
          </InfoSection>

          {/* ================================ PAYMENT ================================= */}
          <InfoSection title="Select Payment Option">
            <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <InfoField
                label="Payment Option"
                value={student.gradelevel_paymentoption_id}
                options={paymentOptions.map((option) => ({
                  label: option.option_name,
                  value: option.gradelevel_paymentoption_id,
                }))}
                className="max-w-md"
                readOnly={!student.grade_level_id}
                onChange={field("gradelevel_paymentoption_id")}
              />

              <label className="flex items-start gap-3 rounded-lg border border-[#d4d5d9] bg-white p-4 text-sm text-neutral-600">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => onAgreeChange?.(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-[#bfc4ca] text-[#9aae80]"
                />
                I agree to the processing and use of my personal data in
                accordance with the school's privacy policy and data protection
                guidelines.
              </label>
            </div>
          </InfoSection>
        </>
      )}
    </div>
  );
};

export default StudentInfo;
