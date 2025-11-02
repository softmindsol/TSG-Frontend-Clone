import React from "react";
const GoogleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M22.56 12.25C22.56 11.45 22.49 10.68 22.36 9.93H12V14.5H18.28C18.04 15.84 17.32 16.96 16.21 17.72V20.25H19.95C21.66 18.69 22.56 15.75 22.56 12.25Z"
      fill="#4285F4"
    />
    <path
      d="M12 23C15.14 23 17.78 21.92 19.95 20.25L16.21 17.72C15.11 18.44 13.68 18.9 12 18.9C9.22 18.9 6.81 17.11 5.86 14.6H2.02V17.19C3.76 20.62 7.5 23 12 23Z"
      fill="#34A853"
    />
    <path
      d="M5.86 14.6C5.63 13.88 5.5 13.08 5.5 12.25C5.5 11.42 5.63 10.62 5.86 9.9H2.02C1.3 11.02 1 12.21 1 13.5C1 14.79 1.3 15.98 2.02 17.19L5.86 14.6Z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.6C13.84 5.6 15.28 6.36 16.29 7.29L20.04 3.54C17.78 1.35 15.14 0 12 0C7.5 0 3.76 2.38 2.02 5.81L5.86 8.4C6.81 5.89 9.22 4.1 12 4.1V5.6Z"
      fill="#EA4335"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.099 4.388 23.094 10.125 24V15.563H7.078V12.073H10.125V9.413C10.125 6.387 11.916 4.75 14.657 4.75C15.97 4.75 17.344 4.953 17.344 4.953V7.923H15.83C14.339 7.923 13.875 8.854 13.875 9.748V12.073H17.203L16.671 15.563H13.875V24C19.612 23.094 24 18.099 24 12.073Z"
      fill="#1877F2"
    />
  </svg>
);

const SsoLogins = ({ withDivider = false }) => {
  return (
    <div className="space-y-6 ">
      {withDivider && (
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-300 opacity-25"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm">
            Or login with
          </span>
          <div className="flex-grow border-t border-gray-300 opacity-25"></div>
        </div>
      )}
      {/* Social Logins */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center w-full py-3 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          <FacebookIcon />
        </button>
        <button
          type="button"
          className="flex items-center justify-center w-full py-3 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          <GoogleIcon />
        </button>
      </div>
    </div>
  );
};

export default SsoLogins;
