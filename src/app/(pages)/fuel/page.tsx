import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

export default function Fuel() {
  return (
    <div>
      <Table
        title="Table"
        showCreateButton
        showDelete
        showView
        showEdit
        data={[{}]}
        columns={[]}
      />
      <FuelTabs />
    </div>
  );
}
