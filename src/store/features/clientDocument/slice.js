import { createSlice } from "@reduxjs/toolkit";
import { deleteClientDocument, uploadClientDocument } from "./service";

const initialState = {
  documents: [],
  loading: false,
  error: null,
};

const clientDocumentSlice = createSlice({
  name: "clientDocument",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    // 📌 UPLOAD
    builder.addCase(uploadClientDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(uploadClientDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.documents.push(action.payload);
    });
    builder.addCase(uploadClientDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // 📌 DELETE
    builder.addCase(deleteClientDocument.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteClientDocument.fulfilled, (state, action) => {
      state.loading = false;
      state.documents = state.documents.filter(
        (doc) => doc.publicId !== action.payload.publicId
      );
    });
    builder.addCase(deleteClientDocument.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default clientDocumentSlice.reducer;
