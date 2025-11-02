import { useState } from "react";
import Icons from "../../assets/icons/Icons";
// optional icons

const AccordionItem = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-[#E2E8F0] cursor-pointer rounded-md mb-4 shadow">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex justify-between cursor-pointer items-center ${isOpen ? "pt-5": "py-5"} px-5 bg-white rounded-md transition-colors`}
      >
        <div className="flex items-center gap-7">
          <span className="text-left text-lg font-semibold">{title}</span>
          {isOpen && <Icons.CaretDown className="w-5 h-5" />}
        </div>

        {isOpen ? (
          null
        ) : (
          <Icons.CaretDown className="w-5 h-5" />
        )}
      </button>
      {isOpen && <div className="p-4 bg-white rounded-md">{children}</div>}
    </div>
  );
};

export default AccordionItem;
