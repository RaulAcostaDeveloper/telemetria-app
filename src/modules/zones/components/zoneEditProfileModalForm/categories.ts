import { LanguageInterface } from "@/global/language/constants/language.model";

interface Option {
  name: string;
  id: string;
}

// Mantener actualizado esto ya que no se vé otra forma de mapearlo con el idioma
export const getCategories = (LANGUAGE: LanguageInterface): Option[] => {
  return [
    {
      id: "5d7b8878-453c-4e8e-810d-0153fba68c75",
      name: LANGUAGE.zones.zoneProfileCategories.supplier,
    },
    {
      id: "d61a3c6b-7226-433a-ab21-03f22172854d",
      name: LANGUAGE.zones.zoneProfileCategories.distributionCenter,
    },
    {
      id: "c229c3ce-0493-416a-b6f6-0516c98b359a",
      name: LANGUAGE.zones.zoneProfileCategories.robbery,
    },
    {
      id: "7a44af8c-dd6d-4dac-bf81-1e0f4c051efb",
      name: LANGUAGE.zones.zoneProfileCategories.garage,
    },
    {
      id: "d96dd194-f9ba-4638-9fef-20d36cd1cafd",
      name: LANGUAGE.zones.zoneProfileCategories.gasStation,
    },
    {
      id: "f5101313-da14-4d84-9801-226b26e66f03",
      name: LANGUAGE.zones.zoneProfileCategories.restArea,
    },
    {
      id: "243177a0-b8fe-4dee-8c6d-4129f2552b0c",
      name: LANGUAGE.zones.zoneProfileCategories.headquarters,
    },
    {
      id: "94a5f8ad-0872-493a-be64-4a3e9687a9e0",
      name: LANGUAGE.zones.zoneProfileCategories.tollBooth,
    },
    {
      id: "0cdcffd9-0c20-45cc-ae23-4bc8edda1c20",
      name: LANGUAGE.zones.zoneProfileCategories.selfConsumption,
    },
    {
      id: "ca855884-d85a-4aae-a816-528e17ecb40d",
      name: LANGUAGE.zones.zoneProfileCategories.impoundLot,
    },
    {
      id: "c0d120f7-0cbe-4024-bcf8-68cd6985d018",
      name: LANGUAGE.zones.zoneProfileCategories.carWash,
    },
    {
      id: "3472e708-3f84-49be-9dcb-6ac1790744c2",
      name: LANGUAGE.zones.zoneProfileCategories.privateProperty,
    },
    {
      id: "1dfd4cb5-4eb3-42b0-9425-6b5d006979b9",
      name: LANGUAGE.zones.zoneProfileCategories.parkingLot,
    },
    {
      id: "f30b25f7-9134-45a8-8e2c-7fdcf3db231f",
      name: LANGUAGE.zones.zoneProfileCategories.branchOffice,
    },
    {
      id: "ffaf41d5-05c9-452c-9aa1-8472512c0eb7",
      name: LANGUAGE.zones.zoneProfileCategories.tireShop,
    },
    {
      id: "d56d0157-d154-4bab-ab9b-8f7ee9c4b339",
      name: LANGUAGE.zones.zoneProfileCategories.riskArea,
    },
    {
      id: "740db988-1ec2-4ff5-bf15-da2b62f3b225",
      name: LANGUAGE.zones.zoneProfileCategories.fuelLoad,
    },
    {
      id: "78741c98-6355-425e-8cef-e042ad4ba2d8",
      name: LANGUAGE.zones.zoneProfileCategories.mainOffice,
    },
    {
      id: "fdc425cb-75ba-4d80-8c52-ed795d2c4e77",
      name: LANGUAGE.zones.zoneProfileCategories.client,
    },
  ];
};
