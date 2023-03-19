import React, { useState } from "react";
import { YMaps } from "@pbe/react-yandex-maps";
import { Panel, PanelHeader, View } from "@vkontakte/vkui";
import SelectMode from "./SelectMode";
import Game from "./Game";
import { countries } from "../data/countries";
import Flag from "../components/Flag";

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
              const foundAnswer = countries.find(
                (countryItem) => countryItem.iso3166 === item.answer
              );
              const foundAsk = countries.find(
                (countryItem) => countryItem.iso3166 === item.ask
              );

              return (
                <div
                  key={item.ask}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Flag
                      iso3166={foundAsk.iso3166}
                      style={{ width: 30, height: 10 }}
                    ></Flag>
                    {foundAsk.name}
                  </div>
                  --
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Flag
                      iso3166={foundAnswer.iso3166}
                      style={{ width: 30, height: 10 }}
                    ></Flag>
                    {foundAnswer.name}
                  </div>
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
