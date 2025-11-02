// src/redux/features/clients/service.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

// --- ADD THIS NEW THUNK FOR CREATING A CLIENT ---
export const createClient = createAsyncThunk(
  "client/createClient",
  async (clientsData, { rejectWithValue }) => {
    console.log("🚀 ~ clientsData (before sending):", clientsData);

    try {
      // Detect if data is FormData
      const isFormData = clientsData instanceof FormData;

      const response = await api.post(config.client.createClient, clientsData, {
        headers: {
          ...(isFormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" }),
        },
      });

      toast.success("Client created successfully");
      return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create client";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllClients = createAsyncThunk(
  "clients/getAllClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.client.getAllClients);

      toast.success("Clients fetched successfully");

      return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch clients";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

export const getClientById = createAsyncThunk(
  "client/getClientById",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/clients/get-client-ById/${clientId}`);

      if (response.status === 200) {
        return response.data;
      }

      toast.error("Failed to fetch client details");
      return rejectWithValue("Failed to fetch client details");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Error fetching client by ID";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ EDIT EXTRA CONTACT
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ clientId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `${config.client.updateClient}/${clientId}`,
        updatedData
      );
      toast.success("Client updated successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update client";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Delete Client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.client.deletClient}/${clientId}`
      );

      toast.success("Client deleted successfully!");
      return { clientId };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete client";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ Get Simple Clients
export const getSimpleClients = createAsyncThunk(
  "clients/getSimpleClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(config.client.getSimpleClients);

      toast.success("Simple clients fetched successfully");
      return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch simple clients";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

// ✅ Commission Setting (Upsert / PUT)
export const commissionSetting = createAsyncThunk(
  "clients/commissionSetting",
  async ({ clientId, data }, { rejectWithValue }) => {
    try {
      // 🟢 Hitting API with query param ?clientId=
      const response = await api.put(
        `${config.client.commissionSetting}/${clientId}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success("Commission setting updated successfully!");
      return response?.data; // backend should return updated client or confirmation
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update commission setting";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ Deal Stage Tracker
export const dealStageTracker = createAsyncThunk(
  "clients/dealStageTracker",
  async ({ dealId, stage }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${config.client.dealStageTracker}/${dealId}`,
        { stage }
      );

      toast.success("Deal stage tracker updated successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update deal stage tracker";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
