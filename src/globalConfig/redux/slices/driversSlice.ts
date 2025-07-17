import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDrivers } from "@/modules/management/services/drivers/drivers";

interface Drivers {
  id: number;
  name: string;
  email: string;
  lastName: string;
  address: string;
  entryDate: string;
  alias: string;
  groupName: string;
  license: string;
}


interface ArrayDrivers {
  drivers: Drivers[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayDrivers;
}

interface InitialState {
  driversData: Data | null;
  driversStatus: string;
}

export const fetchDrivers = createAsyncThunk(
  "drivers/fetch",
  async ({ accountId }: { accountId: string }) => {
    return getDrivers(accountId);
  }
);

const initialState: InitialState = {
  driversData: null,
  driversStatus: "idle",
};

// Slice del servicio
const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.driversStatus = "loading";
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.driversStatus = "succeeded";
        state.driversData = action.payload;
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.driversStatus = "failed";
      });
  },
});

export default driversSlice.reducer;
