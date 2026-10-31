-- Pepper Loadingscreen – übergibt Begrüßung und Spielerzahl an den Ladebildschirm.
-- Läuft nur einmal beim Verbinden auf dem Server; im Spiel ist nichts aktiv.
-- Bewusst ohne deferrals.defer(): Warteschlangen und Whitelist-Skripte bleiben unberührt.
AddEventHandler('playerConnecting', function(name, _, deferrals)
    deferrals.handover({
        pepperLoadingscreen = {
            name = name,
            players = #GetPlayers(),
            maxPlayers = GetConvarInt('sv_maxclients', 48),
        },
    })
end)
