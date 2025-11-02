import { createSlice } from "@reduxjs/toolkit";
import { createCheckoutSession } from "./service";
import { toast } from "sonner";

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState: {
    isLoading: false,
    checkoutUrl: null,
  },
  reducers: {
    clearCheckoutUrl: (state) => {
      state.checkoutUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCheckoutSession.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCheckoutSession.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkoutUrl = action.payload?.data?.url;
        toast.success("Checkout session created!");
      })
      .addCase(createCheckoutSession.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearCheckoutUrl } = subscriptionSlice.actions;
export default subscriptionSlice.reducer;