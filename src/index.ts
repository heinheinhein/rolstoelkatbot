import { SapphireClient } from "@sapphire/framework";
import { GatewayIntentBits } from "discord.js";

const intents = [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
];

const client = new SapphireClient({
    intents: intents,
    loadMessageCommandListeners: true
});

if (!process.env.DISCORD_BOT_TOKEN) throw new Error("DISCORD_BOT_TOKEN not defined in environment");

client.login(process.env.DISCORD_BOT_TOKEN);
