import React, { useMemo } from "react";

import { Card, RichCell } from "@vkontakte/vkui";

import Flag from "../../../components/Flag";

import classes from "./GameBanner.module.css";
import { findCountry, findRegion } from "../../../data/utils";

function GameBanner({ currentIndex, allIndexes, currentRound, mapType }) {
  const nameRegion =
    mapType === "001"
      ? findCountry(currentRound?.ask)?.name
      : findRegion(currentRound?.ask)?.name;

  return (
    <Card mode="shadow" className={classes.card}>
      <RichCell
        disabled
        before={
          <div className={classes.flagContainer}>
            <Flag iso3166={currentRound?.ask} className={classes.flag} />
          </div>
        }
        caption={`Раунд: ${currentIndex + 1}/${allIndexes}`}
      >
        {nameRegion}
      </RichCell>
    </Card>
  );
}

export default GameBanner;
