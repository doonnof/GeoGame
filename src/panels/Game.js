import { Button, PanelHeader } from "@vkontakte/vkui";
import React, { useEffect, useRef, useState } from "react";
import RegionsMap from "../components/RegionsMap";
import { useForceUpdate } from "../hooks/useForceUpdate";

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

function Game(props) {
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
  const forceUpdate = useForceUpdate();
  return (
    <>
      <PanelHeader>Игра епт)</PanelHeader>
      <RegionsMap
        onClearRegionRef={onClearRegionRef}
        onClickRegion={(id) => {
          currentRoundItem.answer = id;
          forceUpdate();
        }}
      ></RegionsMap>
      {currentRound + 1}/{rounds.length}
      <Button
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
