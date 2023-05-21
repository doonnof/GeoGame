import React, { useEffect, useMemo } from "react";

import { PanelHeader, Panel, ScreenSpinner } from "@vkontakte/vkui";

import SelectRegionsMap from "../../components/SelectRegionsMap";
import { useSubscribe } from "../../hooks/useSubscribe";
import ModalCardResult from "./ModalCardResult/ModalCardResult";
import GameBanner from "./GameBanner/GameBanner";
import AskButton from "./AskButton/AskButton";
import { SelectMapModel } from "../../models/SelectMapModel";

function Game({ id, gameModel, goToPanel3, selectMapModel }) {
  useSubscribe(
    selectMapModel.loadingMap$,
    selectMapModel.currentRegionId$,
    gameModel.isFinished$,
    gameModel.currentAnswer$,
    gameModel.rounds$,
    gameModel.currentRoundIndex$,
    gameModel.nextIsFinish$,
    gameModel.isErrorAsk$,
    gameModel.isSuccessAsk$
  );

  const rounds = gameModel.rounds$.get();
  const currentRoundIndex = gameModel.currentRoundIndex$.get();
  const isFinished = gameModel.isFinished$.get();
  const currentRegionId = selectMapModel.currentRegionId$.get();
  const inRoundResult = gameModel.inRoundResult();

  useEffect(() => isFinished && goToPanel3(), [isFinished]);
  useEffect(() => gameModel.selectRegion(currentRegionId), [currentRegionId]);
  useEffect(() => {
    if (selectMapModel.mapType === "001") {
      gameModel.generateRounds();
    } else {
      gameModel.generateRegionRounds();
    }
  }, []);
  useEffect(
    () => selectMapModel.setDisableEvents(inRoundResult),
    [inRoundResult]
  );

  return (
    <Panel id={id}>
      <ModalCardResult gameModel={gameModel} selectMapModel={selectMapModel} />
      <PanelHeader>GeoGame</PanelHeader>
      <GameBanner
        currentRound={gameModel.getCurrentRound()}
        currentIndex={currentRoundIndex}
        allIndexes={rounds.length}
        mapType={selectMapModel.mapType}
      />
      <SelectRegionsMap
        height={"calc(100vh - 56px)"}
        selectMapModel={selectMapModel}
      />
      <AskButton gameModel={gameModel} selectMapModel={selectMapModel} />
      {selectMapModel.loadingMap$.get() && <ScreenSpinner state="loading" />}
    </Panel>
  );
}

export default Game;
