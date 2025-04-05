import { TimerManager } from "@sapphire/time-utilities";
import { ActivityType, Client } from "discord.js";
import { randomItem } from "./random.js";

export function startStatusChanger(client: Client) {
    const status = [
        "je weet hoe die gaat",
        "dit is hoe ik rol",
        "probeer nu ook /rolstoelkat voor al je rolstoelkat behoeftes",
        "🐱🦽💨",
        "meow meow lieve poes",
        "bot.rolstoelkat.nl",
        "rolstoelkat.nl",
        "rolstoelkat",
        "0111001001101111011011000111001101110100011011110110010101101100011010110110000101110100 snap je want ik ben een robot",
        `deze status is om ${new Date().toLocaleTimeString("nl-NL", {
            timeZone: "Europe/Amsterdam",
            hour: "numeric",
            minute: "numeric"
        })} voor het laatst veranderd`,
        "🤖 Geautomatiseerd",
        "geen virus™",
        "aan het rollen sinds 1869",
        "Let op! Geld lenen, kost geld",
        "wie dit leest is gek",
        "wie dit leest is te gek",
        "wie dit leest is een soepkip",
        "voor maar €13,99 kun jij je eigen officiële rolstoelkat mok hebben! 👉 rolstoelkat.nl",
        "✅ Ik ben geen robot",
        `aaaaaaa${"A".repeat(Math.random() * 25)}`,
        "soep",
        "taart aan het bakken",
        "fun fact: mark rutte's favoriete voorgerecht is soep",
        `${Math.floor(client.uptime ? client.uptime / 8.64e7 : 0)} dagen zonder ongeval`,
        `${client.user ? client.user.tag : "iemand"} aan het zijn`,
        `© ${new Date().getFullYear()} sommige rechten voorbehouden`,
        "met liefde gemaakt",
        "met afschuw gemaakt",
        "live, love, rolstoelkat",
        "life, love, rolstoelkat",
        "best viewed with microsoft internet explorer",
        "volg me niet op twitter",
        "klop klop",
        "verzin zelf een leuke status",
        "op verzoek meer rapper sjors",
        "rip @robtripbot",
        "kiwi",
        "ulp",
        "yeah let's go",
        "yo yo yo",
        "je bent een soepkip!",
        "uuuuua",
        "aaaaau",
        "kaart.rolstoelkat.nl",
        "going global"
    ];

    client.user?.setPresence({
        status: "online",
        activities: [{ name: randomItem(status), type: ActivityType.Custom }]
    });

    TimerManager.setInterval(() => {
        client.user?.setPresence({
            status: "online",
            activities: [{ name: randomItem(status), type: ActivityType.Custom }]
        });
    }, 3600e3);
}
