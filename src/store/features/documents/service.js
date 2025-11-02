import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

// ✅ GET ALL TEMPLATES
export const getAllTemplates = createAsyncThunk(
  "documents/templates/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.documents.getAllTemplate);
      toast.success("Fetched all templates successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch templates";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ GET TEMPLATE BY ID
export const getTemplateById = createAsyncThunk(
  "documents/templates/getById",
  async (templateId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${config.documents.getTemplateById}/${templateId}`
      );
      toast.success("Fetched template successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch template";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ FILL TEMPLATE DATA
export const fillTemplateData = createAsyncThunk(
  "documents/templates/fillData",
  async ({ templateId, dealId }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.documents.fillTemplateData}/${templateId}`,
        { dealId }
      );
      toast.success("Template auto-filled successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fill template data";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ GET DOCUMENT REPORTS
export const getDocumentReports = createAsyncThunk(
  "documents/reports/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.documents.getDocumentReports);
      toast.success("Fetched document reports successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch document reports";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ DELETE REPORT
export const deleteReport = createAsyncThunk(
  "documents/reports/deleteReport",
  async (reportId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.documents.deleteReport}/${reportId}`
      );
      toast.success("Report deleted successfully!");
      return { id: reportId, data: response?.data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete report";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ DELETE DOCUMENT FROM DOCUMENTS (Client Upload)
export const deleteDocumentFromDocument = createAsyncThunk(
  "documents/clientUploads/deleteDocument",
  async (documentId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.documents.deleteDocumentFromDocument}/${documentId}`
      );

      toast.success("Document deleted successfully!");

      // Optionally refresh client uploads (if you have a thunk for that)
      // dispatch(getClientUploads()); // uncomment when available

      return { id: documentId, data: response?.data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete document";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ UPLOAD DOCUMENT FROM DOCUMENTS
export const uploadDocumentFromDocument = createAsyncThunk(
  "documents/clientUploads/uploadDocument",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      // formData is a FormData object (with file, metadata, etc.)
      const response = await api.post(
        config.documents.uploadDocumentFromDocument,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Document uploaded successfully!");

      // Optionally, refresh the uploads list when available
      // dispatch(getClientUploads());

      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to upload document";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);


