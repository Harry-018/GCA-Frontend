import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginHeader from "../Components/LoginHeader.jsx";
import HomeSidebar from "../Components/HomeSidebar.jsx";
import Copyright from "../Components/Copyright.jsx";
import logoImg from "../assets/logowbg.png";
import logImg from "../assets/p2.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Optional: clear messages when the page loads
  useEffect(() => {
    setMessage("");
    setError("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TEMPORARY - navigate to admin page for now
    navigate("/admin");
  };

  const handleBackToLogin = () => {
    setExiting(true);

    setTimeout(() => {
      navigate("/login");
    }, 600);
  };

  return (
    <>
      <LoginHeader 
        onMenuToggle={() => 
        setSidebarOpen(true)} 
      />

      <HomeSidebar 
        open={sidebarOpen} onClose={() => 
        setSidebarOpen(false)} 
      />

      <div className="flex min-h-dvh items-center justify-center bg-[#ebe9e4] px-3 py-6 sm:px-4 sm:py-8">
        <div className="flex w-full max-w-4xl overflow-hidden rounded-2xl bg-bone shadow-lg transition-all duration-700 ease-in-out sm:rounded-3xl md:h-130">
          <div className="flex w-full flex-col justify-center px-4 py-4 sm:px-8 sm:py-6 md:w-1/2 md:px-14">
            <div className="text-center">
              <div className="py-3 flex items-center justify-center gap-2 md:hidden">
                <img
                  src={logoImg}
                  alt="GCA Logo"
                  className="h-8 w-8 rounded-full object-contain sm:h-10 sm:w-10"
                />

                <p className="font-[PoppinsBold] text-xs text-swamp-green sm:text-sm">
                  Grace Christian Academy
                </p>
              </div>

              <h1 className="font-Handpicked-seashells text-2xl font-bold text-swamp-green sm:text-3xl">
                FORGOT PASSWORD?
              </h1>

              <p className="py-2 text-2xs leading-relaxed text-gray-600 sm:text-xs">
                Enter your email address and we'll send you a link
                to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="py-2 sm:py-5">
              <div className="py-2 sm:py-4">
                <label
                  htmlFor="email"
                  className="font-Handmade text-base font-bold text-gray-700 sm:text-lg"
                >
                  Email
                </label>

                <div className="relative py-1">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="w-full rounded-lg border border-swamp-green bg-transparent px-3 py-2.5 text-xs outline-none transition-all duration-500 ease-in-out placeholder:text-gray-400 focus:ring-2 focus:ring-swamp-green focus:shadow-[0_0_0_4px_rgba(7,59,50,0.1)] sm:px-4 sm:py-3 sm:text-sm"
                  />
                </div>
              </div>

              {message && (
                <p className="py-2 text-center text-2xs text-swamp-green sm:text-xs">
                  {message}
                </p>
              )}

              {error && (
                <p className="py-2 text-center text-2xs text-red-500 sm:text-xs">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full border border-swamp-green py-2.5 font-Handpicked-seashells text-base font-bold text-swamp-green transition-all duration-500 ease-in-out hover:bg-[#91a77a] hover:text-white hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:py-3 sm:text-lg"
              >
                {loading ? "SENDING..." : "SEND RESET LINK"}
              </button>

              <div className="py-2 text-center">
                <button
                  type="button"
                  onClick={handleBackToLogin}
                  className="text-2xs text-gray-600 underline transition-all duration-300 ease-in-out hover:text-swamp-green sm:text-xs"
                >
                  Back to Login
                </button>
              </div>
            </form>
          </div>

          <div
            className={`relative hidden w-1/2 overflow-hidden md:block ${
              exiting
                ? "animate-slide-out-left"
                : "animate-slide-in-left"
            }`}
          >
            <img
              src={logImg}
              alt="Grace Christian Academy"
              className="h-full w-full object-cover"
            />

        <div className="absolute inset-0 bg-linear-to-t from-[#063c31]/95 via-[#063c31]/30 to-transparent" />
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-3">
                <img
                  src={logoImg}
                  alt="GCA Logo"
                  className="h-12 w-12 rounded-full object-contain"
                />

              <div className="text-white">
                <h2 className="text-sm font-[PoppinsBold] leading-tight">
                  GRACE CHRISTIAN
                </h2>
                <h2 className="text-sm font-[PoppinsBold] leading-tight">
                  ACADEMY OF CAVITE INC.
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </>
  );
};

export default ForgotPassword;