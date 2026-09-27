import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyTeacherRegistration } from "../api/teacherRegistration";

const TeacherRegistrationPage = () => {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setError("Registration token is missing.");
        setLoading(false);
        return;
      }

      try {
        const result = await verifyTeacherRegistration(token);

        setEmail(result.data.email);
        setValid(true);
      } catch (error) {
        console.error("Registration verification error:", error);

        setError(
          error.response?.data?.message ||
            "Invalid or expired registration invitation.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verifying registration invitation...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg font-[PoppinsBold] text-red-600">
            Registration Unavailable
          </h1>

          <p className="mt-2 text-sm text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!valid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#ebe9e4] p-6">
      <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
        <h1 className="text-xl font-[PoppinsBold] text-swamp-green">
          Teacher Registration
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Complete your information to register as a teacher at Grace Christian
          Academy.
        </p>

        <div className="mt-6">
          <label className="text-xs font-[PoppinsBold] text-gray-600">
            Email
          </label>

          <input
            type="email"
            value={email}
            disabled
            className="mt-1 h-9 w-full rounded-lg border border-gray-300 bg-gray-100 px-3 text-sm text-gray-600"
          />
        </div>
      </div>
    </div>
  );
};

export default TeacherRegistrationPage;
