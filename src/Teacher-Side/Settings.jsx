import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { editTeacherInfo } from "../requests/teacherRequests.js";
import { useTeacherInfo } from "../hooks/queries/usePortalData.js";
import { queryKeys } from "../lib/queryKeys.js";

import TeacherInformation from "../Components/Teacher-Side Components/Settings/TeacherInformation";
import ContactInformation from "../Components/Teacher-Side Components/Settings/ContactInformation";
import AccountSettings from "../Components/Teacher-Side Components/Settings/AccountSettings";
import EditContactModal from "../Components/Parents-Teacher Modal/EditContactModal";
import ChangePasswordModal from "../Components/Parents-Teacher Modal/ChangePasswordModal";

const Settings = () => {
  const queryClient = useQueryClient();
  const {
    data: teacherResponse,
    isLoading,
    error: teacherError,
  } = useTeacherInfo();

  const [showContactModal, setShowContactModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    contactNumber: "",
    email: "",
    address: "",
  });

  const teacherData = teacherResponse?.r ?? null;

  const contactData = useMemo(
    () => ({
      contactNumber: teacherData?.contact_num ?? "",
      email: teacherData?.email ?? "",
      address: [
        teacherData?.house_no,
        teacherData?.barangay,
        teacherData?.city_municipality,
        teacherData?.province,
        teacherData?.zipcode,
      ]
        .filter(Boolean)
        .join(", "),
    }),
    [teacherData],
  );

  const accountData = useMemo(
    () => ({
      email: teacherData?.account_email ?? "",
      role: teacherData?.role ?? "teacher",
      accountStatus: teacherData?.account_status ?? "",
    }),
    [teacherData],
  );

  const error =
    teacherError?.response?.data?.message ||
    teacherError?.message ||
    (!teacherData && !isLoading ? "Teacher information not found." : "");

  const [savingContact, setSavingContact] = useState(false);
  const [contactError, setContactError] = useState("");

  const handleManageContact = () => {
    setFormData({
      contactNumber: contactData?.contactNumber ?? "",
      email: contactData?.email ?? "",
      address: contactData?.address ?? "",
    });

    setContactError("");
    setShowContactModal(true);
  };

  const handleCancelContact = () => {
    if (savingContact) return;

    setContactError("");
    setShowContactModal(false);
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setContactError("");
  };

  const handleSaveContact = async () => {
    const contactNumber = formData.contactNumber.trim();
    const email = formData.email.trim();

    if (!contactNumber || !email) {
      setContactError("Contact number and email are required.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setContactError("Please enter a valid email address.");
      return;
    }

    try {
      setSavingContact(true);
      setContactError("");

      await editTeacherInfo({
        contact_num: contactNumber,
        email,
      });

      queryClient.setQueryData(queryKeys.teachers.me, (previous) => ({
        ...(previous ?? {}),
        r: {
          ...(previous?.r ?? {}),
          contact_num: contactNumber,
          email,
        },
      }));

      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.me });
      setShowContactModal(false);
    } catch (err) {
      console.error(
        "Failed to update teacher contact information:",
        err.response?.data || err,
      );

      setContactError(
        err.response?.data?.message ||
          "Failed to save contact information. Please try again.",
      );
    } finally {
      setSavingContact(false);
    }
  };

  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  const handlePasswordSubmit = () => {
    setShowPasswordModal(false);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-egg font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-green" />
        <p className="text-sm text-gray-400">
          Loading Account Settings
          <span className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-full cursor-default bg-egg px-3 py-5 font-[Poppins] sm:px-6 sm:py-8 lg:min-h-0 lg:flex-none lg:px-10 lg:pt-5 lg:pb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-2 border-b border-parent-accent/15 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="py-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.2em] text-parent-green">
              Teacher portal
            </p>
            <h2 className="font-[PoppinsBold] text-xl uppercase leading-tight text-parent-green sm:text-2xl lg:text-3xl">
              Account Settings
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-gray-500 sm:text-right">
            Keep your contact details current and your account protected.
          </p>
        </div>

        {/* TEACHER INFORMATION */}
        <TeacherInformation teacher={teacherData} />

        {/* CONTACT + ACCOUNT */}
        <div className="grid grid-cols-1 items-stretch gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
          <ContactInformation
            contact={contactData}
            onManage={handleManageContact}
          />
          <AccountSettings
            account={accountData}
            onChangePassword={handleChangePassword}
          />
        </div>
      </div>

      {/* EDIT CONTACT MODAL */}
      {showContactModal && (
        <EditContactModal
          contactNo={formData.contactNumber}
          email={formData.email}
          address={formData.address}
          onContactNoChange={(value) =>
            handleContactChange("contactNumber", value)
          }
          onEmailChange={(value) => handleContactChange("email", value)}
          onAddressChange={(value) => handleContactChange("address", value)}
          onCancel={handleCancelContact}
          onSave={handleSaveContact}
          saving={savingContact}
          error={contactError}
        />
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <ChangePasswordModal
          email={accountData?.email ?? ""}
          onCancel={() => setShowPasswordModal(false)}
          onComplete={handlePasswordSubmit}
        />
      )}
    </div>
  );
};

export default Settings;
