/*
 * Pepper Loadingscreen – eigene Einstellungen, die Updates überstehen
 * Datei kopieren und in "custom.js" umbenennen. Unsere Updates liefern keine custom.js aus.
 * Nur eintragen, was von config.js abweichen soll; Listen wie tips werden komplett ersetzt.
 *
 * Your own settings that survive updates
 * Copy this file and rename it to "custom.js". Our updates never ship a custom.js.
 * Only add what differs from config.js; lists such as tips are replaced as a whole.
 */
window.PEPPER_LOADINGSCREEN_CUSTOM = {
  accentColor: "#e5484d",
  layout: "classic",
  qr: { url: "https://discord.gg/dein-server" },
  locales: {
    de: { serverName: "Mein Server" },
    en: { serverName: "My Server" },
  },
};
