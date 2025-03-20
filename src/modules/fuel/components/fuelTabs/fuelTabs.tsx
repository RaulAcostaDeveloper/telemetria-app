import { TabsContent } from "@/modules/global/components";

const tabOptions = ["Grupos", "Zonas", "Unidades"];

export const FuelTabs: React.FC = () => {
  return (
    <TabsContent
      tabOptions={tabOptions}
      tabContents={[
        <div>Contenido de Grupos</div>,
        <div>Contenido de Zonas</div>,
        <div>Contenido de Unidades</div>,
      ]}
    />
  );
};
