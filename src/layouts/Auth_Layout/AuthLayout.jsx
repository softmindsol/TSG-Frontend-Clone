import React from "react";
import images from "../../assets/images";

const AuthLayout = ({ children, maxWidth = "648px", maxHeight }) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-white "
      style={{
        backgroundImage: `url(${images.BgPattern})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Card Wrapper */}
      <div
        className="w-full  bg-white rounded-2xl shadow-lg  flex justify-center  flex-col"
        style={{
          maxWidth,
          ...(maxHeight && { maxHeight }), // only apply if passed
        }}
      >
        {/* Branding */}
        <div className="flex justify-center mb-8 mt-4">
          <img src={images.logo_2} className="max-w-[288px]" />
        </div>
        {/* Form or Child Component */}
        <div className="px-[68px] pb-[68px]">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
