"use client";
import { useMemo, useState, useEffect, useRef } from "react";

import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { GeoModalData } from "../geoModal";
import { GoogleMapsLoader } from "./googleMapsLoader";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { getEnvClient } from "@/global/utils/getEnviromentFromClient";

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
  const [googleApiKey, setGoogleApiKey] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    (async () => {
      try {
        const { GOOGLE_MAPS_API_KEY } = await getEnvClient();
        setGoogleApiKey(GOOGLE_MAPS_API_KEY ?? null);
      } catch {
        console.error("No se pudo cargar GOOGLE_MAPS_API_KEY");
      }
    })();
  }, []);

  // Configuración de la API y el idioma del mapa
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

  if (!googleApiKey)
    return (
      <div>
        <LoaderAnimation />
      </div>
    );

  // No dar tamaño aquí si no en el componente padre
  return (
    <>
      {googleApiKey && (
        <GoogleMapsLoader
          LANGUAGE={LANGUAGE}
          center={center}
          googleApiKey={googleApiKey}
          mapRef={mapRef}
          mapType={mapType}
          setMapLoaded={setMapLoaded}
        />
      )}
    </>
  );
};

export default GoogleMapClientComponent;
