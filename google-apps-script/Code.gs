/**
 * =========================================================================
 * TPSLAY 2026 — Google Apps Script Backend (Серверная часть для Google Таблиц)
 * Премия группы ТПС-108 | Генеральный партнёр: ОАО «РЖД»
 * =========================================================================
 *
 * ИНСТРУКЦИЯ ПО РАЗВЕРТЫВАНИЮ ЗА 3 МИНУТЫ:
 * 1. Создайте новую Google Таблицу на Google Диске (назовите её, например, "TPSLAY 2026 - Голоса").
 * 2. В меню таблицы выберите: Расширения -> Apps Script (Extensions -> Apps Script).
 * 3. Удалите весь существующий код в редакторе и вставьте данный файл целиком.
 * 4. Нажмите синюю кнопку «Сохранить» (значок дискеты).
 * 5. В верхнем правом углу нажмите синюю кнопку «Развернуть» (Deploy) -> «Новое развертывание» (New deployment).
 * 6. Нажмите на шестерёнку слева от «Выберите тип» -> выберите «Веб-приложение» (Web app).
 * 7. Заполните параметры:
 *    - Описание: TPSLAY 2026 Backend
 *    - Запуск от имени (Execute as): «Я» (Me - ваш_email@gmail.com)
 *    - У кого есть доступ (Who has access): «Все» (Anyone) — ВАЖНО! Иначе запросы с сайта будут отклонены.
 * 8. Нажмите «Развернуть» (Deploy), разрешите доступ при запросе авторизации Google.
 * 9. Скопируйте полученный «URL веб-приложения» (заканчивается на /exec).
 * 10. Вставьте этот URL в файл `js/config.js` в переменную `GOOGLE_SCRIPT_URL`:
 *     GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycb.../exec"
 *
 * ГОТОВО! Теперь сайт будет отправлять все голоса в вашу таблицу в реальном времени.
 * =========================================================================
 */

// Список всех 18 номинаций для автоматического создания колонок
const NOMINATION_HEADERS = [
  "1. Соня года",
  "2. Обжора года",
  "3. Пиздабол года",
  "4. Подлиза года",
  "5. Мажор года",
  "6. Мразь года",
  "7. Сплетник года",
  "8. Стиляга года",
  "9. Пара года",
  "10. Еблан года",
  "11. Голос группы",
  "12. Гений года",
  "13. Мем года",
  "14. Харизма года",
  "15. Фотограф года",
  "16. Перевоплощение года",
  "17. Завоз года",
  "18. TPS KING"
];

const SHEET_VOTES = "Votes";
const SHEET_SUMMARY = "Live Results";

