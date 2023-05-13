/**
 * Модель игры
 */
import { Subject } from "./Subject";
import { countries } from "../data/countries";
import { ruRegions } from "../data/ruRegions";

export class GameModel {
  /**
   * Конструктор класса GameModel
   */
  constructor() {
    this.construct();
  }

  construct() {
    /**
     * Текущий ответ
     * @type {Subject}
     */
    this.currentAnswer$ = new Subject();

    /**
     * Раунды
     * @type {Subject}
     */
    this.rounds$ = new Subject([]);

    /**
     * Текущий индекс раунда
     * @type {Subject}
     */
    this.currentRoundIndex$ = new Subject(0);

    /**
     * Следующий раунд - флаг
     * @type {Subject}
     */
    this.nextIsFinish$ = new Subject(false);

    /**
     * Игра завершена - флаг
     * @type {Subject}
     */
    this.isFinished$ = new Subject(false);

    /**
     * Есть ошибка вопроса - флаг
     * @type {Subject}
     */
    this.isErrorAsk$ = new Subject(false);

    /**
     * Верный ответ - флаг
     * @type {Subject}
     */
    this.isSuccessAsk$ = new Subject(false);

    /**
     * Вопрос уже задан - флаг
     * @type {Subject}
     */
    this.isAsked$ = new Subject(false);
  }

  /**
   * Получить индекс последнего раунда
   * @returns {number} Индекс последнего раунда
   */
  getLastRoundIndex() {
    return this.rounds$.get().length;
  }

  /**
   * Получить текущий раунд
   * @returns {{ask: string, answer: null}|null} Текущий раунд
   */
  getCurrentRound() {
    return this.rounds$.get()[this.currentRoundIndex$.get()];
  }

  /**
   * Проверка на верный ответ
   * @returns {boolean} Верный ответ или нет
   */
  isTrueAnswer() {
    return this.getCurrentRound()?.answer === this.getCurrentRound()?.ask;
  }

  /**
   * Переход на следующий раунд
   */
  nextRound() {
    this.currentRoundIndex$.set(this.currentRoundIndex$.get() + 1);

    if (this.getLastRoundIndex() === this.currentRoundIndex$.get() + 1) {
      this.nextIsFinish$.set(true);
    }
    if (this.getLastRoundIndex() === this.currentRoundIndex$.get()) {
      this.isFinished$.set(true);
    }
  }

  /**
   * Выбор региона
   * @param {string} id Идентификатор региона
   */
  selectRegion = (id) => {
    if (!id) return;
    this.currentAnswer$.set(id);
    this.getCurrentRound().answer = id;
  };

  /**
   * Результат раунда
   * @returns {boolean} Результат раунда
   */
  inRoundResult() {
    return this.isErrorAsk$.get() || this.isSuccessAsk$.get();
  }

  generateRegionRounds() {
    const rounds = ruRegions
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map((item) => ({ ask: item.iso3166, answer: null }));

    this.rounds$.set(rounds);
  }
  /**
   * Генерация раундов
   */
  generateRounds() {
    /**
     * Список стран
     * @type {object[]}
     */
    const rounds = countries
      .sort(() => 0.5 - Math.random())
      .slice(0, 5)
      .map((item) => ({ ask: item.iso3166, answer: null }));

    this.rounds$.set(rounds);
  }

  getSuccessRounds() {
    return this.rounds$.get().filter((item) => item.ask === item.answer);
  }

  getErrorRounds() {
    return this.rounds$.get().filter((item) => item.ask !== item.answer);
  }
}
