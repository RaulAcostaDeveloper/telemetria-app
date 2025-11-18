"use client";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import {
  columnsTable,
  MODAL_OPTION,
} from "@/global/components/table/table.model";
import { DataErrorHandler } from "@/global/components/DataErrorHandler/DataErrorHandler";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { RootState } from "@/global/redux/store";
import { SERVICE_STATUS } from "@/global/redux/serviceSlices/types/serviceTypes";
import { Table } from "@/global/components";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const FuelPageZonesTable = ({ LANGUAGE }: Props) => {
  const { zonesSummaryData, zonesSummaryStatus } = useSelector(
    (state: RootState) => state.zonesSummary
  );

  const zonesTableColumns: columnsTable = [
    {
      columnName: LANGUAGE.zones.zonesFuelTable.zone,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.profile,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.country,
      defaultSpace: 2,
      orderColumn: true,
      filterSelector: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.state,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.city,
      defaultSpace: 3,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.zipCode,
      defaultSpace: 2,
      orderColumn: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.events,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.charged,
      defaultSpace: 2,
      orderColumn: true,
      minMaxFilter: true,
    },
    {
      columnName: LANGUAGE.zones.zonesFuelTable.discharged,
      defaultSpace: 3,
      orderColumn: true,
      minMaxFilter: true,
    },
  ];

  const zonesData = useMemo(() => {
    return zonesSummaryData?.value?.zones.map((value) => ({
      zoneName: value.zoneName,
      profileName: value.profileName,
      country: value.country,
      state: value.state,
      city: value.city,
      postalCode: value.postalCode,
      totalEvents: value.totalEvents,
      loadedLiters: value.loadedLiters,
      unloadedLiters: value.unloadedLiters,
      id: value.zoneId,
    }));
  }, [zonesSummaryData]);

  return (
    <div>
      {zonesSummaryStatus === SERVICE_STATUS.succeeded &&
        zonesSummaryData?.value &&
        zonesData && (
          <Table
            columns={zonesTableColumns}
            data={zonesData}
            LANGUAGE={LANGUAGE}
            showGoGenericReport
            idKey="id"
            viewPath="/zones/zone/"
            showEdit
            modalOption={MODAL_OPTION.ZONE}
          />
        )}

      <DataErrorHandler
        LANGUAGE={LANGUAGE}
        hasData={!!zonesSummaryData?.value}
        infoStatus={zonesSummaryStatus}
      />
    </div>
  );
};
