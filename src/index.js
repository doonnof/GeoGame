import React from "react";
import ReactDOM from "react-dom";
import bridge from "@vkontakte/vk-bridge";
import App from "./App";
import { OnboardingService } from "./models/OnboardingService";

// Init VK  Mini App
bridge.send("VKWebAppInit");

new OnboardingService().runOnBoarding();

ReactDOM.render(<App />, document.getElementById("root"));
if (process.env.NODE_ENV === "development") {
  import("./eruda").then(({ default: eruda }) => {}); //runtime download
}
