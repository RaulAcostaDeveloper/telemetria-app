import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { LanguageInterface } from "@/global/language/constants/language.model";
import LoaderAnimation from "@/global/components/loaderAnimation/loaderAnimation";
import {
  MarkerData,
  ZoneDetail,
} from "../googleMapClientComponentZone/googleMapClientComponentZone";
import styles from "./googleMapsLoaderZone.module.css";

type MapTypeId = google.maps.MapTypeId | string;

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
export const GoogleMapsLoaderZone = ({
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
  const directoryMarkersRef = useRef<Record<string, google.maps.Marker>>({});
  const mapTypeListenerRef = useRef<google.maps.MapsEventListener | null>(null);
  const [language, region] = LANGUAGE.localeLanguage.split("-");
  const [infoBoxOpen, setInfoBoxOpen] = useState(false);
  const [mapTypeId, setMapTypeId] = useState<MapTypeId>("roadmap");
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: googleApiKey as string,
    language,
    region,
  });

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    //Proceso para persistencia de tipo de mapa
    let validationMapType = "roadmap";
    if (undefined !== map.getMapTypeId()) {
      validationMapType = map.getMapTypeId() as string;
    } else {
      validationMapType = "roadmap";
    }
    setMapTypeId(validationMapType);

    mapTypeListenerRef.current = map.addListener("maptypeid_changed", () => {
      setMapTypeId(map.getMapTypeId() as string);
    });

    //Genera la instancia para tener referencia al Popup.
    if (!infoRef.current) {
      infoRef.current = new google.maps.InfoWindow();
    }

    // Ajusta zoom/centro a todos los puntos
    if (places && places.length) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach((p) => bounds.extend(p.position));
      map.fitBounds(bounds);

      //Si se quiere forzar el zoom y no seguir a .fitBounds()
      google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        map.setZoom(19);
      });
    } else if (center) {
      map.setCenter(center);
      map.setZoom(19);
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

  const onUnmount = useCallback(() => {
    mapTypeListenerRef.current?.remove();
    mapTypeListenerRef.current = null;
    mapRef.current = null;
  }, []);

  if (!isLoaded) {
    return (
      <div>
        <LoaderAnimation />
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={center}
      zoom={15}
      onLoad={onLoad}
      options={{
        gestureHandling: "greedy",
        zoomControl: true,
        mapTypeId: mapTypeId,
      }}
      onUnmount={onUnmount}
    >
      {center && !zoneCircle && <Marker position={center} />}
      {places?.length === 1 && (
        <Marker
          key={places[0].id}
          position={places[0].position}
          title={places[0].title}
          icon={places[0].icon}
          onLoad={(marker) => {
            markerRef.current = marker;

            directoryMarkersRef.current[places[0].id] = marker;

            if (!infoRef.current) {
              infoRef.current = new google.maps.InfoWindow({
                content: `<div style="font-size: 12px; color: #333;"></div>`,
              });

              // Sincroniza el estado de infoBoxOpen con cerrar la ventana por botón de X.
              infoRef.current.addListener("closeclick", () => {
                setInfoBoxOpen(false);
              });
            }
          }}
          onClick={() => {
            const targetMarker = directoryMarkersRef.current[places[0].id];

            if (!targetMarker || !infoRef.current || !mapRef.current) return;

            infoRef.current.setContent(
              `<div class="${styles.containerinfo}">
                <div class="${styles.frameInfo}" style="font-size: 1.5rem;">
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.address}:</div>
                    <div>${places[0].address}</div>
                  </div>
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.magnitude}:</div>
                    <div>${places[0].magnitude} lts.</div>
                  </div>
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.initialFuel}:</div>
                    <div>${places[0].initialFuel} lts.</div>
                  </div>
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.finalFuel}:</div>
                    <div>${places[0].finalFuel} lts.</div>
                  </div>
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.dateGps}:</div>
                    <div>${places[0].dateGps}</div>
                  </div>
                  <div class="${styles.rowInfo}">
                    <div>${LANGUAGE.zones.zoneMap.zonePopup.coordinates}:</div>
                    <div>${places[0].position.lat}, ${places[0].position.lng}</div>
                  </div>
                </div>
              </div>`
            );

            // Construcción del popup header
            const header = document.createElement("div");
            header.style.textAlign = "center";
            header.style.marginTop = "-5px";
            header.style.marginRight = "-48px"; //Tamaño que tomó el icono de cerrar.
            const title = document.createElement("span");
            title.textContent = places[0].title ? places[0].title : "";
            title.style.fontSize = "2rem";
            title.style.fontWeight = "bold";
            header.appendChild(title);
            infoRef.current?.setHeaderContent(header);

            if (infoBoxOpen) {
              infoRef.current.close();
            } else {
              infoRef.current.open({
                map: mapRef.current,
                anchor: targetMarker,
              });
            }

            setInfoBoxOpen((prev) => !prev);
          }}
        />
      )}
      {places &&
        places?.length > 1 &&
        places.map((p) => (
          <Marker
            key={p.id}
            position={p.position}
            title={p.title}
            icon={p.icon}
            onLoad={(marker) => {
              markerRef.current = marker;

              directoryMarkersRef.current[p.id] = marker; //Obtengo referencia de cada marker.

              if (!infoRef.current) {
                infoRef.current = new google.maps.InfoWindow({
                  content: `<div style="font-size: 12px; color: #333;"></div>`,
                });

                // Sincroniza el estado de infoBoxOpen con cerrar la ventana por botón de X.
                infoRef.current.addListener("closeclick", () => {
                  setInfoBoxOpen(false);
                });
              }
            }}
            onClick={() => {
              const targetMarker = directoryMarkersRef.current[p.id];

              if (!targetMarker || !infoRef.current || !mapRef.current) return;

              infoRef.current.setContent(
                `<div class="${styles.containerinfo}">
                  <div class="${styles.frameInfo}" style="font-size: 2rem;">
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.address}:</div>
                      <div>${p.address}</div>
                    </div>
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.magnitude}:</div>
                      <div>${p.magnitude} lts.</div>
                    </div>
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.initialFuel}:</div>
                      <div>${p.initialFuel} lts.</div>
                    </div>
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.finalFuel}:</div>
                      <div>${p.finalFuel} lts.</div>
                    </div>
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.dateGps}:</div>
                      <div>${p.dateGps}</div>
                    </div>
                    <div class="${styles.rowInfo}">
                      <div>${LANGUAGE.zones.zoneMap.zonePopup.coordinates}:</div>
                      <div>${p.position.lat}, ${p.position.lng}</div>
                    </div>
                  </div>
                </div>`
              );

              //Construcción del popup header
              const header = document.createElement("div");
              header.style.textAlign = "center";
              header.style.marginTop = "-5px";
              header.style.marginRight = "-48px"; //Tamaño que tomó el icono de cerrar.
              const title = document.createElement("span");
              title.textContent = p.title ? p.title : "";
              title.style.fontSize = "2rem";
              header.appendChild(title);
              infoRef.current?.setHeaderContent(header);

              if (infoBoxOpen) {
                infoRef.current.close();
              } else {
                infoRef.current.open({
                  map: mapRef.current,
                  anchor: targetMarker,
                });
              }

              //infoRef.current.setHeaderDisabled(true); //Deshabilita botón de cerrar. */

              setInfoBoxOpen((prev) => !prev);
            }}
          />
        ))}
    </GoogleMap>
  );
};
