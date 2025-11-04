import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

export const generateAMLReport = createAsyncThunk(
  "amlCompliance/generateAMLReport",
  async ({ clientId, reportType, additionalNotes }, { rejectWithValue }) => {
    try {
     
      if (!clientId || !reportType) {
        throw new Error("Client ID and report type are required");
      }

      const url = `${config.report.generateAMLReport}/${clientId}/${reportType}`;
      const payload = {
        additionalNotes: additionalNotes || "",  
      };

      const response = await api.post(url, payload);
      console.log("Response data: ", response?.data);  
      toast.success(`"${reportType}" report generated successfully!`);
      return response?.data?.data || response?.data;
    } catch (error) {
      console.error("Error while generating report: ", error);  
      const errorMsg =
        error?.response?.data?.message ||
        "Failed to generate AML report. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);
