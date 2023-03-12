import React, { useState } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { Panel, PanelHeader, View } from "@vkontakte/vkui";
import SelectMode from "./SelectMode";
import Game from "./Game";

const Home = ({ id }) => {
  const [activePanel, setActivePanel] = useState("panel1");
  const [rounds, setRounds] = useState([]);
  const goToPanel2 = () => {
    setActivePanel("panel2");
  };
  const goToPanel3 = () => {
    setActivePanel("panel3");
  };

  return (
    <YMaps query={{ apikey: "68ab1773-a0f1-43f3-a053-33f865dce43f" }}>
      <View activePanel={activePanel}>
        <Panel id="panel1">
          <SelectMode goToPanel2={goToPanel2}></SelectMode>
        </Panel>
        <Panel id="panel2">
          <Game goToPanel3={goToPanel3} setRounds={setRounds}></Game>
        </Panel>
        <Panel id="panel3">
          <PanelHeader>Результатик{"<3"}</PanelHeader>
          <div>
            {rounds.map((item) => {
              return (
                <div key={item.answer}>
                  {item.answer}:{item.ask}
                </div>
              );
            })}
          </div>
        </Panel>
      </View>
    </YMaps>
  );
};

export default Home;
