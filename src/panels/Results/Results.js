import React from "react";
import {
  Button,
  Card,
  Panel,
  PanelHeader,
  Spacing,
  Div,
} from "@vkontakte/vkui";

import ResultsItem from "./ResultsItem/ResultsItem";
import { Icon20ChevronLeft2 } from "@vkontakte/icons";

function Results({ id, gameModel, goToPanel1, mapType }) {
  return (
    <Panel id={id} style={{ overflow: "hidden", height: "100vh" }}>
      <div>
        <PanelHeader>Результаты</PanelHeader>
        <Spacing size="12px" />
        <Card mode="outline">
          {gameModel.rounds$.get().map((item) => (
            <ResultsItem key={item.ask} item={item} mapType={mapType} />
          ))}
        </Card>
        <Spacing size="12px" />
      </div>

      <Div>
        <Button before={<Icon20ChevronLeft2 />} onClick={goToPanel1}>
          На главную
        </Button>
      </Div>
    </Panel>
  );
}

export default Results;
