import { createSlice } from "@reduxjs/toolkit";
import {
  updateAMLStatus,
  getVerificationTimeline,
  getAMLDocuments,
  deleteAMLDocument,
  addAMLDocument,
} from "./service";

const initialState = {
  loading: false,
  error: null,
  amlRecord: null,
  verificationTimeline: [],
  amlDocuments: [], // 🆕 added for documents
};

const amlSlice = createSlice({
  name: "amlCompliance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ✅ updateAMLStatus
    builder
      .addCase(updateAMLStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAMLStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.amlRecord = action.payload;
      })
      .addCase(updateAMLStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ getVerificationTimeline
    builder
      .addCase(getVerificationTimeline.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getVerificationTimeline.fulfilled, (state, action) => {
        state.loading = false;
        state.verificationTimeline = action.payload?.data || [];
      })
      .addCase(getVerificationTimeline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ✅ getAMLDocuments
    builder
      .addCase(getAMLDocuments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAMLDocuments.fulfilled, (state, action) => {
        state.loading = false;
        state.amlDocuments = action.payload?.data || [];
      })
      .addCase(getAMLDocuments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteAMLDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
    .addCase(deleteAMLDocument.fulfilled, (state, action) => {
        state.loading = false;

        if (!Array.isArray(state.amlDocuments)) {
          state.amlDocuments = [];
        }

        const docId = action.meta?.arg?.documentId;
        if (docId) {
          state.amlDocuments = state.amlDocuments.filter(
            (doc) => doc._id !== docId
          );
        }
      })
      .addCase(deleteAMLDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // ✅ add AML Document
    builder
      .addCase(addAMLDocument.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAMLDocument.fulfilled, (state, action) => {
        state.loading = false;

        const newDoc =
          action.payload?.data?.document ||
          action.payload?.data ||
          action.payload;

        if (!Array.isArray(state.amlDocuments)) {
          state.amlDocuments = [];
        }

        if (newDoc) {
          state.amlDocuments.unshift(newDoc);
        }
      })

      .addCase(addAMLDocument.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default amlSlice.reducer;
