import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { SERVICE_STATUS } from "../types/serviceTypes";
import { getDrivers } from "@/modules/management/services/drivers/drivers";
import { ndIfEmpty } from "@/globalConfig/utils/utils";

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
  value: ArrayDrivers | null;
}

interface InitialState {
  driversData: Data | null;
  driversStatus: SERVICE_STATUS;
}

export const fetchDrivers = createAsyncThunk(
  "drivers/fetch",
  async ({ accountId }: { accountId: string }) => {
    return getDrivers(accountId);
  }
);

const initialState: InitialState = {
  driversData: null,
  driversStatus: SERVICE_STATUS.idle,
};

/** Asigna "ND" a valores null, undefined y cadenas vacias.*/
function setObjNDIfEmpty(payload: Data) {
  const revisedArr = payload.value?.drivers.map((driver) => {
    //No altera a driver.id
    driver.name = ndIfEmpty(driver.name).toString();
    driver.email = ndIfEmpty(driver.email).toString();
    driver.lastName = ndIfEmpty(driver.lastName).toString();
    driver.address = ndIfEmpty(driver.address).toString();
    driver.entryDate = ndIfEmpty(driver.entryDate).toString();
    driver.alias = ndIfEmpty(driver.alias).toString();
    driver.groupName = ndIfEmpty(driver.groupName).toString();
    driver.license = ndIfEmpty(driver.license).toString();
    return driver;
  });
  payload.value.drivers = revisedArr;
  return payload;
}

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
        state.driversData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchDrivers.rejected, (state) => {
        state.driversStatus = SERVICE_STATUS.failed;
      });
  },
});

export default driversSlice.reducer;
