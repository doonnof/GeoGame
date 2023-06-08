import React from "react";
import { AdaptivityProvider, AppRoot, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Home from "./panels/Home";
import "./index.css";

const App = () => {
  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider viewWidth={2}>
        <AppRoot>
          <Home id="home" />
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
