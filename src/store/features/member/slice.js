/* ===================== SLICE ===================== */

import { createSlice } from "@reduxjs/toolkit";
import { addTeamMember, deleteTeamMember, fetchTeamMembers } from "./service";
import { toast } from "sonner";

const initialState = {
  items: [],           // plain array of members
  isLoading: false,
  isAdding: false,
  deletingIds: [],     // for row-level spinner
  error: null,
};

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    resetTeamState: () => initialState,
  },
  extraReducers: (builder) => {
    // ---- fetchTeamMembers ----
    builder.addCase(fetchTeamMembers.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchTeamMembers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload || [];
    });
    builder.addCase(fetchTeamMembers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to fetch team members";
      toast.error(state.error);
    });

    // ---- addTeamMember ----
    builder.addCase(addTeamMember.pending, (state) => {
      state.isAdding = true;
      state.error = null;
    });
    builder.addCase(addTeamMember.fulfilled, (state, action) => {
      state.isAdding = false;
      const server = action.payload;

      // If BE returns the created member object, push it; if not, UI can refetch.
      const created =
        server?.member || server?.data?.member || null;
      if (created) state.items.unshift(created);

      toast.success(server?.message || "Team member added & invite sent.");
    });
    builder.addCase(addTeamMember.rejected, (state, action) => {
      state.isAdding = false;
      state.error = action.payload || "Failed to add team member";
      toast.error(state.error);
    });

    // ---- deleteTeamMember ----
    builder.addCase(deleteTeamMember.pending, (state, action) => {
      const { memberId } = action.meta?.arg || {};
      if (memberId && !state.deletingIds.includes(memberId)) {
        state.deletingIds.push(memberId);
      }
      state.error = null;
    });
    builder.addCase(deleteTeamMember.fulfilled, (state, action) => {
      const { memberId } = action.payload || {};
      if (memberId) {
        state.items = state.items.filter((m) => m._id !== memberId);
        state.deletingIds = state.deletingIds.filter((id) => id !== memberId);
      }
      toast.success("Team member deleted");
    });
    builder.addCase(deleteTeamMember.rejected, (state, action) => {
      const { memberId } = action.meta?.arg || {};
      state.deletingIds = state.deletingIds.filter((id) => id !== memberId);
      state.error = action.payload || "Failed to delete team member";
      toast.error(state.error);
    });
  },
});

export const { resetTeamState } = teamSlice.actions;

/* ===================== SELECTORS ===================== */
export const selectTeamMembers = (state) => state.team.items;
export const selectTeamIsLoading = (state) => state.team.isLoading;
export const selectTeamIsAdding = (state) => state.team.isAdding;
export const selectTeamDeletingIds = (state) => state.team.deletingIds;
export const selectTeamError = (state) => state.team.error;

export default teamSlice.reducer;
