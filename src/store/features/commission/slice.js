import { createSlice } from "@reduxjs/toolkit";
import { getClientCommissionSummary } from "./service";

const initialState = {
  summary: null,
  isLoading: false,
  isError: false,
  errorMessage: "",
};

const commissionSlice = createSlice({
  name: "commission",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
  },
});

export default commissionSlice.reducer;
