"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

import { GeoModalData } from "../geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";
import LoaderAnimation from "../../loaderAnimation/loaderAnimation";

interface Props {
  LANGUAGE: LanguageInterface;
  geoModalData: GeoModalData;
  mapType: "roadmap" | "satellite";
}

const GoogleMapClientComponent = ({
  LANGUAGE,
  geoModalData,
  mapType,
}: Props) => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const hasAnimatedRef = useRef(false);

  const [language, region] = LANGUAGE.localeLanguage.split("-");

  // Configuración de la API y el idioma del mapa
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language,
    region,
  });

  const center = useMemo(
    () => ({
      lat: geoModalData.lat,
      lng: geoModalData.lon,
    }),
    [geoModalData.lat, geoModalData.lon]
  );

  useEffect(() => {
    // Efecto de zoom
    if (mapLoaded && mapRef.current && !hasAnimatedRef.current) {
      hasAnimatedRef.current = true;

      mapRef.current.panTo(center);
      mapRef.current.setZoom(5);

      let zoomLevel = 10;
      const targetZoom = 16;
      const interval = setInterval(() => {
        if (mapRef.current && zoomLevel < targetZoom) {
          zoomLevel += 1;
          mapRef.current.setZoom(zoomLevel);
        } else {
          clearInterval(interval);
        }
      }, 200);

      return () => clearInterval(interval);
    }
  }, [center, mapLoaded]);

  if (!isLoaded)
    return (
      <div>
        <LoaderAnimation />
      </div>
    );

  // No dar tamaño aquí si no en el componente padre
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

export default GoogleMapClientComponent;
