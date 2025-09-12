import { LANGUAGE_OPTIONS } from "@/modules/global/language/utils/languageSelector.model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  languageSelected: LANGUAGE_OPTIONS | null;
}

const initialState: InitialState = {
  languageSelected: null,
};

// Obtener la opción del lenguaje
// Solo se debe obtener en MainWrapper y ahí es donde retorna el objeto LANGUAGE
// El dispatcher se ejecutará según la opción del usuario (puede ser un selector, o venir de una API, aún no se sabe)
const languageSlice = createSlice({
  name: "languageSlice",
  initialState,
  reducers: {
    setLanguageReducer(state, action: PayloadAction<LANGUAGE_OPTIONS>) {
      if (!Object.values(LANGUAGE_OPTIONS).includes(action.payload)) {
        throw new Error(`Invalid language option: ${action.payload}`);
      }
      state.languageSelected = action.payload;
    },
  },
});
export const { setLanguageReducer } = languageSlice.actions;

export default languageSlice.reducer;
