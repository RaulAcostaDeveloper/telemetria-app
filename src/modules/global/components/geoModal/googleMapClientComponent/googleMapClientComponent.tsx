"use client";
import { useMemo } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";

import { GeoModalData } from "../geoModal";
import { LanguageInterface } from "@/modules/global/language/constants/language.model";

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
  const [language, region] = LANGUAGE.localeLanguage.split("-");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    language,
    region,
  });

  const center = {
    lat: geoModalData.lat,
    lng: geoModalData.lon,
  };

  const memoizedCenter = useMemo(() => center, []);

  if (!isLoaded) return <div>...</div>;

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
