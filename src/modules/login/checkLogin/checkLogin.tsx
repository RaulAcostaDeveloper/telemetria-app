import { useLanguage } from "@/modules/global/language/components/languageProvider/languageProvider";

import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./checkLogin.module.css";

export default function CheckLogin() {
  const LANGUAGE = useLanguage();

  return (
    <div className={styles.checklogin}>
      <p>{LANGUAGE.auth.checklogin.maintitle}</p>
      <LoaderAnimation cellSize={52} />
    </div>
  );
}
