import { Client, GatewayIntentBits } from 'discord.js';
import logger from './logger.js';
import * as rolc from './rolstoelkatbot-common.js';


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

const discordToken = process.env.DISCORD_TOKEN,
    uptimeKumaURL = process.env.UPTIME_KUMA_URL;



client.on('ready', async () => {
    let aproxMembers = 0;
    client.guilds.cache.forEach((guild, key, map) => aproxMembers += guild.memberCount);
    logger.info({ type: 'start-application' }, `${client.user.tag} is online in ${client.guilds.cache.size} servers for ~${aproxMembers} users`);

    logger.info({ type: 'start-application' }, 'starting status changer');
    await rolc.statusChanger(client);

    if (uptimeKumaURL) {
        logger.info({ type: 'start-application' }, 'uptime kuma url has been configured');
        rolc.initializeRemoteMonitoring(client);
    }
});


// commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    return await rolc.handleCommand(interaction);
});


// messages
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    return await rolc.handleMessage(message);
});

// errors
client.on('error', error => {
    logger.error(error);
});



logger.info({ type: 'start-application' }, 'connecting to discord');
client.login(discordToken);