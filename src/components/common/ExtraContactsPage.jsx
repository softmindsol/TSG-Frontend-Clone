import React, { useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronUp, FiChevronDown, FiUser } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch } from "react-redux";
import {
  editExtraContact,
  getExtraContacts,
} from "../../store/features/extraContact/service";

// ✅ Reusable label-value display
const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-3">
    <p className="font-medium text-[#081722]">{label}</p>
    <p className="text-[#6B7280]">{value || "--"}</p>
  </div>
);

// ✅ Reusable edit input component
const EditInput = ({ label, value, type = "text", onChange }) => (
  <div className="grid grid-cols-3 items-start md:items-center gap-2">
    {label && (
      <label className="font-medium text-[#081722] text-sm">{label}</label>
    )}

    {type === "phone" ? (
      <PhoneInput
        country={"gb"}
        value={value}
        onChange={(val) => onChange(val)}
        inputClass="!w-full !h-11 px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    )}
  </div>
);

const ContactAccordionItem = ({ contact, onDelete, clientId }) => {
  console.log("🚀 ~ ContactAccordionItem ~ contact:", contact);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [formData, setFormData] = useState({
    contactType: contact.contactType || "",
    email: contact.email || "",
    name: contact.name || "",
    phoneNumber: contact.phoneNumber || "",
    companyName: contact.companyName || "",
    address: contact.address || "",
    jobTitle: contact.jobTitle || "",
    notes: contact.notes || "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const resultAction = await dispatch(
        editExtraContact({
          clientId,
          contactId: contact._id,
          updatedData: formData,
        })
      );

      // ✅ Check if the edit succeeded
      if (editExtraContact.fulfilled.match(resultAction)) {
        // 🔄 Refetch updated contact list immediately
        await dispatch(getExtraContacts(clientId));
      }

      setIsEditing(false);
    } catch (error) {
      console.error("Error while saving contact:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.08)]">
      {/* Accordion Header */}
      <div
        className="flex items-center p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-blue-100 rounded-md mr-4">
          <FiUser className="text-blue-600" />
        </div>
        <div className="flex-grow">
          <p className="font-medium text-[#081722]">
            {contact.name || "Unnamed Contact"}
          </p>
          <p className="text-sm text-[#6B7280]">
            {contact.jobTitle || "Job Title"}
          </p>
        </div>
        {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </div>

      {/* Accordion Body */}
      {isOpen && (
        <div className="p-6 border-t border-gray-200">
          {!isEditing ? (
            // --- VIEW MODE ---
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <DetailRow label="Contact Type" value={contact.contactType} />
                <DetailRow label="Email Address" value={contact.email} />
                <DetailRow label="Name" value={contact.name} />
                <DetailRow label="Phone Number" value={contact.phoneNumber} />
                <DetailRow label="Company Name" value={contact.companyName} />
                <DetailRow label="Home Address" value={contact.address} />
                <DetailRow label="Job Title" value={contact.jobTitle} />
              </div>

              <div className="grid grid-cols-[1fr_5.1fr]">
                <p className="font-medium text-[#081722]">Extra Notes</p>
                <p className="text-[#6B7280] mt-1">{contact.notes}</p>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setIsEditing(true)}
                  className="h-10 px-8 bg-blue-100 text-blue-600 font-medium rounded-lg text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(contact._id)}
                  className="h-10 px-8 bg-red-100 text-red-600 font-medium rounded-lg text-sm"
                >
                  Delete
                </button>
              </div>
            </>
          ) : (
            // --- EDIT MODE ---
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-6">
                <EditInput
                  label="Contact Type"
                  value={formData.contactType}
                  onChange={(e) => handleChange("contactType", e.target.value)}
                />
                <EditInput
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <EditInput
                  label="Name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <EditInput
                  type="phone"
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={(val) => handleChange("phoneNumber", val)}
                />
                <EditInput
                  label="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                />
                <EditInput
                  label="Home Address"
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                />
                <EditInput
                  label="Job Title"
                  value={formData.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-[1fr_5.2fr] items-start gap-2 mb-6">
                <label className="w-24 font-medium text-[#081722] text-sm">
                  Extra Notes
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`h-10 px-8 font-medium rounded-lg text-sm ${
                    isSaving
                      ? "bg-gray-200 text-gray-400"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="h-10 px-8 bg-gray-100 text-gray-600 font-medium rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

// ✅ Page wrapper
const ExtraContactsPage = ({
  onBack,
  agentName,
  contacts,
  onAdd,
  onDelete,
  clientId,
}) => {
  return (
    <div className="bg-gray-50 min-h-screen p-4 font-poppins">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="mr-4 p-2 rounded-full hover:bg-gray-200"
          >
            <IoArrowBack size={20} />
          </button>
          <p>
            Assigned Agent: <span className="font-bold">{agentName}</span>
          </p>
        </div>
        <button
          onClick={onAdd}
          className="px-4 py-2 text-sm font-medium text-white bg-[#081722] rounded-md hover:bg-gray-900"
        >
          + Add Extra Contacts
        </button>
      </header>

      {/* Main Content */}
      <main className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-[#111827] mb-6">
          Extra Contacts List
        </h2>
        <div className="space-y-4">
          {contacts.map((contact) => (
            <ContactAccordionItem
              key={contact._id}
              contact={contact}
              clientId={clientId}
              onDelete={onDelete}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ExtraContactsPage;
