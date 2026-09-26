import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  verifyAccountInvitation,
  activateAccount,
} from "../api/accountInvitation.js";

const AccountActivation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("verifying");
  const [invitation, setInvitation] = useState(null);
  const [token, setToken] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const activationToken = searchParams.get("token");

    if (!activationToken) {
      setStatus("error");
      setError("Activation token is missing.");
      return;
    }

    setToken(activationToken);

    const verifyToken = async () => {
      try {
        const result = await verifyAccountInvitation(activationToken);

        setInvitation(result.data);
        setStatus("valid");
      } catch (error) {
        setStatus("error");

        setError(
          error.response?.data?.message ||
            "Unable to verify account activation invitation.",
        );
      }
    };

    verifyToken();
  }, [searchParams]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setSaving(true);

      await activateAccount(token, password);

      setStatus("activated");
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to activate your account.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (status === "verifying") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] font-[Poppins]">
        <p className="text-sm text-gray-500">Verifying activation link...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] px-4 font-[Poppins]">
        <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-[#f4f6ff] p-6 text-center shadow-lg">
          <h1 className="font-[PoppinsBold] text-lg text-swamp-green">
            Account Activation
          </h1>

          <p className="mt-3 text-xs text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (status === "activated") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] px-4 font-[Poppins]">
        <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-[#f4f6ff] p-6 text-center shadow-lg">
          <h1 className="font-[PoppinsBold] text-lg text-swamp-green">
            Account Activated
          </h1>

          <p className="mt-3 text-xs text-gray-500">
            Your account has been activated successfully. You can now log in
            using your email and password.
          </p>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-6 h-9 w-full rounded-full bg-swamp-green font-[PoppinsBold] text-xs text-white transition hover:opacity-90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] px-4 font-[Poppins]">
      <div className="w-full max-w-md rounded-2xl border border-gray-300 bg-[#f4f6ff] p-6 shadow-lg">
        <div className="mb-6 text-center">
          <h1 className="font-[PoppinsBold] text-lg text-swamp-green">
            Activate Your Account
          </h1>

          <p className="mt-2 text-xs text-gray-500">
            Set a password to activate your Grace Christian Academy account.
          </p>
        </div>

        <div className="mb-5 rounded-lg border border-gray-200 bg-white px-4 py-3">
          <p className="text-[10px] text-gray-400">Account Email</p>

          <p className="mt-1 text-xs text-gray-600">
            {invitation?.email || "—"}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 px-3 py-2 text-[11px] text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-[11px] text-gray-500">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={saving}
              placeholder="Enter your password"
              className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <div>
            <label className="mb-1 block text-[11px] text-gray-500">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              disabled={saving}
              placeholder="Re-enter your password"
              className="h-9 w-full rounded-md border border-gray-300 bg-white px-3 text-xs text-gray-700 outline-none focus:border-swamp-green disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          <p className="text-[10px] text-gray-400">
            Password must be at least 8 characters.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="mt-2 h-9 w-full rounded-full bg-swamp-green font-[PoppinsBold] text-xs text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? "Activating..." : "Activate Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountActivation;
