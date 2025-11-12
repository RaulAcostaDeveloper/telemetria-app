import styles from "./dataShower.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { MetricItem } from "./metricItem/metricItem";
import { PrimitiveValue } from "../table/table.model";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";

interface Element {
  title: string;
  value: PrimitiveValue;
  metric?: string;
}

export interface DataShower {
  left: Element[];
  right: Element[];
}

interface Props {
  LANGUAGE: LanguageInterface;
  data: DataShower;
}

export const DataShower = ({ LANGUAGE, data }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.cuadricula}>
        {data.left.map((el, index) => (
          <MetricItem
            LANGUAGE={LANGUAGE}
            metric={el.metric ?? ""}
            name={el.title}
            value={ndIfEmpty(el.value)}
            key={index}
            isLast={index + 1 === data.left.length}
          />
        ))}
      </div>
      <div className={styles.cuadricula}>
        {data.right.map((el, index) => (
          <MetricItem
            LANGUAGE={LANGUAGE}
            metric={el.metric ?? ""}
            name={el.title}
            value={ndIfEmpty(el.value)}
            key={index}
            isLast={index + 1 === data.right.length}
          />
        ))}
      </div>
    </div>
  );
};
