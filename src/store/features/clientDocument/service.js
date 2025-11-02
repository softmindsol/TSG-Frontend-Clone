import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";
import { toast } from "sonner";

export const uploadClientDocument = createAsyncThunk(
  "clients/uploadClientDocument",
  async ({ clientId, formData }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${config.clientDocument.uploadDocument}/${clientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to upload document"
      );
    }
  }
);



// ✅ DELETE DOCUMENT
export const deleteClientDocument = createAsyncThunk(
  "clients/deleteClientDocument",
  async ({ clientId, publicId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(
        `${config.clientDocument.deleteDocument}/${clientId}/${publicId}`
      );

      toast.success("Document deleted successfully!");
      return { publicId, ...response?.data };
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Failed to delete document";

      toast.error(message);
      return rejectWithValue(message);
    }
  }
);
