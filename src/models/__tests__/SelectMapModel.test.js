import {SelectMapModel} from "../SelectMapModel";

describe("SelectMapModel", () => {
    let selectMapModel;

    beforeEach(() => {
        selectMapModel = new SelectMapModel();
    });

    it("должен присвоить geoObjects полю geoObjects", () => {
        const geoObjects = [{id: 1}, {id: 2}];
        selectMapModel.setGeoObjects(geoObjects);
        expect(selectMapModel.geoObjects).toBe(geoObjects);
    });

    it("должен установить поле disableEvents в true", () => {
        selectMapModel.setDisableEvents(true);
        expect(selectMapModel.disableEvents).toBe(true);
    });

    it("должен установить поле disableEvents в false", () => {
        selectMapModel.setDisableEvents(false);
        expect(selectMapModel.disableEvents).toBe(false);
    });

    it("должен добавить событие mouseenter для объектов", () => {
        const objectManager = {
            events: {
                add: jest.fn()
            }
        };
        selectMapModel.objectManager = objectManager;
        selectMapModel.addMouseenter();

        expect(objectManager.events.add).toHaveBeenCalledWith(
            "mouseenter",
            expect.any(Function)
        );
    });

    it("должен добавить событие mouseleave для объектов", () => {
        const objectManager = {
            events: {
                add: jest.fn()
            }
        };
        selectMapModel.objectManager = objectManager;
        selectMapModel.addMouseleave();

        expect(objectManager.events.add).toHaveBeenCalledWith(
            "mouseleave",
            expect.any(Function)
        );
    });

    it("должен добавить событие click для объектов и вызвать метод selectRegion, когда оно вызывается", () => {
        selectMapModel.selectRegion = jest.fn();
        selectMapModel.currentRegionId$.set = jest.fn();
        const objectManager = {
            events: {
                add: jest.fn()
            },
            get: (objectId) => {
                return {
                    get: () => objectId
                };
            }
        };
        selectMapModel.objectManager = objectManager;

        selectMapModel.addClick();
        objectManager.events.add.mock.calls[0][1]({
            get: () => 1
        });

        expect(objectManager.events.add).toHaveBeenCalledWith(
            "click",
            expect.any(Function)
        );
        expect(selectMapModel.selectRegion).toHaveBeenCalledWith(1);
        expect(selectMapModel.currentRegionId$.set).toHaveBeenCalledWith(1);

    });

    it("не должен вызывать метод selectRegion, когда disableEvents равен true", () => {
        selectMapModel.disableEvents = true;
        selectMapModel.selectRegion = jest.fn();
        selectMapModel.currentRegionId$.set = jest.fn();
        const objectManager = {
            events: {
                add: jest.fn()
            },
            get: (objectId) => {
                return {
                    get: () => objectId
                };
            }
        };
        selectMapModel.objectManager = objectManager;

        selectMapModel.addClick();
        objectManager.events.add.mock.calls[0][1]({
            get: () => 1
        });

        expect(selectMapModel.selectRegion).not.toHaveBeenCalled();
        expect(selectMapModel.currentRegionId$.set).not.toHaveBeenCalled();
    });
});
