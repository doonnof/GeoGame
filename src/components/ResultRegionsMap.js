import { Map, Placemark, useYMaps } from "@pbe/react-yandex-maps";
import React, { useEffect, useLayoutEffect } from "react";
import { useSubscribe } from "../hooks/useSubscribe";

function scheduleDrawMap(callback) {
  setTimeout(callback, 100);
}

function ResultRegionsMap({ height, resultMapModel }) {
  const yMaps = useYMaps(["borders", "ObjectManager"]);

  useSubscribe(resultMapModel.placeMarks$);

  useLayoutEffect(() => {
    if (!yMaps) return;

    resultMapModel.setYMaps(yMaps);
    yMaps.borders
      .load("001", { lang: "ru", quality: 0 })
      .then((geoObjects) => {
        scheduleDrawMap(() => {
          resultMapModel.setGeoObjects(geoObjects);
          resultMapModel.init();
        });
      })
      .catch((error) => console.log(error));

    // Создаём макет иконки.
    // const MyIconLayout = yMaps.templateLayoutFactory.createClass(
    //   [
    //     '<svg width="46" height="46" style="position: absolute; top: -23px; left: -23px;">',
    //     '<use href="#sym01"/>',
    //     "</svg>",
    //   ].join("")
    // );
    // const myPlacemark = new yMaps.Placemark(
    //   map.getCenter(),
    //   {
    //     hintContent: "Собственный значок метки",
    //     balloonContent: "Это красивая метка",
    //   },
    //   {
    //     iconLayout: MyIconLayout,
    //     iconShape: {
    //       type: "Circle",
    //       // Круг описывается в виде центра и радиуса
    //       coordinates: [55.751574, 37.573856],
    //       radius: 23,
    //     },
    //   }
    // );
    //
    // map.geoObjects.add(myPlacemark);
  }, [yMaps]);

  return (
    <Map
      width="100%"
      height={height}
      instanceRef={resultMapModel.setMap}
      defaultState={{ center: [55.751574, 37.573856], zoom: 1, type: null }}
    >
      {/*{resultMapModel.placeMarks$.get().map((marks) =>*/}
      {/*  marks.map((coords) => (*/}
      {/*    <>*/}
      {/*      <Placemark*/}
      {/*        options={{*/}
      {/*          iconShape: {*/}
      {/*            type: "Circle",*/}
      {/*            radius: 23,*/}
      {/*            coordinates: coords,*/}
      {/*          },*/}
      {/*          iconLayout: yMaps?.templateLayoutFactory?.createClass(*/}
      {/*            [*/}
      {/*              '<svg width="46" height="46" style="position: absolute; top: -23px; left: -23px;">',*/}
      {/*              '<use href="#sym01"/>',*/}
      {/*              "</svg>",*/}
      {/*            ].join("")*/}
      {/*          ),*/}
      {/*        }}*/}
      {/*      />*/}
      {/*      }*/}
      {/*    </>*/}
      {/*  ))*/}
      {/*)}*/}
    </Map>
  );
}

export default ResultRegionsMap;
