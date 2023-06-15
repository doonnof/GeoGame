import bridge from "@vkontakte/vk-bridge";
import { firstSlide, secondSlide, thirdSlide } from "./slides.js";

export class OnboardingService {
  async runOnBoarding() {
    const isFirstVisit = JSON.parse(localStorage.getItem("isFirstVisit"));
    if (isFirstVisit) return;

    localStorage.setItem("isFirstVisit", JSON.stringify(true));

    bridge
      .send("VKWebAppShowSlidesSheet", {
        slides: [
          {
            title: "Привет! Рады приветствовать тебя в нашей игре.",
            subtitle: "Готов попробовать свои силы и проверить свои знания?",
            media: { blob: firstSlide, type: "image" },
          },
          {
            media: { blob: secondSlide, type: "image" },
            title: "Угадайте регионы России!",
            subtitle: "Проверь свои знания российской географии на практике!",
          },
          {
            media: { blob: thirdSlide, type: "image" },
            title: "Угадывайте страны мира!",
            subtitle:
              "Тебе предстоит угадать, как называется та или иная страна на карте. Готов к испытанию?",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }
}
