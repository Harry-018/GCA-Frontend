import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import {
  getTeacherInfoByUserId,
  editTeacherInfo,
} from "../requests/teacherRequests.js";

import TeacherInformation from "../Components/Teacher-Side Components/Settings/TeacherInformation";
import ContactInformation from "../Components/Teacher-Side Components/Settings/ContactInformation";
import AccountSettings from "../Components/Teacher-Side Components/Settings/AccountSettings";
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

const Settings = () => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [teacherData, setTeacherData] = useState(null);
  const [contactData, setContactData] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [formData, setFormData] = useState({
    contactNumber: "",
    email: "",
    address: "",
  });

  useEffect(() => {
    const fetchTeacherInfo = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTeacherInfoByUserId();
        const teacher = response.r;

        if (!teacher) {
          throw new Error("Teacher information not found.");
        }

        setTeacherData(teacher);

        setContactData({
          contactNumber: teacher.contact_num ?? "",
          email: teacher.email ?? "",
          address: [
            teacher.house_no,
            teacher.barangay,
            teacher.city_municipality,
            teacher.province,
            teacher.zipcode,
          ]
            .filter(Boolean)
            .join(", "),
        });

        setAccountData({
          email: teacher.account_email ?? "",
          role: teacher.role ?? "teacher",
          accountStatus: teacher.account_status ?? "",
        });
      } catch (err) {
        console.error(
          "Failed to fetch teacher information:",
          err.response?.data || err,
        );

        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load account settings.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherInfo();
  }, []);

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

      // Update the displayed contact information after the API succeeds.
      const updatedContact = {
        ...contactData,
        contactNumber,
        email,
      };

      setContactData(updatedContact);

      // Keep the teacher profile state in sync as well.
      setTeacherData((prev) =>
        prev
          ? {
              ...prev,
              contact_num: contactNumber,
              email,
            }
          : prev,
      );

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

  const handlePasswordSubmit = (passwords) => {
    // Password update API integration will be implemented separately.
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
        <p className="text-sm text-red-400">{error}</p>
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
          fields={PASSWORD_FIELDS}
          initialPasswords={INITIAL_PASSWORDS}
          onCancel={() => setShowPasswordModal(false)}
          onSave={handlePasswordSubmit}
        />
      )}
    </div>
  );
};

export default Settings;
