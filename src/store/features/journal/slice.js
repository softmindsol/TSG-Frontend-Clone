import { createSlice } from "@reduxjs/toolkit";
import { createJournal, getJournals } from "./service";

const initialState = {
  //   allClients: {
  //     data: [],
  //     isLoading: false,
  //     isSuccess: false,
  //     errorMessage: "",
  //   },
  //   singleClient: {
  //     data: null,
  //     isLoading: false,
  //     isSuccess: false,
  //     errorMessage: "",
  //   },
  // --- ADD STATE FOR CREATE CLIENT ---
  createJournal: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  getJournals: {
    isLoading: false,
    isSuccess: false,
    data: [],
    errorMessage: "",
  },
};

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- GET JOURNALS ---
    builder
      .addCase(getJournals.pending, (state) => {
        state.getJournals.isLoading = true;
      })
      .addCase(getJournals.fulfilled, (state, action) => {
        state.getJournals.isLoading = false;
        state.getJournals.isSuccess = true;
        state.getJournals.data = action.payload?.data || []; // depends on your backend response
      })
      .addCase(getJournals.rejected, (state, action) => {
        state.getJournals.isLoading = false;
        state.getJournals.errorMessage = action.payload;
      });

    // Get single client by ID
    // builder
    //   .addCase(getClientById.pending, (state) => {
    //     state.singleClient.isLoading = true;
    //   })
    //   .addCase(getClientById.fulfilled, (state, action) => {
    //     state.singleClient.isLoading = false;
    //     state.singleClient.isSuccess = true;
    //     state.singleClient.data = action.payload?.data || null;
    //   })
    //   .addCase(getClientById.rejected, (state, action) => {
    //     state.singleClient.isLoading = false;
    //     state.singleClient.isSuccess = false;
    //     state.singleClient.errorMessage = action.payload;
    //   });

    // --- ADD CASES FOR CREATE CLIENT ---
    builder
      .addCase(createJournal.pending, (state) => {
        state.createJournal.isLoading = true;
        state.createJournal.isSuccess = false;
        state.createJournal.errorMessage = "";
      })
      .addCase(createJournal.fulfilled, (state, action) => {
        state.createJournal.isLoading = false;
        state.createJournal.isSuccess = true;
        // Optionally, you might want to add the newly created client to allClients.data
        // state.allClients.data.push(action.payload.data);
      })
      .addCase(createJournal.rejected, (state, action) => {
        state.createJournal.isLoading = false;
        state.createJournal.isSuccess = false;
        state.createJournal.errorMessage = action.payload;
      });
  },
});

export default journalSlice.reducer;
