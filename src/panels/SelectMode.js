import { Card, CardGrid, Div, PanelHeader, Text, Title } from "@vkontakte/vkui";
import React from "react";
import { IconCountry } from "../components/IconCountry";
import { IconRegion } from "../components/IconRegion";

function SelectMode(props) {
  return (
    <>
      <PanelHeader>GeoGame</PanelHeader>

      <CardGrid size="l" spaced>
        <Card mode="shadow">
          <CardGrid size="l" spaced>
            <Title level="1" style={{ marginBottom: 16 }}>
              Выберите режим
            </Title>
            <Card onClick={props.goToPanel2}>
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 0px 0px",
                  gap: "6px",
                  paddingBottom: "20px",
                }}
              >
                <IconCountry></IconCountry>
                <Title level="2">Страны</Title>
                <Text
                  weight="3"
                  style={{ color: "var(--vkui--color_icon_medium)" }}
                >
                  Вам предстоит угадывать страны
                </Text>
              </Div>
            </Card>
            <Card>
              <Div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "20px 0px 0px",
                  gap: "6px",
                  paddingBottom: "20px",
                }}
              >
                <IconRegion></IconRegion>
                <Title level="2">Регионы</Title>
                <Text
                  weight="3"
                  style={{ color: "var(--vkui--color_icon_medium)" }}
                >
                  Вам предстоит угадывать страны
                </Text>
              </Div>
            </Card>
          </CardGrid>
        </Card>
      </CardGrid>
    </>
  );
}
export default SelectMode;
