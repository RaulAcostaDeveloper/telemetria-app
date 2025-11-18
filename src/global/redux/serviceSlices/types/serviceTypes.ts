export enum SERVICE_STATUS {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export interface FetchProps {
  id?: string;
  imei?: string;
  startDate?: string;
  endDate?: string;
  logoutState: () => void;
}
