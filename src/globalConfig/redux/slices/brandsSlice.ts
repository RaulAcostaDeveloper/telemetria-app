import { getBrands } from "@/modules/management/services/brands/brands";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
  brandsStatus: string;
}

export const fetchBrands = createAsyncThunk("brands/fetch", async () => {
  return getBrands();
});

const initialState: InitialState = {
  brandsData: null,
  brandsStatus: "idle",
};

// Slice del servicio
const brandsSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.brandsStatus = "loading";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.brandsStatus = "succeeded";
        state.brandsData = action.payload;
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.brandsStatus = "failed";
      });
  },
});

export default brandsSlice.reducer;
