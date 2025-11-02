import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

export const createEvent = createAsyncThunk(
  "event/createEvent",
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await api.post(config.events.createEvent, eventData);
      toast.success("Event created successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to create event");
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEventRange = createAsyncThunk(
  "event/getEventRange",
  async ({ start, end }, { rejectWithValue }) => {
    try {
      const url = `${config.events.getEventRange}?start=${start}&end=${end}`;
      const response = await api.get(url);
      return response.data; // { statusCode, data: [events], message, success }
    } catch (error) {
      toast.error("Failed to fetch events");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (eventId, { rejectWithValue }) => {
    try {
      const url = `${config.events.deleteEvent}/${eventId}`;
      const response = await api.delete(url);
      toast.success("Event deleted successfully");
      return response.data;
    } catch (error) {
      toast.error("Failed to delete event");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getTodayEvents = createAsyncThunk(
  "event/getTodayEvents",
  async (_, { rejectWithValue }) => {
    try {
      // Build local day's bounds, then convert to UTC ISO (Z) for backend
      const now = new Date();

      const startLocal = new Date(now);
      startLocal.setHours(0, 0, 0, 0);

      const endLocal = new Date(now);
      endLocal.setHours(23, 59, 59, 999);

      const toUTCISO = (d) =>
        new Date(
          Date.UTC(
            d.getFullYear(),
            d.getMonth(),
            d.getDate(),
            d.getHours(),
            d.getMinutes(),
            d.getSeconds(),
            d.getMilliseconds()
          )
        ).toISOString();

      const start = toUTCISO(startLocal);
      const end = toUTCISO(endLocal);

      const url = `${config.events.getEventRange}?start=${start}&end=${end}`;
      const res = await api.get(url); // -> { statusCode, data: [events], ... }
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const markEventCompleted = createAsyncThunk(
  "event/markEventCompleted",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await api.put(`${config.events.updateEvent}/${eventId}`, {
        status: "completed",
      });
      toast.success("Event marked as completed");
      return res.data; // { statusCode, data: <updated event payload>, ... }
    } catch (err) {
      const payload = err.response?.data || { message: "Failed to update event" };
      toast.error(payload.message || "Failed to update event");
      return rejectWithValue(payload);
    }
  }
);

export const revertEventToScheduled = createAsyncThunk(
  "event/revertEventToScheduled",
  async (eventId, { rejectWithValue }) => {
    try {
      const res = await api.put(`${config.events.updateEvent}/${eventId}`, {
        status: "scheduled",
      });
      toast.success("Event moved back to scheduled");
      return res.data;
    } catch (err) {
      const payload = err.response?.data || { message: "Failed to update event" };
      toast.error(payload.message || "Failed to update event");
      return rejectWithValue(payload);
    }
  }
);
