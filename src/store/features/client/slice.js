import { createSlice } from "@reduxjs/toolkit";
import {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getSimpleClients,
  commissionSetting,
  dealStageTracker,
} from "./service";

const initialState = {
  allClients: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  singleClient: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  simpleClients: {
    data: [],
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  createClient: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  updateClient: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  deleteClient: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  commissionSetting: {
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  dealStageTracker: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🟦 Get All Clients
    builder
      .addCase(getAllClients.pending, (state) => {
        state.allClients.isLoading = true;
        state.allClients.isSuccess = false;
        state.allClients.errorMessage = "";
      })
      .addCase(getAllClients.fulfilled, (state, action) => {
        state.allClients.isLoading = false;
        state.allClients.isSuccess = true;
        state.allClients.data = action.payload?.data || []; // adjust if your API returns plain array
      })
      .addCase(getAllClients.rejected, (state, action) => {
        state.allClients.isLoading = false;
        state.allClients.isSuccess = false;
        state.allClients.errorMessage = action.payload;
      });

    // 🟩 Get Client By ID
    builder
      .addCase(getClientById.pending, (state) => {
        state.singleClient.isLoading = true;
        state.singleClient.isSuccess = false;
        state.singleClient.errorMessage = "";
      })
      .addCase(getClientById.fulfilled, (state, action) => {
        state.singleClient.isLoading = false;
        state.singleClient.isSuccess = true;
        state.singleClient.data = action.payload?.data || null;
      })
      .addCase(getClientById.rejected, (state, action) => {
        state.singleClient.isLoading = false;
        state.singleClient.isSuccess = false;
        state.singleClient.errorMessage = action.payload;
      });

    // 🟨 Create Client
    builder
      .addCase(createClient.pending, (state) => {
        state.createClient.isLoading = true;
        state.createClient.isSuccess = false;
        state.createClient.errorMessage = "";
      })
      .addCase(createClient.fulfilled, (state) => {
        state.createClient.isLoading = false;
        state.createClient.isSuccess = true;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.createClient.isLoading = false;
        state.createClient.isSuccess = false;
        state.createClient.errorMessage = action.payload;
      });

    // 🟧 Update Client
    builder
      .addCase(updateClient.pending, (state) => {
        state.updateClient.isLoading = true;
        state.updateClient.isSuccess = false;
        state.updateClient.errorMessage = "";
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.updateClient.isLoading = false;
        state.updateClient.isSuccess = true;

        const updated = action.payload; // ✅ correct level
        if (updated?._id) {
          // ✅ update the client in allClients list
          state.allClients.data = state.allClients.data.map((client) =>
            client._id === updated._id ? updated : client
          );
        }

        // Also update singleClient if it's the same
        if (state.singleClient.data?._id === updated?._id) {
          state.singleClient.data = updated;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.updateClient.isLoading = false;
        state.updateClient.isSuccess = false;
        state.updateClient.errorMessage = action.payload;
      });
    // 🟥 Delete Client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.deleteClient.isLoading = true;
        state.deleteClient.isSuccess = false;
        state.deleteClient.errorMessage = "";
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.deleteClient.isLoading = false;
        state.deleteClient.isSuccess = true;

        const deletedId = action.payload.clientId;

        // Remove client from list
        state.allClients.data = state.allClients.data.filter(
          (client) => client._id !== deletedId
        );

        // Clear single client if same
        if (state.singleClient.data?._id === deletedId) {
          state.singleClient.data = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.deleteClient.isLoading = false;
        state.deleteClient.isSuccess = false;
        state.deleteClient.errorMessage = action.payload;
      });
    // 🟦 Get Simple Clients
    builder
      .addCase(getSimpleClients.pending, (state) => {
        state.simpleClients.isLoading = true;
        state.simpleClients.isSuccess = false;
        state.simpleClients.errorMessage = "";
      })
      .addCase(getSimpleClients.fulfilled, (state, action) => {
        state.simpleClients.isLoading = false;
        state.simpleClients.isSuccess = true;
        state.simpleClients.data = action.payload?.data || [];
      })
      .addCase(getSimpleClients.rejected, (state, action) => {
        state.simpleClients.isLoading = false;
        state.simpleClients.isSuccess = false;
        state.simpleClients.errorMessage = action.payload;
      });
    // 🟪 Commission Setting (Upsert)
    builder
      .addCase(commissionSetting.pending, (state) => {
        state.commissionSetting.isLoading = true;
        state.commissionSetting.isSuccess = false;
        state.commissionSetting.errorMessage = "";
      })
      .addCase(commissionSetting.fulfilled, (state, action) => {
        state.commissionSetting.isLoading = false;
        state.commissionSetting.isSuccess = true;

        const updatedClient = action.payload?.data || action.payload;

        // ✅ If backend returns updated client data, reflect in state
        if (updatedClient?._id) {
          // Update inside allClients
          state.allClients.data = state.allClients.data.map((client) =>
            client._id === updatedClient._id ? updatedClient : client
          );

          // Update singleClient if it’s the same one
          if (state.singleClient.data?._id === updatedClient._id) {
            state.singleClient.data = updatedClient;
          }
        }
      })
      .addCase(commissionSetting.rejected, (state, action) => {
        state.commissionSetting.isLoading = false;
        state.commissionSetting.isSuccess = false;
        state.commissionSetting.errorMessage = action.payload;
      });
    // 🟪 Deal Stage Tracker
    builder
      .addCase(dealStageTracker.pending, (state) => {
        state.dealStageTracker.isLoading = true;
        state.dealStageTracker.isSuccess = false;
        state.dealStageTracker.errorMessage = "";
      })
      .addCase(dealStageTracker.fulfilled, (state, action) => {
        state.dealStageTracker.isLoading = false;
        state.dealStageTracker.isSuccess = true;
        state.dealStageTracker.data = action.payload?.data || action.payload;
      })
      .addCase(dealStageTracker.rejected, (state, action) => {
        state.dealStageTracker.isLoading = false;
        state.dealStageTracker.isSuccess = false;
        state.dealStageTracker.errorMessage = action.payload;
      });
  },
});

export default clientSlice.reducer;
