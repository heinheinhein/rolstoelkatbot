import { Client, GatewayIntentBits } from 'discord.js';
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
    client.guilds.cache.forEach((guild, key, map) => aproxMembers += guild.memberCount)
    console.log(`${client.user.tag} is online in ${client.guilds.cache.size} servers voor ~${aproxMembers} gebruikers`);

    await rolc.statusChanger(client);

    if (uptimeKumaURL) {
        console.log('uptime kuma configured');
        rolc.initializeRemoteMonitoring(client);
    }
});


// commands
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    console.log('recieved interactionCreate');
    return await rolc.handleCommand(interaction);

});


// messages
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    return await rolc.handleMessage(message);

});

// errors
client.on('error', error => {
    console.error(error);
});



console.log('connecting to discord');
client.login(discordToken);