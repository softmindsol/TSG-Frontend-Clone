import { createSlice } from "@reduxjs/toolkit";
import {
  getAllTemplates,
  getTemplateById,
  fillTemplateData,
  getDocumentReports,
  deleteReport,
  deleteDocumentFromDocument,
  uploadDocumentFromDocument,
} from "./service";

const initialState = {
  templates: {
    getAllTemplates: {
      isLoading: false,
      isSuccess: false,
      data: [],
      errorMessage: "",
    },
    getTemplateById: {
      isLoading: false,
      isSuccess: false,
      data: null,
      errorMessage: "",
    },
    fillTemplateData: {
      isLoading: false,
      isSuccess: false,
      data: null,
      errorMessage: "",
    },
  },

  // ✅ Added reports section
  reports: {
    getDocumentReports: {
      isLoading: false,
      isSuccess: false,
      data: [],
      errorMessage: "",
    },
    deleteReport: {
      isLoading: false,
      isSuccess: false,
      data: null,
      errorMessage: "",
    },
  },
  clientUploads: {
    uploadDocument: {
      isLoading: false,
      isSuccess: false,
      data: null,
      errorMessage: "",
    },
    deleteDocument: {
      isLoading: false,
      isSuccess: false,
      data: null,
      errorMessage: "",
    }, // ✅ added
  },

  // reserved space for future
  contracts: {},
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // --- GET ALL TEMPLATES ---
    builder
      .addCase(getAllTemplates.pending, (state) => {
        state.templates.getAllTemplates.isLoading = true;
        state.templates.getAllTemplates.errorMessage = "";
      })
      .addCase(getAllTemplates.fulfilled, (state, action) => {
        state.templates.getAllTemplates.isLoading = false;
        state.templates.getAllTemplates.isSuccess = true;
        state.templates.getAllTemplates.data = action.payload?.data || [];
      })
      .addCase(getAllTemplates.rejected, (state, action) => {
        state.templates.getAllTemplates.isLoading = false;
        state.templates.getAllTemplates.isSuccess = false;
        state.templates.getAllTemplates.errorMessage = action.payload;
      });

    // --- GET TEMPLATE BY ID ---
    builder
      .addCase(getTemplateById.pending, (state) => {
        state.templates.getTemplateById.isLoading = true;
        state.templates.getTemplateById.errorMessage = "";
      })
      .addCase(getTemplateById.fulfilled, (state, action) => {
        state.templates.getTemplateById.isLoading = false;
        state.templates.getTemplateById.isSuccess = true;
        state.templates.getTemplateById.data = action.payload?.data || null;
      })
      .addCase(getTemplateById.rejected, (state, action) => {
        state.templates.getTemplateById.isLoading = false;
        state.templates.getTemplateById.isSuccess = false;
        state.templates.getTemplateById.errorMessage = action.payload;
      });

    // --- FILL TEMPLATE DATA ---
    builder
      .addCase(fillTemplateData.pending, (state) => {
        state.templates.fillTemplateData.isLoading = true;
        state.templates.fillTemplateData.errorMessage = "";
      })
      .addCase(fillTemplateData.fulfilled, (state, action) => {
        state.templates.fillTemplateData.isLoading = false;
        state.templates.fillTemplateData.isSuccess = true;
        state.templates.fillTemplateData.data = action.payload?.data || null;
      })
      .addCase(fillTemplateData.rejected, (state, action) => {
        state.templates.fillTemplateData.isLoading = false;
        state.templates.fillTemplateData.isSuccess = false;
        state.templates.fillTemplateData.errorMessage = action.payload;
      });

    // --- ✅ GET DOCUMENT REPORTS ---
    builder
      .addCase(getDocumentReports.pending, (state) => {
        state.reports.getDocumentReports.isLoading = true;
        state.reports.getDocumentReports.errorMessage = "";
      })
      .addCase(getDocumentReports.fulfilled, (state, action) => {
        state.reports.getDocumentReports.isLoading = false;
        state.reports.getDocumentReports.isSuccess = true;
        state.reports.getDocumentReports.data = action.payload?.data || [];
      })
      .addCase(getDocumentReports.rejected, (state, action) => {
        state.reports.getDocumentReports.isLoading = false;
        state.reports.getDocumentReports.isSuccess = false;
        state.reports.getDocumentReports.errorMessage = action.payload;
      });
    // --- DELETE REPORT ---
    builder
      .addCase(deleteReport.pending, (state) => {
        state.reports.deleteReport.isLoading = true;
        state.reports.deleteReport.errorMessage = "";
      })
      .addCase(deleteReport.fulfilled, (state, action) => {
        state.reports.deleteReport.isLoading = false;
        state.reports.deleteReport.isSuccess = true;
        state.reports.deleteReport.data = action.payload?.data || null;

        // 🧹 Remove deleted report from list
        const deletedId = action.payload?.id;
        state.reports.getDocumentReports.data =
          state.reports.getDocumentReports.data?.filter(
            (r) => r._id !== deletedId
          );
      })
      .addCase(deleteReport.rejected, (state, action) => {
        state.reports.deleteReport.isLoading = false;
        state.reports.deleteReport.isSuccess = false;
        state.reports.deleteReport.errorMessage = action.payload;
      });

    // --- DELETE DOCUMENT FROM DOCUMENTS ---
    builder
      .addCase(deleteDocumentFromDocument.pending, (state) => {
        state.clientUploads.deleteDocument.isLoading = true;
        state.clientUploads.deleteDocument.errorMessage = "";
      })
      .addCase(deleteDocumentFromDocument.fulfilled, (state, action) => {
        state.clientUploads.deleteDocument.isLoading = false;
        state.clientUploads.deleteDocument.isSuccess = true;
        state.clientUploads.deleteDocument.data = action.payload?.data || null;

        const deletedId = action.payload?.id;
        if (deletedId && Array.isArray(state.clientUploads.data)) {
          state.clientUploads.data = state.clientUploads.data.filter(
            (doc) => doc._id !== deletedId
          );
        }
      })
      .addCase(deleteDocumentFromDocument.rejected, (state, action) => {
        state.clientUploads.deleteDocument.isLoading = false;
        state.clientUploads.deleteDocument.isSuccess = false;
        state.clientUploads.deleteDocument.errorMessage = action.payload;
      });
    // --- UPLOAD DOCUMENT FROM DOCUMENTS ---
    builder
      .addCase(uploadDocumentFromDocument.pending, (state) => {
        state.clientUploads.uploadDocument.isLoading = true;
        state.clientUploads.uploadDocument.errorMessage = "";
      })
      .addCase(uploadDocumentFromDocument.fulfilled, (state, action) => {
        state.clientUploads.uploadDocument.isLoading = false;
        state.clientUploads.uploadDocument.isSuccess = true;
        state.clientUploads.uploadDocument.data = action.payload?.data || null;

        // Optionally push the new document into list if you store them in Redux
        if (
          state.clientUploads.data &&
          Array.isArray(state.clientUploads.data)
        ) {
          state.clientUploads.data.push(action.payload?.data);
        }
      })
      .addCase(uploadDocumentFromDocument.rejected, (state, action) => {
        state.clientUploads.uploadDocument.isLoading = false;
        state.clientUploads.uploadDocument.isSuccess = false;
        state.clientUploads.uploadDocument.errorMessage = action.payload;
      });
  },
});

export default documentsSlice.reducer;
