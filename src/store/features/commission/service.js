// src/store/features/commission/service.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

// 🟢 Get Commission Summary for a Single Client
export const getClientCommissionSummary = createAsyncThunk(
  "commission/getClientCommissionSummary",
  async (clientId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `${config.commission.getClientCommissionSummary}/${clientId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟢 Get All Commission Summary
export const getAllCommissionSummary = createAsyncThunk(
  "commission/getAllCommissionSummary",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await api.get(config.commission.getAllCommissionSumary);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
