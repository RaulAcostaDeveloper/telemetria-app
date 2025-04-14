import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

export default function Fuel() {
  return (
    <div>
      <Table
        title="Mi tabla"
        columns={[]}
        data={[]}
        showCreateButton
        showDelete
        showEdit
        showView
      />
      <FuelTabs />
    </div>
  );
}
