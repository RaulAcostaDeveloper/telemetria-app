import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

export default function Fuel() {
  return (
    <div>
      <Table
        title="Mi tabla de componentes"
        showCreateButton
        showDelete
        showEdit
        data={[{}]}
        columns={[]}
      />
      <FuelTabs />
    </div>
  );
}
