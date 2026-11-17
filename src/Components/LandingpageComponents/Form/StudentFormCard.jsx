import { useEffect, useState } from "react";
import { philippines } from "@ianlabicani/geoph-lite";

import InfoField from "./InfoField";
import InfoSection from "./InfoSection";
import { getMaxBirthDate, isAtLeast3YearsOld } from "./formUtils";

const ZIP_CODES = {
  Tanza: "4108",
  "City of Trece Martires": "4109",
};

const StudentFormCard = ({
  student,
  index,
  totalStudents,
  gradeLevels,
  provinceOptions,
  cityOptions,
  onChange,
  onRemove,
  onSameAddress,
  onCancelSameAddress,
  addressLocked = false,
  onAddStudent,
  isLast = false,
}) => {
  const [barangayOptions, setBarangayOptions] = useState([]);

  const field = (key) => (e) => {
    onChange?.(index, key, e.target.value);
  };

  useEffect(() => {
    const loadBarangays = async () => {
      if (!student.city_municipality) {
        setBarangayOptions([]);
        return;
      }

      const selectedCity = cityOptions.find(
        (city) => city.value === student.city_municipality,
      );

      if (!selectedCity) {
        setBarangayOptions([]);
        return;
      }

      try {
        const barangays = await philippines.barangays(selectedCity.code);

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

  const handleProvinceChange = (e) => {
    onChange?.(index, "province", e.target.value);
    onChange?.(index, "city_municipality", "");
    onChange?.(index, "barangay", "");
    onChange?.(index, "zipcode", "");
  };

  const handleCityChange = (e) => {
    const cityName = e.target.value;

    onChange?.(index, "city_municipality", cityName);
    onChange?.(index, "barangay", "");
    onChange?.(index, "zipcode", ZIP_CODES[cityName] || "");
  };

  const handleGradeLevelChange = (e) => {
    onChange?.(index, "grade_level_id", e.target.value);
    onChange?.(index, "gradelevel_paymentoption_id", "");
  };

  const maxBirthDate = getMaxBirthDate();

  const dobError =
    student.s_bdate && !isAtLeast3YearsOld(student.s_bdate)
      ? "Student must be at least 3 years old."
      : "";

  const disabilityError =
    student.s_disabled === "yes" && !student.s_disability
      ? "Please specify the student's disability."
      : "";

  const studentLabel =
    totalStudents > 1 ? ` - Student ${index + 1}` : "";

  return (
    <>
      <InfoSection
        title={`Student Information${studentLabel}`}
        action={
          totalStudents > 1 ? (
            <button
              type="button"
              onClick={() => onRemove?.(index)}
              className="rounded-md border border-[#d4d5d9] bg-transparent px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-neutral-500 transition hover:border-reject hover:text-reject"
            >
              Remove
            </button>
          ) : null
        }
      >
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
              required
            />

            <InfoField
              label="First Name"
              value={student.s_first_name}
              onChange={field("s_first_name")}
              required
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
              required
            />

            <InfoField
              label="Date of Birth"
              value={student.s_bdate}
              type="date"
              max={maxBirthDate}
              onChange={field("s_bdate")}
              error={dobError}
              required
            />

            <InfoField
              label="Place of Birth"
              value={student.s_birthplace || ""}
              onChange={field("s_birthplace")}
              required
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
              required
            />

            <InfoField
              label="Nationality"
              value={student.s_nationality}
              options={["FILIPINO"]}
              onChange={field("s_nationality")}
              required
            />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-[#d4d5d9] bg-bone px-4 py-3 sm:flex-row sm:flex-wrap sm:items-end sm:gap-x-6 sm:gap-y-3">
            <div className="flex w-full flex-col gap-2 sm:w-auto">
              <span className="text-sm text-neutral-600">
                Is this Student disabled?
              </span>

              <div className="flex items-center gap-6 text-sm text-neutral-700">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`disabled-${student._id || index}`}
                    value="yes"
                    checked={student.s_disabled === "yes"}
                    onChange={() => onChange?.(index, "s_disabled", "yes")}
                    className="h-4 w-4 text-parent-green"
                  />
                  Yes
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`disabled-${student._id || index}`}
                    value="no"
                    checked={student.s_disabled === "no"}
                    onChange={() => onChange?.(index, "s_disabled", "no")}
                    className="h-4 w-4 text-parent-green"
                  />
                  No
                </label>
              </div>
            </div>

            <div className="flex w-full min-w-0 flex-col gap-1.5 sm:w-auto sm:flex-1 sm:flex-row sm:items-center sm:gap-2">
              <span className="text-xs text-neutral-600">
                If yes, what is his/her disability?
                <b className="text-red-400"> *</b>
              </span>

              <div className="flex w-full min-w-0 flex-col gap-1 sm:flex-1">
                <input
                  type="text"
                  value={student.s_disability || ""}
                  disabled={student.s_disabled !== "yes"}
                  onChange={field("s_disability")}
                  className="h-10 w-full rounded-md border border-[#d4d5d9] bg-bone px-3 text-sm text-neutral-700 outline-none disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-400 focus:border-parent-green focus:ring-1 focus:ring-parent-accent sm:min-w-0 sm:flex-1"
                />

                {disabilityError && (
                  <span className="text-2xs text-red-500">
                    {disabilityError}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {isLast && (
          <div className="flex flex-col items-start gap-2 pt-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
            <button
              type="button"
              onClick={onAddStudent}
              className="w-full rounded-md bg-parent-green px-6 py-2.5 text-sm font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent sm:w-auto"
            >
              + Add Student
            </button>

            <p className="text-xs text-neutral-500">
              Add another child to enroll them in the same application.
            </p>
          </div>
        )}
      </InfoSection>

      <InfoSection
        title={`Student Address${studentLabel}`}
        action={
          index > 0 || addressLocked ? (
            addressLocked ? (
              <button
                type="button"
                onClick={() => onCancelSameAddress?.(index)}
                className="rounded-md border border-parent-green bg-transparent px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-parent-green transition hover:bg-parent-pale"
              >
                Cancel Same Address
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onSameAddress?.(index)}
                className="rounded-md bg-parent-green px-3 py-1.5 text-2xs font-[PoppinsBold] uppercase text-white shadow-sm transition hover:bg-parent-accent"
              >
                Same Address
              </button>
            )
          ) : null
        }
      >
        <div className="flex flex-col gap-y-4 sm:col-span-2 md:col-span-3 lg:col-span-4">
          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-3">
            <InfoField
              label="Province"
              type="select"
              value={student.province}
              options={provinceOptions}
              placeholder="Select province"
              onChange={handleProvinceChange}
              disabled={addressLocked}
              required
            />

            <InfoField
              label="Zip Code"
              value={student.zipcode}
              readOnly
              disabled={addressLocked}
            />

            <InfoField
              label="City / Municipality"
              type="select"
              value={student.city_municipality}
              options={cityOptions}
              placeholder="Select city / municipality"
              onChange={handleCityChange}
              disabled={addressLocked || !student.province}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <InfoField
              label="House No. / Street"
              value={student.house_no}
              onChange={field("house_no")}
              disabled={addressLocked}
            />

            <InfoField
              label="Barangay"
              type="select"
              value={student.barangay}
              options={barangayOptions}
              placeholder="Select barangay"
              onChange={field("barangay")}
              disabled={addressLocked || !student.city_municipality}
              required
            />
          </div>
        </div>
      </InfoSection>
    </>
  );
};

export default StudentFormCard;
