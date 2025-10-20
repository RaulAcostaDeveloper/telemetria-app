import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { MutableRefObject } from "react";

interface Center {
  lat: number;
  lng: number;
}

interface Props {
  LANGUAGE: LanguageInterface;
  center: Center;
  googleApiKey: string;
  mapRef: MutableRefObject<google.maps.Map | null>;
  mapType: "roadmap" | "satellite";
  setMapLoaded: (toggle: boolean) => void;
}
export const GoogleMapsLoader = ({
  LANGUAGE,
  center,
  googleApiKey,
  mapRef,
  mapType,
  setMapLoaded,
}: Props) => {
  const [language, region] = LANGUAGE.localeLanguage.split("-");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
    language,
    region,
  });

  if (!isLoaded)
    return (
      <div>
        <LoaderAnimation />
      </div>
    );
  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={5}
      mapTypeId={mapType}
      onLoad={(map) => {
        mapRef.current = map;
        setMapLoaded(true);
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
