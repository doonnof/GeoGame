import {
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderSubmit,
} from "@vkontakte/vkui";
import { Map, Panorama, Placemark, Polyline } from "react-yandex-maps";
import { Icon24Back } from "@vkontakte/icons";
import React, { useEffect, useState } from "react";

function Game() {
  const guessCoords = [55.733685, 37.588264];
  const [activeModal, setActiveModal] = useState("");
  // const [activePanorama, setActivePanorama] = useState("");

  const [map, setMap] = useState();
  const [coords, setCoords] = useState();

  useEffect(() => {
    if (!map) return;
    map.events.add("click", (event) => setCoords(event.get("coords")));
  }, [map]);

  const onClose = () => {
    setActiveModal(undefined);
    // setActivePanorama(undefined);
  };

  return (
    <>
      <PanelHeader>аэээааааъъъъ</PanelHeader>
      <Group>
        <div onClick={() => setActiveModal("select")}>open</div>
        <Panorama defaultPoint={guessCoords} />
      </Group>
      <ModalRoot activeModal={activeModal} onClose={onClose}>
        <ModalPage
          settlingHeight={100}
          onClosed={onClose}
          id="select"
          header={
            <ModalPageHeader
              before={
                <PanelHeaderButton onClick={onClose}>
                  <Icon24Back />
                </PanelHeaderButton>
              }
              after={<PanelHeaderSubmit disabled={!coords} onClick={onClose} />}
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
      </ModalRoot>
      <Map
        // instanceRef={setMap}
        width="100%"
        defaultState={{ center: guessCoords, zoom: 9 }}
      >
        {coords ? (
          <Polyline
            geometry={[guessCoords, coords]}
            options={{
              balloonCloseButton: false,
              strokeColor: "#000",
              strokeWidth: 4,
              strokeOpacity: 0.5,
            }}
          />
        ) : null}
      </Map>
    </>
  );
}

export default Game;
