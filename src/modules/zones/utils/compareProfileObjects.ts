import { ZoneProfileDetailsExtends } from "@/global/redux/serviceSlices/zoneProfileDetailsSlice";
import { PutProfile } from "../services/putProfile/putProfile";

interface Props {
  original: ZoneProfileDetailsExtends;
  updated: PutProfile;
}
export const isDifferentProfile = ({ original, updated }: Props) => {
  // Sacamos logoutState para que no participe en la comparación
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { logoutState, ...updatedData } = updated;

  const areEqual = (
    Object.keys(updatedData) as (keyof typeof updatedData)[]
  ).every((key) => {
    // original no tiene logoutState, pero sí el resto de propiedades que te interesan
    return (
      original[key as keyof ZoneProfileDetailsExtends] === updatedData[key]
    );
  });

  // El nombre de la función sugiere que debe ser true si SON diferentes
  return !areEqual;
};
