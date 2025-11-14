import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { MutableRefObject, useCallback } from "react";
import { MarkerData } from "./googleMapClientComponent";

interface Center {
  lat: number;
  lng: number;
}

interface Props {
  LANGUAGE: LanguageInterface;
  center?: Center;
  places?: MarkerData[];
  googleApiKey: string;
  mapRef: MutableRefObject<google.maps.Map | null>;
  mapType: "roadmap" | "satellite";
  setMapLoaded: (toggle: boolean) => void;
}
export const GoogleMapsLoader = ({
  LANGUAGE,
  center,
  places,
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

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      // Ajusta zoom/centro a todos los puntos
      if (places && places.length) {
        const bounds = new google.maps.LatLngBounds();
        places.forEach((p) => bounds.extend(p.position));
        map.fitBounds(bounds);
      } else if (center) {
        map.setCenter(center);
        map.setZoom(5);
        setMapLoaded(true);
      }
    },
    [places, center, mapRef, setMapLoaded]
  );

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
      onLoad={onLoad}
    >
      {center && <Marker position={center} />}
      {places &&
        places.map((p) => (
          <Marker key={p.id} position={p.position} title={p.title} />
        ))}
    </GoogleMap>
  );
};
