import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { putZoneProfile } from "@/modules/zones/services/putProfile/putProfile";

interface PutZoneProfileData {
  zoneProfileId: string;
}

interface Data {
  statusCode: number;
  message: string;
  value: PutZoneProfileData | null;
}

interface InitialState {
  putZoneProfileData: Data | null;
  putZoneProfileStatus: SERVICE_STATUS;
}

export const fetchPutZoneProfile = createAsyncThunk(
  "putZoneProfile/fetch",
  async ({
    chargeState,
    color,
    description,
    dischargeState,
    idProfile,
    idleState,
    logoutState,
    nick,
    zoneCategoryId,
    zoneId,
    zoneProviderId,
  }: {
    chargeState: number;
    color: string;
    description: string;
    dischargeState: number;
    idProfile: string;
    idleState: number;
    logoutState: () => void;
    nick: string;
    zoneCategoryId: string;
    zoneId: string;
    zoneProviderId: string;
  }) => {
    return putZoneProfile({
      chargeState,
      color,
      description,
      dischargeState,
      idProfile,
      idleState,
      logoutState,
      nick,
      zoneCategoryId,
      zoneId,
      zoneProviderId,
    });
  }
);

const initialState: InitialState = {
  putZoneProfileData: null,
  putZoneProfileStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const putZoneProfileSlice = createSlice({
  name: "putZoneProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPutZoneProfile.pending, (state) => {
        state.putZoneProfileStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchPutZoneProfile.fulfilled, (state, action) => {
        state.putZoneProfileStatus = SERVICE_STATUS.succeeded;
        state.putZoneProfileData = action.payload;
      })
      .addCase(fetchPutZoneProfile.rejected, (state) => {
        state.putZoneProfileStatus = SERVICE_STATUS.failed;
      });
  },
});

export default putZoneProfileSlice.reducer;
