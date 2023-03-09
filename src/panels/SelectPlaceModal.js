import {
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  PanelHeaderSubmit,
} from "@vkontakte/vkui";
import { Icon24Back } from "@vkontakte/icons";
import { Map, Placemark } from "react-yandex-maps";
import React, { useEffect, useState } from "react";

function SelectPlaceModal({ onClose, onSubmit }) {
  const [map, setMap] = useState();
  const [coords, setCoords] = useState();

  useEffect(() => {
    if (!map) return;
    map.events.add("click", (event) => setCoords(event.get("coords")));
  }, [map]);

  return (
    <ModalPage
      settlingHeight={100}
      onClosed={onClose}
      header={
        <ModalPageHeader
          before={
            <PanelHeaderButton onClick={onClose}>
              <Icon24Back />
            </PanelHeaderButton>
          }
          after={
            <PanelHeaderSubmit
              disabled={!coords}
              onClick={() => onSubmit(coords)}
            />
          }
        >
          Dynamic modal
        </ModalPageHeader>
      }
    >
      <Map
        instanceRef={setMap}
        width="100%"
        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
      >
        <Placemark geometry={coords} />
      </Map>
    </ModalPage>
  );
}

export default SelectPlaceModal;
