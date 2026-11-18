import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  getParentInfoByUserId,
  editParentInfoByUserId,
} from "../requests/parentRequests.js";

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
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [parentInfo, setParentInfo] = useState(null);
  const [contactData, setContactData] = useState(INITIAL_CONTACT);
  const [formData, setFormData] = useState(INITIAL_CONTACT);

  const [savingContact, setSavingContact] = useState(false);
  const [contactError, setContactError] = useState("");

  // GET LOGGED-IN PARENT INFORMATION
  useEffect(() => {
    const fetchParentInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getParentInfoByUserId();

        const parent = response?.r;

        if (!parent) {
          throw new Error("Parent information not found.");
        }

        setParentInfo(parent);

        const contact = {
          contactNumber: parent.contact_number || "",
          email: parent.email || "",
          relationship: parent.relationship_type || "",
          account_email: parent.account_email || "",
        };

        setContactData(contact);
        setFormData(contact);
      } catch (err) {
        console.error("Failed to retrieve parent information:", err);

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load parent information.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchParentInfo();
  }, []);

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

      // Update the displayed contact information after the API succeeds.
      setContactData((prev) => ({
        ...prev,
        contactNumber,
        email,
      }));

      // Keep the parent profile state in sync as well.
      setParentInfo((prev) =>
        prev
          ? {
              ...prev,
              contact_number: contactNumber,
              email,
            }
          : prev,
      );

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
  if (loading) {
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
