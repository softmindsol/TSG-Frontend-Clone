import { createSlice } from "@reduxjs/toolkit";
import { generateAMLReport } from "./service";


const initialState = {
  loading: false,
  error: null,
  generatedReport: null,
};

const amlReportSlice = createSlice({
  name: "amlReport",
  initialState,
  reducers: {
    clearAMLReport: (state) => {
      state.generatedReport = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateAMLReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateAMLReport.fulfilled, (state, action) => {
        state.loading = false;
        state.generatedReport = action.payload;
      })
      .addCase(generateAMLReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAMLReport } = amlReportSlice.actions;
export default amlReportSlice.reducer;
