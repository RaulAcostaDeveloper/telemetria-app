import {
  GoogleMap,
  Marker,
  useLoadScript,
  InfoBox,
} from "@react-google-maps/api";
//import { InfoBox } from "@react-google-maps/infobox";
import { MutableRefObject, useEffect, useRef, useState } from "react";
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
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
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
    setSelectedMarker(marker);
    setInfoBoxOpen((prev) => !prev);
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
            onClick={() => handleMarkerClick(p)}
          />
        ))}
      {selectedMarker && infoBoxOpen && (
        <InfoBox
          position={
            new google.maps.LatLng(
              selectedMarker.position?.lat ?? 0,
              selectedMarker.position?.lng ?? 0
            )
          }
          options={{
            closeBoxURL: "",
            enableEventPropagation: true,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "4px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "20em" }}>Hello from InfoBox!</h4>
            <p style={{ margin: 0, fontSize: "20em" }}>Custom content here</p>
          </div>
          {/*           <Box
            borderRadius="10px"
            boxShadow="0px 4px 4px 0px rgba(0, 0, 0, 0.05)"
            padding="9px 13px"
            width="100%"
            sx={{ backgroundColor: '#fff' }}
          >
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Typography color="primary" variant="body2" fontWeight="bold">
                {selectedMarker.title}
              </Typography>
              <IconButton
                testID="close-tooltip"
                size="small"
                onClick={() => setSelectedMarker(null)}
                sx={{ padding: '4px' }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <Box display="flex" alignItems="start" justifyContent="space-between">
              <Box>
                <Typography fontSize="12px" variant="body2">
                  {selectedMarker.title}
                </Typography>
                <Typography fontSize="12px" variant="body2">
                  Abierto 24 horas
                </Typography>
                <Typography noWrap fontSize="12px" variant="body2">
                  Teléfono: {selectedClinic.directPhone}
                </Typography>
                <TextLink fontSize="12px" testID="view-more">
                  Ver más
                </TextLink>
              </Box>
              <IconButton testID="directions" size="small" sx={{ padding: '4px' }}>
                <DirectionsIcon />
              </IconButton>
            </Box>
          </Box> */}
        </InfoBox>
      )}
    </GoogleMap>
  );
};
