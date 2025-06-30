"use client";
import { useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { GeoModalData } from "../geoModal";

interface Props {
  geoModalData: GeoModalData;
  mapType: "roadmap" | "satellite";
}

const GoogleMapClientComponent = ({ geoModalData, mapType }: Props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
  });

  const center = {
    lat: geoModalData.lat,
    lng: geoModalData.lon,
  };

  const memoizedCenter = useMemo(() => center, []);

  if (!isLoaded) return <div>Cargando mapa...</div>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={memoizedCenter}
      zoom={12}
      mapTypeId={mapType}
    ></GoogleMap>
  );
};

export default GoogleMapClientComponent;
