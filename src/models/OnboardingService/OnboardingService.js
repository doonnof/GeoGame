import bridge from "@vkontakte/vk-bridge";
import { firstSlide, secondSlide } from "./slides.js";

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
          },
          {
            media: { blob: firstSlide, type: "image" },
            title: "Угад",
            subtitle:
              "Общайтесь с ботом на любые темы, музыка, программирование, искусство.",
          },
          {
            media: { blob: secondSlide, type: "image" },
            title: "Переводите текст, изучайте языки!",
            subtitle: "Бот знает более 10 естественных языков!",
          },
        ],
      })
      .then((e) => console.log(e))
      .catch((e) => console.error(e));
  }
}
