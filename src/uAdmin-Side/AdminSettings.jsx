import React, { useState } from "react";
import SettingHeader from "../Components/AdminComponents/Settings/SettingHeader";
import WebsiteInformation from "../Components/AdminComponents/Settings/WebsiteInformation";
import ContactInformation from "../Components/AdminComponents/Settings/ContactInformation";
import EditWebsiteModal from "../Components/AdminComponents/Settings/EditWebsiteModal";
import EditContactModal from "../Components/AdminComponents/Settings/EditContactModal";
import schoolLogo from "../assets/logowbg.png";

const INITIAL_WEBSITE = {
  logo: schoolLogo,
  schoolName: "Grace Christian Academy",
};

const INITIAL_CONTACT = {
  contactNo: "+63-992-641-8081",
  emailAddress: "grace.cslife@gmail.com",
  schoolAddress:
    "306, Purok 4, Barangay Cabuco, Trece Martires, Philippines, 4109",
};

const AdminSettings = () => {
  const [website, setWebsite] = useState(INITIAL_WEBSITE);
  const [contact, setContact] = useState(INITIAL_CONTACT);
  const [websiteForm, setWebsiteForm] = useState(INITIAL_WEBSITE);
  const [contactForm, setContactForm] = useState(INITIAL_CONTACT);
  const [editWebsiteOpen, setEditWebsiteOpen] = useState(false);
  const [editContactOpen, setEditContactOpen] = useState(false);

  const openWebsiteEdit = () => {
    setWebsiteForm(website);
    setEditWebsiteOpen(true);
  };

  const openContactEdit = () => {
    setContactForm(contact);
    setEditContactOpen(true);
  };

  const saveWebsite = () => {
    setWebsite(websiteForm);
    setEditWebsiteOpen(false);
  };

  const saveContact = () => {
    setContact(contactForm);
    setEditContactOpen(false);
  };

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
          onChange={(key, value) =>
            setWebsiteForm((prev) => ({ ...prev, [key]: value }))
          }
          onClose={() => setEditWebsiteOpen(false)}
          onSave={saveWebsite}
        />

        <EditContactModal
          isOpen={editContactOpen}
          contact={contactForm}
          onChange={(key, value) =>
            setContactForm((prev) => ({ ...prev, [key]: value }))
          }
          onClose={() => setEditContactOpen(false)}
          onSave={saveContact}
        />
      </div>
    </div>
  );
};

export default AdminSettings;