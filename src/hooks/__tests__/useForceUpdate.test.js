import { renderHook } from "@testing-library/react-hooks";
import { useSubscribe } from "../useSubscribe";

describe("useSubscribe", () => {
    test("should call subscribers' handlers for each provided subject", () => {
        const subject1 = { subscribe: jest.fn() };
        const subject2 = { subscribe: jest.fn() };

        const { unmount } = renderHook(() => useSubscribe(subject1, subject2));

        expect(subject1.subscribe).toHaveBeenCalledWith(expect.any(Function));
        expect(subject2.subscribe).toHaveBeenCalledWith(expect.any(Function));

        unmount();
    });
});