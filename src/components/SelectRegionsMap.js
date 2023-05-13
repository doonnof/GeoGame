import React, { useLayoutEffect } from "react";
import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";

import { useSubscribe } from "../hooks/useSubscribe";

function scheduleDrawMap(callback) {
  setTimeout(callback, 100);
}

function SelectRegionsMap({ selectMapModel, height }) {
  useSubscribe(selectMapModel.successMarkCoords$);

  const successMarkCoords = selectMapModel.successMarkCoords$.get();

  const yMaps = useYMaps(["borders", "ObjectManager"]);

  useLayoutEffect(() => {
    if (!yMaps) return;

    selectMapModel.setYMaps(yMaps);
    yMaps.borders
      .load(selectMapModel.mapType, { lang: "ru", quality: 0 })
      .then((geoObjects) => {
        console.log(geoObjects);
        scheduleDrawMap(() => {
          selectMapModel.setGeoObjects(geoObjects);
          selectMapModel.init();
        });
      })
      .catch((error) => console.log(error));
  }, [yMaps]);

  return (
    <Map
      onLoad={() => {
        scheduleDrawMap(() => selectMapModel.loadingMap$.set(false));
      }}
      width="100%"
      height={height}
      instanceRef={selectMapModel.setMap}
      defaultState={{
        center: [65.751574, 97.573856],
        zoom: selectMapModel.mapZoom,
        type: null,
      }}
    >
      {!!successMarkCoords && <Placemark geometry={successMarkCoords} />}
    </Map>
  );
}

export default SelectRegionsMap;
