import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";
import {
  getParentContact,
  getParentProfile,
} from "../utils/data/Parents/account";
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

const PROFILE = getParentProfile();

const Security = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // TEMPORARY DATA
  const [contactData, setContactData] = useState(getParentContact());

  const [formData, setFormData] = useState(getParentContact());

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       const response = await axios.get(
  //         "http://localhost:5000/parent/account"
  //       );
  //
  //       setContactData({
  //         contactNumber: response.data.contactNumber,
  //         email: response.data.email,
  //         address: response.data.address,
  //       });
  //
  //       setFormData({
  //         contactNumber: response.data.contactNumber,
  //         email: response.data.email,
  //         address: response.data.address,
  //       });
  //     } catch (error) {
  //       console.error("Failed to fetch account data:", error);
  //       setError("Unable to load account data.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchUserData();
  // }, []);

  const handlePasswordUpdate = (passwords) => {
    console.log("Password update submitted:", passwords);

    setShowPasswordModal(false);

    /*
      Later, this can become:

      await axios.put(
        "http://localhost:5000/parent/change-password",
        passwords
      );
    */
  };

  const handleManageContact = () => {
    setFormData(contactData);
    setShowContactModal(true);
  };

  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveContact = () => {
    setContactData(formData);
    setShowContactModal(false);

    /*
      Later, this can become:

      await axios.put(
        "http://localhost:5000/parent/contact",
        formData
      );
    */
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-black font-[Poppins]">
        <Loader2 size={32} className="animate-spin text-swamp-green" />
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
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <p className="text-sm text-red-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-full cursor-default bg-[#ebe9e4] px-3 py-5 font-[Poppins] sm:px-6 sm:py-8 lg:px-10 lg:pt-5 lg:pb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-2 border-b border-[#0c2423]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="py-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.2em] text-swamp-green">
              Parent portal
            </p>
            <h2 className="font-[PoppinsBold] text-xl uppercase leading-tight text-[#0c2423] sm:text-2xl lg:text-3xl">
              Account Settings
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-gray-500 sm:text-right">
            Keep your contact details current and your account protected.
          </p>
        </div>

        {/* PERSONAL INFORMATION */}
        <PersonalInformation
          fullName={PROFILE.fullName}
          contactNo={contactData.contactNumber}
          email={contactData.email}
          address={contactData.address}
        />

        {/* CONTACT + ACCOUNT SETTINGS */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.7fr_1fr] lg:gap-6">

          <EmergencyContact
            fullName={PROFILE.emergencyFullName}
            contactNo={contactData.contactNumber}
            relationship={PROFILE.relationship}
            onManage={handleManageContact}
          />

          <AccountSettings
            email={contactData.email}
            password="Change Password"
            onChangePassword={() =>
              setShowPasswordModal(true)
            }
          />

        </div>

        {/* CHANGE PASSWORD MODAL */}
        {showPasswordModal && (
          <ChangePasswordModal
            fields={PASSWORD_FIELDS}
            initialPasswords={INITIAL_PASSWORDS}
            initialVisibility={INITIAL_VISIBILITY}
            onCancel={() =>
              setShowPasswordModal(false)
            }
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
              handleContactChange(
                "contactNumber",
                value
              )
            }
            onEmailChange={(value) =>
              handleContactChange(
                "email",
                value
              )
            }
            onAddressChange={(value) =>
              handleContactChange(
                "address",
                value
              )
            }
            onCancel={() =>
              setShowContactModal(false)
            }
            onSave={handleSaveContact}
          />
        )}

      </div>
    </div>
  );
};

export default Security;