import { Button, Card, PanelHeader, Snackbar } from "@vkontakte/vkui";
import React, { useEffect, useRef, useState } from "react";
import RegionsMap from "../components/RegionsMap";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { countries } from "../data/countries";

// const rounds = [
//   {
//     ask: "RU",
//     answer: null,
//   },
//   {
//     ask: "KE",
//     answer: null,
//   },
//   {
//     ask: "RU",
//     answer: null,
//   },
//   {
//     ask: "US",
//     answer: null,
//   },
//   {
//     ask: "FR",
//     answer: null,
//   },
// ];
function generateRounds() {
  return countries
    .sort(() => 0.5 - Math.random())
    .slice(0, 5)
    .map((item) => {
      return { ask: item.iso3166, answer: null };
    });
}
function Game(props) {
  const [rounds] = useState(() => {
    return generateRounds();
  });
  const onClearRegionRef = useRef(null);
  const [currentRound, setCurrentRound] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const currentRoundItem = rounds[currentRound];
  useEffect(() => {
    if (currentRound === rounds.length - 1) {
      setIsFinish(true);
    }
    if (currentRound === rounds.length) {
      console.log(rounds);
      props.goToPanel3();
      props.setRounds(rounds);
    }
  }, [currentRound]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const forceUpdate = useForceUpdate();
  return (
    <>
      <PanelHeader>Игрулечка</PanelHeader>
      <Card
        mode="shadow"
        style={{
          zIndex: "3000",
          height: "64px",
          position: "fixed",
          width: "calc(100% - 32px)",
          top: "68px",
          left: "50%",
          transform: "translate(-50%)",
        }}
      ></Card>
      <RegionsMap
        height={"100vh"}
        onClearRegionRef={onClearRegionRef}
        onClickRegion={(id) => {
          currentRoundItem.answer = id;
          forceUpdate();
        }}
      ></RegionsMap>
      {currentRound + 1}/{rounds.length}
      <Button
        size="l"
        style={{
          position: "fixed",
          width: "calc(100% - 32px)",
          bottom: "12px",
          left: "50%",
          transform: "translate(-50%)",
          zIndex: "3000",
        }}
        disabled={!currentRoundItem?.answer}
        onClick={() => {
          onClearRegionRef.current();
          setCurrentRound(currentRound + 1);
          console.log(currentRoundItem.answer);
        }}
      >
        {isFinish ? "Закончить" : "Ответить"}
      </Button>
    </>
  );
}

export default Game;
