import { FuelTabs } from "@/modules/fuel/components";
import { Table } from "@/modules/global/components";

const columns = [
  { columnName: "Zona", defaultSpace: 3 },
  { columnName: "Perfil", defaultSpace: 2, sortBy: true },
  { columnName: "País", defaultSpace: 2 },
  { columnName: "Estado", defaultSpace: 2 },
];

const data = [
  {
    zone: "alalalala",
    profile: "asdmoad",
    country: "asdasd",
    state: "asdas",
  },
  {
    zone: "alalalala2",
    profile: "asdmoad",
    country: "asdasd",
    state: "asdas",
  },
  {
    zone: "alalalala3",
    profile: "asdmoad",
    country: "asdasd",
    state: "asdas",
  },
  {
    zone: "alalalala4",
    profile: "asdmoad",
    country: "asdasd",
    state: "asdas",
  },
];

export default function Fuel() {
  return (
    <div>
      <Table title="Mi tabla de componentes" columns={columns} data={data} />
      <FuelTabs />
    </div>
  );
}
