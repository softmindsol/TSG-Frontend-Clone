import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// --- Common Components ---
import InfoCard from "../../components/common/InfoCard";
import DetailItem from "../../components/common/DetailItem";
import DeleteClientModal from "../../components/common/DeleteClientModal";
import GlobalButton from "../../components/common/GlobalButton";

// --- Section Components ---
import Journal from "../../components/common/Journal";
import Appointments from "../../components/common/Appointments";
import Documents from "../../components/common/Documents";
import QuickNotes from "../../components/common/QuickNotes";
import AddExtraContactModal from "../../components/common/AddExtraContactModal";
import ExtraContactsPage from "../../components/common/ExtraContactsPage";
import AddNewDealModal from "../../components/common/AddNewDealModal";
import ListOfDeals from "../../components/common/ListOfDeals";
import DealWorkspace from "../../components/common/DealWorkspace";

// ✅ Redux imports
import {
  deleteClient,
  getClientById,
  updateClient,
} from "../../store/features/client/service";
import {
  getExtraContacts,
  deleteExtraContact,
} from "../../store/features/extraContact/service";
import { selectSingleClient } from "../../store/selector";
import { toast } from "sonner";
import CommissionSettings from "../../components/common/CommisionSettings";

const ClientDetailsPage = () => {
  const [singleDeal, setSingleDeal] = useState({});


  const { clientId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // --- Redux selectors ---
  const {
    data: client,
    isLoading,
    errorMessage,
  } = useSelector(selectSingleClient);

  const {
    data: extraContacts,
    isLoading: isContactsLoading,
    isSuccess: isContactsSuccess,
  } = useSelector((state) => state.extraContact.getExtraContacts);

  // --- UI states ---
  const [isOverviewEditing, setIsOverviewEditing] = useState(false);
  const [isCommissionSettingEditing, setIsCommissionSettingEditing] =
    useState(false);
  const [isPreferencesEditing, setIsPreferencesEditing] = useState(false);
  const [isQuickNotesEditing, setIsQuickNotesEditing] = useState(false);
  const [isAddNewDealModalOpen, setIsAddNewDealModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("details");

  const [localClientData, setLocalClientData] = useState(null);
  const [localPreferencesData, setLocalPreferencesData] = useState(null);


  useEffect(() => {
    if (client) {
      setLocalClientData(client);
      setLocalPreferencesData(client.buyingPreference);
    }
  }, [client]);

  const handleEditOverviewToggle = async () => {
    if (isOverviewEditing || isPreferencesEditing || isQuickNotesEditing) {
      // User clicked "Save"
      const updatedData = {
        clientName: localClientData?.clientName,
        clientEmail: localClientData?.clientEmail,
        phoneNumber: localClientData?.phoneNumber,
        address: localClientData?.address,
        clientType: localClientData?.clientType,

        buyingPreference: {
          budget: {
            min: localPreferencesData?.budget?.min || null,
            max: localPreferencesData?.budget?.max || null,
          },
          propertyType: localPreferencesData?.propertyType,
          purchaseMethod: localPreferencesData?.purchaseMethod,
          preferredLocation: localPreferencesData?.preferredLocation,
          reasonForMove: localPreferencesData?.reasonForMove,
          timeframe: localPreferencesData?.timeframe,
          designStyle: localPreferencesData?.designStyle,
          dealBreakers: localPreferencesData?.dealBreakers,
          quickNotes: localPreferencesData?.quickNotes,
        },
      };
     
      try {
        await dispatch(
          updateClient({ clientId: client._id, updatedData })
        ).unwrap();
        toast.success("Client details updated!");
      } catch (err) {
        toast.error(err || "Failed to update client");
      }
    }
  };

  // --- Fetch client & contacts on load ---
  useEffect(() => {
    if (clientId) {
      dispatch(getClientById(clientId));
      dispatch(getExtraContacts(clientId));
      // setLocalPreferencesData(client)
    }
  }, [dispatch, clientId]);

  // --- Delete contact handler ---
  const handleDeleteContact = async (contactId) => {
    const result = await dispatch(
      deleteExtraContact({
        clientId,
        contactId,
      })
    );

    // ✅ Refetch updated contacts list after delete
    if (result.meta.requestStatus === "fulfilled") {
      dispatch(getExtraContacts(clientId));
    }
  };

  // --- Add contact handler ---
  const handleAddContact = async () => {
    // After successful add, refetch list
    dispatch(getExtraContacts(clientId));
  };

  // --- Delete client handler ---
  const handleDeleteClient = () => {
    dispatch(deleteClient(clientId));
    setIsDeleteModalOpen(false);
    navigate(-1);
  };

  // --- Conditional loading/error states ---
  if (isLoading) {
    return (
      <p className="text-center text-gray-500 mt-8">
        Loading client details...
      </p>
    );
  }

  if (errorMessage) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 font-poppins">
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200"
            >
              <IoArrowBack size={20} />
            </button>
            <p className="text-center text-red-500">
              Error loading client details: {errorMessage}
            </p>
          </div>
        </header>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="bg-gray-50 min-h-screen p-4 font-poppins">
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200"
            >
              <IoArrowBack size={20} />
            </button>
            <p className="text-center text-gray-500">
              No client data to display.
            </p>
          </div>
        </header>
      </div>
    );
  }

  // --- View Mode: Extra Contacts ---
  if (viewMode === "contacts") {
    return (
      <>
        <ExtraContactsPage
          onBack={() => setViewMode("details")}
          agentName={client.assignedAgent?.firstName || "--"}
          contacts={extraContacts || []}
          loading={isContactsLoading}
          onAdd={() => setIsAddContactModalOpen(true)}
          onDelete={handleDeleteContact}
          clientId={clientId}
        />
        <AddExtraContactModal
          isOpen={isAddContactModalOpen}
          onClose={() => setIsAddContactModalOpen(false)}
          onAddContact={handleAddContact}
          clientId={client._id}
        />
      </>
    );
  }

  // --- View Mode: Deal Workspace ---
  if (viewMode === "dealView") {
    return (
      <DealWorkspace
        singleDeal={singleDeal}
        client={client}
        onBack={() => setViewMode("details")}
      />
    );
  }

  // --- Default View: Client Details ---
  return (
    <div className="bg-gray-50 min-h-screen p-4 font-poppins">
      <div className="mx-auto">
        {/* Header */}
        <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
          <div className="flex items-center">
            <button
              onClick={() => navigate(-1)}
              className="mr-4 p-2 rounded-full hover:bg-gray-200"
            >
              <IoArrowBack size={20} />
            </button>
            <p>
              Assigned Agent:{" "}
              <span className="font-bold">
                {client.assignedAgent?.firstName || "--"}{" "}
              </span>
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsAddNewDealModalOpen(true)}
              className="px-4 cursor-pointer py-2 text-sm font-medium bg-[#00AC4F1A] rounded-md hover:bg-[#00AC4F33] text-[#00AC4F]"
            >
              New Deal
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-white border border-gray-200 rounded-md hover:bg-gray-100">
              Archive
            </button>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </header>

        {/* Main Layout */}
        <main className="grid grid-cols-1 xl:grid-cols-3 gap-2 xl:gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* Client Overview */}
            <InfoCard
              title="Client Overview"
              isEditing={isOverviewEditing}
              onEditToggle={() => setIsOverviewEditing(!isOverviewEditing)}
              onSave={() => {
                handleEditOverviewToggle();
                setIsOverviewEditing(!isOverviewEditing);
              }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <DetailItem
                  label="Client Code"
                  value={client.clientCode}
                  // isEditing={isOverviewEditing}
                />
                <DetailItem
                  label="Client Name"
                  value={localClientData?.clientName}
                  isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({ ...prev, clientName: val }))
                  }
                />
                <DetailItem
                  label="Email Address"
                  value={localClientData?.clientEmail || "No Email"}
                  isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({
                      ...prev,
                      clientEmail: val,
                    }))
                  }
                />
                <DetailItem
                  type="phone"
                  label="Phone Number"
                  value={localClientData?.phoneNumber || "No Phone Number"}
                  isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({
                      ...prev,
                      phoneNumber: val,
                    }))
                  }
                />
                <DetailItem
                  label="Home Address"
                  value={localClientData?.address || "No Address"}
                  isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({
                      ...prev,
                      address: val,
                    }))
                  }
                />
                <DetailItem
                  label="Client Type"
                  value={localClientData?.clientType || "No Client Type"}
                  isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({
                      ...prev,
                      clientType: val,
                    }))
                  }
                />
                <DetailItem
                  label="Assigned Agent"
                  value={localClientData?.assignedAgent?.firstName || "--"}
                  // isEditing={isOverviewEditing}
                  onChange={(val) =>
                    setLocalClientData((prev) => ({
                      ...prev,
                      firstName: val,
                    }))
                  }
                />
                <div>
                  <label className="text-sm font-medium text-gray-800 block mb-1">
                    Current Position
                  </label>
                  <span className="px-4 py-1 inline-flex text-sm leading-5 font-semibold rounded-full bg-green-100 text-green-500">
                    {client.currentPosition}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <GlobalButton
                  variant="secondary"
                  onClick={() => setViewMode("contacts")}
                >
                  View Extra Contacts ({extraContacts?.length || 0})
                </GlobalButton>
                <GlobalButton
                  variant="primary"
                  onClick={() => setIsAddContactModalOpen(true)}
                >
                  + Add Extra Contact
                </GlobalButton>
              </div>
            </InfoCard>

            {/* Buying Preferences */}
            <InfoCard
              title="Buying Preferences"
              isEditing={isPreferencesEditing}
              onEditToggle={() =>
                setIsPreferencesEditing(!isPreferencesEditing)
              }
              onSave={() => {
                handleEditOverviewToggle();
                setIsPreferencesEditing(!isPreferencesEditing);
              }}
            >
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Budget (Min)"
                  value={localPreferencesData?.budget?.min || ""}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      budget: { ...prev.budget, min: val },
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Budget (Max)"
                  value={localPreferencesData?.budget?.max || ""}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      budget: { ...prev.budget, max: val },
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Property Type"
                  value={localPreferencesData?.propertyType || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      propertyType: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Purchase Method"
                  value={localPreferencesData?.purchaseMethod || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      purchaseMethod: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Preferred Location"
                  value={localPreferencesData?.preferredLocation || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      preferredLocation: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Reason for Move"
                  value={localPreferencesData?.reasonForMove || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      reasonForMove: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Timeframe"
                  value={localPreferencesData?.timeframe || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      timeframe: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Design Style"
                  value={localPreferencesData?.designStyle || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      designStyle: val,
                    }))
                  }
                />

                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Must Have"
                  value={localPreferencesData?.mustHaves?.join(", ") || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      mustHaves: val.split(",").map((v) => v.trim()),
                    }))
                  }
                />
                <DetailItem
                  className="!bg-[#F9FAFB]"
                  label="Avoid"
                  value={localPreferencesData?.avoids?.join(", ") || "--"}
                  isEditing={isPreferencesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      avoids: val.split(",").map((v) => v.trim()),
                    }))
                  }
                />
              </div>
            </InfoCard>

            {/* Commision Setting */}
            <CommissionSettings
              clientId={clientId}
              commission={client?.commissionSettings}
            />
            {/* Quick Notes */}

            <InfoCard
              title="Quick Notes"
              isEditing={isQuickNotesEditing}
              onEditToggle={() => setIsQuickNotesEditing(!isQuickNotesEditing)}
              onSave={() => {
                handleEditOverviewToggle();
                setIsQuickNotesEditing(!isQuickNotesEditing);
              }}
            >
              <div className="grid grid-cols-1  gap-6">
                <DetailItem
                  className="!bg-[#F9FAFB] w-full"
                  label="Quick Notes"
                  value={localPreferencesData?.quickNotes || "--"}
                  isEditing={isQuickNotesEditing}
                  onChange={(val) =>
                    setLocalPreferencesData((prev) => ({
                      ...prev,
                      quickNotes: val,
                    }))
                  }
                />
                {/* {isQuickNotesEditing && (
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={handleEditOverviewToggle}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-900"
                    >
                      Save
                    </button>
                  </div>
                )} */}
              </div>

              {/* <div className="bg-[#F9FAFB] rounded-lg p-4">
                {isQuickNotesEditing ? (
                  <textarea
                    value={localPreferencesData?.quickNotes || "--"}
                    isEditing={isQuickNotesEditing}
                    onChange={(val) =>
                      setLocalPreferencesData((prev) => ({
                        ...prev,
                        quickNotes: val,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm text-[#6B7280]"
                    rows={3}
                  />
                ) : (
                  <p className="text-sm text-[#6B7280]">
                    {localPreferencesData?.quickNotes}
                  </p>
                )}
              </div> */}
            </InfoCard>

            {/* Other Sections */}
            {/* <QuickNotes
              notes={client?.buyingPreference?.quickNotes}
              handleEditOverviewToggle={handleEditOverviewToggle}
            /> */}
            <ListOfDeals
              setSingleDeal={setSingleDeal}
              setViewMode={setViewMode}
              clientId={clientId}
            />
            {/* <Appointments /> */}
            <Documents
              clientId={clientId}
              documents={client.documents}
              amlDocuments={client.amlDocuments}
            />
          </div>

          {/* Right Sidebar */}
          <div className="xl:col-span-1">
            <Journal journalEntries={client.journal} clientId={clientId} />
          </div>
        </main>
      </div>

      {/* Modals */}
      <DeleteClientModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDeleteClient}
        clientName={client.clientName}
        clientCode={client.clientCode}
      />
      <AddNewDealModal
        isOpen={isAddNewDealModalOpen}
        onClose={() => setIsAddNewDealModalOpen(false)}
        clientId={client._id}
      />
      <AddExtraContactModal
        isOpen={isAddContactModalOpen}
        onClose={() => setIsAddContactModalOpen(false)}
        onAddContact={handleAddContact}
        clientId={clientId}
      />
    </div>
  );
};

export default ClientDetailsPage;
