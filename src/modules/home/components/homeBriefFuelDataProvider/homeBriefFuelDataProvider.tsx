import { useSelector } from "react-redux";

import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
import LoaderAnimation from "@/modules/global/components/loaderAnimation/loaderAnimation";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "@/modules/fuel/components/fuelDataProvider/fuelDataProvider.module.css";
import stylesHome from "./homeBriefFuelDataProvider.module.css";
import { RootState } from "@/globalConfig/redux/store";
import { ErrorMessage } from "@/modules/global/components/errorMessage/errorMessage";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const HomeBriefFuelDataProvider = ({ LANGUAGE }: Props) => {
  const { fuelSummaryData, fuelSummaryStatus } = useSelector(
    (state: RootState) => state.fuelSummary
  );

  return (
    <div className={stylesHome.container}>
      <div className={styles.topResumeData}>
        {fuelSummaryStatus === "succeeded" && fuelSummaryData?.value && (
          <>
            <ReportSummary summaryValues={fuelSummaryData.value} />
            <DonutGraphic devices={fuelSummaryData.value.devices} />
          </>
        )}

        {fuelSummaryStatus === "loading" && (
          <div>
            <LoaderAnimation />
          </div>
        )}

        {fuelSummaryStatus === "failed" && <ErrorMessage LANGUAGE={LANGUAGE} />}
      </div>
    </div>
  );
};
