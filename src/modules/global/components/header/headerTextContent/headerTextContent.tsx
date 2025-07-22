import styles from "./headerTextContent.module.css";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
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
    } else if (currentUrl.match(/home|s+/)) {
      return "home";
    } else if (currentUrl.match(/management/)) {
      return "management";
    } else if (currentUrl.match(/fuel/)) {
      return "fuel";
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
            <HeaderTextWords LANGUAGE={LANGUAGE} section={site} />
          </div>
        );
      case "single-telemetry":
        return (
          <div className={styles.platesAndName}>
            <span>VA4784A</span>
            <span>HILUX</span>
          </div>
        );
      case "home":
        return (
          <div className={styles.platesAndName}>
            <span>{LANGUAGE.sectionName.home}</span>
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
      default:
        return <div className={styles.platesAndName}></div>;
    }
  }

  return textCreator();
};

export default HeaderTextContent;
