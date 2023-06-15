import React from "react";
import {
  Button,
  ButtonGroup,
  Card,
  CardGrid,
  Panel,
  PanelHeader,
  Placeholder,
  Spacing,
  Title,
} from "@vkontakte/vkui";

import ResultsItem from "./ResultsItem/ResultsItem";
import ResultIcon from "./ResultIcon";
import {
  Icon20ChevronLeftOutline,
  Icon24RepeatOutline,
} from "@vkontakte/icons";
import bridge from "@vkontakte/vk-bridge";

function getResultText(success) {
  if (success > 3) return "Умница! Шикарный результат!";
  if (success > 0) return "Хороший результ! Не останаливайтесь!";
  return "Могло быть и лучше. Попробуйте еще!";
}

function Results({
  id,
  gameModel,
  goToPanel1,
  goToPanel2,
  mapType,
  selectMapModel,
}) {
  const rounds = gameModel.rounds$.get();
  const successRounds = gameModel.getSuccessRounds();

  const showAd = () => {
    bridge
      .send("VKWebAppShowNativeAds", {
        ad_format: "interstitial" /* Тип рекламы */,
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Panel id={id} style={{ overflow: "hidden", height: "100vh" }}>
      <PanelHeader>GeoGame</PanelHeader>
      <Spacing size="12px" />
      <CardGrid size="l" spaced>
        <Card mode="outline">
          <CardGrid size="l" spaced style={{ gap: 8 }}>
            <Title level="3">Результаты</Title>
          </CardGrid>

          {gameModel.rounds$.get().map((item) => (
            <ResultsItem key={item.ask} item={item} mapType={mapType} />
          ))}
        </Card>
      </CardGrid>
      <CardGrid size="l" spaced style={{ marginTop: 0 }}>
        <Card mode="outline">
          <Placeholder
            icon={<ResultIcon success={successRounds.length} />}
            header={`${successRounds.length} из ${rounds.length} правильных ответов`}
            action={
              <ButtonGroup align="center" mode="vertical">
                <Button
                  before={<Icon24RepeatOutline />}
                  size="m"
                  mode="outline"
                  onClick={() => {
                    const mapType = selectMapModel.mapType;
                    const mapZoom = selectMapModel.mapZoom;

                    gameModel.construct();
                    selectMapModel.construct();

                    selectMapModel.mapType = mapType;
                    selectMapModel.mapZoom = mapZoom;

                    goToPanel2();

                    showAd();
                  }}
                >
                  Повторить игру
                </Button>
                <Button
                  before={<Icon20ChevronLeftOutline />}
                  size="m"
                  mode="outline"
                  onClick={() => {
                    goToPanel1();
                    showAd();
                  }}
                >
                  Назад на главную
                </Button>
              </ButtonGroup>
            }
          >
            {getResultText(successRounds.length)}
          </Placeholder>
        </Card>
      </CardGrid>
    </Panel>
  );
}

export default Results;
