import React from "react";
import { Button, Div } from "@vkontakte/vkui";

import classes from "./AskButton.module.css";

function AskButton({ gameModel, selectMapModel }) {
  const currentAnswer = gameModel.currentAnswer$.get();
  const currentRound = gameModel.getCurrentRound();

  const onClick = () => {
    if (gameModel.isTrueAnswer()) {
      selectMapModel.onSelectSuccess();
      gameModel.isSuccessAsk$.set(true);
      return;
    }

    selectMapModel.onSelectError(currentRound.ask);
    gameModel.isErrorAsk$.set(true);
  };

  return (
    <div className={classes.container}>
      <Div>
        <Button
          size="l"
          style={{ width: "100%" }}
          disabled={!currentAnswer}
          onClick={onClick}
        >
          Ответить
        </Button>
      </Div>
    </div>
  );
}

export default AskButton;
