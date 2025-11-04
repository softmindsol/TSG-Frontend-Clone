import React, { useState, useEffect } from "react";
import Icons from "../../assets/icons/Icons";
import images from "../../assets/images";
import CustomHeading from "../../components/common/Heading";
import { EditIcon, LockIcon } from "../../assets/icons";
import {
  changePassword,
  updateProfile,
} from "../../store/features/agent/service";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const ProfileSettings = () => {
  const dispatch = useDispatch();

  // 🧠 Redux state
  const { data } = useSelector((state) => state.agent.CurrentAgent);
  const isUpdating = useSelector(
    (state) => state.agent.UpdateProfile?.isLoading || false
  );
  const { isLoading } = useSelector(
    (state) => state.agent.ChangePassword || {}
  );

  // 🧩 Extract agent info
  const agentId = data?.data?._id;
  const firstName = data?.data?.firstName || "";
  const lastName = data?.data?.lastName || "";
  const agentEmail = data?.data?.email || "";
  const profileImage = data?.data?.profilePicture || ""; // backend se image aayegi

  // 🧠 Local States
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingLname, setIsEditingLname] = useState(false);
  const [name, setName] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [email] = useState(agentEmail);

  const [avatarFile, setAvatarFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    profileImage || images.userProfile
  );

  // Password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordAccordian, setPasswordAccordian] = useState(false);

  // Eye toggle states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 🔁 Update local states when Redux data updates
  useEffect(() => {
    setName(firstName);
    setLname(lastName);
    setPreviewImage(profileImage || images.userProfile);
  }, [firstName, lastName, profileImage]);

  // 🧭 Update Profile Handler
  const handleUpdateProfile = async (fieldType) => {
    if (!agentId) {
      toast.error("Agent ID missing");
      return;
    }

    const formData = new FormData();
    formData.append("agentId", agentId);

    // ✅ Append only changed fields
    if (fieldType === "name" && name !== firstName) {
      formData.append("firstName", name);
    }

    if (fieldType === "lname" && lname !== lastName) {
      formData.append("lastName", lname);
    }

    if (fieldType === "profile" && avatarFile) {
      formData.append("profilePicture", avatarFile);
    }

    // If nothing changed
    if ([...formData.entries()].length <= 1) {
      toast.info("No changes detected");
      return;
    }

    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      if (result) {
        toast.success("Profile updated successfully");
        setIsEditingName(false);
        setIsEditingLname(false);
      }
    } catch (error) {
      // handled in thunk
    }
  };

  // 🧭 Change Password Handler
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
        toast.success("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      }
    } catch (error) {
      // handled in thunk
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-md p-6 mt-5 w-[80%]">
      {/* Profile Picture */}
      <div className="flex items-center gap-4">
        <div className="relative flex flex-col mt-5">
          <img
            src={previewImage}
            alt="User Avatar"
            className="rounded-full w-[122px] h-[122px] object-cover object-top"
          />

          <label
            htmlFor="uploadPhoto"
            className="bg-black p-2 -mt-7 ml-16 flex w-9 items-center rounded-full cursor-pointer"
          >
            <Icons.CameraIcons size={20} className="text-white" />
          </label>

          <input
            type="file"
            id="uploadPhoto"
            className="hidden"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setAvatarFile(file);
                setPreviewImage(URL.createObjectURL(file));
                setTimeout(() => handleUpdateProfile("profile"), 400);
              }
            }}
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

      {/* First Name */}
      <div>
        <label className="block text-base mt-8 font-medium text-gray-800 mb-2">
          First Name
        </label>
        <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
          <input
            className="w-full outline-0 bg-transparent font-poppins"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditingName}
          />
          <button
            type="button"
            onClick={() => {
              if (isEditingName) handleUpdateProfile("name");
              setIsEditingName(!isEditingName);
            }}
            className="ml-2 text-gray-600 cursor-pointer hover:text-black"
          >
            {isEditingName ? (
              isUpdating ? (
                <span className="text-sm text-gray-500">Saving...</span>
              ) : (
                <Icons.SaveIcon color="#1877F2" size={22} />
              )
            ) : (
              <EditIcon size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label className="block text-base mt-8 font-medium text-gray-800 mb-2">
          Last Name
        </label>
        <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
          <input
            className="w-full outline-0 bg-transparent font-poppins"
            type="text"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            disabled={!isEditingLname}
          />
          <button
            type="button"
            onClick={() => {
              if (isEditingLname) handleUpdateProfile("lname");
              setIsEditingLname(!isEditingLname);
            }}
            className="ml-2 text-gray-600 cursor-pointer hover:text-black"
          >
            {isEditingLname ? (
              isUpdating ? (
                <span className="text-sm text-gray-500">Saving...</span>
              ) : (
                <Icons.SaveIcon color="#1877F2" size={22} />
              )
            ) : (
              <EditIcon size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-base mt-4 font-medium text-gray-800 mb-2">
          Email
        </label>
        <div className="flex items-center justify-between bg-[#F9FAFB] border border-[#E2E8F0] rounded-md p-2">
          <input
            className="w-full outline-0 bg-transparent"
            type="email"
            value={agentEmail}
            disabled
          />
        </div>
      </div>

      {/* Password Section */}
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

      {/* Password Fields */}
      {passwordAccordian && (
        <div className="space-y-4 mt-5">
          {/* Current Password */}
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

          {/* New Password */}
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

          {/* Confirm Password */}
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

          <div>
            <button
              className="p-4 rounded-lg text-white bg-black text-sm"
              onClick={handleChangePassword}
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;
