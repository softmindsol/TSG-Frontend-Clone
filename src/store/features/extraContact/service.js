// src/redux/deal/dealService.js
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

// ✅ CREATE EXTRA CONTACT
export const createExtraContact = createAsyncThunk(
  "clients/createExtraContact",
  async ({ clientId, extraContactData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.extraContact.createExtraContact}/${clientId}`,
        extraContactData
      );

      toast.success("Extra contact created successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create extra contact";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ GET ALL EXTRA CONTACTS
export const getExtraContacts = createAsyncThunk(
  "clients/getExtraContacts",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${config.extraContact.getExtraContacts}/${clientId}`
      );
      

      // Optional toast
      toast.success("Fetched extra contacts successfully!");
      return response?.data; // should include a list of journals
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch extra contacts";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ EDIT EXTRA CONTACT
export const editExtraContact = createAsyncThunk(
  "clients/editExtraContact",
  async ({ clientId, contactId, updatedData }, { rejectWithValue }) => {
   
    try {
      const response = await api.put(
        `${config.extraContact.editExtraContact}/${clientId}/${contactId}`,
        updatedData
      );
      toast.success("Extra contact updated successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to update extra contact";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ DELETE EXTRA CONTACT
export const deleteExtraContact = createAsyncThunk(
  "clients/deleteExtraContact",
  async ({ clientId, contactId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.extraContact.deleteExtraContact}/${clientId}/${contactId}`
      );
      toast.success("Extra contact deleted successfully!");
      return { contactId, ...response?.data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete extra contact";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
