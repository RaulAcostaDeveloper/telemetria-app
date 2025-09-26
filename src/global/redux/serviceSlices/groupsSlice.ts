import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { getGroups } from "@/modules/management/services/groups/groups";

interface Groups {
  id: number;
  name: string;
}

interface ArrayGroups {
  groups: Groups[];
}

interface Data {
  statusCode: number;
  message: string;
  value: ArrayGroups | null;
}

interface InitialState {
  groupsData: Data | null;
  groupsStatus: SERVICE_STATUS;
}

export const fetchGroups = createAsyncThunk(
  "groups/fetch",
  async (logoutState: () => void) => {
    return getGroups({ logoutState });
  }
);

const initialState: InitialState = {
  groupsData: null,
  groupsStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.groupsStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupsStatus = SERVICE_STATUS.succeeded;
        state.groupsData = action.payload;
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsStatus = SERVICE_STATUS.failed;
      });
  },
});

export default groupsSlice.reducer;
