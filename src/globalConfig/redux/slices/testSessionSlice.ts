import { testSession } from "@/modules/auth/services/testSession";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface dataRetrieved {
  texto: string;
}

interface InitialState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  testSessionData: dataRetrieved | null;
  testSessionStatus: string;
}

const initialState: InitialState = {
  testSessionData: null,
  testSessionStatus: "idle",
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
        state.testSessionStatus = "loading";
        state.testSessionData = null;
      })
      .addCase(fetchTestSession.fulfilled, (state, action) => {
        state.testSessionStatus = "succeeded";
        state.testSessionData = action.payload;
      })
      .addCase(fetchTestSession.rejected, (state) => {
        state.testSessionStatus = "failed";
        state.testSessionData = null;
      });
  },
});

export default testSessionSlice.reducer;
