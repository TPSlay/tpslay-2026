/**
 * TPSLAY 2026 — Основная логика голосования
 * Группа ТПС-3-108 | Партнёр: ОАО «РЖД»
 */

document.addEventListener("DOMContentLoaded", () => {
  // ================= МИНИМАЛИСТИЧНЫЕ МОНОХРОМНЫЕ SVG-ИКОНКИ =================
  const MINIMAL_ICONS = {
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    utensils: '<path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>',
    handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
    gem: '<path d="M6 3h12l4 6-10 13L2 9Z"/><path d="M11 3 8 9l4 13 4-13-3-6"/><path d="M2 9h20"/>',
    message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 10h.01"/><path d="M12 10h.01"/><path d="M16 10h.01"/>',
    glasses: '<circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0"/><path d="M2.5 13 5 7c.7-1.3 1.4-2 3-2"/><path d="M21.5 13 19 7c-.7-1.3-1.5-2-3-2"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
    mic: '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>',
    cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    masks: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/>',
    sparkles: '<path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z"/>',
    zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
    crown: '<path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14"/>',
    eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
    eyeOff: '<path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    x: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    alert: '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>',
    loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
    play: '<polygon points="6 4 20 12 6 20 6 4"/>'
  };

  function renderIcon(name, extraClass = "") {
    const path = MINIMAL_ICONS[name] || MINIMAL_ICONS.sparkles;
    return `<svg class="ui-icon ${extraClass}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
  }

  // ================= СОСТОЯНИЕ ПРИЛОЖЕНИЯ =================
  const state = {
    pin: "",
    voterName: "",
    currentStep: 0, // Индекс текущей номинации (0..14)
    votes: {},      // { nominationId: { id, name } }
    isSubmitting: false,
    hasSubmitted: false
  };

  // ================= ЭЛЕМЕНТЫ DOM =================
  const screens = {
    auth: document.getElementById("screen-auth"),
    voting: document.getElementById("screen-voting"),
    review: document.getElementById("screen-review"),
    success: document.getElementById("screen-success")
  };

  // Прогресс-бар и шапка
  const progressWrapper = document.getElementById("progress-wrapper");
  const currentStepNum = document.getElementById("current-step-num");
  const trainProgressLine = document.getElementById("train-progress-line");
  const trainIndicator = document.getElementById("train-indicator");

  // Авторизация
  const pinInput = document.getElementById("pin-input");
  const btnRevealPin = document.getElementById("btn-reveal-pin");
  const pinFeedback = document.getElementById("pin-feedback");
  const btnStartVoting = document.getElementById("btn-start-voting");

  // Экран голосования
  const nomCategoryBadge = document.getElementById("nom-category-badge");
  const nomTitle = document.getElementById("nom-title");
  const nomDesc = document.getElementById("nom-desc");
  const nomineesContainer = document.getElementById("nominees-container");

  // Нижняя навигация
  const votingNavBar = document.getElementById("voting-nav-bar");
  const btnNavPrev = document.getElementById("btn-nav-prev");
  const btnNavNext = document.getElementById("btn-nav-next");
  const btnNextLabel = document.getElementById("btn-next-label");
  const navStatusText = document.getElementById("nav-status-text");

  // Экран проверки
  const reviewList = document.getElementById("review-list");
  const btnSubmitVote = document.getElementById("btn-submit-vote");
  const btnBackToQuiz = document.getElementById("btn-back-to-quiz");

  // Финальный экран
  const successVoterMsg = document.getElementById("success-voter-msg");
  const shareVoterName = document.getElementById("share-voter-name");
  const shareSummaryItems = document.getElementById("share-summary-items");
  const btnDownloadStory = document.getElementById("btn-download-story");
  const btnViewSummary = document.getElementById("btn-view-summary");
  const resetDevRow = document.getElementById("reset-dev-row");
  const btnResetVote = document.getElementById("btn-reset-vote");

  // Модальные окна
  const videoModal = document.getElementById("video-modal");
  const modalVideoTitle = document.getElementById("modal-video-title");
  const modalVideoPlayer = document.getElementById("modal-video-player");
  const videoPlaceholderNotice = document.getElementById("video-placeholder-notice");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const loadingOverlay = document.getElementById("loading-overlay");

  // ================= ИНИЦИАЛИЗАЦИЯ =================
  function init() {
    if (!CONFIG.DEBUG_MODE && resetDevRow) {
      resetDevRow.classList.add("hidden");
    }

    // Проверяем, голосовал ли пользователь ранее на этом устройстве
    const savedVote = getSavedVote();
    if (savedVote && savedVote.pin && savedVote.votes) {
      state.pin = savedVote.pin;
      state.votes = savedVote.votes;
      state.hasSubmitted = true;
      showSuccessScreen(false);
      return;
    }

    bindEvents();
  }

  function bindEvents() {
    // Ввод PIN-кода
    pinInput.addEventListener("input", handlePinInput);
    pinInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !btnStartVoting.disabled) {
        startVoting();
      }
    });

    btnRevealPin.addEventListener("click", () => {
      const isPassword = pinInput.type === "password";
      pinInput.type = isPassword ? "text" : "password";
      btnRevealPin.innerHTML = renderIcon(isPassword ? "eyeOff" : "eye");
    });

    btnStartVoting.addEventListener("click", startVoting);

    // Навигация по номинациям
    btnNavPrev.addEventListener("click", () => goToStep(state.currentStep - 1, "prev"));
    btnNavNext.addEventListener("click", handleNextStep);

    // Экран проверки
    btnBackToQuiz.addEventListener("click", () => {
      showScreen("voting");
      renderNomination(state.currentStep);
    });
    btnSubmitVote.addEventListener("click", submitVotes);

    // Финальный экран
    btnDownloadStory.addEventListener("click", downloadStoryImage);
    btnViewSummary.addEventListener("click", () => {
      renderReviewScreen(true);
      showScreen("review");
    });

    if (btnResetVote) {
      btnResetVote.addEventListener("click", () => {
        if (confirm("Сбросить сохранённый голос на этом устройстве?")) {
          localStorage.removeItem(CONFIG.STORAGE_KEY_VOTED);
          location.reload();
        }
      });
    }

    // Видео-модалка
    btnCloseModal.addEventListener("click", closeVideoModal);
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !videoModal.classList.contains("hidden")) {
        closeVideoModal();
      }
    });
  }

  // ================= 1. АВТОРИЗАЦИЯ ПО PIN =================
  let pinCheckTimeout = null;

  function isValidPin(code) {
    if (Array.isArray(CONFIG.VALID_PINS)) {
      return CONFIG.VALID_PINS.includes(code);
    }
    return Boolean(CONFIG.VALID_PINS && Object.prototype.hasOwnProperty.call(CONFIG.VALID_PINS, code));
  }

  function handlePinInput() {
    // Оставляем только цифры (6 цифр)
    const raw = pinInput.value.replace(/\D/g, "").slice(0, 6);
    pinInput.value = raw;

    pinInput.classList.remove("valid", "error");
    btnStartVoting.disabled = true;

    if (raw.length < 6) {
      setFeedback("Введите 6 цифр вашего кода доступа", "info");
      return;
    }

    if (!isValidPin(raw)) {
      pinInput.classList.add("error");
      setFeedback("PIN-код не найден в списке группы ТПС-108", "error", "x");
      return;
    }

    state.pin = raw;

    // Если подключён Google Apps Script — проверяем, не голосовал ли PIN на сервере
    if (CONFIG.GOOGLE_SCRIPT_URL) {
      setFeedback("Проверяем статус PIN-кода в системе...", "info", "loader");
      clearTimeout(pinCheckTimeout);
      pinCheckTimeout = setTimeout(() => checkRemotePinStatus(raw), 250);
    } else {
      pinInput.classList.add("valid");
      setFeedback("PIN-код принят", "success", "check");
      btnStartVoting.disabled = false;
    }
  }

  async function checkRemotePinStatus(pin) {
    try {
      const url = `${CONFIG.GOOGLE_SCRIPT_URL}?action=checkPin&pin=${encodeURIComponent(pin)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (pinInput.value !== pin) return; // Пользователь уже изменил ввод

      if (data.status === "success" && data.hasVoted) {
        pinInput.classList.add("error");
        setFeedback("Этот PIN-код уже проголосовал ранее", "error", "alert");
        btnStartVoting.disabled = true;
      } else {
        pinInput.classList.add("valid");
        setFeedback("PIN-код принят", "success", "check");
        btnStartVoting.disabled = false;
      }
    } catch (err) {
      console.warn("Не удалось проверить PIN на сервере, разрешаем вход локально:", err);
      if (pinInput.value !== pin) return;
      pinInput.classList.add("valid");
      setFeedback("PIN-код принят", "success", "check");
      btnStartVoting.disabled = false;
    }
  }

  function setFeedback(text, type, iconName = null) {
    const iconHtml = iconName ? renderIcon(iconName, iconName === "loader" ? "ui-spin" : "") : "";
    pinFeedback.innerHTML = `<span class="icon-inline">${iconHtml}<span>${text}</span></span>`;
    pinFeedback.className = `pin-feedback ${type || ""}`;
  }

  function startVoting() {
    if (!state.pin) return;
    state.currentStep = 0;
    showScreen("voting");
    renderNomination(0);
  }

  // ================= 2. ПОШАГОВОЕ ГОЛОСОВАНИЕ =================
  function renderNomination(stepIndex, direction = null) {
    const nom = NOMINATIONS[stepIndex];
    if (!nom) return;

    const applyContent = () => {
      nomCategoryBadge.innerHTML = `<span class="icon-inline">${renderIcon(nom.icon)}<span>Номинация #${nom.id} • ${nom.badge}</span></span>`;
      if (typeof TPSFX !== "undefined" && TPSFX.scrambleText) {
        TPSFX.scrambleText(nomTitle, nom.title, 360);
      } else {
        nomTitle.textContent = nom.title;
      }
      nomDesc.textContent = nom.description;

      nomineesContainer.innerHTML = "";
      const selected = state.votes[nom.id];

      nom.nominees.forEach((nominee) => {
        const card = createNomineeCard(nom.id, nominee, selected && selected.id === nominee.id);
        nomineesContainer.appendChild(card);
      });

      updateProgressUI(stepIndex);
      updateNavUI(stepIndex);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!direction) {
      applyContent();
      return;
    }

    const outClass = direction === "next" ? "slide-out-left" : "slide-out-right";
    const inClass = direction === "next" ? "slide-in-right" : "slide-in-left";

    screens.voting.classList.remove("slide-in-right", "slide-in-left", "slide-out-left", "slide-out-right");
    screens.voting.classList.add(outClass);

    setTimeout(() => {
      applyContent();
      screens.voting.classList.remove(outClass);
      screens.voting.classList.add(inClass);
      setTimeout(() => screens.voting.classList.remove(inClass), 380);
    }, 220);
  }

  function createNomineeCard(nominationId, nominee, isSelected) {
    const card = document.createElement("div");
    card.className = `nominee-card slay-portrait-card${isSelected ? " selected" : ""}`;
    card.dataset.nomineeId = nominee.id;

    const avatarFallback = createInitialsAvatar(nominee.name);

    card.innerHTML = `
      <div class="slay-card-aura" aria-hidden="true"></div>

      <div class="slay-portrait-stage">
        <div class="slay-portrait-halo" aria-hidden="true"></div>
        <img
          src="${nominee.photo}"
          alt="${nominee.name}"
          class="slay-portrait-img"
          loading="lazy"
          onerror="this.onerror=null; this.src='${avatarFallback}';">
        <div class="nominee-check-badge" aria-hidden="true">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>

      <div class="slay-card-body">
        <h3 class="slay-nominee-name">${nominee.name}</h3>
        ${nominee.video || nominee.videoTitle ? `
          <button type="button" class="slay-media-link icon-inline" title="Смотреть видео-досье">
            ${renderIcon("play")}<span>${nominee.videoTitle || "Видео-досье"}</span>
          </button>
        ` : `
          <p class="slay-nominee-tagline">${nominee.tagline}</p>
        `}
        <div class="slay-card-divider" aria-hidden="true"></div>

        <button type="button" class="slay-crystal-btn" aria-pressed="${isSelected ? "true" : "false"}">
          <span class="crystal-bracket left" aria-hidden="true"></span>
          <span class="crystal-core">
            <span class="crystal-facets" aria-hidden="true"></span>
            <span class="crystal-label">${isSelected ? "✓ ВЫБРАН" : "ВЫБРАТЬ"}</span>
          </span>
          <span class="crystal-bracket right" aria-hidden="true"></span>
        </button>
      </div>
    `;

    // Клик по карточке или кнопке «ВЫБРАТЬ»
    card.addEventListener("click", () => {
      selectNominee(nominationId, nominee);
    });

    // Клик по ссылке видео-досье (не вызывает выбор карточки)
    const videoBtn = card.querySelector(".slay-media-link");
    if (videoBtn) {
      videoBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openVideoModal(nominee);
      });
    }

    // 3D-наклон для десктопа (мышь)
    attachTiltEffect(card);

    return card;
  }

  function selectNominee(nominationId, nominee) {
    state.votes[nominationId] = {
      id: nominee.id,
      name: nominee.name
    };

    const cards = nomineesContainer.querySelectorAll(".nominee-card");
    cards.forEach((c) => {
      const active = c.dataset.nomineeId === nominee.id;
      c.classList.toggle("selected", active);
      const btn = c.querySelector(".slay-crystal-btn");
      const label = c.querySelector(".crystal-label");
      if (btn) btn.setAttribute("aria-pressed", active ? "true" : "false");
      if (label) label.textContent = active ? "✓ ВЫБРАН" : "ВЫБРАТЬ";
    });

    updateNavUI(state.currentStep);
  }

  function updateProgressUI(stepIndex) {
    const total = NOMINATIONS.length;
    currentStepNum.textContent = stepIndex + 1;
    const percent = total > 1 ? (stepIndex / (total - 1)) * 100 : 100;
    trainProgressLine.style.width = `${percent}%`;
    trainIndicator.style.left = `${percent}%`;
  }

  function updateNavUI(stepIndex) {
    const nom = NOMINATIONS[stepIndex];
    const chosen = state.votes[nom.id];
    const isLast = stepIndex === NOMINATIONS.length - 1;

    btnNavPrev.disabled = stepIndex === 0;
    btnNavNext.disabled = !chosen;

    if (chosen) {
      navStatusText.textContent = `Выбран: ${chosen.name}`;
      navStatusText.style.color = "#FFFFFF";
    } else {
      navStatusText.textContent = "Выберите кандидата";
      navStatusText.style.color = "";
    }

    btnNextLabel.textContent = isLast ? "К отправке" : "Далее";
  }

  function goToStep(newIndex, direction) {
    if (newIndex < 0 || newIndex >= NOMINATIONS.length) return;
    state.currentStep = newIndex;
    renderNomination(newIndex, direction);
  }

  function handleNextStep() {
    const nom = NOMINATIONS[state.currentStep];
    if (!state.votes[nom.id]) return;

    if (state.currentStep < NOMINATIONS.length - 1) {
      goToStep(state.currentStep + 1, "next");
    } else {
      renderReviewScreen(false);
      showScreen("review");
    }
  }

  // ================= 3. ЭКРАН ПРОВЕРКИ И ОТПРАВКИ =================
  function renderReviewScreen(readOnly = false) {
    reviewList.innerHTML = "";

    NOMINATIONS.forEach((nom, idx) => {
      const choice = state.votes[nom.id];
      const item = document.createElement("div");
      item.className = "review-item";
      item.innerHTML = `
        <div class="review-item-left">
          <div class="review-num">${nom.id}</div>
          <div class="review-texts">
            <div class="review-nom-title"><span class="icon-inline">${renderIcon(nom.icon)}<span>${nom.title}</span></span></div>
            <div class="review-nominee-name">${choice ? choice.name : "Не выбрано"}</div>
          </div>
        </div>
        ${!readOnly ? `<button type="button" class="btn-edit-step" data-step="${idx}">Изменить</button>` : ""}
      `;

      const editBtn = item.querySelector(".btn-edit-step");
      if (editBtn) {
        editBtn.addEventListener("click", () => {
          state.currentStep = idx;
          showScreen("voting");
          renderNomination(idx);
        });
      }

      reviewList.appendChild(item);
    });

    if (readOnly) {
      btnSubmitVote.classList.add("hidden");
      btnBackToQuiz.innerHTML = "<span>← Вернуться к карточке результатов</span>";
      btnBackToQuiz.onclick = () => showScreen("success");
    } else {
      btnSubmitVote.classList.remove("hidden");
      btnBackToQuiz.innerHTML = "<span>← Вернуться к номинациям</span>";
      btnBackToQuiz.onclick = () => {
        showScreen("voting");
        renderNomination(state.currentStep);
      };
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submitVotes() {
    if (state.isSubmitting) return;

    // Проверка, что выбраны все 15 номинаций
    if (Object.keys(state.votes).length < NOMINATIONS.length) {
      alert("Пожалуйста, выберите кандидатов во всех 15 номинациях.");
      return;
    }

    state.isSubmitting = true;
    loadingOverlay.classList.remove("hidden");

    // Формируем payload в формате { 1: "Имя", 2: "Имя", ... }
    const formattedVotes = {};
    NOMINATIONS.forEach((nom) => {
      formattedVotes[nom.id] = state.votes[nom.id] ? state.votes[nom.id].name : "";
    });

    const payload = {
      action: "vote",
      pin: state.pin,
      timestamp: new Date().toISOString(),
      votes: formattedVotes
    };

    try {
      if (CONFIG.GOOGLE_SCRIPT_URL) {
        // Отправка в Google Apps Script (text/plain для обхода preflight CORS)
        const response = await fetch(CONFIG.GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (result.status === "error") {
          throw new Error(result.message || "Ошибка при сохранении голоса");
        }
      } else {
        // Демо-режим (имитация задержки сети + вывод в консоль)
        await new Promise((r) => setTimeout(r, 900));
        console.log("[TPSLAY 2026 DEMO MODE] Отправленный JSON голосов:", JSON.stringify(payload, null, 2));
      }

      // Сохраняем факт голосования в localStorage
      saveVoteLocally({
        pin: state.pin,
        timestamp: payload.timestamp,
        votes: state.votes
      });

      state.hasSubmitted = true;
      loadingOverlay.classList.add("hidden");
      showSuccessScreen(true);
    } catch (err) {
      console.error("Ошибка отправки голоса:", err);
      loadingOverlay.classList.add("hidden");
      alert(`Ошибка отправки: ${err.message}`);
    } finally {
      state.isSubmitting = false;
    }
  }

  // ================= 4. ФИНАЛЬНЫЙ ЭКРАН И СТОРИС =================
  function showSuccessScreen(withConfetti = true) {
    successVoterMsg.textContent = "Твой голос принят и сохранён в истории группы ТПС-108!";
    shareVoterName.textContent = "Бюллетень • ТПС-108";

    // Заполняем красивую карточку для сторис (ключевые номинации + TPS KING)
    const featuredIds = [1, 2, 7, 9, 10, 11, 14, 15];
    shareSummaryItems.innerHTML = "";

    featuredIds.forEach((id) => {
      const nom = NOMINATIONS.find((n) => n.id === id);
      const choice = state.votes[id] || state.votes[String(id)];
      if (!nom || !choice) return;

      const row = document.createElement("div");
      row.className = `share-row${id === 15 ? " highlight" : ""}`;
      row.innerHTML = `
        <span class="share-row-cat icon-inline">${renderIcon(nom.icon)}<span>${nom.title}</span></span>
        <span class="share-row-val">${choice.name}</span>
      `;
      shareSummaryItems.appendChild(row);
    });

    showScreen("success");

    if (withConfetti) {
      launchConfetti();
    }
  }

  function launchConfetti() {
    if (typeof confetti !== "function") return;
    const colors = ["#E21A1A", "#FFFFFF", "#141418", "#FF5252"];

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors
    });

    setTimeout(() => {
      confetti({
        particleCount: 55,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors
      });
      confetti({
        particleCount: 55,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors
      });
    }, 300);
  }

  async function downloadStoryImage() {
    if (typeof html2canvas !== "function") {
      alert("Библиотека генерации изображений не загрузилась. Проверьте подключение к интернету.");
      return;
    }

    const card = document.getElementById("share-card");
    const innerBtn = btnDownloadStory.querySelector(".lm-inner") || btnDownloadStory;
    const originalHtml = innerBtn.innerHTML;
    btnDownloadStory.disabled = true;
    innerBtn.innerHTML = `${renderIcon("loader", "ui-spin")}<span>Генерируем картинку...</span>`;

    try {
      const canvas = await html2canvas(card, {
        scale: 3,
        backgroundColor: "#0A0A0C",
        useCORS: true
      });

      const link = document.createElement("a");
      link.download = `TPSLAY_2026_${state.pin || "my_choice"}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Ошибка генерации картинки:", err);
      alert("Не удалось сохранить картинку. Вы можете сделать скриншот карточки выше!");
    } finally {
      btnDownloadStory.disabled = false;
      innerBtn.innerHTML = originalHtml;
    }
  }

  // ================= ВИДЕО-МОДАЛКА =================
  function openVideoModal(nominee) {
    modalVideoTitle.textContent = nominee.videoTitle || `${nominee.name} — Видео-превью`;

    if (nominee.video) {
      modalVideoPlayer.classList.remove("hidden");
      videoPlaceholderNotice.classList.add("hidden");
      modalVideoPlayer.src = nominee.video;
      modalVideoPlayer.load();
      modalVideoPlayer.play().catch(() => {});
    } else {
      modalVideoPlayer.classList.add("hidden");
      videoPlaceholderNotice.classList.remove("hidden");
    }

    videoModal.classList.remove("hidden");
  }

  function closeVideoModal() {
    modalVideoPlayer.pause();
    modalVideoPlayer.removeAttribute("src");
    videoModal.classList.add("hidden");
  }

  // ================= УТИЛИТЫ =================
  function showScreen(name) {
    Object.keys(screens).forEach((key) => {
      screens[key].classList.toggle("active", key === name);
    });

    const isVoting = name === "voting";
    progressWrapper.classList.toggle("hidden", !isVoting);
    votingNavBar.classList.toggle("hidden", !isVoting);
  }

  function attachTiltEffect(card) {
    if (window.matchMedia("(pointer: coarse)").matches) return; // Только для мыши

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${(-y * 8).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  }

  function createInitialsAvatar(fullName) {
    const parts = fullName.replace("&", "").trim().split(/\s+/);
    const initials = ((parts[0] ? parts[0][0] : "T") + (parts[1] ? parts[1][0] : "P")).toUpperCase();
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 280">
        <defs>
          <radialGradient id="rim" cx="50%" cy="38%" r="48%">
            <stop offset="0%" stop-color="#FF5A1F" stop-opacity="0.45"/>
            <stop offset="55%" stop-color="#B91111" stop-opacity="0.18"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="suit" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#222229"/>
            <stop offset="75%" stop-color="#0E0E12"/>
            <stop offset="100%" stop-color="#050507" stop-opacity="0"/>
          </linearGradient>
          <linearGradient id="rimStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#FF7A2F" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#E21A1A" stop-opacity="0.5"/>
            <stop offset="100%" stop-color="#FF7A2F" stop-opacity="0.1"/>
          </linearGradient>
        </defs>
        <rect width="260" height="280" fill="none"/>
        <circle cx="130" cy="112" r="115" fill="url(#rim)"/>
        <!-- Плечи / пиджак -->
        <path d="M40 268 C42 204 74 176 130 176 C186 176 218 204 220 268 Z" fill="url(#suit)" stroke="url(#rimStroke)" stroke-width="1.6"/>
        <!-- Воротник и галстук (SLAY vibe) -->
        <polygon points="114,177 130,208 146,177" fill="#EAECEF" fill-opacity="0.88"/>
        <polygon points="126,184 134,184 137,228 130,238 123,228" fill="#141418"/>
        <!-- Голова / портретный медальон -->
        <circle cx="130" cy="112" r="50" fill="#14141A" stroke="url(#rimStroke)" stroke-width="2.2"/>
        <text x="130" y="128" text-anchor="middle" fill="#FFFFFF" font-family="Montserrat, Arial, sans-serif" font-weight="900" font-size="38" letter-spacing="2">${initials}</text>
      </svg>
    `.trim();
    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
  }

  function saveVoteLocally(data) {
    try {
      localStorage.setItem(CONFIG.STORAGE_KEY_VOTED, JSON.stringify(data));
    } catch (e) {
      console.warn("localStorage недоступен:", e);
    }
  }

  function getSavedVote() {
    try {
      const raw = localStorage.getItem(CONFIG.STORAGE_KEY_VOTED);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  init();
});
