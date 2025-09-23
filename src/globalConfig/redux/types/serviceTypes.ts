export enum SERVICE_STATUS {
  idle = "idle",
  loading = "loading",
  succeeded = "succeeded",
  failed = "failed",
}

export interface FetchProps {
  imei?: string;
  startDate?: string;
  endDate?: string;
  logoutState: () => void;
}
