import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getGroups } from "@/modules/management/services/groups/groups";
import { ndIfEmpty } from "@/globalConfig/utils/utils";

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
  groupsStatus: string;
}

export const fetchGroups = createAsyncThunk(
  "groups/fetch",
  async ({ accountId }: { accountId: string }) => {
    return getGroups(accountId);
  }
);

const initialState: InitialState = {
  groupsData: null,
  groupsStatus: "idle",
};

function setObjNDIfEmpty(payload: Data) {
  if (!payload.value) return payload; // No hay nada que procesar

  const revisedArr = payload.value.groups.map((group) => {
    group.name = ndIfEmpty(group.name).toString();
    return group;
  });

  payload.value.groups = revisedArr;
  return payload;
}

// Slice del servicio
const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.groupsStatus = "loading";
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.groupsStatus = "succeeded";
        state.groupsData = setObjNDIfEmpty(action.payload);
      })
      .addCase(fetchGroups.rejected, (state) => {
        state.groupsStatus = "failed";
      });
  },
});

export default groupsSlice.reducer;
