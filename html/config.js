/*
 * Pepper Loadingscreen – Einstellungen / Settings
 * Nach Änderungen: Ressource neu starten und neu verbinden (Loadingscreens werden beim Verbinden geladen).
 * After changes: restart the resource and reconnect (loading screens are downloaded on connect).
 */
window.PEPPER_LOADINGSCREEN = {
  // Sprache der Texte unten / language of the texts below: "de" | "en"
  locale: "de",

  // Akzentfarbe (Linien, Punkte, Tipp-Balken) / accent color
  accentColor: "#e5484d",

  // Hintergrund / background
  // intro: läuft einmal / plays once  ·  loop: läuft danach endlos / loops afterwards
  // Eigene Videos: WebM (VP9 oder VP8) in html/media/ legen – MP4 (H.264) spielt FiveM NICHT ab.
  // Own videos: put WebM (VP9 or VP8) into html/media/ – FiveM can NOT play MP4 (H.264).
  // Leerer Text "" = aus. Statt eines Videos geht auch ein Bild (.jpg/.png/.webp).
  // Empty string "" = off. An image (.jpg/.png/.webp) works instead of a video, too.
  video: {
    intro: "media/intro.webm",
    loop: "media/loop.webm",
    poster: "media/poster.jpg", // Standbild, bis das Video läuft / still image until the video plays
    sound: false, // Ton des Videos / video sound
    volume: 0.3, // 0.0 – 1.0
    shade: 0.25, // Abdunklung für bessere Lesbarkeit / darkening for readability, 0.0 – 1.0
  },

  // Tipps rechts unten / tips bottom right
  tips: {
    enabled: true,
    interval: 8, // Sekunden pro Tipp / seconds per tip
    shuffle: false, // zufällige Reihenfolge / random order
  },

  locales: {
    de: {
      serverName: "Pepper Dev",
      subtitle: "Roleplay · Entwicklungsserver",
      loading: "Die Stadt wird geladen",
      tipLabel: "Tipp",
      tips: [
        "Lies dir vor dem ersten Einsatz die Serverregeln in unserem Discord durch.",
        "Bleib in deiner Rolle – auch wenn etwas schiefgeht, klärt ihr das nach der Szene.",
        "Mit F8 öffnest du die Konsole, falls du dich neu verbinden musst.",
        "Fehler gefunden? Melde ihn im Discord mit Screenshot und kurzer Beschreibung.",
        "Tempo raus in der Stadt – die Polizei ist näher, als du denkst.",
        "Neu hier? Das Team hilft dir gern weiter, frag einfach im Support-Kanal.",
      ],
    },
    en: {
      serverName: "Pepper Dev",
      subtitle: "Roleplay · Development server",
      loading: "Loading the city",
      tipLabel: "Tip",
      tips: [
        "Read the server rules in our Discord before your first shift.",
        "Stay in character – if something goes wrong, sort it out after the scene.",
        "Press F8 to open the console if you need to reconnect.",
        "Found a bug? Report it in Discord with a screenshot and a short description.",
        "Slow down in the city – the police are closer than you think.",
        "New here? The team is happy to help, just ask in the support channel.",
      ],
    },
  },
};
