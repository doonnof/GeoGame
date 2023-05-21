import React from "react";
import {
  Button,
  Card,
  CardGrid,
  Counter,
  Div,
  FixedLayout,
  Panel,
  PanelHeader,
  Spacing,
  Text,
  Title,
} from "@vkontakte/vkui";

import ResultsItem from "./ResultsItem/ResultsItem";

function Results({ id, gameModel, goToPanel1, mapType }) {
  const rounds = gameModel.rounds$.get();
  const successRounds = gameModel.getSuccessRounds();

  return (
    <Panel id={id} style={{ overflow: "hidden", height: "100vh" }}>
      <PanelHeader>GeoGame</PanelHeader>
      <Spacing size="12px" />
      <CardGrid size="l" spaced>
        <Card mode="outline">
          <CardGrid size="l" spaced style={{ gap: 8 }}>
            <Title level="3">Результаты</Title>
            <Counter mode="primary" style={{ padding: 8 }}>
              <Text weight="3">
                {successRounds.length} из {rounds.length}
              </Text>
            </Counter>
          </CardGrid>

          {gameModel.rounds$.get().map((item) => (
            <ResultsItem key={item.ask} item={item} mapType={mapType} />
          ))}
        </Card>
      </CardGrid>
      <Spacing size="12px" />

      <FixedLayout vertical="bottom">
        <Div>
          <Button style={{ width: "100%" }} size="l" onClick={goToPanel1}>
            Назад на главную
          </Button>
        </Div>
      </FixedLayout>
    </Panel>
  );
}

export default Results;
