import { useEffect } from "react";
import { useForceUpdate } from "./useForceUpdate";

/**
 * Хук для подписки на события
 * @param {...Subject} subjects Список объектов событий
 * @return {void}
 */
export function useSubscribe(...subjects) {

  const forceUpdate = useForceUpdate();

  useEffect(() => {
    subjects.map((subject) =>
      subject?.subscribe(forceUpdate)
    );

    return () => {
      subjects.map((subject) =>
        subject?.unsubscribe(forceUpdate)
      );
    };
  }, []);
}
