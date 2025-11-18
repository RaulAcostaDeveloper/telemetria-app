import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVICE_STATUS } from "./types/serviceTypes";
import { getZoneDetails } from "@/modules/zones/services/zoneDetails/zoneDetails";

interface ZoneDetailsValue {
  zoneName: string;
  zoneId: string;
  profileName: string;
  country: string;
  state: string;
  city: string;
  postalCode: string;
  description: string;
  chargeState: number;
  dischargeState: number;
  idleState: number;
  provider: string;
  color: string;
  zoneTypeName: string;
  zoneCategoryName: string;
  radioZone: number;
  lat: number;
  lon: number;
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

export default zoneDetailsSlice.reducer;
