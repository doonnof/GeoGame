import React, { useState } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { Panel, View } from "@vkontakte/vkui";
import SelectMode from "./SelectMode";
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
