import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getDrivers } from "@/modules/resources/services/drivers/drivers";
import { toLocalDateTime } from "@/global/utils/dateUtils";

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

interface DriversData {
  statusCode: number;
  message: string;
  value: ArrayDrivers | null;
}

interface InitialState {
  driversData: DriversData | null;
  driversStatus: SERVICE_STATUS;
}

export const fetchDrivers = createAsyncThunk(
  "drivers/fetch",
  async (logoutState: () => void) => {
    return getDrivers({ logoutState });
  },
);

const driversFormatter = (data: DriversData | null): DriversData | null => {
  if (data && data.value) {
    const drivers = data.value.drivers.map((messages) => ({
      ...messages,
      entryDate: toLocalDateTime(messages.entryDate),
    }));

    return {
      ...data,
      value: {
        ...data.value,
        drivers,
      },
    };
  }
  return null;
};

const initialState: InitialState = {
  driversData: null,
  driversStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const driversSlice = createSlice({
  name: "drivers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDrivers.pending, (state) => {
        state.driversStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchDrivers.fulfilled, (state, action) => {
        state.driversStatus = SERVICE_STATUS.succeeded;
        state.driversData = driversFormatter(action.payload);
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.driversStatus = SERVICE_STATUS.failed;
      });
  },
});

export default driversSlice.reducer;
