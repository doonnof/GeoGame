import {
  Button,
  ButtonGroup,
  Card,
  CardGrid,
  Group,
  Panel,
  PanelHeader,
  RichCell,
} from "@vkontakte/vkui";
import { Icon96GoodsCollection } from "@vkontakte/icons";
import React from "react";

function SelectMode(props) {
  return (
    <>
      <PanelHeader>Выбор режима</PanelHeader>
      <Group>
        <Group mode="plain">
          <CardGrid size="l">
            <Card mode="shadow" onClick={props.goToPanel2}>
              <RichCell
                before={<Icon96GoodsCollection />}
                caption="блаблаблабла блаблабла блаблабла блаблаблаблаблабла блаблабла  бла бла блабла блаблабла блабла"
                actions={
                  <ButtonGroup
                    style={{ flexDirection: "row-reverse" }}
                    stretched
                  >
                    <Button mode="primary" size="s">
                      Играть
                    </Button>
                  </ButtonGroup>
                }
                multiline
                disabled
              >
                Одиночный режим
              </RichCell>
            </Card>
          </CardGrid>
        </Group>
      </Group>
    </>
  );
}
export default SelectMode;
