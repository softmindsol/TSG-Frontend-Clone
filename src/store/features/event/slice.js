// src/store/slices/eventSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createEvent,
  getEventRange,
  deleteEvent,
  getTodayEvents,
  markEventCompleted,
  revertEventToScheduled,
} from "./service";

const initialState = {
  items: [], // all fetched events
  isLoading: false, // for getEventRange
  isCreating: false, // for createEvent
  isDeleting: false, // for deleteEvent
  error: null,
  lastCreated: null,
  today: [],
  isLoadingToday: false, // for today
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearEventError(state) {
      state.error = null;
    },
    resetCreateState(state) {
      state.isCreating = false;
      state.error = null;
      state.lastCreated = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ CREATE EVENT
      .addCase(createEvent.pending, (state) => {
        state.isCreating = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isCreating = false;
        const created = action.payload?.data?.event;
        if (created) {
          state.lastCreated = created;
          state.items.unshift(created); // prepend new event
        }
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload?.message || "Failed to create event";
      })

      // ✅ GET EVENT RANGE
      .addCase(getEventRange.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEventRange.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload?.data || [];
      })
      .addCase(getEventRange.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch events";
      })

      // ✅ DELETE EVENT
      .addCase(deleteEvent.pending, (state) => {
        state.isDeleting = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isDeleting = false;
        const deletedId = action.meta.arg; // eventId passed to thunk
        state.items = state.items.filter((item) => item._id !== deletedId);
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isDeleting = false;
        state.error = action.payload?.message || "Failed to delete event";
      })

      .addCase(getTodayEvents.pending, (s) => {
        s.isLoadingToday = true;
        s.error = null;
      })
      .addCase(getTodayEvents.fulfilled, (s, a) => {
        s.isLoadingToday = false;
        // sort by start ascending (nice for dashboard)
        const list = (a.payload?.data || [])
          .slice()
          .sort((x, y) => new Date(x.start) - new Date(y.start));
        s.today = list;
      })
      .addCase(getTodayEvents.rejected, (s, a) => {
        s.isLoadingToday = false;
        s.error = a.payload?.message || "Failed to fetch today's events";
      })

      .addCase(markEventCompleted.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(markEventCompleted.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updated = action.payload?.data?.event || action.payload?.data; // 👈 accept both
        if (!updated?._id) return;

        state.items = state.items.map((e) =>
          e._id === updated._id ? { ...e, status: updated.status } : e
        );
        state.today = state.today.map((e) =>
          e._id === updated._id ? { ...e, status: updated.status } : e
        );
      })

      .addCase(markEventCompleted.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          action.payload?.message || "Failed to mark event as completed";
      })
      .addCase(revertEventToScheduled.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(revertEventToScheduled.fulfilled, (state, action) => {
        state.isUpdating = false;
        const updated = action.payload?.data?.event || action.payload?.data; // 👈 accept both
        if (!updated?._id) return;

        state.items = state.items.map((e) =>
          e._id === updated._id ? { ...e, status: updated.status } : e
        );
        state.today = state.today.map((e) =>
          e._id === updated._id ? { ...e, status: updated.status } : e
        );
      })
      .addCase(revertEventToScheduled.rejected, (state, action) => {
        state.isUpdating = false;
        state.error =
          action.payload?.message || "Failed to revert event status";
      });
  },
});

export const { clearEventError, resetCreateState } = eventSlice.actions;

// ✅ Selectors
export const selectEvents = (state) => state.event.items;
export const selectTodayEvents = (state) => state.event.today;
export const selectIsLoadingEvents = (state) => state.event.isLoading;
export const selectIsLoadingToday = (state) => state.event.isLoadingToday;
export const selectIsCreatingEvent = (state) => state.event.isCreating;
export const selectIsDeletingEvent = (state) => state.event.isDeleting;
export const selectIsUpdatingEvent = (state) => state.event.isUpdating;
export const selectEventError = (state) => state.event.error;

export default eventSlice.reducer;
