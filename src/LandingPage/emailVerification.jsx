import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  sendVerification,
  verifyOtp,
} from "../requests/emailVerificationRequests.js";

const EmailVerificationPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [accountParent, setAccountParent] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [message, setMessage] = useState("");
  const [verificationId, setVerificationId] = useState(null);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (!accountParent) {
      setError("Please select who will receive the parent account.");
      return;
    }

    try {
      setLoading(true);

      const response = await sendVerification(email);

      setVerificationId(response.data.data.verification_id);
      setOtpSent(true);

      setMessage(
        response.data.message ||
          "A verification code has been sent to your email.",
      );
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to send verification code.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (otp.length !== 6) {
      setError("Please enter the 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);

      await verifyOtp(verificationId, otp);

      // Save the verified email and selected parent
      localStorage.setItem("verification_id", verificationId);

      localStorage.setItem("verified_email", email);

      localStorage.setItem("account_parent_relationship", accountParent);

      navigate("/enrollmentform");
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Invalid or expired verification code.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#eeece8] px-4 font-[Poppins]">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-sm sm:p-8">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-[#3b3b3b]">
            Verify Your Email
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            Verify your email before continuing with your application.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Success */}
        {message && (
          <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Email + Parent Selection */}
        {!otpSent && (
          <form onSubmit={handleSendOtp} className="space-y-5">
            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-600">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="h-11 w-full rounded-md border border-[#d4d5d9] bg-white px-3 text-sm text-neutral-700 outline-none focus:border-swamp-green focus:ring-1 focus:ring-swamp-green"
              />
            </div>

            {/* Account Parent */}
            <div>
              <label className="mb-2 block text-sm font-medium text-neutral-600">
                Who will receive the parent account?
              </label>

              <div className="space-y-2">
                {/* Father */}
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#d4d5d9] px-3 py-2.5 transition hover:bg-neutral-50">
                  <input
                    type="radio"
                    name="accountParent"
                    value="Father"
                    checked={accountParent === "Father"}
                    onChange={(e) => setAccountParent(e.target.value)}
                    className="accent-swamp-green"
                  />

                  <span className="text-sm text-neutral-700">Father</span>
                </label>

                {/* Mother */}
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#d4d5d9] px-3 py-2.5 transition hover:bg-neutral-50">
                  <input
                    type="radio"
                    name="accountParent"
                    value="Mother"
                    checked={accountParent === "Mother"}
                    onChange={(e) => setAccountParent(e.target.value)}
                    className="accent-swamp-green"
                  />

                  <span className="text-sm text-neutral-700">Mother</span>
                </label>

                {/* Guardian */}
                <label className="flex cursor-pointer items-center gap-3 rounded-md border border-[#d4d5d9] px-3 py-2.5 transition hover:bg-neutral-50">
                  <input
                    type="radio"
                    name="accountParent"
                    value="Guardian"
                    checked={accountParent === "Guardian"}
                    onChange={(e) => setAccountParent(e.target.value)}
                    className="accent-swamp-green"
                  />

                  <span className="text-sm text-neutral-700">Guardian</span>
                </label>
              </div>
            </div>

            {/* Send OTP */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-md bg-swamp-green text-sm font-semibold uppercase text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
        )}

        {/* OTP */}
        {otpSent && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-neutral-600">
                Verification Code
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                placeholder="000000"
                className="h-12 w-full rounded-md border border-[#d4d5d9] bg-white px-3 text-center text-xl font-semibold tracking-[0.4em] text-neutral-700 outline-none focus:border-swamp-green focus:ring-1 focus:ring-swamp-green"
              />

              <p className="mt-2 text-center text-xs text-neutral-500">
                Enter the 6-digit code sent to <br />
                <span className="font-medium text-neutral-700">{email}</span>
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="h-11 w-full rounded-md bg-swamp-green text-sm font-semibold uppercase text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify Email"}
            </button>

            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setOtp("");
                setError("");
                setMessage("");
              }}
              className="w-full text-sm font-medium text-neutral-500 hover:text-neutral-700"
            >
              Use a different email
            </button>
          </form>
        )}

        <Link
          to="/admission"
          className="mt-4 block h-11 w-full text-center text-sm font-semibold uppercase text-ashlight transition"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default EmailVerificationPage;
