import {GameModel} from "../GameModel";

describe('GameModel', () => {
    test('должен быть определен', () => {
        const gameModel = new GameModel();
        expect(gameModel).toBeDefined();
    });

    test('должен возвращать правильный индекс последнего раунда', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        expect(gameModel.getLastRoundIndex()).toEqual(5);
    });

    test('должен возвращать текущий раунд', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        expect(gameModel.getCurrentRound()).toHaveProperty('ask');
        expect(gameModel.getCurrentRound()).toHaveProperty('answer');
    });

    test('должен возвращать true или false, если текущий ответ правильный', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        const currentRound = gameModel.getCurrentRound();
        currentRound.answer = currentRound.ask;
        expect(gameModel.isTrueAnswer()).toBe(true);
    });

    test('должен изменять ответ текущего раунда', () => {
        const gameModel = new GameModel();
        gameModel.generateRegionRounds();
        const currentRound = gameModel.getCurrentRound();
        gameModel.selectRegion('RU');
        expect(currentRound.answer).toBe('RU');
    });

    test('должен увеличивать индекс текущего раунда на 1', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        const startingIndex = gameModel.currentRoundIndex$.get();
        gameModel.nextRound();
        expect(gameModel.currentRoundIndex$.get()).toEqual(startingIndex + 1);
    });

    test('должен возвращать true, если isErrorAsk$ или isSuccessAsk$ равно true', () => {
        const gameModel = new GameModel();
        gameModel.isErrorAsk$.set(true);
        expect(gameModel.inRoundResult()).toBe(true);
    });


    test('должен генерировать раунды с странами', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        expect(gameModel.rounds$.get().length).toEqual(5);
        const round = gameModel.rounds$.get()[0];
        expect(round).toHaveProperty('ask');
        expect(round).toHaveProperty('answer', null);
    });

    test('должен возвращать массив успешных раундов', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        const rounds = gameModel.rounds$.get();
        rounds[0].answer = rounds[0].ask;
        rounds[1].answer = rounds[1].ask;
        rounds[2].answer = 'wrong'; // неправильный ответ
        expect(gameModel.getSuccessRounds().length).toEqual(2);
    });

    test('должен возвращать массив ошибочных раундов', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        const rounds = gameModel.rounds$.get();
        rounds[0].answer = rounds[0].ask;
        rounds[1].answer = rounds[1].ask;
        rounds[2].answer = 'wrong'; // неправильный ответ
        expect(gameModel.getErrorRounds().length).toEqual(3);
    });

    test('не должен изменять текущий ответ, если id не указан', () => {
        const gameModel = new GameModel();
        gameModel.generateRegionRounds();
        const currentRound = gameModel.getCurrentRound();
        const currentAnswer = currentRound.answer;
        gameModel.selectRegion();
        expect(currentRound.answer).toEqual(currentAnswer);
    });

    test('должен установить isFinished$ в true, если это последний раунд', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        gameModel.currentRoundIndex$.set(gameModel.getLastRoundIndex() - 1);
        gameModel.nextRound();
        expect(gameModel.isFinished$.get()).toEqual(true);
    });

    test('должен установить nextIsFinish$ в true, если это предпоследний раунд', () => {
        const gameModel = new GameModel();
        gameModel.generateRounds();
        gameModel.currentRoundIndex$.set(gameModel.getLastRoundIndex() - 2);
        gameModel.nextRound();
        expect(gameModel.nextIsFinish$.get()).toEqual(true);
    });

    test('должен возвращать true, если isErrorAsk$ равен true', () => {
        const gameModel = new GameModel();
        gameModel.isErrorAsk$.set(true);
        expect(gameModel.inRoundResult()).toBe(true);
    });

    test('должен возвращать true, если isSuccessAsk$ равен true', () => {
        const gameModel = new GameModel();
        gameModel.isSuccessAsk$.set(true);
        expect(gameModel.inRoundResult()).toBe(true);
    });

    test('должен возвращать true, если и isErrorAsk$ и isSuccessAsk$ равны true', () => {
        const gameModel = new GameModel();
        gameModel.isSuccessAsk$.set(true);
        gameModel.isErrorAsk$.set(true);
        expect(gameModel.inRoundResult()).toBe(true);
    });
});
