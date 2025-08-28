"use client";

import { useAuth } from "@/modules/auth/utils";

interface Props {
  children: React.ReactNode;
}

export const RestrictedWrapper = ({ children }: Props) => {
  const { isAuthenticated } = useAuth();
  if (true === isAuthenticated) {
    return children;
  }
  return <></>;
};
