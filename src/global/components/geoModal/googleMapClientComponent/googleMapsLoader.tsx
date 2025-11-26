import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MutableRefObject, useEffect, useRef } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { MarkerData, ZoneDetail } from "./googleMapClientComponent";

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
  zoneCircle?: ZoneDetail;
  setMapLoaded: (toggle: boolean) => void;
}
export const GoogleMapsLoader = ({
  LANGUAGE,
  center,
  places,
  googleApiKey,
  mapRef,
  mapType,
  zoneCircle,
  setMapLoaded,
}: Props) => {
  const circleRef = useRef<google.maps.Circle | null>(null);
  const [language, region] = LANGUAGE.localeLanguage.split("-");

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
    language,
    region,
  });

  const onLoad = (map: google.maps.Map) => {
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

    if (
      zoneCircle &&
      zoneCircle.center &&
      zoneCircle.center.lat &&
      zoneCircle.center.lng
    ) {
      circleRef.current = new google.maps.Circle({
        map: mapRef.current,
        center: { lat: zoneCircle.center.lat, lng: zoneCircle.center.lng },
        radius: zoneCircle.radius,
        strokeColor: zoneCircle.color,
        strokeOpacity: 0.5,
        strokeWeight: 2,
        fillColor: zoneCircle.color,
        fillOpacity: 0.2,
      });
    }
  };

  //Limpieza de overlay
  useEffect(() => {
    return () => {
      if (circleRef.current) {
        circleRef.current.setMap(null);
        circleRef.current = null;
      }
    };
  }, []);

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
