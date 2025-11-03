import { get } from "react-hook-form";

const config = {
  agent: {
    agentRegister: "agents/register-agent",
    agentLogin: "agents/login-agent",
    currentAgent: "agents/current",
    changePassword: "agents/change-password",
  },
  client: {
    createClient: "clients/create-client",
    updateClient: "clients/update-client",
    getAllClients: "clients/get-all-clients",
    getClientById: "clients/get-client-ById",
    deletClient: "clients/delete",
    getSimpleClients: "clients/get-simple-clients",
    commissionSetting: "clients/calculateCommissionSettings",
    dealStageTracker: "deal/deal-tracker",
  },
  deal: {
    createDeal: "deal/create-deal",
    getAllDeals: "deal/get-all-deal",
    getSingleDeal: "deal/get-single-deal",
    deleteDeal: "deal/delete-deals",
    keyDates: "deal/key-dates",
    buyerDetails: "deal/buyer-side-details",
    sellerDetails: "deal/seller-side-details",
    propertyDetails: "deal/property-details",
    offers: "deal/offers",
    // 🔽 NEW ENDPOINTS
    financialDetails: "deal/financial-details",
    quickNotes: "deal/quickNotes",
    uploadDocuments: "deal/upload-documents",
    getDocuments: "deal/get-documents",
    deleteDocuments: "deal/delete-documents",
    dueDiligence: "deal/due-diligence",
    conveyancingMilestones: "deal/conveyancing-milestones",
    optionalMilestones: "deal/optional-milestones",
  },

  amlCompliance: {
    updateAMLStatus: "aml/update-status",
    verificationTimeline: "aml/verification-timeline",
    getAMLDocuments: "aml/get-aml-documents",
    deleteAMLDocument: "aml/delete-aml-document",
    addAMLDocument: "aml/aml-document",
  },
  report: {
    generateAMLReport: "reports/generate-report",
  },
  journal: {
    createJournal: "/clients/add-client-journal",
    getJournals: "/clients/get-client-journal",
  },
  extraContact: {
    createExtraContact: "/clients/extra-contacts",
    getExtraContacts: "/clients/get-extra-contacts",
    editExtraContact: "/clients/edit-extra-contacts",
    deleteExtraContact: "/clients/delete-extra-contacts",
  },
  clientDocument: {
    uploadDocument: "/clients/upload-document",
    deleteDocument: "/clients/delete-document",
  },
  events: {
    createEvent: "/event/create-event",
    getEventRange: "/event/get-event-range",
    deleteEvent: "/event/delete-event",
    updateEvent: "/event/update",
  },
  documents: {
    getAllTemplate: "template/get-all",
    getTemplateById: "template/get-template-id",
    fillTemplateData: "template/fill",
    getDocumentReports: "documents/documents-reports",
    deleteReport: "reports/delete-report",
    deleteDocumentFromDocument: "documents/delete-documents",
    uploadDocumentFromDocument: "documents/upload",
  },
  commission: {
    getClientCommissionSummary: "clients/client-commission-summary",
    getAllCommissionSumary: "deal/commission/summary",
  },
  checkout: {
    createCheckoutSession: "checkout/create-checkout-session",
  },
  team: {
    addTeamMember: "member/add-member",
    getTeamMembers: "member/get-all-member",
    deleteTeamMember: "member/delete-member",
  },
  aiAssistant:{
    startChatSession: "ai/start",
    messageAI: "ai/message",
    getChatHistory: "ai/history",
    getChatById: "ai/history", // we'll append /:id dynamically
    deleteChat: "ai", // we'll append /:sessionId dynamically
  }

};

export default config;
