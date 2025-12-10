import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MutableRefObject } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";

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

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setMapLoaded(true);
    // Ajusta zoom/centro a todos los puntos
    if (center) {
      map.setCenter(center);
      map.setZoom(5);
      setMapLoaded(true);
    }
  };

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
      onLoad={onLoad}
      options={{
        gestureHandling: "greedy",
        zoomControl: true,
        mapTypeId: mapType,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
