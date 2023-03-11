import { useState } from "react";

export function useForceUpdate() {
  const [state, setState] = useState({});

  return () => setState({});
}
