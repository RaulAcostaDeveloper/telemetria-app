import { Table, TabsContent } from "@/modules/global/components";

const tabOptions = ["Grupos", "Zonas", "Unidades"];

export const FuelTabs: React.FC = () => {
  return (
    <TabsContent
      tabOptions={tabOptions}
      tabContents={[
        <div key={1}>
          <Table
            title="Tabla dentro de tabs"
            showCreateButton={true}
            showView={true}
            showEdit={true}
            showDelete={true}
          />
        </div>,
        <div key={2}>Contenido de Zonas</div>,
        <div key={3}>Contenido de Unidades</div>,
      ]}
    />
  );
};
