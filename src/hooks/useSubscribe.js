import { useEffect, useState } from "react";

export function useSubscribe(reactiveBox) {
  const [_, forceUpdate] = useState({});

  useEffect(() => {
    const update = () => forceUpdate({});
    reactiveBox.subscribe(update);

    return reactiveBox.unsubscribe(update);
  }, []);
}