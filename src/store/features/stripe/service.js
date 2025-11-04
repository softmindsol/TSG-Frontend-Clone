import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import api from "../../../utils/api";
import config from "../../../utils/endpoint";

/* -------------------------------------------------------------------------- */
/*                         CREATE CHECKOUT SESSION API                        */
/* -------------------------------------------------------------------------- */
export const createCheckoutSession = createAsyncThunk(
  "subscription/createCheckoutSession",
  async ({ agentId, planType, billingInterval }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(config.checkout.createCheckoutSession, {
        agentId,
        planType,
        billingInterval,
      });

      // Expecting backend to return something like { url: "https://checkout.stripe.com/..." }
      if (data?.data?.url) {
        toast.success("Redirecting to Stripe Checkout...");
        // Wait briefly so toast is visible before redirect
        setTimeout(() => {
          window.location.href = data?.data?.url;
        }, 800);
      } else {
        throw new Error("No checkout URL returned from backend");
      }

      return data;
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Failed to create checkout session";
      toast.error(errMsg);
      return rejectWithValue(errMsg);
    }
  }
);