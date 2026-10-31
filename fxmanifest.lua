-- Pepper Loadingscreen – Video, echter Ladefortschritt, Infokarten und Begrüßung (Standalone, kostenlos)
fx_version 'cerulean'
game 'gta5'

name 'pepper_loadingscreen'
author 'Pepper Scripts'
description 'Loading screen with real progress, video, info cards and player welcome – standalone'
version '1.1.0'
repository 'https://shop.pepperscripts.de'

loadscreen 'html/index.html'

-- Nur beim Verbinden aktiv (Name + Spielerzahl), im Spiel läuft nichts
server_script 'server/handover.lua'

-- Nur einkommentieren, wenn dein Multicharacter-Skript den Ladebildschirm selbst schließt
-- (ShutdownLoadingScreenNui). Uncomment only if your multicharacter script closes it itself.
-- loadscreen_manual_shutdown 'yes'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
    'html/config.js',
    'html/custom*.js',
    'html/vendor/*.js',
    'html/fonts/*.woff2',
    'html/media/*',
}
