import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZoneProfileDetails } from "@/modules/zones/services/zoneProfileDetails/zoneProfileDetails";

interface ZoneProfileDetailsExtends {
  nick: string;
  zoneProviderId: string;
  chargeState: number;
  dischargeState: number;
  idleState: number;
  color: string;
  description: string;
  accountId: string;
  zoneId: string;
  zoneCategoryId: string;
  zoneName: string;
  zoneProviderName: string;
  zoneCategoryName: string;
}

interface ZoneProfileDetailsValue {
  zoneProfileDetailsExtends: ZoneProfileDetailsExtends[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ZoneProfileDetailsValue | null;
}

interface InitialState {
  zoneProfileDetailsData: Data | null;
  zoneProfileDetailsStatus: SERVICE_STATUS;
}

export const fetchZoneProfileDetails = createAsyncThunk(
  "zoneProfileDetails/fetch",
  async ({ id, logoutState }: { id: string; logoutState: () => void }) => {
    return getZoneProfileDetails({ id, logoutState });
  }
);

const initialState: InitialState = {
  zoneProfileDetailsData: null,
  zoneProfileDetailsStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const zoneProfileDetailsSlice = createSlice({
  name: "zoneProfileDetails",
  initialState,
  reducers: {
    resetZoneProfileDetailsSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoneProfileDetails.pending, (state) => {
        state.zoneProfileDetailsStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchZoneProfileDetails.fulfilled, (state, action) => {
        state.zoneProfileDetailsStatus = SERVICE_STATUS.succeeded;
        state.zoneProfileDetailsData = action.payload;
      })
      .addCase(fetchZoneProfileDetails.rejected, (state) => {
        state.zoneProfileDetailsStatus = SERVICE_STATUS.failed;
      });
  },
});

export const { resetZoneProfileDetailsSlice } = zoneProfileDetailsSlice.actions;

export default zoneProfileDetailsSlice.reducer;
