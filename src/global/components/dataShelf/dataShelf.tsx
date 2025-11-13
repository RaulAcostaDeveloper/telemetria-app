import styles from "./dataShelf.module.css";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { MetricItem } from "./metricItem/metricItem";
import { PrimitiveValue } from "../table/table.model";
import { ndIfEmpty } from "@/global/utils/ndIfEmpty";

interface Element {
  title: string;
  value: PrimitiveValue;
  metric?: string;
}

export interface DataShelf {
  left: Element[];
  right: Element[];
  third?: Element[];
  fourth?: Element[];
}

interface Props {
  LANGUAGE: LanguageInterface;
  data: DataShelf;
}

export const DataShelf = ({ LANGUAGE, data }: Props) => {
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
      {data.third && (
        <div className={styles.cuadricula}>
          {data.third.map((el, index) => (
            <MetricItem
              LANGUAGE={LANGUAGE}
              metric={el.metric ?? ""}
              name={el.title}
              value={ndIfEmpty(el.value)}
              key={index}
              isLast={index + 1 === data.third?.length}
            />
          ))}
        </div>
      )}
      {data.fourth && (
        <div className={styles.cuadricula}>
          {data.fourth.map((el, index) => (
            <MetricItem
              LANGUAGE={LANGUAGE}
              metric={el.metric ?? ""}
              name={el.title}
              value={ndIfEmpty(el.value)}
              key={index}
              isLast={index + 1 === data.fourth?.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};
