import { createSlice } from "@reduxjs/toolkit";
import {
  createDeal,
  getAllDeals,
  getSingleDeal,
  deleteDeal,
  updateKeyDates,
  updateBuyerDetails,
  updateSellerDetails,
  updatePropertyDetails,
  updateOffer,
  updateFinancialDetails,
  updateQuickNotes,
  uploadDocuments,
  getDocuments,
  deleteDocument,
  updateDueDiligence,
  updateConveyancingMilestones,
  updateOptionalMilestones,
} from "./service";

const initialState = {
  deals: [],
  deal: null,
  loading: false,
  error: null,
  dealDocument:[]
};

const dealSlice = createSlice({
  name: "deal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 Helper functions
    const handlePending = (state) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state, action) => {
      state.loading = false;
      state.error = action.payload;
    };

    // 🟢 CREATE DEAL
    builder.addCase(createDeal.pending, handlePending);
    builder.addCase(createDeal.fulfilled, (state, action) => {
      state.loading = false;
      const newDeal = action.payload?.data || action.payload;
      if (newDeal) state.deals.push(newDeal);
    });
    builder.addCase(createDeal.rejected, handleRejected);

    // 🟡 GET ALL DEALS
    builder.addCase(getAllDeals.pending, handlePending);
    builder.addCase(getAllDeals.fulfilled, (state, action) => {
      state.loading = false;
      state.deals = Array.isArray(action.payload)
        ? action.payload
        : action.payload?.data || [];
    });
    builder.addCase(getAllDeals.rejected, handleRejected);

    // 🔵 GET SINGLE DEAL
    builder.addCase(getSingleDeal.pending, handlePending);
    builder.addCase(getSingleDeal.fulfilled, (state, action) => {
      state.loading = false;
      state.deal = action.payload?.data || action.payload;
    });
    builder.addCase(getSingleDeal.rejected, handleRejected);

    // 🔴 DELETE DEAL
    builder.addCase(deleteDeal.pending, handlePending);
    builder.addCase(deleteDeal.fulfilled, (state, action) => {
      state.loading = false;
      const deletedId = action.payload.dealId;
      state.deals = state.deals.filter((d) => d._id !== deletedId);
    });
    builder.addCase(deleteDeal.rejected, handleRejected);

    // 🟣 PUT / PATCH UPDATES (merge updated deal into current state)
    const updateCases = [
      updateKeyDates,
      updateBuyerDetails,
      updateSellerDetails,
      updatePropertyDetails,
      updateOffer,
      updateFinancialDetails,
      updateQuickNotes,
      updateDueDiligence,
      updateConveyancingMilestones,
      updateOptionalMilestones,
    ];

    updateCases.forEach((thunk) => {
      builder.addCase(thunk.pending, handlePending);
      builder.addCase(thunk.fulfilled, (state, action) => {
        state.loading = false;
        const updatedDeal = action.payload?.data || action.payload;
        state.deal = updatedDeal;

        // Replace in deals array if present
        state.deals = state.deals.map((d) =>
          d._id === updatedDeal._id ? updatedDeal : d
        );
      });
      builder.addCase(thunk.rejected, handleRejected);
    });

    // 📄 DOCUMENT MANAGEMENT (Upload / Fetch / Delete)
    builder.addCase(uploadDocuments.pending, handlePending);
    builder.addCase(uploadDocuments.fulfilled, (state, action) => {
      state.loading = false;
      const uploadedDocs = action.payload?.data || action.payload;
      if (state.deal) {
        if (!state.deal.documents) state.deal.documents = [];
        state.deal.documents.push(...uploadedDocs);
      }
    });
    builder.addCase(uploadDocuments.rejected, handleRejected);

   builder
  .addCase(getDocuments.pending, handlePending)
  .addCase(getDocuments.fulfilled, (state, action) => {
    state.loading = false;

    const documents = action.payload?.data || action.payload || [];

    if (!state.deal) state.deal = {};
    state.deal.documents = documents;

    // Replace existing dealDocument array
    state.dealDocument = documents;

    // Or, if you want to append new documents instead of replacing:
    // state.dealDocument.push(...documents);
  })
  .addCase(getDocuments.rejected, handleRejected);

    builder.addCase(deleteDocument.pending, handlePending);
    builder.addCase(deleteDocument.fulfilled, (state, action) => {
      state.loading = false;
      const { docId } = action.payload;
      if (state.deal?.documents) {
        state.deal.documents = state.deal.documents.filter(
          (d) => d._id !== docId
        );
      }
    });
    builder.addCase(deleteDocument.rejected, handleRejected);
  },
});

export default dealSlice.reducer;
