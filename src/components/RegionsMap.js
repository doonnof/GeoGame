import React, { useEffect, useRef, useState } from "react";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";

function computeMidCountry(object) {
  const first = object.geometry.coordinates[0].map(([left]) => left);
  const second = object.geometry.coordinates[0].map(([, right]) => right);

  const sum = first.reduce((a, b) => a + b, 0);
  const avg = sum / first.length || 0;

  const sum1 = second.reduce((a, b) => a + b, 0);
  const avg1 = sum1 / second.length || 0;

  return [avg, avg1];
}

function RegionsMap({
  onClickRegion,
  onClearRegionRef,
  onSelectSuccessRef,
  onSelectErrorRef,
  height,
  disableEvents,
}) {
  const [map, setMap] = useState();

  const onClickRegionRef = useRef(null);
  const currentRegionIdRef = useRef(null);
  const objectManagerRef = useRef(null);
  const successIdRef = useRef("");
  const geoJSONRef = useRef();
  const disableEventsRef = useRef();

  const [currentPlaceMark, setCurrentPlaceMark] = useState(null);
  const [successPlaceMark, setSuccessPlaceMark] = useState(null);

  onClickRegionRef.current = onClickRegion;
  disableEventsRef.current = disableEvents;
  const ymaps = useYMaps(["borders", "ObjectManager"]);
  const onClearRegion = () => {
    if (currentRegionIdRef.current) {
      objectManagerRef.current.objects.setObjectOptions(
        currentRegionIdRef.current,
        {
          strokeWidth: 1,
          fillColor: "#6ea2ff",
        }
      );
    }

    if (successIdRef.current) {
      objectManagerRef.current.objects.setObjectOptions(successIdRef.current, {
        strokeWidth: 1,
        fillColor: "#6ea2ff",
      });
    }

    setCurrentPlaceMark(null);
    setSuccessPlaceMark(null);
  };

  const onSelectSuccess = () => {
    objectManagerRef.current.objects.setObjectOptions(
      currentRegionIdRef.current,
      {
        strokeWidth: 2,
        fillColor: "#5cfa65",
      }
    );

    map.options.set("maxAnimationZoomDifference", Infinity);
    map.setZoom(1, { duration: 1000 });
  };

  const onSelectError = (successIso3166) => {
    successIdRef.current = successIso3166;
    objectManagerRef.current.objects.setObjectOptions(
      currentRegionIdRef.current,
      {
        strokeWidth: 2,
        fillColor: "#fc5b4d",
      }
    );

    objectManagerRef.current.objects.setObjectOptions(successIso3166, {
      strokeWidth: 1,
      fillColor: "#5cfa65",
    });

    const foundSuccessObject = geoJSONRef.current.features.find(
      ({ id }) => id === successIso3166
    );

    setSuccessPlaceMark(computeMidCountry(foundSuccessObject));
    map.options.set("maxAnimationZoomDifference", Infinity);
    map.setZoom(1, { duration: 1000 });
  };

  useEffect(() => {
    if (!ymaps || !map) return;

    objectManagerRef.current = new ymaps.ObjectManager();
    ymaps.borders
      .load("001", { lang: "ru", quality: 0 })
      .then((geoJSON) => {
        setTimeout(() => {
          geoJSONRef.current = geoJSON;

          const features = geoJSON.features.map((feature) => {
            feature["id"] = feature.properties.iso3166;
            return feature;
          });

          objectManagerRef.current.add(features);
          map.geoObjects.add(objectManagerRef.current);

          objectManagerRef.current.events
            .add("mouseenter", (event) => {
              if (disableEventsRef.current) return;
              objectManagerRef.current.objects.setObjectOptions(
                event.get("objectId"),
                {
                  strokeWidth: 4,
                }
              );
            })
            .add("mouseleave", (event) => {
              if (disableEventsRef.current) return;
              objectManagerRef.current.objects.setObjectOptions(
                event.get("objectId"),
                {
                  strokeWidth: 1,
                }
              );
            })
            .add("click", (event) => {
              if (disableEventsRef.current) return;
              const id = event.get("objectId");

              if (currentRegionIdRef.current) {
                objectManagerRef.current.objects.setObjectOptions(
                  currentRegionIdRef.current,
                  {
                    strokeWidth: 1,
                    fillColor: "#6ea2ff",
                  }
                );
              }

              objectManagerRef.current.objects.setObjectOptions(id, {
                strokeWidth: 2,
                fillColor: "#3B3781",
              });
              currentRegionIdRef.current = id;

              onClickRegionRef.current(id);
            });
        }, 50);
      })
      .catch((error) => console.log(error));
  }, [map, ymaps]);

  useEffect(() => {
    if (onClearRegionRef) {
      onClearRegionRef.current = onClearRegion;
    }
    if (onSelectSuccessRef) {
      onSelectSuccessRef.current = onSelectSuccess;
    }
    if (onSelectErrorRef) {
      onSelectErrorRef.current = onSelectError;
    }
  });

  return (
    <Map
      zIndex="1"
      width="100%"
      height={height}
      instanceRef={setMap}
      defaultState={{ center: [55.751574, 37.573856], zoom: 1, type: null }}
    >
      {!!successPlaceMark && <Placemark geometry={successPlaceMark} />}
    </Map>
  );
}

export default RegionsMap;
