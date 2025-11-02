// src/redux/services/amlService.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

export const updateAMLStatus = createAsyncThunk(
  "aml/updateStatus",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${config.amlCompliance.updateAMLStatus}/${id}`, payload);

      toast.success("AML status updated successfully!");
      return response?.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update AML status.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getVerificationTimeline = createAsyncThunk(
  "aml/getVerificationTimeline",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.amlCompliance.verificationTimeline}/${id}`);
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch verification timeline.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const getAMLDocuments = createAsyncThunk(
  "aml/getAMLDocuments",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${config.amlCompliance.getAMLDocuments}/${id}`
      );
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Failed to fetch AML documents.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteAMLDocument = createAsyncThunk(
  "aml/deleteAMLDocument",
  async ({ clientId, documentId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.amlCompliance.deleteAMLDocument}/${clientId}/${documentId}`
      );

      toast.success("AML document deleted successfully!");
      return response?.data;
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to delete AML document.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const addAMLDocument = createAsyncThunk(
  "aml/addAMLDocument",
  async ({ clientId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.amlCompliance.addAMLDocument}/${clientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("AML document uploaded successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to upload AML document.";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);