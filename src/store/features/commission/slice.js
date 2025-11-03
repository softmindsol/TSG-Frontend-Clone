// src/store/features/commission/slice.js
import { createSlice } from "@reduxjs/toolkit";
import { getClientCommissionSummary, getAllCommissionSummary } from "./service";

const initialState = {
  summary: null,
  allSummary: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 Get Client Commission Summary
    builder
      .addCase(getClientCommissionSummary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getClientCommissionSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.summary = action.payload;
      })
      .addCase(getClientCommissionSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });

    // 🔹 Get All Commission Summary
    builder
      .addCase(getAllCommissionSummary.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(getAllCommissionSummary.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allSummary = action.payload;
      })
      .addCase(getAllCommissionSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload || "Something went wrong";
      });
  },
});

export default commissionSlice.reducer;
