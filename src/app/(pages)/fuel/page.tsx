import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

export default function Fuel() {
  return (
    <div>
      <Table
        title="Mi tabla"
        showCreateButton
        showDelete
        showEdit
        showView
        data={[]}
        columns={[]}
      />
      <Table
        title="Mi tabla"
        showCreateButton
        showDelete
        showEdit
        showView
        data={[]}
        columns={[]}
      />
      <Table
        title="Mi tabla"
        showCreateButton
        showDelete
        showEdit
        showView
        data={[]}
        columns={[]}
      />
      <FuelTabs />
    </div>
  );
}
