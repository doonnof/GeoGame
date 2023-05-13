import React, { useEffect, useMemo, useState } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { Panel, PanelHeader, View } from "@vkontakte/vkui";
import SelectMode from "./SelectMode";
import { Game } from "./Game";
import { countries } from "../data/countries";
import Flag from "../components/Flag";
import { GameModel } from "../models/GameModel";
import Results from "./Results/Results";
import { SelectMapModel } from "../models/SelectMapModel";

const Home = () => {
  const [activePanel, setActivePanel] = useState("panel1");
  const gameModel = useMemo(() => new GameModel(), []);
  const selectMapModel = useMemo(() => new SelectMapModel(), []);

  useEffect(() => {
    if (activePanel === "panel1") {
      gameModel.construct();
      selectMapModel.construct();
    }
  }, [activePanel]);
  const goToPanel1 = () => {
    setActivePanel("panel1");
  };
  const goToPanel2 = () => {
    setActivePanel("panel2");
  };
  const goToPanel3 = () => {
    setActivePanel("panel3");
  };

  return (
    <YMaps query={{ apikey: "68ab1773-a0f1-43f3-a053-33f865dce43f" }}>
      <View activePanel={activePanel}>
        <SelectMode
          id="panel1"
          selectMapModel={selectMapModel}
          goToPanel2={goToPanel2}
        />
        <Game
          id="panel2"
          gameModel={gameModel}
          selectMapModel={selectMapModel}
          goToPanel3={goToPanel3}
        />
        <Results
          id="panel3"
          gameModel={gameModel}
          goToPanel1={goToPanel1}
          mapType={selectMapModel.mapType}
        />
      </View>
    </YMaps>
  );
};

export default Home;
