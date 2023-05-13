import { Subject } from "./Subject";
import { computeMidGeometry } from "../utils/computeMidGeometry";

export class ResultMapModel {
  constructor(rounds) {
    this.ymaps = null;
    this.map = null;
    this.rounds = rounds;

    this.placeMarks$ = new Subject([]);
  }

  findGeometry(id) {
    return this.geoObjects.features.find((feature) => feature.id === id);
  }

  init() {
    const features = this.geoObjects.features.map((feature) => {
      feature["id"] = feature.properties.iso3166;
      return feature;
    });

    this.objectManager.add(features);
    this.map.geoObjects.add(this.objectManager);

    this.placeMarks$.set(
      this.rounds.map(({ ask, answer }) => [
        computeMidGeometry(this.findGeometry(ask)),
        computeMidGeometry(this.findGeometry(answer)),
      ])
    );
  }

  setMap = (map) => {
    this.map = map;
  };

  setYMaps(yMaps) {
    this.ymaps = yMaps;
    this.objectManager = new yMaps.ObjectManager();
  }

  setGeoObjects(geoObjects) {
    this.geoObjects = geoObjects;
  }
}
