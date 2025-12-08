"use client";
import { useMemo, useState, useEffect, useRef } from "react";

import LoaderAnimation from "../../loaderAnimation/loaderAnimation";
import { GeoModalData } from "../geoModal";
import { GoogleMapsLoader } from "./googleMapsLoader";
import { LanguageInterface } from "@/global/language/constants/language.model";
import { getEnvClient } from "@/global/utils/getEnviromentFromClient";

export interface MarkerData {
  id: number | string;
  position: { lat: number; lng: number };
  title: string;
  icon?: string | google.maps.Icon | google.maps.Symbol;
  magnitude: number;
}

export interface ZoneDetail {
  center: {
    lat: number | undefined;
    lng: number | undefined;
  };
  radius: number | undefined;
  color: string | undefined;
  zoneName: string | undefined;
  zoneId: string | undefined;
  profileName: string | undefined;
  country: string | undefined;
  state: string | undefined;
  city: string | undefined;
  postalCode: string | undefined;
  idProfile: string | undefined;
  description: string | undefined;
  chargeState: number | undefined;
  dischargeState: number | undefined;
  idleState: number | undefined;
  zoneProviderName: string | undefined;
  zoneCategoryName: string | undefined;
}

interface Props {
  LANGUAGE: LanguageInterface;
  geoModalData: GeoModalData | MarkerData[];
  mapType: "roadmap" | "satellite";
  zoneCircle?: ZoneDetail;
}
interface Center {
  lat: number;
  lng: number;
}

const GoogleMapClientComponent = ({
  LANGUAGE,
  geoModalData,
  mapType,
  zoneCircle,
}: Props) => {
  const [googleApiKey, setGoogleApiKey] = useState<string | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const hasAnimatedRef = useRef(false);
  let center: Center | undefined;
  let places: MarkerData[] | undefined;

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

  function isGeoModalData(g: GeoModalData | MarkerData[]): g is GeoModalData {
    return (g as GeoModalData).rows !== undefined;
  }

  // Configuración de la API y el idioma del mapa
  if (isGeoModalData(geoModalData)) {
    // eslint-disable-next-line prefer-const
    // eslint-disable-next-line react-hooks/rules-of-hooks
    center = useMemo(() => {
      return {
        lat: geoModalData.lat,
        lng: geoModalData.lon,
      };
    }, [geoModalData]);
    places = undefined;
  } else {
    places = geoModalData;
    center = undefined;
  }

  useEffect(() => {
    // Efecto de zoom
    if (mapLoaded && mapRef.current && !hasAnimatedRef.current && center) {
      mapRef.current.setZoom(20); // Quitar si se desea el efecto de zoom "lento" al abrir

      // Efecto de zoom "lento" al abrir
      // hasAnimatedRef.current = true;

      // mapRef.current.panTo(center);
      // mapRef.current.setZoom(5);

      // let zoomLevel = 10;
      // const targetZoom = 20;
      // const interval = setInterval(() => {
      //   if (mapRef.current && zoomLevel < targetZoom) {
      //     zoomLevel += 1;
      //     mapRef.current.setZoom(zoomLevel);
      //   } else {
      //     clearInterval(interval);
      //   }
      // }, 200);

      // return () => clearInterval(interval);
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
          places={places}
          googleApiKey={googleApiKey}
          mapRef={mapRef}
          mapType={mapType}
          zoneCircle={zoneCircle}
          setMapLoaded={setMapLoaded}
        />
      )}
    </>
  );
};

export default GoogleMapClientComponent;
