"use client";

import { useMemo } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import { Table } from "@/global/components";
import { columnsTable } from "@/global/components/table/table.model";
import { iAmUsersDataMock } from "@/global/dataMock/iam/users";

interface Props {
  LANGUAGE: LanguageInterface;
}

export const UsersTabContent = ({ LANGUAGE }: Props) => {
  const usersTableColumns: columnsTable = [
    {
      columnName: LANGUAGE.iam.users.tableColumns.email,
      defaultSpace: 6,
    },
    {
      columnName: LANGUAGE.iam.users.tableColumns.userName,
      defaultSpace: 5,
    },
    {
      columnName: LANGUAGE.iam.users.tableColumns.account,
      defaultSpace: 4,
    },
    {
      columnName: LANGUAGE.iam.users.tableColumns.name,
      defaultSpace: 5,
    },
    {
      columnName: LANGUAGE.iam.users.tableColumns.lastName,
      defaultSpace: 5,
    },
  ];

  const usersTableData = useMemo(() => {
    return iAmUsersDataMock.map((value) => ({
      email: value.email,
      userName: value.userName,
      accountId: value.accountId, // buscar el account ID
      givenName: value.givenName,
      familyName: value.familyName,
    }));
  }, []);

  return (
    <div>
      <Table
        LANGUAGE={LANGUAGE}
        columns={usersTableColumns}
        data={usersTableData}
      />
    </div>
  );
};
