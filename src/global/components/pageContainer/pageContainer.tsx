"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/global/redux/store";
import styles from "./pageContainer.module.css";

interface Props {
  children: React.ReactNode;
}

export const PageContainer = ({ children }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  return (
    <div
      className={
        isAuthenticated ? `${styles.pageContainer}` : `${styles.loginContainer}`
      }
    >
      {children}
    </div>
  );
};
