import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.startview}>
      <div className={styles.loadercontainer}>
        <LoaderAnimation cellSize={52} />
      </div>
    </div>
  );
}
