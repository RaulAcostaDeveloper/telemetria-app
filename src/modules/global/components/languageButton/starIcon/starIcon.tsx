import styles from "./starIcon.module.css";

const metadataId = "CorelCorpID_0Corel-Layer";
const dPath =
  "M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z";
const xmlns = "http://www.w3.org/2000/svg";
const xmlnsxLink = "http://www.w3.org/1999/xlink";

export const StarIcon = () => {
  return (
    <svg
      xmlns={xmlns}
      xmlSpace="preserve"
      version="1.1"
      className={styles.star}
      viewBox="0 0 784.11 815.53"
      xmlnsXlink={xmlnsxLink}
    >
      <defs></defs>
      <g id="Layer_x0020_1">
        <metadata id={metadataId}></metadata>
        <path className="fil0" d={dPath} fill="currentColor"></path>
      </g>
    </svg>
  );
};
