import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

import { editParentInfoByUserId } from "../requests/parentRequests.js";
import { useParentInfo } from "../hooks/queries/usePortalData.js";
import { queryKeys } from "../lib/queryKeys.js";

import PersonalInformation from "../Components/Parents-Side Components/Security/PersonalInformation";
import EmergencyContact from "../Components/Parents-Side Components/Security/EmergencyContact";
import AccountSettings from "../Components/Parents-Side Components/Security/AccountSettings";
import EditContactModal from "../Components/Parents-Teacher Modal/EditContactModal";
import ChangePasswordModal from "../Components/Parents-Teacher Modal/ChangePasswordModal";

const INITIAL_CONTACT = {
  contactNumber: "",
  email: "",
  relationship: "",
  account_email: "",
};

const Security = () => {
  const queryClient = useQueryClient();
  const {
    data: parentResponse,
    isLoading,
    error: parentError,
  } = useParentInfo();

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const [formData, setFormData] = useState(INITIAL_CONTACT);

  const [savingContact, setSavingContact] = useState(false);
  const [contactError, setContactError] = useState("");

  const parentInfo = parentResponse?.r ?? null;

  const contactData = useMemo(
    () => ({
      contactNumber: parentInfo?.contact_number || "",
      email: parentInfo?.email || "",
      relationship: parentInfo?.relationship_type || "",
      account_email: parentInfo?.account_email || "",
    }),
    [parentInfo],
  );

  const error =
    parentError?.response?.data?.message ||
    parentError?.message ||
    (!parentInfo && !isLoading ? "Parent information not found." : "");

  // FORMAT PARENT FULL NAME
  const fullName = [
    parentInfo?.first_name,
    parentInfo?.middle_name,
    parentInfo?.last_name,
  ]
    .filter(Boolean)
    .join(" ");

  // CHANGE PASSWORD
  const handlePasswordUpdate = () => {
    setShowPasswordModal(false);
  };

  // OPEN CONTACT MODAL
  const handleManageContact = () => {
    setFormData(contactData);
    setContactError("");
    setShowContactModal(true);
  };

  // CLOSE CONTACT MODAL
  const handleCancelContact = () => {
    if (savingContact) return;

    setContactError("");
    setShowContactModal(false);
  };

  // HANDLE CONTACT INPUTS
  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    setContactError("");
  };

  // SAVE CONTACT INFORMATION
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

      // "email" here is the parent's contact email (parent_info.email),
      // not the account email (user_accounts.email).
      await editParentInfoByUserId({
        contact_number: contactNumber,
        email,
      });

      queryClient.setQueryData(queryKeys.parents.me, (previous) => ({
        ...(previous ?? {}),
        r: {
          ...(previous?.r ?? {}),
          contact_number: contactNumber,
          email,
        },
      }));

      queryClient.invalidateQueries({ queryKey: queryKeys.parents.me });
      setShowContactModal(false);
    } catch (err) {
      console.error(
        "Failed to update parent contact information:",
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

  // LOADING STATE
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black to-parent-accent font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-parent-pale" />

        <p className="text-sm text-white/70">
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

  // ERROR STATE
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-egg font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-full cursor-default bg-egg px-3 py-5 font-[Poppins] sm:px-6 sm:py-8 lg:px-10 lg:pt-5 lg:pb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
        {/* PAGE HEADER */}
        <div className="flex flex-col gap-2 border-b border-[#0f2419]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="py-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.2em] text-parent-accent">
              Parent portal
            </p>

            <h2 className="font-[PoppinsBold] text-xl uppercase leading-tight text-[#0f2419] sm:text-2xl lg:text-3xl">
              Account Settings
            </h2>
          </div>

          <p className="max-w-xs text-xs leading-relaxed text-gray-500 sm:text-right">
            Keep your contact details current and your account protected.
          </p>
        </div>

        {/* PERSONAL INFORMATION */}
        <PersonalInformation
          fullName={fullName}
          contactNo={contactData.contactNumber}
          email={contactData.email}
        />

        {/* CONTACT + ACCOUNT SETTINGS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">
          <EmergencyContact
            fullName={fullName}
            contactNo={contactData.contactNumber}
            relationship={contactData.relationship}
            onManage={handleManageContact}
          />

          <AccountSettings
            email={contactData.account_email}
            password="Change Password"
            onChangePassword={() => setShowPasswordModal(true)}
          />
        </div>

        {/* CHANGE PASSWORD MODAL */}
        {showPasswordModal && (
          <ChangePasswordModal
            email={contactData.account_email}
            onCancel={() => setShowPasswordModal(false)}
            onComplete={handlePasswordUpdate}
          />
        )}

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
      </div>
    </div>
  );
};

export default Security;
