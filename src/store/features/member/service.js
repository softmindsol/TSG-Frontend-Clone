// src/store/team/team.slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

/* ===================== THUNKS ===================== */

// GET: /member/get-all-member  → returns an array (no pagination)
export const fetchTeamMembers = createAsyncThunk(
  "team/fetchTeamMembers",
  async ({ agentId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`${config.team.getTeamMembers}/${agentId}`);

      // ✅ Safely extract array
      const data =
        res?.data?.teamMembers || res?.data?.data?.teamMembers || [];

      if (!Array.isArray(data)) {
        return rejectWithValue("Invalid response: expected an array");
      }

      return data; // ✅ This will now be an array
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.error || "Failed to fetch team members"
      );
    }
  }
);



// POST: /member/add-member  → body exactly as you shared
export const addTeamMember = createAsyncThunk(
  "team/addTeamMember",
  async ({ agentId, newSubAgent }, { rejectWithValue }) => {
    try {
      const payload = {
        agentId,
        newSubAgent, // { firstName, lastName, email, ... } (your exact shape)
      };
      const res = await api.post(config.team.addTeamMember, payload);
      // Typical BE response: { success, message, teamMemberId, ... }
      return res?.data;
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Failed to add team member");
    }
  }
);

// DELETE: /member/delete-member
// Adjust to your server contract if it uses URL param instead of body.
export const deleteTeamMember = createAsyncThunk(
  "team/deleteTeamMember",
  async ({ agentId, memberId }, { rejectWithValue }) => {
    try {
      const res = await api.delete(config.team.deleteTeamMember, {
        data: { agentId, memberId },
      });
      return { memberId, server: res?.data };
    } catch (err) {
      return rejectWithValue(err?.response?.data?.error || "Failed to delete team member");
    }
  }
);

