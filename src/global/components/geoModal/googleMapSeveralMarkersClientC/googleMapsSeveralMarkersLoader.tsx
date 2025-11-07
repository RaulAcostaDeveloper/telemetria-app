import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { MutableRefObject, useCallback } from "react";

interface MarkerData {
  id: number;
  position: { lat: number; lng: number };
  title: string;
}

interface Props {
  LANGUAGE: LanguageInterface;
  places: MarkerData[];
  googleApiKey: string;
  mapRef: MutableRefObject<google.maps.Map | null>;
  mapType: "roadmap" | "satellite";
  setMapLoaded: (toggle: boolean) => void;
}
export const GoogleMapsSeveralMarkersLoader = ({
  LANGUAGE,
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
      if (places.length) {
        const bounds = new google.maps.LatLngBounds();
        places.forEach((p) => bounds.extend(p.position));
        map.fitBounds(bounds);
      } else {
        map.setCenter({ lat: 22.3703738, lng: -101.4391708 });
        map.setZoom(5);
      }
    },
    [places]
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
      zoom={5}
      mapTypeId={mapType}
      onLoad={onLoad}
    >
      {/* <Marker position={center} /> */}
      {places.map((p) => (
        <Marker key={p.id} position={p.position} title={p.title} />
      ))}
    </GoogleMap>
  );
};
