import { createSlice } from "@reduxjs/toolkit";
import {
  createExtraContact,
  getExtraContacts,
  editExtraContact,
  deleteExtraContact,
} from "./service";

const initialState = {
  createExtraContact: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  getExtraContacts: {
    isLoading: false,
    isSuccess: false,
    data: [],
    errorMessage: "",
  },
  editExtraContact: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  deleteExtraContact: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

const extraContactSlice = createSlice({
  name: "extraContact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- GET EXTRA CONTACTS ---
    builder
      .addCase(getExtraContacts.pending, (state) => {
        state.getExtraContacts.isLoading = true;
      })
      .addCase(getExtraContacts.fulfilled, (state, action) => {
        state.getExtraContacts.isLoading = false;
        state.getExtraContacts.isSuccess = true;
        state.getExtraContacts.data = action.payload?.data || [];
      })
      .addCase(getExtraContacts.rejected, (state, action) => {
        state.getExtraContacts.isLoading = false;
        state.getExtraContacts.errorMessage = action.payload;
      });

    // --- CREATE EXTRA CONTACT ---
    builder
      .addCase(createExtraContact.pending, (state) => {
        state.createExtraContact.isLoading = true;
        state.createExtraContact.isSuccess = false;
        state.createExtraContact.errorMessage = "";
      })
      .addCase(createExtraContact.fulfilled, (state, action) => {
        state.createExtraContact.isLoading = false;
        state.createExtraContact.isSuccess = true;
        // Add new contact to list
        if (action.payload?.data) {
          state.getExtraContacts.data.push(action.payload.data);
        }
      })
      .addCase(createExtraContact.rejected, (state, action) => {
        state.createExtraContact.isLoading = false;
        state.createExtraContact.isSuccess = false;
        state.createExtraContact.errorMessage = action.payload;
      });

    // --- EDIT EXTRA CONTACT ---
    builder
      .addCase(editExtraContact.pending, (state) => {
        state.editExtraContact.isLoading = true;
        state.editExtraContact.isSuccess = false;
        state.editExtraContact.errorMessage = "";
      })
      .addCase(editExtraContact.fulfilled, (state, action) => {
        state.editExtraContact.isLoading = false;
        state.editExtraContact.isSuccess = true;

        // Update contact in list
        const updated = action.payload?.data;
        if (updated?._id) {
          state.getExtraContacts.data = state.getExtraContacts.data.map(
            (item) => (item._id === updated._id ? updated : item)
          );
        }
      })
      .addCase(editExtraContact.rejected, (state, action) => {
        state.editExtraContact.isLoading = false;
        state.editExtraContact.isSuccess = false;
        state.editExtraContact.errorMessage = action.payload;
      });

    // --- DELETE EXTRA CONTACT ---
    builder
      .addCase(deleteExtraContact.pending, (state) => {
        state.deleteExtraContact.isLoading = true;
        state.deleteExtraContact.isSuccess = false;
        state.deleteExtraContact.errorMessage = "";
      })
      .addCase(deleteExtraContact.fulfilled, (state, action) => {
        state.deleteExtraContact.isLoading = false;
        state.deleteExtraContact.isSuccess = true;

        const deletedId = action.payload?.contactId;
        if (deletedId) {
          state.getExtraContacts.data = state.getExtraContacts.data.filter(
            (item) => item._id !== deletedId
          );
        }
      })
      .addCase(deleteExtraContact.rejected, (state, action) => {
        state.deleteExtraContact.isLoading = false;
        state.deleteExtraContact.isSuccess = false;
        state.deleteExtraContact.errorMessage = action.payload;
      });
  },
});

export default extraContactSlice.reducer;
