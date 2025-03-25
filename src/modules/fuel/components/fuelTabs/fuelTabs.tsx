import { Table, TabsContent } from "@/modules/global/components";

const tabOptions = ["Grupos", "Zonas", "Unidades"];

const columns = [
  { columnName: "Zona", defaultSpace: 10, sortBy: true, filter: true },
  { columnName: "Perfil", defaultSpace: 5, filter: true },
  { columnName: "País", defaultSpace: 10, filter: true },
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

export const FuelTabs: React.FC = () => {
  return (
    <TabsContent
      tabOptions={tabOptions}
      tabContents={[
        <div>
          <Table
            title="Tabla dentro de tabs"
            columns={columns}
            data={data}
            showNew={true}
          />
        </div>,
        <div>Contenido de Zonas</div>,
        <div>Contenido de Unidades</div>,
      ]}
    />
  );
};
