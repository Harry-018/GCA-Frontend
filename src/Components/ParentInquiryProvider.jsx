import { createContext, useContext, useState } from "react";
import ParentInquiryModal from "./AdminModal/ParentInquiryModal";

const ParentInquiryContext = createContext(null);

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

  return (
    <ParentInquiryContext.Provider
      value={{
        openInquiry: () => setIsOpen(true),
        closeInquiry: () => setIsOpen(false),
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
