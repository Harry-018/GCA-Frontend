import { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

import {
  getTeacher,
  getTeacherContact,
  getTeacherAccount,
} from "../utils/data/Teacher/account";

import TeacherInformation from "../Components/Teacher-Side Components/Settings/TeacherInformation";
import ContactInformation from "../Components/Teacher-Side Components/Settings/ContactInformation";
import AccountSettings from "../Components/Teacher-Side Components/Settings/AccountSettings";
import EditContactModal from "../Components/Parents-Teacher Modal/EditContactModal";
import ChangePasswordModal from "../Components/Parents-Teacher Modal/ChangePasswordModal";

const TEACHER_DATA = getTeacher();
const CONTACT_DATA = getTeacherContact();
const ACCOUNT_DATA = getTeacherAccount();

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

const Settings = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Temporary data
  const [teacherData, setTeacherData] = useState(TEACHER_DATA);
  const [contactData, setContactData] = useState(CONTACT_DATA);
  const [accountData, setAccountData] = useState(ACCOUNT_DATA);
  const [formData, setFormData] = useState(CONTACT_DATA);

  // useEffect(() => {
  //   const fetchTeacherData = async () => {
  //     try {
  //       setLoading(true);
  //       setError("");
  //       const response = await axios.get(
  //         "http://localhost:5000/teacher/account"
  //       );

  //       setTeacherData(response.data.teacher);
  //       setContactData(response.data.contact);
  //       setAccountData(response.data.account);
  //       setFormData(response.data.contact);
  //     } catch (error) {
  //       console.error(
  //         "Failed to fetch teacher data:",
  //         error
  //       );
  //       setError("Unable to load account settings.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTeacherData();
  // }, []);

  // Open Contact Modal
  const handleManageContact = () => {
    setFormData(contactData);
    setShowContactModal(true);
  };

  // Close Contact Modal
  const handleCancelContact = () => {
    setShowContactModal(false);
  };

  // Handle Contact Input
  const handleContactChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save Contact Information
  const handleSaveContact = () => {
    setContactData(formData);
    setShowContactModal(false);

    /*
      Later, when backend is ready:

      await axios.put(
        "http://localhost:5000/teacher/contact",
        formData
      );
    */
  };

  // Open Password Modal
  const handleChangePassword = () => {
    setShowPasswordModal(true);
  };

  // Close / Save Password
  const handlePasswordSubmit = (passwords) => {
    console.log("Password submitted:", passwords);

    /*
      Later, when backend is ready:

      await axios.put(
        "http://localhost:5000/teacher/change-password",
        passwords
      );
    */

    setShowPasswordModal(false);
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
    <div className="min-h-full cursor-default bg-[#ebe9e4] px-3 py-5 font-[Poppins] sm:px-6 sm:py-8 lg:min-h-0 lg:flex-none lg:px-10 lg:pt-5 lg:pb-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-2 border-b border-[#0c2423]/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="py-1 text-2xs font-[PoppinsBold] uppercase tracking-[0.2em] text-swamp-green">
              Teacher portal
            </p>
            <h2 className="font-[PoppinsBold] text-xl uppercase leading-tight text-[#0c2423] sm:text-2xl lg:text-3xl">
              Account Settings
            </h2>
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-gray-500 sm:text-right">
            Keep your contact details current and your account protected.
          </p>
        </div>

        {/* TEACHER INFORMATION */}
        <TeacherInformation
          teacher={teacherData}
        />

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
          onCancel={handleCancelContact}
          onSave={handleSaveContact}
        />
      )}

      {/* CHANGE PASSWORD MODAL */}
      {showPasswordModal && (
        <ChangePasswordModal
          fields={PASSWORD_FIELDS}
          initialPasswords={INITIAL_PASSWORDS}
          onCancel={() =>
            setShowPasswordModal(false)
          }
          onSave={handlePasswordSubmit}
        />
      )}
    </div>
  );
};

export default Settings;