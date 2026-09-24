import { useRouteError } from "react-router-dom";

const RouterErrorBoundary = () => {
  const error = useRouteError();

  // Axios 401 caused by an expired session.
  // The global SessionExpiredModal is already displayed by the Axios interceptor.
  if (error?.isSessionExpired || error?.response?.status === 401) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#ebe9e4] font-[Poppins]">
      <div className="text-center">
        <h1 className="text-xl font-[PoppinsBold] text-[#2d2d2d]">
          Something went wrong
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          An unexpected error occurred.
        </p>
      </div>
    </div>
  );
};

export default RouterErrorBoundary;
