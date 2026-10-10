// Pepper Loadingscreen – Hintergrund (Intro → Loop) und Tipps. Einstellungen: config.js
(() => {
  "use strict";

  const cfg = window.PEPPER_LOADINGSCREEN || {};
  const locales = cfg.locales || {};
  const text = locales[cfg.locale] || locales.en || locales.de || {};
  const video = cfg.video || {};
  const tipsCfg = cfg.tips || {};
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;

  document.documentElement.lang = cfg.locale || "de";
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

  // ---- Tipps ------------------------------------------------------------------------------------
  const tips = Array.isArray(text.tips) ? text.tips.filter((t) => typeof t === "string" && t.trim()) : [];
  if (tipsCfg.enabled !== false && tips.length) {
    const order = tips.map((_, i) => i);
    if (tipsCfg.shuffle) {
      for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
      }
    }
    const seconds = Math.max(3, Number(tipsCfg.interval) || 8);
    const box = $("tip");
    const tipText = $("tip-text");
    const count = $("tip-count");
    const timer = $("tip-timer");
    const pad = (n) => String(n).padStart(2, "0");
    let pos = 0;

    root.style.setProperty("--tip-seconds", `${seconds}s`);
    $("tip-label").textContent = text.tipLabel || "Tip";
    box.hidden = false;

    const show = () => {
      tipText.textContent = tips[order[pos]];
      count.textContent = tips.length > 1 ? `${pad(pos + 1)} / ${pad(tips.length)}` : "";
      tipText.classList.remove("swap");
      timer.classList.remove("run");
      void timer.offsetWidth; // Animation neu starten
      if (tips.length > 1) timer.classList.add("run");
    };

    show();
    if (tips.length > 1) {
      setInterval(() => {
        tipText.classList.add("swap");
        setTimeout(() => {
          pos = (pos + 1) % order.length;
          show();
        }, 350);
      }, seconds * 1000);
    }
  }
})();
