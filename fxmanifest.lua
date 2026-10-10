-- Pepper Loadingscreen – Intro- + Loop-Video und wechselnde Tipps (Standalone, kostenlos)
fx_version 'cerulean'
game 'gta5'

name 'pepper_loadingscreen'
author 'Pepper Scripts'
description 'Loading screen with intro + loop video and rotating tips – standalone'
version '1.0.0'
repository 'https://pepper-scripts.tebex.store'

loadscreen 'html/index.html'

-- Nur einkommentieren, wenn dein Multicharacter-Skript den Ladebildschirm selbst schließt
-- (ShutdownLoadingScreenNui). Uncomment only if your multicharacter script closes it itself.
-- loadscreen_manual_shutdown 'yes'

files {
    'html/index.html',
    'html/style.css',
    'html/app.js',
    'html/config.js',
    'html/fonts/*.woff2',
    'html/media/*',
}
