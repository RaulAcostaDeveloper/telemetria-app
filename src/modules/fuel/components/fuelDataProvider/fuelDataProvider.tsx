import DonutGraphic from "@/modules/global/components/donutGraphic/DonutGraphic";
import ReportSummary from "@/modules/fuel/components/reportSummary/ReportSummary";
import styles from "./fuelDataProvider.module.css";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";
import { FuelFilter } from "../fuelFilter/fuelFilter";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import { Table, TabsContent } from "@/modules/global/components";
import { fuelSummaryDataMock } from "@/modules/global/dataMock/fuelSummary/fuelSummary";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelDataProvider = ({ LANGUAGE }: Props) => {
  const tabOptions = [
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.zones,
  ];

  const vehiclesColumns: columnsTable = [
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.imei,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastFuelLevel,
      defaultSpace: 3,
      showTotal: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.lastReportDate,
      defaultSpace: 3,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.name,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.plate,
      defaultSpace: 6,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoadCount,
      defaultSpace: 2,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloadCount,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceOdometer,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.performanceHorometer,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelLoaded,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.fuel.vehiclesTableColumns.fuelUnloaded,
      defaultSpace: 3,
      showTotal: true,
      orderColumn: true,
    },
  ];

  const vehiclesReport: dataTable = fuelSummaryDataMock.value.devices;

  return (
    <div>
      <FuelFilter LANGUAGE={LANGUAGE} />
      <div className={styles.topResumeData}>
        <ReportSummary />
        <DonutGraphic devices={fuelSummaryDataMock.value.devices} />
      </div>
      <TabsContent
        tabOptions={tabOptions}
        tabContents={[
          <div key={1}>
            <Table
              LANGUAGE={LANGUAGE}
              columns={vehiclesColumns}
              data={vehiclesReport}
              idKey="imei"
              showView
              viewPath="/fuel/vehicle/"
            />
          </div>,
        ]}
      />
    </div>
  );
};
