import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
//import { InfoBox } from "@react-google-maps/infobox";
import { MutableRefObject, useEffect, useRef, useState } from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { MarkerData, ZoneDetail } from "./googleMapClientComponent";

import styles from "./googleMapsLoader.module.css";

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
  const markerRef = useRef<google.maps.Marker | null>(null);
  const infoRef = useRef<google.maps.InfoWindow | null>(null);
  const [language, region] = LANGUAGE.localeLanguage.split("-");
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
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

  const handleMarkerClick = (marker: MarkerData) => {
    if (!mapRef.current || !markerRef.current || !infoRef.current) return;

    // TODO: agregar fechas, valor inicial, valor final
    const contentHTML = `
      <div class="${styles.containerinfo}">
        <div class="${styles.frameInfo}" style="font-size: 2rem;">
          <div class="${styles.rowInfo}">
            <div>${LANGUAGE.zones.zoneMap.zonePopup.address}:</div>
            <div>${marker.title}</div>
          </div>
          <div class="${styles.rowInfo}">
            <div>${LANGUAGE.zones.zoneMap.zonePopup.magnitude}:</div>
            <div>${marker.magnitude} lts.</div>
          </div>
          <div class="${styles.rowInfo}">
            <div>${LANGUAGE.zones.zoneMap.zonePopup.coordinates}:</div>
            <div>${marker.position.lat}, ${marker.position.lng}</div>
          </div>
        </div>
      </div>`;

    infoRef.current.setContent(contentHTML);
    infoRef.current.setHeaderDisabled(true); //Deshabilita botón de cerrar.

    if (infoBoxOpen) {
      infoRef.current.close();
    } else {
      infoRef.current.open({
        map: mapRef.current,
        anchor: markerRef.current,
      });
    }

    setInfoBoxOpen((prev) => !prev);
  };

  const handleMarkerLoad = (marker: google.maps.Marker) => {
    markerRef.current = marker;

    if (!infoRef.current) {
      infoRef.current = new google.maps.InfoWindow({
        content: `<div style="font-size: 12px; color: #333;"></div>`,
      });

      // Sincroniza el estado de infoBoxOpen con cerrar la ventana por botón de X.
      infoRef.current.addListener("closeclick", () => {
        setInfoBoxOpen(false);
      });
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
      mapTypeId={mapType}
      onLoad={onLoad}
    >
      {center && <Marker position={center} />}
      {places &&
        places.map((p) => (
          <Marker
            key={p.id}
            position={p.position}
            title={p.title}
            icon={p.icon}
            onClick={() => handleMarkerClick(p)} //Lat,Lng. Carga/Descarga. Fecha
            onLoad={handleMarkerLoad}
          />
        ))}
    </GoogleMap>
  );
};
