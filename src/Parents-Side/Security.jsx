import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { getParentInfoByUserId } from "../requests/parentRequests.js";

import PersonalInformation from "../Components/Parents-Side Components/Security/PersonalInformation";
import EmergencyContact from "../Components/Parents-Side Components/Security/EmergencyContact";
import AccountSettings from "../Components/Parents-Side Components/Security/AccountSettings";
import EditContactModal from "../Components/Parents-Teacher Modal/EditContactModal";
import ChangePasswordModal from "../Components/Parents-Teacher Modal/ChangePasswordModal";

const PASSWORD_FIELDS = [
  {
    key: "current",
    label: "Current Password",
    placeholder: "Enter your current password",
  },
  {
    key: "new",
    label: "New Password",
    placeholder: "Enter a new password",
  },
  {
    key: "confirm",
    label: "Confirm Password",
    placeholder: "Re-enter your new password",
  },
];

const INITIAL_PASSWORDS = {
  current: "",
  new: "",
  confirm: "",
};

const INITIAL_VISIBILITY = {
  current: false,
  new: false,
  confirm: false,
};

const INITIAL_CONTACT = {
  contactNumber: "",
  email: "",
  relationship_type: "",
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

  // GET LOGGED-IN PARENT INFORMATION
  useEffect(() => {
    const fetchParentInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getParentInfoByUserId();

        // Extract parent information from the "r" property.
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
  const handlePasswordUpdate = (passwords) => {
    setShowPasswordModal(false);
  };

  // OPEN CONTACT MODAL
  const handleManageContact = () => {
    setFormData(contactData);
    setShowContactModal(true);
  };

  // HANDLE CONTACT INPUTS
  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // SAVE CONTACT INFORMATION
  const handleSaveContact = () => {
    setContactData(formData);
    setShowContactModal(false);

    // Connect this to the parent contact update endpoint later.
  };

  // LOADING STATE
  if (loading) {
    return (
      <div className="flex  min-h-screen flex-col items-center justify-center gap-3 bg-black to-parent-accent font-[Poppins]">
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
      <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-[#f3f8f1] via-[#e8f1e3] to-[#d9e8d2] font-[Poppins]">
        <p className="text-sm text-red-400">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-full cursor-default bg-linear-to-b from-[#f3f8f1] via-[#e8f1e3] to-[#d9e8d2] px-3 py-5 font-[Poppins] sm:px-6 sm:py-8 lg:px-10 lg:pt-5 lg:pb-10">
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
            relationship={contactData.relationship_type}
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
            fields={PASSWORD_FIELDS}
            initialPasswords={INITIAL_PASSWORDS}
            initialVisibility={INITIAL_VISIBILITY}
            onCancel={() => setShowPasswordModal(false)}
            onSave={handlePasswordUpdate}
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
            onCancel={() => setShowContactModal(false)}
            onSave={handleSaveContact}
          />
        )}
      </div>
    </div>
  );
};

export default Security;
