import { redirect } from "react-router-dom";
import { getGradeLevels } from "./preEnrollmentLoaders";

export const enrollmentFormLoader = () => {
  const verificationId = localStorage.getItem("verification_id");
  const verifiedEmail = localStorage.getItem("verified_email");

  if (!verificationId || !verifiedEmail) {
    throw redirect("/email-verification");
  }

  return getGradeLevels;
};
