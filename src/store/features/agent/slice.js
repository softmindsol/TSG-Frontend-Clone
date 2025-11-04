import { createSlice } from "@reduxjs/toolkit";
import {
  loginAgent,
  logoutAgent,
  registerAgent,
  getCurrentAgent,
  changePassword,
  getTeam,
} from "./service"; // 👈 thunk import

// 🧩 Initial State
const initialState = {
  AgentRegister: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  AgentLogin: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  CurrentAgent: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  ChangePassword: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
  Team: {
    data: null,
    isLoading: false,
    isSuccess: false,
    errorMessage: "",
  },
};

// 🧠 Slice Definition
export const agentSlice = createSlice({
  name: "agent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Register

    builder
      .addCase(registerAgent.pending, (state) => {
        state.AgentRegister.isLoading = true;
        state.AgentRegister.isSuccess = false;
        state.AgentRegister.errorMessage = "";
      })

      .addCase(registerAgent.fulfilled, (state, action) => {
        state.AgentRegister.isLoading = false;
        state.AgentRegister.isSuccess = true;
        state.AgentRegister.data = action.payload;
      })

      .addCase(registerAgent.rejected, (state, action) => {
        state.AgentRegister.isLoading = false;
        state.AgentRegister.isSuccess = false;
        state.AgentRegister.errorMessage = action.payload;
      })

      //   Login

      .addCase(loginAgent.pending, (state) => {
        state.AgentLogin.isLoading = true;
        state.AgentLogin.isSuccess = false;
        state.AgentLogin.errorMessage = "";
      })

      .addCase(loginAgent.fulfilled, (state, action) => {
        state.AgentLogin.isLoading = false;
        state.AgentLogin.isSuccess = true;
        state.AgentLogin.data = action.payload;
      })

      .addCase(loginAgent.rejected, (state, action) => {
        state.AgentLogin.isLoading = false;
        state.AgentLogin.isSuccess = false;
        state.AgentLogin.errorMessage = action.payload;
      })

      // Get Current Agent
      .addCase(getCurrentAgent.pending, (state) => {
        state.CurrentAgent.isLoading = true;
        state.CurrentAgent.isSuccess = false;
        state.CurrentAgent.errorMessage = "";
      })

      .addCase(getCurrentAgent.fulfilled, (state, action) => {
        state.CurrentAgent.isLoading = false;
        state.CurrentAgent.isSuccess = true;
        state.CurrentAgent.data = action.payload;
      })

      .addCase(getCurrentAgent.rejected, (state, action) => {
        state.CurrentAgent.isLoading = false;
        state.CurrentAgent.isSuccess = false;
        state.CurrentAgent.errorMessage = action.payload;
      });

    builder.addCase(logoutAgent.fulfilled, (state) => {
      // Reset entire agent state
      state.AgentLogin = {
        data: null,
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
      };
      state.AgentRegister = {
        data: null,
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
      };
      state.CurrentAgent = {
        data: null,
        isLoading: false,
        isSuccess: false,
        errorMessage: "",
      };
    });

    // Change Password
    builder
      .addCase(changePassword.pending, (state) => {
        state.ChangePassword.isLoading = true;
        state.ChangePassword.isSuccess = false;
        state.ChangePassword.errorMessage = "";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.ChangePassword.isLoading = false;
        state.ChangePassword.isSuccess = true;
        state.ChangePassword.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.ChangePassword.isLoading = false;
        state.ChangePassword.isSuccess = false;
        state.ChangePassword.errorMessage = action.payload;
      })

      // Get Team
      .addCase(getTeam.pending, (state) => {
        state.Team.isLoading = true;
        state.Team.isSuccess = false;
        state.Team.errorMessage = "";
      })
      .addCase(getTeam.fulfilled, (state, action) => {
        
        state.Team.isLoading = false;
        state.Team.isSuccess = true;
        state.Team.data = action.payload;
      })
      .addCase(getTeam.rejected, (state, action) => {
        state.Team.isLoading = false;
        state.Team.isSuccess = false;
        state.Team.errorMessage = action.payload;
      });
  },
});

export default agentSlice.reducer;
