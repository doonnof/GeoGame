import React from "react";

import { SimpleCell, Caption, Text } from "@vkontakte/vkui";

import { findCountry, findRegion } from "../../../data/utils";
import Flag from "../../../components/Flag";
import {
  Icon20CancelCircleFillRed,
  Icon20CheckCircleFillGreen,
} from "@vkontakte/icons";

function ResultsItem({ item, mapType }) {
  const find = mapType === "001" ? findCountry : findRegion;
  const foundAnswer = find(item.answer);
  const foundAsk = find(item.ask);

  const isSuccess = foundAsk.iso3166 === foundAnswer.iso3166;
  return (
    <SimpleCell
      disabled
      before={
        <Flag
          iso3166={foundAsk.iso3166}
          style={{
            minWidth: 28,
            width: 28,
            height: 18,
            borderRadius: 3,
            border: "1px solid var(--vkui--color_image_border_alpha)",
          }}
        />
      }
      after={
        isSuccess ? (
          <Icon20CheckCircleFillGreen width={24} height={24} />
        ) : (
          <Icon20CancelCircleFillRed width={24} height={24} />
        )
      }
    >
      <div style={{ paddingLeft: 12 }}>
        <Text weight="2" style={{ whiteSpace: "normal" }}>
          {foundAsk.name}
        </Text>
        {!isSuccess && (
          <Caption
            style={{ color: "var(--vkui--color_background_negative--active)" }}
          >
            {foundAnswer.name}
          </Caption>
        )}
      </div>
    </SimpleCell>
  );
}

export default ResultsItem;
