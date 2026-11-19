/**
 * TPSLAY 2026 — Конфигурация приложения
 * Группа ТПС-108 | Партнёр: ОАО «РЖД»
 */

const CONFIG = {
  // Название и метаданные
  APP_TITLE: "TPSLAY 2026",
  SUBTITLE: "Ежегодная студенческая премия группы ТПС-108",
  PARTNER_NAME: "ОАО «РЖД»",
  SEASON: "2026",

  /**
   * URL веб-приложения Google Apps Script (Web App URL).
   * Вставьте сюда ссылку, полученную после деплоя Code.gs (заканчивается на /exec).
   *
   * Пример:
   * GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbx.../exec"
   */
  GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbwrOVe_iJUiJS4l5HLNJ6poqtfBlHHd93wcT3waJuVynowCHE65ZeIzn-wW-PkqtIhb/exec",

  // Ключи для localStorage
  STORAGE_KEY_VOTED: "tpslay2026_voted_data",
  STORAGE_KEY_CURRENT_PIN: "tpslay2026_current_pin",

  // Бесконечный тестовый PIN-код: не отправляет данные в таблицу и позволяет тестировать сколько угодно
  TEST_PINS: ["148877"],

  /**
   * Список валидных 6-значных PIN-кодов для группы ТПС-108 (30 уникальных случайных кодов).
   * Имена нигде не хранятся и не передаются.
   * Выдайте по одному коду каждому одногруппнику.
   */
  VALID_PINS: [
    "482915", "739104", "295618", "841720", "610493",
    "358271", "924605", "176842", "503917", "689241",
    "417538", "862094", "239476", "751829", "394162",
    "908351", "542786", "183629", "674910", "825347",
    "319084", "467259", "790136", "258491", "631807",
    "946523", "152974", "587312", "714685", "380926"
  ],

  // В боевом режиме false — скрывает кнопку сброса голоса на финальном экране
  DEBUG_MODE: false
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
