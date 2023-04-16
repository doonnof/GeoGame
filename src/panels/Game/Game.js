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
import { useSubscribe } from "../hooks/useSubscribe";

function Game({ gameModel }) {
  useSubscribe(
    gameModel.currentRound$,
    gameModel.isFinish$,
    gameModel.isErrorAsk$,
    gameModel.isSuccess$
  );

  const rounds = gameModel.rounds;
  const isFinish = gameModel.isFinish$.get();
  const currentRound = gameModel.currentRound$.get();

  const onClearRegionRef = useRef(null);
  const onSelectErrorRef = useRef(null);
  const onSelectSuccessRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  const forceUpdate = useForceUpdate();

  return (
    <>
      <ModalRoot activeModal={isOpen}>
        <ModalCard
          style={{ zIndex: 4000 }}
          id
          header={
            gameModel.isTrueAnswer()
              ? "Ваш ответ правильный!"
              : "Ваш ответ неправильный!"
          }
          icon={
            <>
              {gameModel.isTrueAnswer() ? (
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
                gameModel.nextRound();
                onClearRegionRef.current();
              }}
            >
              {isFinish ? "Завершить" : "Следующий раунд"}
            </Button>
          }
        />
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
                iso3166={currentRound?.ask}
                style={{ width: 96, height: "100%", borderRadius: "6px" }}
              />
            </div>
          }
          caption={`Раунд: ${currentRound + 1}/${rounds.length}`}
        >
          {countries.find((item) => item.iso3166 === currentRound?.ask)?.name}
        </RichCell>
      </Card>
      <RegionsMap
        disableEvents={isOpen}
        height={"calc(100vh - 56px)"}
        onClearRegionRef={onClearRegionRef}
        onSelectErrorRef={onSelectErrorRef}
        onSelectSuccessRef={onSelectSuccessRef}
        onClickRegion={(id) => {
          currentRound.answer = id;
          forceUpdate();
        }}
      />

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
          style={{ width: "100%" }}
          disabled={!currentRound?.answer || isOpen}
          onClick={() => {
            if (currentRound.answer !== currentRound.ask) {
              onSelectErrorRef.current(currentRound.ask);
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
