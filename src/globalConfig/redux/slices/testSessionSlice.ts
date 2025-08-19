import { testSession } from "@/modules/auth/services/testSession";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  testData: string | null;
  testStatus: string;
}

const initialState: InitialState = {
  testData: null,
  testStatus: "idle",
};

// Middleware
export const fetchTestSession = createAsyncThunk(
  "testsession/fetch",
  async () => {
    return testSession();
  }
);

// Slice
export const testSessionSlice = createSlice({
  name: "testsesssionSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Tiene que ver con el middleware
    builder
      .addCase(fetchTestSession.pending, (state) => {
        state.testStatus = "loading";
        state.testData = null;
      })
      .addCase(fetchTestSession.fulfilled, (state, action) => {
        state.testStatus = "succeeded";
        state.testData = action.payload;
      })
      .addCase(fetchTestSession.rejected, (state) => {
        state.testStatus = "failed";
        state.testData = null;
      });
  },
});

export default testSessionSlice.reducer;
