import React from "react";
import {
  Card,
  CardGrid,
  Div,
  PanelHeader,
  Text,
  Title,
  Panel,
} from "@vkontakte/vkui";

import { IconCountry } from "../components/IconCountry";
import { IconRegion } from "../components/IconRegion";

function SelectMode({ id, goToPanel2, selectMapModel }) {
  return (
    <Panel id={id}>
      <PanelHeader>GeoGame</PanelHeader>

      <CardGrid size="l" spaced>
        <Card mode="shadow" style={{ textAlign: "center" }}>
          <CardGrid size="l" spaced>
            <Title level="1" style={{ marginBottom: 16 }}>
              Выберите режим
            </Title>
            <Card
              onClick={() => {
                selectMapModel.mapType = "001";
                selectMapModel.mapZoom = 1;
                goToPanel2();
              }}
            >
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  paddingBottom: "20px",
                }}
              >
                <IconCountry />
                <Title level="2">Страны</Title>
                <Text
                  weight="3"
                  style={{ color: "var(--vkui--color_icon_medium)" }}
                >
                  Вам предстоит угадывать страны по всей планете!
                </Text>
              </Div>
            </Card>
            <Card
              onClick={() => {
                selectMapModel.mapType = "RU";
                selectMapModel.mapZoom = 2;
                goToPanel2();
              }}
            >
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "6px",
                  paddingBottom: "20px",
                }}
              >
                <IconRegion />
                <Title level="2">Россия</Title>
                <Text
                  weight="3"
                  style={{ color: "var(--vkui--color_icon_medium)" }}
                >
                  Попробуйте угадать все регионы России!
                </Text>
              </Div>
            </Card>
          </CardGrid>
        </Card>
      </CardGrid>
    </Panel>
  );
}
export default SelectMode;
