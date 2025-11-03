import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

/* -------------------------------------------------------------------------- */
/*                               ASYNC THUNKS                                 */
/* -------------------------------------------------------------------------- */

// 🟢 Start a new chat session
export const startSession = createAsyncThunk(
  "aiAssistant/startSession",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(config.aiAssistant.startChatSession, payload);
      // ✅ The backend returns data directly inside res.data.data
      console.log("🚀 startSession response:", res.data);
      return res.data.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to start chat session"
      );
      return rejectWithValue(error.response?.data);
    }
  }
);


// 🟢 Send message to AI
export const sendMessage = createAsyncThunk(
  "aiAssistant/sendMessage",
  async ({ sessionId, clientId, message }, { rejectWithValue }) => {
    try {
      const res = await api.post(config.aiAssistant.messageAI, {
        sessionId,
        clientId,
        message,
      });
      console.log("🚀 sendMessage response:", res.data);
      return { ...res.data.data, userMessage: message };
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message");
      return rejectWithValue(error.response?.data);
    }
  }
);


// 🟢 Get all previous sessions
export const getChatHistory = createAsyncThunk(
  "aiAssistant/getChatHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(config.aiAssistant.getChatHistory);
      console.log("🚀 ~ res:", res)
      return res.data.data || [];
    } catch (error) {
      toast.error("Failed to load chat history");
      return rejectWithValue(error.response?.data);
    }
  }
);

// 🟢 Get a single session by ID
export const getChatById = createAsyncThunk(
  "aiAssistant/getChatById",
  async (sessionId, { rejectWithValue }) => {
    try {
      const res = await api.get(`${config.aiAssistant.getChatHistory}/${sessionId}`);
      const data = res.data?.data; // this is your array
     
     
      return {
      
       sessionId,
       messages: Array.isArray(data?.messages) ? data.messages : [],
      };
    } catch (error) {
      toast.error("Failed to load chat");
      return rejectWithValue(error.response?.data);
    }
  }
);


// 🔴 Delete a session
export const deleteSession = createAsyncThunk(
  "aiAssistant/deleteSession",
  async (sessionId, { rejectWithValue }) => {
    try {
      await api.delete(`ai/${sessionId}`);
      toast.success("Chat deleted");
      return sessionId;
    } catch (error) {
      toast.error("Failed to delete chat");
      return rejectWithValue(error.response?.data);
    }
  }
);