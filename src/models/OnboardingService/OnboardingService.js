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
            title: "Добро пожаловать!",
            subtitle: "Изучайте географию с ГеоГейм.",
            media: { blob: firstSlide, type: "image" },
          },
          {
            media: { blob: secondSlide, type: "image" },
            title: "Угадывайте страны!",
            subtitle:
              "Сможете ли вы определить на карте страну по флагу и названию?",
          },
          {
            media: { blob: thirdSlide, type: "image" },
            title: "Угадайте регионы России!",
            subtitle: "Желаем вам удачи и полезной игры!",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }
}
