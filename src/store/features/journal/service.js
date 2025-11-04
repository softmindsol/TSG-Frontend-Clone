// src/redux/deal/dealService.js
import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

// ✅ CREATE JOURNAL
export const createJournal = createAsyncThunk(
  "clients/createJournal",
  async ({ clientId, journalData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.journal.createJournal}/${clientId}`,
        journalData
      );

      toast.success("journal created successfully!");
      return response?.data;
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to create journal";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// ✅ GET ALL JOURNALS for a client
export const getJournals = createAsyncThunk(
  "clients/getJournals",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await api.get(
        `${config.journal.getJournals}/${clientId}`
      );
     

      // Optional toast
      toast.success("Fetched journals successfully!");
      return response?.data; // should include a list of journals
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch journals";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
