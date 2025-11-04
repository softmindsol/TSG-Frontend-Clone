import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

const registerAgent = createAsyncThunk(
  "agent/registerAgent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.agent.agentRegister}`, data);

      if (response.status === 201 || response.status === 200) {
        toast.success(
          response?.data?.message || "Agent registered successfully"
        );
      }

      return response?.data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to register agent";

      toast.error(errorMessage);

      return rejectWithValue(errorMessage);
    }
  }
);

const loginAgent = createAsyncThunk(
  "agent/loginAgent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.agent.agentLogin}`, data);

      if (response.status === 200 || response.status === 201) {
        const resData = response.data; // ✅ outer object
        const agentData = resData.data; // ✅ inner 'data' object

        toast.success(resData?.message || "Agent logged in successfully");

        // ✅ Safely extract token + agent info
        const token = agentData?.token;
        const agent = agentData?.agent;

        if (token) {
          localStorage.setItem("agentToken", token);
        }

        if (agent) {
          localStorage.setItem("agentInfo", JSON.stringify(agent));
        }

        // ✅ Return the actual data for Redux state
        return agentData;
      }

      throw new Error("Unexpected response status");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to login agent";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);
const logoutAgent = createAsyncThunk(
  "agent/logoutAgent",
  async (_, { rejectWithValue }) => {
    try {
      // ✅ Clear localStorage token & data
      localStorage.removeItem("agentToken");
      localStorage.removeItem("agentInfo");

      toast.success("Logged out successfully");
      return true;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Logout failed";
      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const getCurrentAgent = createAsyncThunk(
  "agent/getCurrentAgent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${config.agent.currentAgent}`);

      if (response.status === 200) {
        return response.data;
      }

      throw new Error("Failed to fetch current agent");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to fetch current agent";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const changePassword = createAsyncThunk(
  "agent/changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post(`${config.agent.changePassword}`, data);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          response?.data?.message || "Password changed successfully"
        );
        return response.data;
      }

      throw new Error("Failed to change password");
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to change password";

      toast.error(errorMessage);
      return rejectWithValue(errorMessage);
    }
  }
);

const updateProfile = createAsyncThunk(
  "agent/updateProfile",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${config.agent.updateProfile}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(response.data?.message || "Profile updated successfully");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update profile";
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export {
  registerAgent,
  loginAgent,
  logoutAgent,
  getCurrentAgent,
  changePassword,
  updateProfile,
};
