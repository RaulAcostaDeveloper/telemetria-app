import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";
import { ExampleTableForm } from "@/modules/global/components/exampleTableForm/exampleTableForm";
import { columnsTable } from "@/modules/global/components/table/table.model";

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

export default function Fuel() {
  return (
    <div>
      <Table
        addFormContent={ExampleTableForm}
        columns={tableColumns}
        data={[]}
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
        data={[]}
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
      />
      <Table
        columns={tableColumns}
        data={[]}
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
