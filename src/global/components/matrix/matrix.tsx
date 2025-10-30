"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import styles from "./matrix.module.css";

const validKeys = ["q", "w", "e", "r"];

export const Matrix = () => {
  const divRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const [unoDown, setUnoDown] = useState(false);
  const [dosDown, setDosDown] = useState(false);
  const [tresDown, setTresDown] = useState(false);
  const [cuatroDown, setCuatroDown] = useState(false);

  const [teclasPresionadas, setTeclasPresionadas] = useState({
    q: false,
    w: false,
    e: false,
    r: false,
  });

  useEffect(() => {
    if (divRef.current) {
      const { offsetWidth, offsetHeight } = divRef.current;
      setSize({ width: offsetWidth, height: offsetHeight });
    }
  }, []);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const keyPressed = event.key.toLowerCase();
      if (validKeys.includes(keyPressed)) {
        setTeclasPresionadas((prevState) => ({
          ...prevState,
          [event.key]: true,
        }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const keyPressed = event.key.toLowerCase();

      if (validKeys.includes(keyPressed)) {
        setTeclasPresionadas((prevState) => ({
          ...prevState,
          [event.key]: false,
        }));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const { q, w, e, r } = teclasPresionadas;
    if (q) {
      setUnoDown(true);
    } else if (w) {
      setDosDown(true);
    } else if (e) {
      setTresDown(true);
    } else if (r) {
      setCuatroDown(true);
    } else {
      // no hay ninguna tecla presionada
      setUnoDown(false);
      setDosDown(false);
      setTresDown(false);
      setCuatroDown(false);
    }
  }, [teclasPresionadas]);

  return (
    <div className={`${styles.container}`} ref={divRef}>
      {unoDown && (
        <div className={styles.error1}>
          <Image src={"/png/err2.png"} width={970} height={324} alt="wqdd" />
        </div>
      )}

      {dosDown && (
        <div className={styles.error1}>
          <Image
            src={"/png/err2.png"}
            width={size.width}
            height={size.height}
            alt="wqdd"
          />
        </div>
      )}

      {tresDown && (
        <div className={styles.m}>
          <Image
            src={"/gif/m.gif"}
            width={size.width}
            height={size.height}
            alt="wqdd"
          />
        </div>
      )}

      {cuatroDown && (
        <>
          <div className={styles.m}>
            <Image
              src={"/gif/m.gif"}
              width={size.width}
              height={size.height}
              alt="wqdd"
            />
          </div>
          <div className={styles.happy}>
            <Image
              src={"/png/happy.png"}
              width={1200}
              height={463}
              alt="wqdd"
            />
          </div>
        </>
      )}
    </div>
  );
};
