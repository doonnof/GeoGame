/**
 * Класс для работы с картой и объектами на ней
 *
 * @class SelectMapModel
 */
import { Subject } from "./Subject";
import { computeMidGeometry } from "../utils/computeMidGeometry";

export class SelectMapModel {
  /**
   * Конструктор класса SelectMapModel
   *
   * @constructor
   */
  constructor() {
    this.construct();
  }
  construct() {
    this.mapZoom = 1;
    this.mapType = "001";
    /**
     * Объект карты Яндекс
     *
     * @type {Object}
     * @default null
     */
    this.ymaps = null;

    /**
     * Идентификатор выбранного региона
     *
     * @type {Number}
     * @default null
     */
    this.currentRegionId = null;

    /**
     * Включение/отключение обработки событий
     *
     * @type {Boolean}
     * @default false
     */
    this.disableEvents = false;

    /**
     * Объект менеджера объектов Яндекс
     *
     * @type {Object}
     * @default null
     */
    this.objectManager = null;

    /**
     * Коллекция объектов геометрии на карте
     *
     * @type {Array}
     * @default []
     */
    this.geoObjects = [];

    /**
     * Объект карты Яндекс
     *
     * @type {Object}
     * @default null
     */
    this.map = null;

    /**
     * Subject координат метки
     *
     * @type {Subject}
     */
    this.errorMarkCoords$ = new Subject(null);

    this.successMarkCoords$ = new Subject(null);

    /**
     * Subject идентификаторов текущего региона
     *
     * @type {Subject}
     */
    this.currentRegionId$ = new Subject(null);

    /**
     * Subject загрузки карты
     *
     * @type {Subject}
     */
    this.loadingMap$ = new Subject(true);
  }
  /**
   * Устанавливает карту Яндекс
   *
   * @param {Object} yMaps Карта Яндекс
   */
  setYMaps(yMaps) {
    this.ymaps = yMaps;

    /**
     * Объект менеджера объектов Яндекс
     *
     * @type {Object}
     */
    this.objectManager = new yMaps.ObjectManager();
  }

  /**
   * Устанавливает коллекцию объектов на карте
   *
   * @param {Array} geoObjects Коллекция объектов геометрии на карте
   */
  setGeoObjects(geoObjects) {
    this.geoObjects = geoObjects;
  }

  /**
   * Устанавливает объект карты Яндекс
   *
   * @param {Object} map Объект карты Яндекс
   */
  setMap = (map) => {
    this.map = map;
  };

  /**
   * Устанавливает включение/отключение обработки событий
   *
   * @param {Boolean} value Состояние включения/отключения обработки событий
   */
  setDisableEvents(value) {
    this.disableEvents = value;
  }

  /**
   * Инициализация карты
   */
  init() {
    /**
     * Массив объектов геометрии
     *
     * @type {Array}
     */
    const features = this.geoObjects.features.map((feature) => {
      feature["id"] = feature.properties.iso3166;
      return feature;
    });

    this.objectManager.add(features);
    this.map.geoObjects.add(this.objectManager);

    this.addMouseleave();
    this.addMouseenter();
    this.addClick();
  }

  /**
   * Добавляет обработку события mouseenter на объекты геометрии
   */
  addMouseenter() {
    this.objectManager.events.add("mouseenter", (event) => {
      if (!this.disableEvents) this.enterRegion(event.get("objectId"));
    });
  }

  /**
   * Добавляет обработку события mouseleave на объекты геометрии
   */
  addMouseleave() {
    this.objectManager.events.add("mouseleave", (event) => {
      if (!this.disableEvents) this.leaveRegion(event.get("objectId"));
    });
  }

  /**
   * Добавляет обработку события click на объекты геометрии
   */
  addClick() {
    this.objectManager.events.add("click", (event) => {
      if (this.disableEvents) return;

      if (this.currentRegionId) this.resetRegion(this.currentRegionId);

      this.selectRegion(event.get("objectId"));
      this.currentRegionId = event.get("objectId");
      this.currentRegionId$.set(event.get("objectId"));
    });
  }

  /**
   * Сброс текущего региона на карте
   */
  onClearRegion() {
    this.resetRegion(this.currentRegionId);
    this.resetRegion(this.successId);
    this.errorMarkCoords$.set(null);
    this.successMarkCoords$.set(null);
    this.currentRegionId = null;
  }

  /**
   * Установка региона в состояние успеха
   */
  onSelectSuccess() {
    this.successRegion(this.currentRegionId);
    this.successMarkCoords$.set(
      computeMidGeometry(this.findRegion(this.currentRegionId))
    );
  }

  /**
   * Установка региона в состояние ошибки
   *
   * @param {Number} successId Идентификатор региона
   */
  onSelectError(successId) {
    this.successId = successId;

    this.errorRegion(this.currentRegionId);
    this.successRegion(this.successId);

    this.successMarkCoords$.set(computeMidGeometry(this.findRegion(successId)));

    this.zoom(this.mapZoom);
  }

  /**
   * Установка выделения региона при наведении на него курсора мыши
   *
   * @param {Number} id Идентификатор региона
   */
  enterRegion(id) {
    if (id) this.markRegion(id, 4);
  }

  /**
   * Установка снятия выделения региона при уведении курсора мыши с него
   *
   * @param {Number} id Идентификатор региона
   */
  leaveRegion(id) {
    if (id) this.markRegion(id, 1);
  }

  /**
   * Сброс выделения региона на карте
   *
   * @param {Number} id Идентификатор региона
   */
  resetRegion(id) {
    if (id) this.markRegion(id, 1, "#6ea2ff");
  }

  /**
   * Установка региона в состояние успеха
   *
   * @param {Number} id Идентификатор региона
   */
  successRegion(id) {
    if (id) this.markRegion(id, 2, "#5cfa65");
  }

  /**
   * Установка региона в состояние ошибки
   *
   * @param {Number} id Идентификатор региона
   */
  errorRegion(id) {
    if (id) this.markRegion(id, 2, "#fc5b4d");
  }

  /**
   * Выделение региона на карте
   *
   * @param {Number} id Идентификатор региона
   */
  selectRegion(id) {
    if (id) this.markRegion(id, 2, "#3B3781");
  }

  /**
   * Установка стилей геометрии объектов на карте
   *
   * @param {Number} id Идентификатор региона
   * @param {Number} strokeWidth Толщина обводки
   * @param {String} fillColor Цвет заливки
   */
  markRegion(id, strokeWidth, fillColor) {
    const style = {};

    if (strokeWidth) style["strokeWidth"] = strokeWidth;
    if (fillColor) style["fillColor"] = fillColor;

    this.getObjects().setObjectOptions(id, style);
  }

  /**
   * Поиск объекта геометрии на карте по идентификатору региона
   *
   * @param {Number} iso3166 Идентификатор региона
   * @returns {Object} Объект геометрии на карте
   */
  findRegion(iso3166) {
    return this.geoObjects.features.find(({ id }) => iso3166 === id);
  }

  /**
   * Получение объектов геометрии на карте
   *
   * @returns {Object} Объекты геометрии на карте
   */
  getObjects() {
    return this.objectManager.objects;
  }

  /**
   * Установка масштаба карты
   *
   * @param {Number} value Значение масштаба
   */
  zoom(value) {
    this.map.options.set("maxAnimationZoomDifference", Infinity);
    this.map.setZoom(value, { duration: 1000 });
  }
}
