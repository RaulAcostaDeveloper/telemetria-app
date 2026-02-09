import { createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "./types/serviceTypes";
import { iAmUsersDataMock } from "@/global/dataMock/iam/users";

export interface User {
  accountId: string;
  createdAt: string;
  createdById: string;
  deletedAt: string;
  email: string;
  familyName: string;
  givenName: string;
  password: string;
  recoveryOtp: string;
  totpKey: string;
  updatedAt: string;
  userName: string;
  id: string;
}

interface Data {
  statusCode: number;
  message: string;
  value: User | null;
}

interface InitialState {
  userData: Data | null;
  userStatus: SERVICE_STATUS;
}

// export const fetchUser = createAsyncThunk(
//   "user/fetch",
//   async (logoutState: () => void) => {
//     return () => getVehicles({ logoutState }); // Temporal, poner función después
//   },
// );

// Quitar al manejar bien el slice
const temoralSliceData = {
  statusCode: 200,
  message: "ok",
  value: iAmUsersDataMock[0],
};

const initialState: InitialState = {
  userData: temoralSliceData,
  userStatus: SERVICE_STATUS.idle,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(fetchUser.pending, (state) => {
  //       state.userStatus = SERVICE_STATUS.loading;
  //     })
  //     .addCase(fetchUser.fulfilled, (state, action) => {
  //       state.userStatus = SERVICE_STATUS.succeeded;
  //       state.userData = action.payload;
  //     })
  //     .addCase(fetchUser.rejected, (state) => {
  //       state.userStatus = SERVICE_STATUS.failed;
  //     });
  // },
});

export default userSlice.reducer;
