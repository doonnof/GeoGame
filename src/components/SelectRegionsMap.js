import React, { useLayoutEffect } from "react";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";

import { useSubscribe } from "../hooks/useSubscribe";

function scheduleDrawMap(callback) {
  setTimeout(callback, 50);
}

function RegionsMap({ mapModel, height }) {
  useSubscribe(mapModel.placemarkCoords$);

  const placeMarkCoords = mapModel.placemarkCoords$.get();

  const yMaps = useYMaps(["borders", "ObjectManager"]);

  useLayoutEffect(() => {
    if (!yMaps) return;

    mapModel.setYMaps(yMaps);
    yMaps.borders
      .load("001", { lang: "ru", quality: 0 })
      .then((geoObjects) => {
        scheduleDrawMap(() => {
          mapModel.setGeoObjects(geoObjects);
          mapModel.init();
        });
      })
      .catch((error) => console.log(error));
  }, [yMaps]);

  return (
    <Map
      onLoad={() => {
        scheduleDrawMap(() => mapModel.loadingMap$.set(false));
      }}
      width="100%"
      height={height}
      instanceRef={mapModel.setMap}
      defaultState={{ center: [55.751574, 37.573856], zoom: 1, type: null }}
    >
      {!!placeMarkCoords && <Placemark geometry={placeMarkCoords} />}
    </Map>
  );
}

export default RegionsMap;
