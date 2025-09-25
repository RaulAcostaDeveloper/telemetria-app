import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
  userId: string;
  idCliente: string;
  username: string;
  accountName: string;
  expre_at: string;
}

interface LoginData {
  statusCode: number;
  message: string;
  value: UserData | null;
}

const url =
  process.env.NEXT_PUBLIC_URL_SERVICE + "/management/authentication/login";

// PENDIENTE arreglar esta excepción

// Se integra el middleware de\slices\authSlice.ts aquí para obtener el rejectWithValue(0)
export const fetchLogin = createAsyncThunk(
  "login/fetch",
  async ({ encrypted }: { encrypted: string }, { rejectWithValue }) => {
    const options: RequestInit = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ credentials: encrypted }),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const result = await response.json();

        if (response.status === 200) {
          return {
            statusCode: response.status,
            message: "OK",
            value: result.value,
          } as LoginData;
        } else {
          return {
            statusCode: response.status,
            message: response.statusText,
            value: null,
          } as LoginData;
        }
      } else {
        return {
          statusCode: response.status,
          message: response.statusText,
          value: null,
        } as LoginData;
      }
    } catch {
      return rejectWithValue(0); //Sin conexión / timeout / DNS => no hay respuesta HTTP
    }
  }
);
