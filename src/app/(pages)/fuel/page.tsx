import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";
import { ExampleTableForm } from "@/modules/global/components/exampleTableForm/exampleTableForm";

export default function Fuel() {
  return (
    <div>
      <Table
        addFormContent={ExampleTableForm}
        columns={[]}
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
        columns={[]}
        data={[]}
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
      />
      <Table
        columns={[]}
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
