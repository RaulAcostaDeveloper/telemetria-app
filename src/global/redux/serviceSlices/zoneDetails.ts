import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZoneDetails } from "@/modules/zones/services/zoneDetails/zoneDetails";

export interface ZoneDetailsValue {
  chargeState: number;
  city: string;
  color: string;
  country: string;
  description: string;
  dischargeState: number;
  idProfile: string;
  idleState: number;
  lat: number;
  lon: number;
  postalCode: string;
  profileName: string;
  radioZone: number;
  state: string;
  zoneCategoryName: string;
  zoneId: string;
  zoneName: string;
  zoneProviderName: string;
  zoneCateogryid: string;
}

interface Data {
  statusCode: number;
  message: string;
  value: ZoneDetailsValue | null;
}

interface InitialState {
  zoneDetailsData: Data | null;
  zoneDetailsStatus: SERVICE_STATUS;
}

export const fetchZoneDetails = createAsyncThunk(
  "zoneDetails/fetch",
  async ({ id, logoutState }: { id: string; logoutState: () => void }) => {
    return getZoneDetails({ id, logoutState });
  }
);

const initialState: InitialState = {
  zoneDetailsData: null,
  zoneDetailsStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const zoneDetailsSlice = createSlice({
  name: "zoneDetails",
  initialState,
  reducers: {
    resetZoneDetailsSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchZoneDetails.pending, (state) => {
        state.zoneDetailsStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchZoneDetails.fulfilled, (state, action) => {
        state.zoneDetailsStatus = SERVICE_STATUS.succeeded;
        state.zoneDetailsData = action.payload;
      })
      .addCase(fetchZoneDetails.rejected, (state) => {
        state.zoneDetailsStatus = SERVICE_STATUS.failed;
      });
  },
});

export const { resetZoneDetailsSlice } = zoneDetailsSlice.actions;

export default zoneDetailsSlice.reducer;
