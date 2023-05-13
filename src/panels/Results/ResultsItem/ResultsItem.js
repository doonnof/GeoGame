import React from "react";

import { SimpleCell } from "@vkontakte/vkui";

import { findCountry, findRegion } from "../../../data/utils";
import Flag from "../../../components/Flag";
import {
  Icon20CancelCircleFillRed,
  Icon20CheckCircleFillGreen,
  Icon24MinusOutline,
} from "@vkontakte/icons";

function ResultsItem({ item, mapType }) {
  const find = mapType === "001" ? findCountry : findRegion;
  const foundAnswer = find(item.answer);
  const foundAsk = find(item.ask);

  return (
    <SimpleCell
      before={
        foundAsk.iso3166 === foundAnswer.iso3166 ? (
          <Icon20CheckCircleFillGreen />
        ) : (
          <Icon20CancelCircleFillRed />
        )
      }
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          marginLeft: 24,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Flag
            iso3166={foundAsk.iso3166}
            style={{
              width: 28,
              height: 18,
              borderRadius: 3,
              border: "1px solid var(--vkui--color_image_border_alpha)",
            }}
          />
          {foundAsk.name}
        </div>
        {foundAnswer.iso3166 !== foundAsk.iso3166 && (
          <>
            <Icon24MinusOutline />
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Flag
                iso3166={foundAnswer.iso3166}
                style={{
                  width: 28,
                  height: 18,
                  borderRadius: 3,
                  border: "1px solid var(--vkui--color_image_border_alpha)",
                }}
              />
              {foundAnswer.name}
            </div>
          </>
        )}
      </div>
    </SimpleCell>
  );
}

export default ResultsItem;
