import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { postZoneProfile } from "@/modules/zones/services/postProfile/postProfile";

interface PostZoneProfileData {
  zoneProfileId: string;
}

interface Data {
  statusCode: number;
  message: string;
  value: PostZoneProfileData | null;
}

interface InitialState {
  postZoneProfileData: Data | null;
  postZoneProfileStatus: SERVICE_STATUS;
}

export const fetchPostZoneProfile = createAsyncThunk(
  "postZoneProfile/fetch",
  async ({
    accountId,
    chargeState,
    color,
    description,
    dischargeState,
    idleState,
    logoutState,
    nick,
    zoneCategoryId,
    zoneId,
    zoneProviderId,
  }: {
    accountId: string;
    chargeState: number;
    color: string;
    description: string;
    dischargeState: number;
    idleState: number;
    logoutState: () => void;
    nick: string;
    zoneCategoryId: string;
    zoneId: string;
    zoneProviderId: string;
  }) => {
    return postZoneProfile({
      accountId,
      chargeState,
      color,
      description,
      dischargeState,
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
  postZoneProfileData: null,
  postZoneProfileStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const postZoneProfileSlice = createSlice({
  name: "postZoneProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostZoneProfile.pending, (state) => {
        state.postZoneProfileStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchPostZoneProfile.fulfilled, (state, action) => {
        state.postZoneProfileStatus = SERVICE_STATUS.succeeded;
        state.postZoneProfileData = action.payload;
      })
      .addCase(fetchPostZoneProfile.rejected, (state) => {
        state.postZoneProfileStatus = SERVICE_STATUS.failed;
      });
  },
});

export default postZoneProfileSlice.reducer;
