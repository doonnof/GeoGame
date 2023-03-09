import { Button, PanelHeader } from "@vkontakte/vkui";
import React, { useEffect, useState } from "react";
import RegionsMap from "../components/RegionsMap";

const rounds = [
  {
    ask: "RU",
    answer: null,
  },
  {
    ask: "UK",
    answer: null,
  },
  {
    ask: "RU",
    answer: null,
  },
  {
    ask: "US",
    answer: null,
  },
  {
    ask: "FR",
    answer: null,
  },
];

function Game() {
  const [currentRound, setCurrentRound] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const currentRoundItem = rounds[currentRound];
  useEffect(() => {
    if (currentRound === rounds.length) {
      setIsFinish(true);
      console.log(rounds);
    }
  }, [currentRound]);
  return (
    <>
      <PanelHeader>аэээааааъъъъ</PanelHeader>
      <RegionsMap
        onClickRegion={(id) => {
          console.log(id);
          currentRoundItem.answer = id;
        }}
      ></RegionsMap>
      {currentRound + 1}/{rounds.length}
      <Button
        onClick={() => {
          setCurrentRound(currentRound + 1);
        }}
      >
        {isFinish ? "Закончить" : "Ответить"}
      </Button>
    </>
  );
}

export default Game;
