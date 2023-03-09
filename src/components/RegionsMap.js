import React, { useEffect, useRef, useState } from "react";
import { Map, useYMaps } from "@pbe/react-yandex-maps";

function RegionsMap({ onClickRegion }) {
  const [map, setMap] = useState();

  const onClickRegionRef = useRef(null);

  onClickRegionRef.current = onClickRegion;
  const ymaps = useYMaps(["borders", "ObjectManager"]);

  useEffect(() => {
    if (!ymaps || !map) return;

    let selectedRegionId;

    ymaps.borders
      .load("001", { lang: "ru", quality: 0 })
      .then((geoJSON) => {
        setTimeout(() => {
          const features = geoJSON.features.map((feature) => {
            feature["id"] = feature.properties.iso3166;
            return feature;
          });

          const objectManager = new ymaps.ObjectManager();

          objectManager.add(features);
          map.geoObjects.add(objectManager);

          objectManager.events
            .add("mouseenter", (event) => {
              objectManager.objects.setObjectOptions(event.get("objectId"), {
                strokeWidth: 4,
              });
            })
            .add("mouseleave", (event) => {
              objectManager.objects.setObjectOptions(event.get("objectId"), {
                strokeWidth: 1,
              });
            })
            .add("click", (event) => {
              const id = event.get("objectId");

              if (selectedRegionId) {
                objectManager.objects.setObjectOptions(selectedRegionId, {
                  strokeWidth: 1,
                  fillColor: "#6ea2ff",
                });
              }

              objectManager.objects.setObjectOptions(id, {
                strokeWidth: 2,
                fillColor: "#3B3781",
              });
              selectedRegionId = id;

              onClickRegionRef.current(id);
            });
        }, 50);
      })
      .catch((error) => console.log(error));
  }, [map, ymaps]);

  return (
    <Map
      width="100%"
      instanceRef={setMap}
      defaultState={{ center: [55.751574, 37.573856], zoom: 1, type: null }}
    />
  );
}

export default RegionsMap;
