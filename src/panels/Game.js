import {
  Button,
  Card,
  ModalCard,
  ModalRoot,
  PanelHeader,
  RichCell,
} from "@vkontakte/vkui";
import React, { useEffect, useRef, useState } from "react";
import RegionsMap from "../components/RegionsMap";
import { useForceUpdate } from "../hooks/useForceUpdate";
import { countries } from "../data/countries";
import Flag from "../components/Flag";

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
  const onSelectErrorRef = useRef(null);
  const onSelectSuccessRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const [currentRound, setCurrentRound] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const currentRoundItem = rounds[currentRound];

  useEffect(() => {
    if (currentRound === rounds.length - 1) {
      setIsFinish(true);
    }
    if (currentRound === rounds.length) {
      props.goToPanel3();
      props.setRounds(rounds);
    }
  }, [currentRound]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const isTrueAnswer = currentRoundItem?.answer === currentRoundItem?.ask;

  const forceUpdate = useForceUpdate();
  return (
    <>
      <ModalRoot activeModal={isOpen}>
        <ModalCard
          style={{ zIndex: 4000 }}
          id
          header={
            isTrueAnswer ? "Ваш ответ правильный!" : "Ваш ответ неправильный!"
          }
          icon={
            <>
              {isTrueAnswer ? (
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="56" height="56" rx="28" fill="#60CE78" />
                  <path
                    d="M38.6667 21.3335L24 36.0002L17.3334 29.3335"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="56" height="56" rx="28" fill="#F35B5B" />
                  <path
                    d="M36 20L20 36"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 20L36 36"
                    stroke="white"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </>
          }
          actions={
            <Button
              style={{ width: "100%" }}
              size="l"
              onClick={() => {
                setIsOpen(false);
                setCurrentRound(currentRound + 1);
                onClearRegionRef.current();
              }}
            >
              {isFinish ? "Завершить" : "Следующий раунд"}
            </Button>
          }
        ></ModalCard>
      </ModalRoot>
      <PanelHeader>Игрулечка</PanelHeader>
      <Card
        mode="shadow"
        style={{
          zIndex: "3000",
          height: "82px",
          position: "fixed",
          width: "calc(100% - 32px)",
          top: "68px",
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <RichCell
          disabled
          before={
            <div
              style={{
                borderRadius: "6px",
                width: 96,
                height: 64,
                border: "1px solid var(--vkui--color_image_border_alpha)",
              }}
            >
              <Flag
                iso3166={currentRoundItem?.ask}
                style={{ width: 96, height: "100%", borderRadius: "6px" }}
              ></Flag>
            </div>
          }
          caption={`Раунд: ${currentRound + 1}/${rounds.length}`}
        >
          {
            countries.find((item) => item.iso3166 === currentRoundItem?.ask)
              ?.name
          }
        </RichCell>
      </Card>
      <RegionsMap
        disableEvents={isOpen}
        height={"calc(100vh - 56px)"}
        onClearRegionRef={onClearRegionRef}
        onSelectErrorRef={onSelectErrorRef}
        onSelectSuccessRef={onSelectSuccessRef}
        onClickRegion={(id) => {
          currentRoundItem.answer = id;
          forceUpdate();
        }}
      ></RegionsMap>

      <div
        style={{
          background: "#fff",
          padding: 12,
          position: "fixed",
          left: "50%",
          bottom: 0,
          width: "calc(100% - 32px)",
          transform: "translate(-50%)",
          zIndex: "3000",
        }}
      >
        <Button
          size="l"
          style={{
            width: "100%",
          }}
          disabled={!currentRoundItem?.answer || isOpen}
          onClick={() => {
            if (currentRoundItem.answer !== currentRoundItem.ask) {
              onSelectErrorRef.current(currentRoundItem.ask);
            } else {
              onSelectSuccessRef.current();
            }

            setIsOpen(true);
          }}
        >
          Ответить
        </Button>
      </div>
    </>
  );
}

export default Game;
