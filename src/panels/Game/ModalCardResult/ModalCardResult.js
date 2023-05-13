import React from "react";
import { Button, ModalCard, ModalRoot } from "@vkontakte/vkui";
import {
  Icon20CancelCircleFillRed,
  Icon20CheckCircleFillGreen,
} from "@vkontakte/icons";
import classes from "./ModalCardResult.module.css";
function ModalCardResult({ gameModel, selectMapModel }) {
  return (
    <ModalRoot activeModal={gameModel.inRoundResult()}>
      <ModalCard
        className={classes.cardResult}
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
              <Icon20CheckCircleFillGreen width={56} height={56} />
            ) : (
              <Icon20CancelCircleFillRed width={56} height={56} />
            )}
          </>
        }
        actions={
          <Button
            style={{ width: "100%" }}
            size="l"
            onClick={() => {
              gameModel.nextRound();
              gameModel.isErrorAsk$.set(false);
              gameModel.isSuccessAsk$.set(false);
              gameModel.currentAnswer$.set(null);
              selectMapModel.onClearRegion();
            }}
          >
            {gameModel.nextIsFinish$.get() ? "Завершить" : "Следующий раунд"}
          </Button>
        }
      />
    </ModalRoot>
  );
}

export default ModalCardResult;
