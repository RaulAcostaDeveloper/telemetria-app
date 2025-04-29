import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";
import { ExampleTableForm } from "@/modules/global/components/exampleTableForm/exampleTableForm";
import {
  columnsTable,
  dataTable,
} from "@/modules/global/components/table/table.model";

const tableColumns: columnsTable = [
  {
    columnName: "Zona",
    defaultSpace: 3,
    orderColumn: true,
  },
  {
    columnName: "Perfil",
    defaultSpace: 2,
    orderColumn: true,
    filterOptions: true,
  },
  {
    columnName: "País",
    defaultSpace: 2,
    orderColumn: true,
    filterOptions: true,
  },
  {
    columnName: "Id",
    defaultSpace: 2,
    orderColumn: true,
    showTotal: true,
  },
];

const tableData: dataTable = [
  {
    zone: "Principal name",
    profile: "Perfil name",
    country: "Country name",
    idVehicle: "412",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    idVehicle: "521",
  },
  {
    zone: "Principal name 2",
    profile: "Perfil name 2",
    country: "Country name 2",
    idVehicle: "522",
  },
];

export default function Fuel() {
  return (
    <div>
      <Table
        createFormContent={ExampleTableForm}
        columns={tableColumns}
        data={tableData}
        editFormContent={ExampleTableForm}
        idKey="idVehicle"
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
        viewPath="/management/vehicle/"
      />
      <Table
        columns={tableColumns}
        data={tableData}
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
      />
      <Table
        columns={tableColumns}
        data={tableData}
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
      />
      <FuelTabs />
    </div>
  );
}
