import React, { useState } from "react";
import Icons from "../../assets/icons/Icons";
import images from "../../assets/images";
import CustomHeading from "../../components/common/Heading";
import FormInput from "../../components/common/FormInput";
import { EditIcon, LockIcon } from "../../assets/icons";
import { changePassword } from "../../store/features/agent/service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProfileSettings = () => {
  const { data, isSuccess, errorMessage } = useSelector(
    (state) => state.agent.CurrentAgent
  );

  const firstName = data?.data?.firstName;
  const lastName = data?.data?.lastName;
  const agentEmail = data?.data?.email;
  const fullName = `${firstName} ${lastName}`;

  const [isEditingName, setIsEditingName] = useState(false);
  const [name, setName] = useState(fullName);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [countAsPortfolio, setCountAsPortfolio] = useState(true);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [email, setEmail] = useState(agentEmail);
  const [passwordAccordian, setPasswordAccordian] = useState(false);

  const { isLoading } = useSelector((state) => state.agent.ChangePassword);
  const dispatch = useDispatch();



  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      toast.error("New passwords do not match");
      return;
    }

    const payload = {
      currentPassword,
      newPassword,
      confirmNewPassword,
    };

    try {
      const result = await dispatch(changePassword(payload)).unwrap();
      if (result) {
        // ✅ Optional: clear input fields after success
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      // error toast already handled in thunk
    }
  };

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
            <CustomHeading
              heading={`${firstName} ${lastName}`}
              fontSize="text-[24px]"
            />
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
            <div className="">
              <button
                className=" p-4 rounded-lg text-white bg-black text-sm"
                onClick={handleChangePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileSettings;
