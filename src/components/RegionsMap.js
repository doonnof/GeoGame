import React, { useEffect, useRef, useState } from "react";
import { Map, useYMaps } from "@pbe/react-yandex-maps";

function RegionsMap({ onClickRegion, onClearRegionRef, height }) {
  const [map, setMap] = useState();

  const onClickRegionRef = useRef(null);
  const currentRegionIdRef = useRef(null);
  const objectManagerRef = useRef(null);

  onClickRegionRef.current = onClickRegion;
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
  };
  useEffect(() => {
    if (!ymaps || !map) return;
    objectManagerRef.current = new ymaps.ObjectManager();
    ymaps.borders
      .load("001", { lang: "ru", quality: 0 })
      .then((geoJSON) => {
        setTimeout(() => {
          const features = geoJSON.features.map((feature) => {
            feature["id"] = feature.properties.iso3166;
            return feature;
          });

          objectManagerRef.current.add(features);
          map.geoObjects.add(objectManagerRef.current);

          objectManagerRef.current.events
            .add("mouseenter", (event) => {
              objectManagerRef.current.objects.setObjectOptions(
                event.get("objectId"),
                {
                  strokeWidth: 4,
                }
              );
            })
            .add("mouseleave", (event) => {
              objectManagerRef.current.objects.setObjectOptions(
                event.get("objectId"),
                {
                  strokeWidth: 1,
                }
              );
            })
            .add("click", (event) => {
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
    onClearRegionRef.current = onClearRegion;
  }, []);

  return (
    <Map
      width="100%"
      height={height}
      instanceRef={setMap}
      defaultState={{ center: [55.751574, 37.573856], zoom: 1, type: null }}
    />
  );
}

export default RegionsMap;
