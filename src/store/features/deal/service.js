import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

// 🟢 CREATE DEAL
export const createDeal = createAsyncThunk(
  "deal/createDeal",
  async ({ clientId, dealData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.deal.createDeal}/${clientId}`,
        dealData
      );
      toast.success("Deal created successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create deal";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 🟡 GET ALL DEALS
export const getAllDeals = createAsyncThunk(
  "deal/getAllDeals",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.deal.getAllDeals}/${clientId}`);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch deals";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 🔵 GET SINGLE DEAL
export const getSingleDeal = createAsyncThunk(
  "deal/getSingleDeal",
  async ({ dealId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.deal.getSingleDeal}/${dealId}`);
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch deal details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 🔴 DELETE DEAL
export const deleteDeal = createAsyncThunk(
  "deal/deleteDeal",
  async ({ clientId, dealId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.deal.deleteDeal}/${clientId}/${dealId}`
      );
      toast.success("Deal deleted successfully!");
      return { clientId, dealId, data: response.data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete deal";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

//
// 🟣 PUT UPDATES BELOW (all use dealId)
//

// 1️⃣ KEY DATES
export const updateKeyDates = createAsyncThunk(
  "deal/updateKeyDates",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${config.deal.keyDates}/${dealId}`, data);
      toast.success("Key Dates updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update Key Dates";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 2️⃣ BUYER DETAILS
export const updateBuyerDetails = createAsyncThunk(
  "deal/updateBuyerDetails",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${config.deal.buyerDetails}/${dealId}`,
        data
      );
      toast.success("Buyer details updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update Buyer details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 3️⃣ SELLER DETAILS
export const updateSellerDetails = createAsyncThunk(
  "deal/updateSellerDetails",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${config.deal.sellerDetails}/${dealId}`,
        data
      );
      toast.success("Seller details updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update Seller details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 4️⃣ PROPERTY DETAILS
export const updatePropertyDetails = createAsyncThunk(
  "deal/updatePropertyDetails",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${config.deal.propertyDetails}/${dealId}`,
        data
      );
      toast.success("Property details updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update Property details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 5️⃣ UPDATE OFFER
export const updateOffer = createAsyncThunk(
  "deal/updateOffer",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${config.deal.offers}/${dealId}`, data);
      toast.success("Offer updated successfully!");
      return response.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to update offer";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
// 6️⃣ FINANCIAL DETAILS (PATCH)
export const updateFinancialDetails = createAsyncThunk(
  "deal/updateFinancialDetails",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.deal.financialDetails}/${dealId}`, data);
      toast.success("Financial details updated successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update financial details";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 7️⃣ QUICK NOTES (PUT)
export const updateQuickNotes = createAsyncThunk(
  "deal/updateQuickNotes",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${config.deal.quickNotes}/${dealId}`, data);
      toast.success("Quick notes updated successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update quick notes";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 8️⃣ UPLOAD DOCUMENTS (POST)
export const uploadDocuments = createAsyncThunk(
  "deal/uploadDocuments",
  async ({ dealId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.deal.uploadDocuments}/${dealId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Documents uploaded successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to upload documents";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 9️⃣ GET DOCUMENTS (GET)
export const getDocuments = createAsyncThunk(
  "deal/getDocuments",
  async ({ dealId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.deal.getDocuments}/${dealId}`);
    
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to fetch documents";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 🔟 DELETE DOCUMENTS (DELETE)
export const deleteDocument = createAsyncThunk(
  "deal/deleteDocument",
  async ({ dealId, docId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${config.deal.deleteDocuments}/${dealId}/${docId}`);
      toast.success("Document deleted successfully!");
      return { dealId, docId, data: response.data };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete document";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 1️⃣1️⃣ DUE DILIGENCE (PATCH)
export const updateDueDiligence = createAsyncThunk(
  "deal/updateDueDiligence",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.deal.dueDiligence}/${dealId}`, data);
      toast.success("Due diligence updated successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update due diligence";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 1️⃣2️⃣ CONVEYANCING MILESTONES (PUT)
export const updateConveyancingMilestones = createAsyncThunk(
  "deal/updateConveyancingMilestones",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${config.deal.conveyancingMilestones}/${dealId}`, data);
      toast.success("Conveyancing milestones updated successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update conveyancing milestones";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// 1️⃣3️⃣ OPTIONAL MILESTONES (PUT)
export const updateOptionalMilestones = createAsyncThunk(
  "deal/updateOptionalMilestones",
  async ({ dealId, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${config.deal.optionalMilestones}/${dealId}`, data);
      toast.success("Optional milestones updated successfully!");
      return response.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update optional milestones";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

