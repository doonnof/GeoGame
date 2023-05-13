import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";

/**
 * Хук для подписки на события
 * @param {...Subject} subjects Список объектов событий
 * @return {void}
 */
export function useSubscribe(...subjects) {
  /**
   * Функция обновления состояния
   * @type {Function}
   */
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    /**
     * Функция отписки от событий
     * @type {Function[]}
     */
    const unsubscribes = subjects.map((subject) =>
      subject?.subscribe(forceUpdate)
    );

    return () => {
      unsubscribes.forEach((unsubscribe) => unsubscribe && unsubscribe());
    };
  }, []);
}
