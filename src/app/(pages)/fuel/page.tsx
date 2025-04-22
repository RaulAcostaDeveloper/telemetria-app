import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

export default function Fuel() {
  return (
    <div>
      <Table
        columns={[]}
        data={[]}
        showCreateButton
        showDelete
        showEdit
        showView
        title="Mi tabla"
        viewIdKey="idVehicle"
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
