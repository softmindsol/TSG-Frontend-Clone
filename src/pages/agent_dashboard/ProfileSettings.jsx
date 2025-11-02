import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import images from "../../assets/images";
import CustomHeading from "../../components/common/Heading";
import FormInput from "../../components/common/FormInput";
import { EditIcon, LockIcon } from "../../assets/icons";

const ProfileSettings = () => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState("John Smith");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [countAsPortfolio, setCountAsPortfolio] = useState(true);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState("johnsmith12@gmail.com");
  const [passwordAccordian, setPasswordAccordian] = useState(false);
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-md p-6 mt-5 w-[80%]">
        <div className="flex items-center gap-4">
          <div className="relative flex flex-col mt-5">
            <img
              src={images.userProfile}
              alt="User Avatar"
              className="rounded-full w-[122px] object-top h-[122px] object-cover"
            />

            <label
              htmlFor="uploadPhoto"
              className="bg-primaryYellow p-2 bg-black -mt-7 ml-16 flex w-9 items-center rounded-full cursor-pointer"
            >
              <Icons.CameraIcons size={20} className="text-white" />
            </label>

            <input
              type="file"
              id="uploadPhoto"
              className="hidden"
              accept="image/*"
              // onChange={(e) => {
              //   const file = e.target.files[0];
              //   if (file) {
              //     setAvatarFile(file);
              //     setPreviewImage(URL.createObjectURL(file)); // generate preview
              //   }
              // }}
            />
          </div>
          <div>
            <CustomHeading heading="John Smith" fontSize="text-[24px]" />
            <p className="text-[#6B7280] text-lg font-normal">Agent</p>
          </div>
        </div>
        <div>
          <label className="block text-base mt-8 font-medium text-gray-800 mb-2">
            Name
          </label>
          <div className="flex items-center font-poppins justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
            <input
              className={`w-full outline-0 bg-transparent font-poppins `}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditingName}
            />
            <button
              type="button"
              onClick={() => setIsEditingName(!isEditingName)}
              className="ml-2 text-gray-600 cursor-pointer hover:text-black"
            >
              {isEditingName ? (
                <Icons.SaveIcon color="#1877F2" size={22} />
              ) : (
                <EditIcon size={18} />
              )}
            </button>
          </div>
        </div>
        <div>
          <label className="block text-base mt-4 font-medium text-gray-800 mb-2">
            Email
          </label>
          <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
            <input
              className={`w-full outline-0 bg-transparent `}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!isEditingEmail}
            />
            <button
              type="button"
              onClick={() => setIsEditingEmail(!isEditingEmail)}
              className="ml-2 text-gray-600 cursor-pointer hover:text-black"
            >
              {isEditingEmail ? (
                <Icons.SaveIcon color="#1877F2" size={22} />
              ) : (
                <EditIcon size={18} />
              )}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-3">
            <LockIcon />
            <CustomHeading heading="Change Password" fontSize="text-[20px]" />
          </div>
          <button
            className="cursor-pointer"
            onClick={() => setPasswordAccordian(!passwordAccordian)}
          >
            {passwordAccordian ? (
              <Icons.CaretDown size={20} />
            ) : (
              <Icons.CaretUp size={20} />
            )}
          </button>
        </div>
        {passwordAccordian && (
          <div className="space-y-4 mt-5">
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Current Password
              </label>
              <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
                <input
                  className="w-full outline-0 bg-transparent"
                  type={showCurrentPassword ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="ml-2 text-gray-600 hover:text-black"
                >
                  {showCurrentPassword ? (
                    <Icons.EyeSplas size={18} />
                  ) : (
                    <Icons.EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                New Password
              </label>
              <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
                <input
                  className="w-full outline-0 bg-transparent"
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="ml-2 text-gray-600 hover:text-black"
                >
                  {showNewPassword ? (
                    <Icons.EyeSplas size={18} />
                  ) : (
                    <Icons.EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-gray-800 mb-2">
                Confirm New Password
              </label>
              <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
                <input
                  className="w-full outline-0 bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Confirm new password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="ml-2 text-gray-600 hover:text-black"
                >
                  {showConfirmPassword ? (
                    <Icons.EyeSplas size={18} />
                  ) : (
                    <Icons.EyeIcon size={18} />
                  )}
                </button>
              </div>
            </div>
            <p className="text-[#081722] text-base font-medium">
              Would you like your team members to have access to view your
              clients and their details?
             
            </p>
             <button
                onClick={() => setCountAsPortfolio(!countAsPortfolio)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black ${
                  countAsPortfolio ? "bg-black" : "bg-gray-600"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    countAsPortfolio ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSettings;
