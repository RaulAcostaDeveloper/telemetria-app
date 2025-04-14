import { LanguageSelector } from "@/modules/global/language/utils/languageSelector";
import { Table, TabsContent } from "@/modules/global/components";
import styles from "./fuelTabs.module.css";

export const FuelTabs: React.FC = () => {
  const LANGUAGE = LanguageSelector();
  const tabOptions = [
    LANGUAGE.fuel.tabs.groups,
    LANGUAGE.fuel.tabs.unitys,
    LANGUAGE.fuel.tabs.zones,
  ];
  return (
    <TabsContent
      tabOptions={tabOptions}
      tabContents={[
        <div key={1}>
          <div className={styles.tablesContainer}>
            <Table
              title="Tabla dentro de un tab"
              columns={[]}
              data={[]}
              showCreateButton
              showDelete
              showEdit
              showView
            />
            <Table
              title="Tabla a un lado"
              columns={[]}
              data={[]}
              showCreateButton
              showDelete
              showEdit
              showView
            />
          </div>
        </div>,
        <div key={2}>2</div>,
        <div key={3}>3</div>,
      ]}
    />
  );
};
