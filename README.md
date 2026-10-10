# Pepper Loadingscreen

**Pepper Scripts** · Free loading screen · Standalone (ESX, QBCore, Qbox, …)
Support & updates: https://discord.gg/6NaFJWKDYu · Store: https://pepper-scripts.tebex.store

---

## 🇩🇪 Deutsch

### Features
- Intro-Video (einmalig) geht nahtlos in ein Loop-Video über – beide austauschbar, auch ein Bild geht
- Servername, Untertitel und Ladeanzeige
- Wechselnde Tipps mit Zähler und Zeitbalken
- Deutsch & Englisch, eigene Akzentfarbe, Abdunklung einstellbar
- Keine Abhängigkeiten, keine Skripte im Spiel (0,00 ms), alles lokal (keine externen Links/Schriften)

### Installation
1. Ordner `pepper_loadingscreen` in deinen `resources`-Ordner legen.
2. In der `server.cfg` eintragen:
   ```
   ensure pepper_loadingscreen
   ```
3. Einen anderen Loadingscreen (falls vorhanden) entfernen – FiveM zeigt immer nur einen an.
4. Texte und Tipps in `html/config.js` anpassen, Server neu starten und neu verbinden.

### Einstellungen (`html/config.js`)
| Option | Bedeutung |
|---|---|
| `locale` | `"de"` oder `"en"` – welche Texte aus `locales` genutzt werden |
| `accentColor` | Akzentfarbe, z. B. `"#e5484d"` |
| `video.intro` / `video.loop` | Pfad zu Intro/Loop (WebM oder Bild), `""` = aus |
| `video.poster` | Standbild, falls ein Video nicht lädt |
| `video.sound` / `video.volume` | Ton des Videos an/aus, Lautstärke 0–1 |
| `video.shade` | Abdunklung 0–1 (für bessere Lesbarkeit) |
| `tips.enabled` / `tips.interval` / `tips.shuffle` | Tipps an/aus, Sekunden pro Tipp, zufällige Reihenfolge |
| `locales.<sprache>` | Servername, Untertitel, Ladetext, Tipps |

### Eigenes Video
- Datei nach `html/media/` legen und in `config.js` eintragen (z. B. `loop: "media/mein-video.webm"`).
- **Format: WebM (VP9 oder VP8).** MP4 mit H.264 spielt FiveM nicht ab.
  Umwandeln z. B. mit HandBrake („WebM“) oder ffmpeg:
  `ffmpeg -i video.mp4 -c:v libvp9 -b:v 5M -an loop.webm`
- Empfehlung: 1920×1080, 30 fps, möglichst unter 10 MB – Spieler laden die Dateien beim Verbinden herunter.
- Nur ein Video? `intro: ""` setzen und dein Video als `loop` eintragen.
- Nahtloser Übergang: Der letzte Frame des Intros sollte dem ersten Frame des Loops entsprechen.

### Multicharacter
Standardmäßig schließt FiveM den Loadingscreen automatisch. Wenn dein Multicharacter-Skript ihn selbst schließt
(`ShutdownLoadingScreenNui`), in der `fxmanifest.lua` die Zeile `loadscreen_manual_shutdown 'yes'` einkommentieren.

### Updates
Neue Versionen gibt es im Cfx.re Portal unter **Granted Assets**, angekündigt in unserem Discord.
Vor dem Update `html/config.js` und eigene Videos aus `html/media/` sichern und danach wieder einfügen.

---

## 🇬🇧 English

### Features
- Intro video (plays once) flows seamlessly into a loop video – both replaceable, an image works too
- Server name, subtitle and loading indicator
- Rotating tips with counter and timer bar
- German & English, custom accent color, adjustable darkening
- No dependencies, no in-game scripts (0.00 ms), everything local (no external links/fonts)

### Installation
1. Put the `pepper_loadingscreen` folder into your `resources` folder.
2. Add to your `server.cfg`:
   ```
   ensure pepper_loadingscreen
   ```
3. Remove any other loading screen – FiveM only shows one.
4. Adjust texts and tips in `html/config.js`, restart the server and reconnect.

### Settings (`html/config.js`)
| Option | Meaning |
|---|---|
| `locale` | `"de"` or `"en"` – which texts from `locales` are used |
| `accentColor` | accent color, e.g. `"#e5484d"` |
| `video.intro` / `video.loop` | path to intro/loop (WebM or image), `""` = off |
| `video.poster` | still image if a video fails to load |
| `video.sound` / `video.volume` | video sound on/off, volume 0–1 |
| `video.shade` | darkening 0–1 (better readability) |
| `tips.enabled` / `tips.interval` / `tips.shuffle` | tips on/off, seconds per tip, random order |
| `locales.<language>` | server name, subtitle, loading text, tips |

### Your own video
- Put the file into `html/media/` and set it in `config.js` (e.g. `loop: "media/my-video.webm"`).
- **Format: WebM (VP9 or VP8).** FiveM can not play MP4 with H.264.
  Convert e.g. with HandBrake ("WebM") or ffmpeg:
  `ffmpeg -i video.mp4 -c:v libvp9 -b:v 5M -an loop.webm`
- Recommended: 1920×1080, 30 fps, ideally below 10 MB – players download the files when connecting.
- Only one video? Set `intro: ""` and use your video as `loop`.
- Seamless transition: the last frame of the intro should match the first frame of the loop.

### Multicharacter
By default FiveM closes the loading screen automatically. If your multicharacter script closes it itself
(`ShutdownLoadingScreenNui`), uncomment `loadscreen_manual_shutdown 'yes'` in `fxmanifest.lua`.

### Updates
New versions are available in the Cfx.re Portal under **Granted Assets** and announced on our Discord.
Before updating, back up `html/config.js` and your own videos from `html/media/` and put them back afterwards.

---

## License
Free to use on your own FiveM server and to modify for it. Re-uploading, reselling or redistributing
(also modified) is not allowed. Fonts: Inter and Space Grotesk, SIL Open Font License 1.1 (`html/fonts/`).

© Pepper Scripts