/**
 * Обработка POST-запросов (отправка голоса с сайта)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  // Блокировка на 30 секунд для предотвращения race condition при одновременных кликах
  try {
    lock.waitLock(30000);
  } catch (err) {
    return createJsonResponse({
      status: "error",
      code: "LOCK_TIMEOUT",
      message: "Сервер перегружен. Пожалуйста, попробуйте еще раз через пару секунд."
    });
  }

  try {
    let data;
    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({
        status: "error",
        code: "NO_DATA",
        message: "Данные не получены."
      });
    }

    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      // Поддержка form-encoded если fetch отправлен как URLSearchParams
      data = e.parameter;
    }

    const action = data.action || "vote";

    if (action === "checkPin") {
      const pinToCheck = String(data.pin || "").trim();
      if (pinToCheck === "148877") {
        return createJsonResponse({
          status: "success",
          pin: pinToCheck,
          hasVoted: false
        });
      }
      const hasVoted = checkPinAlreadyVoted(pinToCheck);
      return createJsonResponse({
        status: "success",
        pin: pinToCheck,
        hasVoted: hasVoted
      });
    }

    if (action === "vote") {
      const pin = String(data.pin || "").trim();
      const timestamp = data.timestamp || new Date().toISOString();
      const votes = data.votes || {};

      if (!pin) {
        return createJsonResponse({
          status: "error",
          code: "EMPTY_PIN",
          message: "PIN-код не указан."
        });
      }

      // Тестовый PIN 148877: не записываем в таблицу
      if (pin === "148877") {
        return createJsonResponse({
          status: "success",
          message: "Тестовый PIN принят (без записи в таблицу)!",
          timestamp: Utilities.formatDate(new Date(), "Europe/Moscow", "yyyy-MM-dd HH:mm:ss")
        });
      }

      const ss = SpreadsheetApp.getActiveSpreadsheet();
      let votesSheet = ss.getSheetByName(SHEET_VOTES);

      // Если листа еще нет — создаем и оформляем
      if (!votesSheet) {
        votesSheet = ss.insertSheet(SHEET_VOTES);
        setupVotesSheetHeaders(votesSheet);
      }

      // Проверка на повторное голосование по PIN-коду
      const alreadyVoted = checkPinInSheet(votesSheet, pin);
      if (alreadyVoted) {
        return createJsonResponse({
          status: "error",
          code: "ALREADY_VOTED",
          message: "Голос с этим PIN-кодом уже был принят ранее!"
        });
      }

      // Формируем анонимную строку для записи: Дата, PIN, Номинация 1 ... Номинация 15
      const now = new Date();
      const formattedDate = Utilities.formatDate(now, "Europe/Moscow", "yyyy-MM-dd HH:mm:ss");

      const row = [
        formattedDate,
        pin
      ];

      for (let i = 1; i <= NOMINATION_HEADERS.length; i++) {
        const choice = votes[i] || votes[String(i)] || "";
        row.push(choice);
      }

      votesSheet.appendRow(row);

      // Форматируем последнюю строку
      const lastRow = votesSheet.getLastRow();
      votesSheet.getRange(lastRow, 1, 1, row.length).setFontFamily("Roboto");

      // Обновляем сводную таблицу результатов (автоматический подсчет)
      try {
        updateSummarySheet(ss);
      } catch (sumErr) {
        Logger.log("Ошибка обновления сводной таблицы: " + sumErr);
      }

      return createJsonResponse({
        status: "success",
        message: "Голос успешно принят и сохранён!",
        timestamp: formattedDate
      });
    }

    return createJsonResponse({
      status: "error",
      code: "UNKNOWN_ACTION",
      message: "Неизвестное действие: " + action
    });

  } catch (error) {
    Logger.log("Ошибка обработки doPost: " + error.toString());
    return createJsonResponse({
      status: "error",
      code: "SERVER_ERROR",
      message: "Внутренняя ошибка сервера: " + error.message
    });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Обработка GET-запросов (проверка PIN, получение статуса или сводки)
 */
function doGet(e) {
  try {
    const params = (e && e.parameter) || {};
    const action = params.action || "ping";

    if (action === "ping") {
      return createJsonResponse({
        status: "online",
        service: "TPSLAY 2026 API",
        group: "ТПС-108",
        partner: "ОАО «РЖД»",
        time: new Date().toISOString()
      });
    }

    if (action === "checkPin") {
      const pin = String(params.pin || "").trim();
      if (pin === "148877") {
        return createJsonResponse({
          status: "success",
          pin: pin,
          hasVoted: false
        });
      }
      const hasVoted = checkPinAlreadyVoted(pin);
      return createJsonResponse({
        status: "success",
        pin: pin,
        hasVoted: hasVoted
      });
    }

    if (action === "stats") {
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const votesSheet = ss.getSheetByName(SHEET_VOTES);
      const totalVotes = votesSheet ? Math.max(0, votesSheet.getLastRow() - 1) : 0;
      return createJsonResponse({
        status: "success",
        totalVotes: totalVotes
      });
    }

    return createJsonResponse({
      status: "error",
      message: "Неизвестный параметр action."
    });
  } catch (err) {
    return createJsonResponse({
      status: "error",
      message: err.message
    });
  }
}

