import React, { useEffect, useState } from "react";
import { Map, Panorama, Placemark, YMaps } from "react-yandex-maps";
import {
  Group,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  Panel,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderSubmit,
  SplitLayout,
  View,
} from "@vkontakte/vkui";
import SelectMode from "./SelectMode";
import { Icon24Back } from "@vkontakte/icons";
import Game from "./Game";

const Home = ({ id }) => {
  const [activePanel, setActivePanel] = useState("panel1");

  const goToPanel2 = () => {
    setActivePanel("panel2");
  };

  return (
    <YMaps query={{ apikey: "68ab1773-a0f1-43f3-a053-33f865dce43f" }}>
      <View activePanel={activePanel}>
        <Panel id="panel1">
          <SelectMode goToPanel2={goToPanel2}></SelectMode>
        </Panel>
        <Panel id="panel2">
          <Game />
        </Panel>
      </View>
    </YMaps>
  );
};

export default Home;
