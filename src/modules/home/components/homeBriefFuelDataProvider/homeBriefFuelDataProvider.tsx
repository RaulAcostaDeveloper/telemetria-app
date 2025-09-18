import { useSelector } from "react-redux";

import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "@/modules/fuel/components/fuelDataProvider/fuelDataProvider.module.css";
import stylesHome from "./homeBriefFuelDataProvider.module.css";
import { DataErrorHandler } from "@/modules/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { RootState } from "@/globalConfig/redux/store";
import { SERVICE_STATUS } from "@/globalConfig/redux/types/serviceTypes";

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
        {fuelSummaryStatus === SERVICE_STATUS.succeeded &&
          fuelSummaryData?.value && (
            <>
              <ReportSummary summaryValues={fuelSummaryData.value} />
              <DonutGraphic devices={fuelSummaryData.value.devices} />
            </>
          )}
        <DataErrorHandler
          LANGUAGE={LANGUAGE}
          hasData={!!fuelSummaryData?.value}
          infoStatus={fuelSummaryStatus}
        />
      </div>
    </div>
  );
};
