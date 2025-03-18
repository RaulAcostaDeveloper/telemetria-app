"use client";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import styles from "./mainWrapper.module.css";

export const MainWrapper = () => {
  return (
    <div className={`${styles.mainWrapper}`}>
      <Menu />
      <Header />
    </div>
  );
};
