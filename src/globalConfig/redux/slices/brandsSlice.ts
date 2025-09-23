import { SERVICE_STATUS } from "../types/serviceTypes";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getBrands } from "@/modules/management/services/brands/brands";

export interface Brand {
  id: number;
  name: string;
}

interface BrandsValues {
  brands: Brand[];
}

interface Data {
  statusCode: number;
  message: string;
  value: BrandsValues | null;
}

interface InitialState {
  brandsData: Data | null;
  brandsStatus: SERVICE_STATUS;
}

export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  return getBrands();
});

const initialState: InitialState = {
  brandsData: null,
  brandsStatus: SERVICE_STATUS.idle,
};

// Slice del servicio
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = SERVICE_STATUS.loading;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = SERVICE_STATUS.succeeded;
        state.brandsData = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brandsStatus = SERVICE_STATUS.failed;
      });
  },
});

export default brandsSlice.reducer;
