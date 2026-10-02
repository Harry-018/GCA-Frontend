import React, { useEffect, useState } from "react";
import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";
import WebsiteInformation from "../Components/AdminComponents/Settings/WebsiteInformation";
import ContactInformation from "../Components/AdminComponents/Settings/ContactInformation";
import EditWebsiteModal from "../Components/AdminComponents/Settings/EditWebsiteModal";
import EditContactModal from "../Components/AdminComponents/Settings/EditContactModal";
import {
  getSchoolInformation,
  updateSchoolInformation,
} from "../requests/settingsRequests.js";

const INITIAL_WEBSITE = {
  logo: "",
  schoolName: "",
};

const INITIAL_CONTACT = {
  contactNo: "",
  emailAddress: "",
  schoolAddress: "",
};

const AdminSettings = () => {
  const [website, setWebsite] = useState(INITIAL_WEBSITE);
  const [contact, setContact] = useState(INITIAL_CONTACT);

  const [websiteForm, setWebsiteForm] = useState(INITIAL_WEBSITE);
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT);

  const [editWebsiteOpen, setEditWebsiteOpen] = useState(false);
  const [editContactOpen, setEditContactOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSchoolInformation = async () => {
    try {
      setLoading(true);

      const response = await getSchoolInformation();

      const data = response.data;

      setWebsite({
        logo: data.school_logo,
        schoolName: data.school_name,
      });

      setContact({
        contactNo: data.contact_number,
        emailAddress: data.school_email,
        schoolAddress: data.school_address,
      });
    } catch (error) {
      console.error("Failed to load school information:", error);

      alert(
        error.response?.data?.message || "Failed to load school information.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSchoolInformation();
  }, []);

  const openWebsiteEdit = () => {
    setWebsiteForm(website);
    setEditWebsiteOpen(true);
  };

  const openContactEdit = () => {
    setContactForm(contact);
    setEditContactOpen(true);
  };

  const saveWebsite = async () => {
    if (saving) return;

    try {
      setSaving(true);

      const response = await updateSchoolInformation({
        school_logo: websiteForm.logo,
        school_name: websiteForm.schoolName,
        contact_number: contact.contactNo,
        school_email: contact.emailAddress,
        school_address: contact.schoolAddress,
      });

      const data = response.data;

      setWebsite({
        logo: data.school_logo,
        schoolName: data.school_name,
      });

      setContact({
        contactNo: data.contact_number,
        emailAddress: data.school_email,
        schoolAddress: data.school_address,
      });

      setEditWebsiteOpen(false);
    } catch (error) {
      console.error("Failed to update school information:", error);

      alert(
        error.response?.data?.message || "Failed to update school information.",
      );
    } finally {
      setSaving(false);
    }
  };

  const saveContact = async () => {
    if (saving) return;

    try {
      setSaving(true);

      const response = await updateSchoolInformation({
        school_logo: website.logo,
        school_name: website.schoolName,
        contact_number: contactForm.contactNo,
        school_email: contactForm.emailAddress,
        school_address: contactForm.schoolAddress,
      });

      const data = response.data;

      setWebsite({
        logo: data.school_logo,
        schoolName: data.school_name,
      });

      setContact({
        contactNo: data.contact_number,
        emailAddress: data.school_email,
        schoolAddress: data.school_address,
      });

      setEditContactOpen(false);
    } catch (error) {
      console.error("Failed to update school information:", error);

      alert(
        error.response?.data?.message || "Failed to update school information.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
        <SettingHeader />

        <div className="flex min-h-0 flex-1 items-center justify-center">
          <p className="text-sm text-[#999999]">
            Loading school information...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 cursor-default flex-col gap-6 bg-[#ebe9e4] font-[Poppins]">
      <SettingHeader />

      <div className="flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <WebsiteInformation
            logo={website.logo}
            schoolName={website.schoolName}
            onEdit={openWebsiteEdit}
          />

          <ContactInformation
            contactNo={contact.contactNo}
            emailAddress={contact.emailAddress}
            schoolAddress={contact.schoolAddress}
            onEdit={openContactEdit}
          />
        </div>

        <EditWebsiteModal
          isOpen={editWebsiteOpen}
          website={websiteForm}
          saving={saving}
          onChange={(key, value) =>
            setWebsiteForm((prev) => ({
              ...prev,
              [key]: value,
            }))
          }
          onClose={() => setEditWebsiteOpen(false)}
          onSave={saveWebsite}
        />

        <EditContactModal
          isOpen={editContactOpen}
          contact={contactForm}
          saving={saving}
          onChange={(key, value) =>
            setContactForm((prev) => ({
              ...prev,
              [key]: value,
            }))
          }
          onClose={() => setEditContactOpen(false)}
          onSave={saveContact}
        />
      </div>
    </div>
  );
};

export default AdminSettings;