/**
 * Проверка, есть ли PIN в листе Votes
 */
function checkPinAlreadyVoted(pin) {
  if (!pin) return false;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_VOTES);
  if (!sheet) return false;
  return checkPinInSheet(sheet, pin);
}

function checkPinInSheet(sheet, pin) {
  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) return false; // Только заголовок или пусто

  // PIN находится во 2-й колонке (B)
  const pinRange = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  const searchPin = String(pin).trim();

  for (let i = 0; i < pinRange.length; i++) {
    if (String(pinRange[i][0]).trim() === searchPin) {
      return true;
    }
  }
  return false;
}

/**
 * Первоначальная настройка и стилизация листа Votes
 */
function setupVotesSheetHeaders(sheet) {
  const headers = ["Дата и время", "PIN-код", ...NOMINATION_HEADERS];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Стилизация шапки в стиле TPSLAY / РЖД (угольный фон, красный акцент, белый текст)
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground("#141418");
  headerRange.setFontColor("#FFFFFF");
  headerRange.setFontWeight("bold");
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  // Автоподбор ширины первых 2 колонок
  sheet.setColumnWidth(1, 160);
  sheet.setColumnWidth(2, 95);

  for (let c = 3; c <= headers.length; c++) {
    sheet.setColumnWidth(c, 190);
  }
}

/**
 * Создание или обновление сводной таблицы подсчёта голосов в реальном времени
 */
function updateSummarySheet(ss) {
  let summarySheet = ss.getSheetByName(SHEET_SUMMARY);
  if (!summarySheet) {
    summarySheet = ss.insertSheet(SHEET_SUMMARY);
    summarySheet.getRange(1, 1, 1, 4).setValues([["Номинация", "Кандидат", "Количество голосов", "% от общего"]]);
    const hr = summarySheet.getRange(1, 1, 1, 4);
    hr.setBackground("#E21A1A"); // Фирменный красный РЖД
    hr.setFontColor("#FFFFFF");
    hr.setFontWeight("bold");
    summarySheet.setFrozenRows(1);
  }

  const votesSheet = ss.getSheetByName(SHEET_VOTES);
  if (!votesSheet || votesSheet.getLastRow() <= 1) return;

  const totalVoters = votesSheet.getLastRow() - 1;
  const data = votesSheet.getRange(2, 3, totalVoters, NOMINATION_HEADERS.length).getValues();

  // Подсчитываем голоса по каждой номинации
  const summaryRows = [];

  for (let nomIdx = 0; nomIdx < NOMINATION_HEADERS.length; nomIdx++) {
    const nomTitle = NOMINATION_HEADERS[nomIdx];
    const tally = {};

    for (let rowIdx = 0; rowIdx < totalVoters; rowIdx++) {
      const candidate = String(data[rowIdx][nomIdx] || "").trim();
      if (candidate) {
        tally[candidate] = (tally[candidate] || 0) + 1;
      }
    }

    // Сортируем кандидатов по убыванию голосов
    const sortedCandidates = Object.keys(tally).sort((a, b) => tally[b] - tally[a]);

    for (const cand of sortedCandidates) {
      const count = tally[cand];
      const percent = totalVoters > 0 ? ((count / totalVoters) * 100).toFixed(1) + "%" : "0%";
      summaryRows.push([nomTitle, cand, count, percent]);
    }

    // Пустая строка-разделитель между номинациями
    summaryRows.push(["", "", "", ""]);
  }

  // Очищаем старые данные и записываем новые
  const lastRow = summarySheet.getLastRow();
  if (lastRow > 1) {
    summarySheet.getRange(2, 1, lastRow - 1, 4).clearContent();
  }

  if (summaryRows.length > 0) {
    summarySheet.getRange(2, 1, summaryRows.length, 4).setValues(summaryRows);
    summarySheet.autoResizeColumns(1, 4);
  }
}

/**
 * Вспомогательный метод формирования JSON-ответа с CORS
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

