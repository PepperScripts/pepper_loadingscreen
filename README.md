# Pepper Loadingscreen

**Pepper Scripts** · Free loading screen · Standalone (ESX, QBCore, Qbox, …)
Support & updates: https://discord.gg/6NaFJWKDYu · Store: https://shop.pepperscripts.de

---

## 🇩🇪 Deutsch

### Features
- Intro-Video (einmalig) geht nahtlos in ein Loop-Video über – beide austauschbar, auch ein Bild geht
- Echter Ladefortschritt mit Balken, Prozent und Ladephasen
- Begrüßung mit Spielername und Spielerzahl
- Wechselnde Infokarten (Neuigkeiten, Regeln, Team) und QR-Code für deinen Discord
- 3 Layouts: unten, mittig, Leiste links
- Servername, Untertitel, wechselnde Tipps mit Zähler und Zeitbalken
- Deutsch & Englisch mit automatischer Sprachwahl, eigene Akzentfarbe, Abdunklung einstellbar
- Keine Abhängigkeiten, im Spiel läuft nichts (0,00 ms), alles lokal (keine externen Links/Schriften)

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
| `locale` | `"auto"`, `"de"` oder `"en"` – welche Texte aus `locales` genutzt werden |
| `layout` | `"classic"` (unten), `"center"` (mittig) oder `"side"` (Leiste links) |
| `accentColor` | Akzentfarbe, z. B. `"#e5484d"` |
| `video.intro` / `video.loop` | Pfad zu Intro/Loop (WebM oder Bild), `""` = aus |
| `video.poster` | Standbild, falls ein Video nicht lädt |
| `video.sound` / `video.volume` | Ton des Videos an/aus, Lautstärke 0–1 |
| `video.shade` | Abdunklung 0–1 (für bessere Lesbarkeit) |
| `tips.enabled` / `tips.interval` / `tips.shuffle` | Tipps an/aus, Sekunden pro Tipp, zufällige Reihenfolge |
| `progress.enabled` / `.percent` / `.phases` | Ladebalken, Prozentzahl, Text je Ladephase |
| `welcome.name` / `.players` | Begrüßung mit Name, Spielerzahl |
| `cards.enabled` / `.interval` | Infokarten an/aus, Sekunden pro Karte |
| `qr.url` | Link für den QR-Code, z. B. dein Discord; `""` = aus |
| `locales.<sprache>` | Servername, Untertitel, Ladetexte, Infokarten, Tipps |

**Standardmäßig stehen in den Infokarten Beispieltexte und der QR-Code ist aus** – trage deine eigenen Texte und deinen Link ein.

### Eigene Einstellungen, die Updates überstehen
`html/custom.example.js` kopieren und in `html/custom.js` umbenennen. Dort nur eintragen, was von `config.js` abweicht.
Unsere Updates liefern keine `custom.js` aus.

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
Neue Dateien über den alten Ordner kopieren: `html/custom.js` und eigene Videos mit eigenen Namen bleiben erhalten.
Ohne `custom.js`: `html/config.js` vorher sichern und deine Änderungen danach in die neue Datei übernehmen.

---

## 🇬🇧 English

### Features
- Intro video (plays once) flows seamlessly into a loop video – both replaceable, an image works too
- Real loading progress with bar, percentage and loading phases
- Welcome with player name and player count
- Rotating info cards (news, rules, team) and a QR code for your Discord
- 3 layouts: bottom, centered, left sidebar
- Server name, subtitle, rotating tips with counter and timer bar
- German & English with automatic language selection, custom accent color, adjustable darkening
- No dependencies, nothing runs in-game (0.00 ms), everything local (no external links/fonts)

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
| `locale` | `"auto"`, `"de"` or `"en"` – which texts from `locales` are used |
| `layout` | `"classic"` (bottom), `"center"` (centered) or `"side"` (left sidebar) |
| `accentColor` | accent color, e.g. `"#e5484d"` |
| `video.intro` / `video.loop` | path to intro/loop (WebM or image), `""` = off |
| `video.poster` | still image if a video fails to load |
| `video.sound` / `video.volume` | video sound on/off, volume 0–1 |
| `video.shade` | darkening 0–1 (better readability) |
| `tips.enabled` / `tips.interval` / `tips.shuffle` | tips on/off, seconds per tip, random order |
| `progress.enabled` / `.percent` / `.phases` | loading bar, percentage, text per loading phase |
| `welcome.name` / `.players` | welcome with name, player count |
| `cards.enabled` / `.interval` | info cards on/off, seconds per card |
| `qr.url` | link for the QR code, e.g. your Discord; `""` = off |
| `locales.<language>` | server name, subtitle, loading texts, info cards, tips |

**By default the info cards contain sample text and the QR code is off** – add your own texts and link.

### Own settings that survive updates
Copy `html/custom.example.js` and rename it to `html/custom.js`. Only add what differs from `config.js`.
Our updates never ship a `custom.js`.

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
Copy the new files over the old folder: `html/custom.js` and your own videos with their own names stay in place.
Without `custom.js`: back up `html/config.js` first and carry your changes over to the new file.

---

## License
Free to use on your own FiveM server and to modify for it. Re-uploading, reselling or redistributing
(also modified) is not allowed. Fonts: Inter and Space Grotesk, SIL Open Font License 1.1 (`html/fonts/`).
QR codes: qrcode-generator by Kazuhiko Arase, MIT license (`html/vendor/qrcode.js`).

© Pepper Scripts
