"use client";

import { useAuth } from "@/modules/auth/utils";

interface Props {
  children: React.ReactNode;
}

export const RestrictedWrapper = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return children;
  }
  return <></>;
};
