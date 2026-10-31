// Pepper Loadingscreen – Hintergrund, Ladefortschritt, Begrüßung, Karten und Tipps. Einstellungen: config.js + custom.js
(() => {
  "use strict";

  // custom.js legt sich über config.js; Listen werden komplett ersetzt
  const isPlain = (v) => v && typeof v === "object" && !Array.isArray(v);
  const merge = (base, over) => {
    const out = { ...base };
    for (const key of Object.keys(over || {})) {
      out[key] = isPlain(base?.[key]) && isPlain(over[key]) ? merge(base[key], over[key]) : over[key];
    }
    return out;
  };

  const cfg = merge(window.PEPPER_LOADINGSCREEN || {}, window.PEPPER_LOADINGSCREEN_CUSTOM);
  const locales = cfg.locales || {};
  const browserLang = String(navigator.language || "").slice(0, 2).toLowerCase();
  const lang = cfg.locale === "auto" ? (locales[browserLang] ? browserLang : "en") : cfg.locale;
  const text = locales[lang] || locales.en || locales.de || {};
  const video = cfg.video || {};
  const tipsCfg = cfg.tips || {};
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  document.documentElement.lang = lang || "de";
  if (["center", "side"].includes(cfg.layout)) root.dataset.layout = cfg.layout;
  if (cfg.accentColor) root.style.setProperty("--accent", cfg.accentColor);
  if (typeof video.shade === "number") root.style.setProperty("--shade", String(Math.min(1, Math.max(0, video.shade))));

  $("server-name").textContent = text.serverName || "";
  $("subtitle").textContent = text.subtitle || "";
  $("subtitle").hidden = !text.subtitle;
  $("loading").textContent = text.loading || "";

  // ---- Hintergrund ------------------------------------------------------------------------------
  const isImage = (src) => /\.(png|jpe?g|webp|gif)(\?.*)?$/i.test(src || "");
  const still = $("still");
  const introEl = $("intro");
  const loopEl = $("loop");

  function showStill(src) {
    if (!src) return;
    still.onload = () => still.classList.add("show");
    still.src = src;
  }

  // Autoplay mit Ton kann (außerhalb von FiveM) blockiert sein → dann stumm weiterspielen
  function play(el) {
    el.muted = !video.sound;
    el.volume = Math.min(1, Math.max(0, Number(video.volume ?? 0.3)));
    const p = el.play();
    if (p && p.catch) {
      p.catch(() => {
        el.muted = true;
        el.play().catch(() => {});
      });
    }
  }

  let loopFailed = !video.loop;

  function startLoop() {
    if (loopFailed) return; // Intro bleibt auf dem letzten Frame stehen bzw. Standbild
    if (isImage(video.loop)) {
      showStill(video.loop);
      introEl.classList.add("gone");
      return;
    }
    loopEl.loop = true;
    loopEl.addEventListener("playing", () => {
      loopEl.classList.add("show");
      introEl.classList.add("gone");
    }, { once: true });
    play(loopEl);
  }

  if (video.loop && !isImage(video.loop)) {
    loopEl.src = video.loop;
    loopEl.addEventListener("error", () => {
      loopFailed = true;
      if (!video.intro || introEl.error) showStill(video.poster);
    }, { once: true });
    loopEl.load();
  }

  if (video.intro && isImage(video.intro)) {
    showStill(video.intro);
    setTimeout(startLoop, 3000);
  } else if (video.intro) {
    introEl.src = video.intro;
    introEl.addEventListener("playing", () => introEl.classList.add("show"), { once: true });
    introEl.addEventListener("ended", startLoop, { once: true });
    introEl.addEventListener("error", () => {
      showStill(video.poster);
      startLoop();
    }, { once: true });
    play(introEl);
  } else {
    showStill(video.poster);
    startLoop();
  }

  // ---- Ladefortschritt --------------------------------------------------------------------------
  // Der Balken läuft nur vorwärts und die Phase nur weiter, auch wenn FiveM Abschnitte neu meldet
  const progressCfg = cfg.progress || {};
  const phases = text.phases || {};
  const phaseOrder = ["data", "map", "scripts", "session"];
  let fraction = 0;
  let phase = -1;

  const setPhase = (key) => {
    const next = phaseOrder.indexOf(key);
    if (progressCfg.phases === false || next <= phase || !phases[key]) return;
    phase = next;
    $("loading").textContent = phases[key];
  };

  const setProgress = (value) => {
    if (progressCfg.enabled === false || !Number.isFinite(value)) return;
    fraction = Math.max(fraction, Math.min(1, Math.max(0, value)));
    $("progress").hidden = false;
    $("progress-bar").style.transform = `scaleX(${fraction})`;
    $("progress-value").textContent = progressCfg.percent === false ? "" : `${Math.round(fraction * 100)} %`;
  };

  window.addEventListener("message", ({ data }) => {
    switch (data?.eventName) {
      case "loadProgress":
        setProgress(Number(data.loadFraction));
        break;
      case "startDataFileEntries":
        setPhase("data");
        break;
      case "performMapLoadFunction":
        setPhase("map");
        break;
      case "startInitFunctionOrder":
        setPhase(data.type === "INIT_SESSION" ? "session" : "scripts");
        break;
    }
  });

  // ---- Begrüßung --------------------------------------------------------------------------------
  // Kommt vom Server (server/handover.lua); ohne die Daten bleiben beide Zeilen ausgeblendet
  const fill = (template, values) => String(template || "").replace(/\{(\w+)\}/g, (_, key) => values[key] ?? "");
  const guest = window.nuiHandoverData?.pepperLoadingscreen;
  const welcomeCfg = cfg.welcome || {};
  if (guest?.name && welcomeCfg.name !== false && text.welcome) {
    $("welcome").textContent = fill(text.welcome, { name: guest.name }); // Namen sind Nutzereingaben: nur textContent
    $("welcome").hidden = false;
  }
  if (Number.isFinite(guest?.players) && welcomeCfg.players !== false && text.players) {
    $("players").textContent = fill(text.players, { players: guest.players, max: guest.maxPlayers });
    $("players").hidden = false;
  }

  // ---- Karten und Tipps -------------------------------------------------------------------------
  const pad = (n) => String(n).padStart(2, "0");

  // Wechselt Einträge mit Überblendung, Zähler und Zeitbalken
  function rotate({ box, items, seconds, count, timer, faders, render }) {
    let pos = 0;
    box.style.setProperty("--tip-seconds", `${seconds}s`);
    box.hidden = false;

    const show = () => {
      render(items[pos]);
      count.textContent = items.length > 1 ? `${pad(pos + 1)} / ${pad(items.length)}` : "";
      faders.forEach((el) => el.classList.remove("swap"));
      timer.classList.remove("run");
      void timer.offsetWidth; // Animation neu starten
      if (items.length > 1) timer.classList.add("run");
    };

    show();
    if (items.length > 1) {
      setInterval(() => {
        faders.forEach((el) => el.classList.add("swap"));
        setTimeout(() => {
          pos = (pos + 1) % items.length;
          show();
        }, 350);
      }, seconds * 1000);
    }
  }

  const cardsCfg = cfg.cards || {};
  const cards = Array.isArray(text.cards) ? text.cards.filter((c) => c?.title || c?.text) : [];
  if (cardsCfg.enabled !== false && cards.length) {
    $("info-label").textContent = text.cardLabel || "Info";
    rotate({
      box: $("info"),
      items: cards,
      seconds: Math.max(3, Number(cardsCfg.interval) || 10),
      count: $("info-count"),
      timer: $("info-timer"),
      faders: [$("info-title"), $("info-text")],
      render: (card) => {
        $("info-title").textContent = card.title || "";
        $("info-text").textContent = card.text || "";
      },
    });
  }

  const tips = Array.isArray(text.tips) ? text.tips.filter((t) => typeof t === "string" && t.trim()) : [];
  if (tipsCfg.enabled !== false && tips.length) {
    if (tipsCfg.shuffle) {
      for (let i = tips.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tips[i], tips[j]] = [tips[j], tips[i]];
      }
    }
    $("tip-label").textContent = text.tipLabel || "Tip";
    rotate({
      box: $("tip"),
      items: tips,
      seconds: Math.max(3, Number(tipsCfg.interval) || 8),
      count: $("tip-count"),
      timer: $("tip-timer"),
      faders: [$("tip-text")],
      render: (tip) => {
        $("tip-text").textContent = tip;
      },
    });
  }

  // ---- QR-Code ----------------------------------------------------------------------------------
  const qrUrl = String(cfg.qr?.url || "").trim();
  if (qrUrl && window.qrcode) {
    const code = window.qrcode(0, "M");
    code.addData(qrUrl);
    code.make();
    const quiet = 3; // weißer Rand, sonst erkennen Kameras den Code schlecht
    const size = code.getModuleCount();
    const canvas = $("qr-code");
    canvas.width = canvas.height = size + quiet * 2;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (code.isDark(y, x)) ctx.fillRect(x + quiet, y + quiet, 1, 1);
      }
    }
    $("qr-title").textContent = text.qrTitle || "";
    $("qr-text").textContent = text.qrText || "";
    $("qr").hidden = false;
  }
})();
