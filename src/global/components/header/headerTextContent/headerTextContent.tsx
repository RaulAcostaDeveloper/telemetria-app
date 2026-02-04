import styles from "./headerTextContent.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import HeaderTextWords from "./headerTextWords";

interface Props {
  LANGUAGE: LanguageInterface;
  currentUrl: string;
}

/** Componente para construir el texto que se desplegará en el Header, segun la URL leida del navegador. */
export const HeaderTextContent = ({ LANGUAGE, currentUrl }: Props) => {
  /** Evalua mediante regexp que sección o subsección está el usuario */
  function urlEvaluator() {
    if (currentUrl.match(/fuel\/vehicle/)) {
      return "single-fuel";
    } else if (currentUrl.match(/telemetry\/vehicle/)) {
      return "single-telemetry";
    } else if (currentUrl.match(/management/)) {
      return "management";
    } else if (currentUrl.match(/fuel/)) {
      return "fuel";
    } else if (currentUrl.match(/telemetry/)) {
      return "telemetryobd";
    } else if (currentUrl.match(/zones\/zone/)) {
      return "single-zone";
    } else if (currentUrl.match(/home|s+/)) {
      return "home";
    } else if (currentUrl.match(/iam|s+/)) {
      return "iam";
    } else {
      return "";
    }
  }

  /** Usando la palabra clave retornada por urlEvaluator(), usa el caso correspondiente
   * para construir el JSX que se entregará con el texto para el Header. */
  function textCreator(): JSX.Element {
    const site = urlEvaluator();

    switch (site) {
      case "single-fuel":
        return (
          <div className={styles.platesAndName}>
            <HeaderTextWords
              LANGUAGE={LANGUAGE}
              section={site}
              url={currentUrl}
            />
          </div>
        );
      case "single-telemetry":
        return (
          <div className={styles.platesAndName}>
            <HeaderTextWords
              LANGUAGE={LANGUAGE}
              section={site}
              url={currentUrl}
            />
          </div>
        );
      case "home":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.home}</span>
          </div>
        );
      case "iam":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.iam}</span>
          </div>
        );
      case "management":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.management}</span>
          </div>
        );
      case "fuel":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.fuel}</span>
          </div>
        );
      case "telemetryobd":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.telemetryobd}</span>
          </div>
        );
      case "single-zone":
        return (
          <div className={styles.platesAndName}>
            <HeaderTextWords
              LANGUAGE={LANGUAGE}
              section={site}
              url={currentUrl}
            />
          </div>
        );
      default:
        return <div className={styles.platesAndName}></div>;
    }
  }

  return textCreator();
};

export default HeaderTextContent;
