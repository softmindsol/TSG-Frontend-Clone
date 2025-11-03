import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSession,
  getChatById,
  getChatHistory,
  sendMessage,
  startSession,
} from "./service";

const aiAssistantSlice = createSlice({
  name: "aiAssistant",
  initialState: {
    loading: false,
    sessions: [],
    activeSession: null,
    messages: [],
    aiTyping: false,
  },
  reducers: {
    clearChat: (state) => {
      state.activeSession = null;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Start session
      .addCase(startSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(startSession.fulfilled, (state, action) => {
        console.log("✅ startSession.fulfilled:", action.payload);
        state.loading = false;
        state.activeSession = action.payload; // backend returns the session object
        state.messages = action.payload?.messages || [];
      })
      .addCase(startSession.rejected, (state) => {
        state.loading = false;
      })

      // Send message
     .addCase(sendMessage.pending, (state) => {
        state.aiTyping = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.aiTyping = false;

        // push both user message + AI reply to messages
        const { userMessage, reply } = action.payload;

        state.messages.push({
          role: "user",
          content: userMessage,
        });

        state.messages.push({
          role: "assistant",
          content: reply,
        });
      })
      .addCase(sendMessage.rejected, (state) => {
        state.aiTyping = false;
      })

      // Get chat history
      .addCase(getChatHistory.fulfilled, (state, action) => {
        state.sessions = action.payload;
      })

      // Get chat by ID
      .addCase(getChatById.fulfilled, (state, action) => {
        console.log("✅ getChatById.fulfilled:", action.payload);
        state.activeSession = action.payload.sessionId;
        state.messages = action.payload.messages || [];
      })

      // Delete chat
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.sessions = state.sessions.filter(
          (chat) => chat._id !== action.payload
        );
        if (state.activeSession?._id === action.payload) {
          state.activeSession = null;
          state.messages = [];
        }
      });
  },
});

export const { clearChat } = aiAssistantSlice.actions;
export default aiAssistantSlice.reducer;
