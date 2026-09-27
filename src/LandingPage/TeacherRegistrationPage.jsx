import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  verifyTeacherRegistration,
  submitTeacherRegistration,
} from "../api/teacherRegistration";

const TeacherRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    middle_name: "",
    gender: "",
    bdate: "",
    birthplace: "",
    religion: "",
    civil_status: "",
    contact_num: "",

    province: "",
    city_municipality: "",
    barangay: "",
    house_no: "",
    zipcode: "",
  });

  // --------------------------------------------------
  // Verify registration token
  // --------------------------------------------------
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Registration token is missing.");
        setLoading(false);
        return;
      }

      try {
        const response = await verifyTeacherRegistration(token);

        setInvitation(response.data);
      } catch (error) {
        console.error("Token verification error:", error);

        setError(
          error.response?.data?.message ||
            "This registration link is invalid or has expired.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "contact_num") {
      const numbersOnly = value.replace(/\D/g, "").slice(0, 11);

      setForm((prev) => ({
        ...prev,
        [name]: numbersOnly,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value.toUpperCase(),
    }));
  };

  // --------------------------------------------------
  // Submit registration
  // --------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setError("");

      await submitTeacherRegistration({
        registration_token: token,

        first_name: form.first_name,
        last_name: form.last_name,
        middle_name: form.middle_name,
        gender: form.gender,
        bdate: form.bdate,
        birthplace: form.birthplace,
        religion: form.religion,
        civil_status: form.civil_status,
        contact_num: form.contact_num,

        province: form.province,
        city_municipality: form.city_municipality,
        barangay: form.barangay,
        house_no: form.house_no,
        zipcode: form.zipcode,
      });

      setSubmitted(true);
    } catch (error) {
      console.error("Teacher registration error:", error);

      setError(
        error.response?.data?.message ||
          "Failed to submit teacher registration.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-gray-600">
          Verifying registration invitation...
        </p>
      </div>
    );
  }

  // --------------------------------------------------
  // Invalid token
  // --------------------------------------------------
  if (!invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow">
          <h1 className="mb-3 text-xl font-semibold text-egg-dark">
            Registration Link Invalid
          </h1>

          <p className="text-sm text-gray-600">
            {error || "This registration invitation is no longer valid."}
          </p>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // Successful registration
  // --------------------------------------------------
  if (submitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-beige px-4">
        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow">
          <h1 className="mb-3 text-xl font-semibold text-egg-dark">
            Registration Submitted
          </h1>

          <p className="text-sm leading-6 text-gray-600">
            Your teacher registration has been successfully submitted.
            <br />
            You will receive another email to activate your account.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-egg px-4 py-10">
      <div className="mx-auto max-w-4xl rounded-xl bg-white p-6 shadow-md md:p-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-5">
          <h1 className="text-2xl font-semibold text-swamp-green">
            Teacher Registration
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Complete the form below to register as a teacher at Grace Christian
            Academy.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* ---------------------------------------- */}
          {/* Account / Invitation */}
          {/* ---------------------------------------- */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-egg-dark">
              Registration Account
            </h2>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={invitation.email}
                readOnly
                className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2.5 text-sm text-gray-600 outline-none"
              />

              <p className="mt-1 text-xs text-gray-500">
                This email address was provided by the school and cannot be
                changed.
              </p>
            </div>
          </section>

          {/* ---------------------------------------- */}
          {/* Personal Information */}
          {/* ---------------------------------------- */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-egg-dark">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <FormInput
                label="First Name"
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Middle Name"
                name="middle_name"
                value={form.middle_name}
                onChange={handleChange}
              />

              <FormInput
                label="Last Name"
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                required
              />

              <FormSelect
                label="Gender"
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
                options={[
                  { value: "MALE", label: "MALE" },
                  { value: "FEMALE", label: "FEMALE" },
                ]}
              />

              <FormInput
                label="Date of Birth"
                name="bdate"
                type="date"
                value={form.bdate}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Birthplace"
                name="birthplace"
                value={form.birthplace}
                onChange={handleChange}
                required
              />

              <FormSelect
                label="Religion"
                name="religion"
                value={form.religion}
                onChange={handleChange}
                required
                options={[
                  { value: "CATHOLIC", label: "CATHOLIC" },
                  { value: "CHRISTIAN", label: "CHRISTIAN" },
                  { value: "MUSLIM", label: "MUSLIM" },
                  { value: "BORN AGAIN", label: "BORN AGAIN" },
                  { value: "IGLESIA NI CRISTO", label: "IGLESIA NI CRISTO" },
                ]}
              />

              <FormSelect
                label="Civil Status"
                name="civil_status"
                value={form.civil_status}
                onChange={handleChange}
                required
                options={[
                  { value: "single", label: "SINGLE" },
                  { value: "married", label: "MARRIED" },
                  { value: "widowed", label: "WIDOWED" },
                  { value: "seperated", label: "SEPERATED" },
                ]}
              />

              <FormInput
                label="Contact Number"
                name="contact_num"
                type="tel"
                value={form.contact_num}
                onChange={handleChange}
                maxLength={11}
                inputMode="numeric"
                pattern="09[0-9]{9}"
                required
              />
            </div>
          </section>

          {/* ---------------------------------------- */}
          {/* Address */}
          {/* ---------------------------------------- */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-egg-dark">
              Address
            </h2>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                label="House No. / Street"
                name="house_no"
                value={form.house_no}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Barangay"
                name="barangay"
                value={form.barangay}
                onChange={handleChange}
                required
              />

              <FormInput
                label="City / Municipality"
                name="city_municipality"
                value={form.city_municipality}
                onChange={handleChange}
                required
              />

              <FormInput
                label="Province"
                name="province"
                value={form.province}
                onChange={handleChange}
                required
              />

              <FormInput
                label="ZIP Code"
                name="zipcode"
                value={form.zipcode}
                onChange={handleChange}
                required
              />
            </div>
          </section>

          {/* ---------------------------------------- */}
          {/* Submit */}
          {/* ---------------------------------------- */}
          <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-md bg-swamp-green px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting ? "Submitting..." : "Submit Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ==================================================
// Reusable Input
// ==================================================

const FormInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full uppercase rounded-md border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-swamp-green focus:ring-1 focus:ring-swamp-green"
      />
    </div>
  );
};

// ==================================================
// Reusable Select
// ==================================================

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) => {
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full uppercase rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-swamp-green focus:ring-1 focus:swamp-green"
      >
        <option value="">Select {label}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TeacherRegistrationPage;
