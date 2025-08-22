import { createAsyncThunk } from "@reduxjs/toolkit";

interface UserData {
  userId: string;
  idCliente: string;
  username: string;
  accountName: string;
  expre_at: string;
}

interface LoginData {
  code: number;
  message: string;
  value: UserData | null;
}

const url =
  "https://stage.transtelemetrix.com/api/management/authentication/login";

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
      const res = await fetch(url, options);
      const result: LoginData =
        res.status == 200
          ? await res.json()
          : ({
              code: res.status,
              message: res.statusText,
              value: null,
            } as LoginData);
      return result;
    } catch {
      return rejectWithValue(0); //Sin conexión / timeout / DNS => no hay respuesta HTTP
    }
  }
);
