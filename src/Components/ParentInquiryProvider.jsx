import { createContext, useContext, useEffect, useState } from "react";
import ParentInquiryModal from "./AdminModal/ParentInquiryModal";

const STORAGE_KEY = "gca-parent-inquiries";

const createExampleInquiries = () => {
  const now = Date.now();

  return [
    {
      id: "example-inquiry-1",
      name: "Maria Santos",
      email: "maria.santos@example.com",
      question:
        "Good day! May available pa bang slot for Grade 1 this school year? Ano po ang requirements para makapag-enroll?",
      submittedAt: new Date(now - 45 * 60 * 1000).toISOString(),
      isRead: false,
    },
    {
      id: "example-inquiry-2",
      name: "Juan Dela Cruz",
      email: "juan.delacruz@example.com",
      question:
        "How much is the tuition fee for Grade 7 and what payment options do you offer?",
      submittedAt: new Date(now - 26 * 60 * 60 * 1000).toISOString(),
      isRead: true,
    },
  ];
};

const ParentInquiryContext = createContext(null);

const isStoredReply = (reply) =>
  reply &&
  typeof reply.id === "string" &&
  typeof reply.message === "string" &&
  typeof reply.sentAt === "string";

const isStoredInquiry = (inquiry) =>
  inquiry &&
  typeof inquiry.id === "string" &&
  typeof inquiry.name === "string" &&
  typeof inquiry.email === "string" &&
  typeof inquiry.question === "string" &&
  typeof inquiry.submittedAt === "string" &&
  typeof inquiry.isRead === "boolean" &&
  (inquiry.replies === undefined ||
    (Array.isArray(inquiry.replies) && inquiry.replies.every(isStoredReply)));

const parseInquiries = (serializedInquiries) => {
  if (!serializedInquiries) return [];

  const parsedInquiries = JSON.parse(serializedInquiries);

  if (!Array.isArray(parsedInquiries)) {
    throw new Error("Stored parent inquiries must be an array.");
  }

  const validInquiries = parsedInquiries.filter(isStoredInquiry);

  if (validInquiries.length !== parsedInquiries.length) {
    console.error("Some invalid parent inquiry records were ignored.");
  }

  return validInquiries;
};

const loadInquiries = () => {
  try {
    const inquiries = parseInquiries(localStorage.getItem(STORAGE_KEY));

    return inquiries.length > 0 ? inquiries : createExampleInquiries();
  } catch (error) {
    console.error("Failed to load parent inquiries from localStorage:", error);
    return createExampleInquiries();
  }
};

const persistInquiries = (inquiries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
    return true;
  } catch (error) {
    console.error("Failed to save parent inquiries to localStorage:", error);
    return false;
  }
};

const createInquiryId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

export const useParentInquiry = () => {
  const context = useContext(ParentInquiryContext);

  if (!context) {
    throw new Error(
      "useParentInquiry must be used within a ParentInquiryProvider",
    );
  }

  return context;
};

const ParentInquiryProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [inquiries, setInquiries] = useState(loadInquiries);

  useEffect(() => {
    const syncInquiries = (event) => {
      if (event.key && event.key !== STORAGE_KEY) return;

      try {
        setInquiries(parseInquiries(event.newValue));
      } catch (error) {
        console.error("Failed to sync parent inquiries from localStorage:", error);
      }
    };

    window.addEventListener("storage", syncInquiries);

    return () => window.removeEventListener("storage", syncInquiries);
  }, []);

  const addInquiry = ({ name, email, question }) => {
    const inquiry = {
      id: createInquiryId(),
      name,
      email,
      question,
      submittedAt: new Date().toISOString(),
      isRead: false,
    };
    const updatedInquiries = [inquiry, ...inquiries];

    if (!persistInquiries(updatedInquiries)) return false;

    setInquiries(updatedInquiries);

    return true;
  };

  const markInquiryAsRead = (inquiryId) => {
    const inquiry = inquiries.find((item) => item.id === inquiryId);

    if (!inquiry || inquiry.isRead) return true;

    const updatedInquiries = inquiries.map((item) =>
      item.id === inquiryId ? { ...item, isRead: true } : item,
    );

    if (!persistInquiries(updatedInquiries)) return false;

    setInquiries(updatedInquiries);
    return true;
  };

  const addInquiryReply = (inquiryId, message) => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) return false;

    const inquiry = inquiries.find((item) => item.id === inquiryId);

    if (!inquiry) return false;

    const reply = {
      id: createInquiryId(),
      message: trimmedMessage,
      sentAt: new Date().toISOString(),
    };

    const updatedInquiries = inquiries.map((item) =>
      item.id === inquiryId
        ? { ...item, replies: [...(item.replies || []), reply] }
        : item,
    );

    if (!persistInquiries(updatedInquiries)) return false;

    setInquiries(updatedInquiries);
    return true;
  };

  const unreadInquiryCount = inquiries.filter(
    (inquiry) => !inquiry.isRead,
  ).length;

  return (
    <ParentInquiryContext.Provider
      value={{
        openInquiry: () => setIsOpen(true),
        closeInquiry: () => setIsOpen(false),
        inquiries,
        unreadInquiryCount,
        addInquiry,
        addInquiryReply,
        markInquiryAsRead,
      }}
    >
      {children}
      <ParentInquiryModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </ParentInquiryContext.Provider>
  );
};

export default ParentInquiryProvider;
