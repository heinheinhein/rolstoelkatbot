import fs from 'fs';
import {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus
} from '@discordjs/voice';

export {
    initializeRemoteMonitoring,
    statusChanger,
    handleCommand,
    handleMessage
};


const discordClientId = process.env.DISCORD_APPLICATION_ID,
    uptimeKumaURL = process.env.UPTIME_KUMA_URL;


function initializeRemoteMonitoring(client) {
    console.log('starting uptimekuma interval');

    if (client.ws.status === 0 && client.ws.ping > 0) fetch(`${uptimeKumaURL}?status=up&msg=OK&ping=${client.ws.ping}`);
    setInterval(() => {
        if (client.ws.status === 0 && client.ws.ping > 0) fetch(`${uptimeKumaURL}?status=up&msg=OK&ping=${client.ws.ping}`);
    }, 60e3);
}


async function statusChanger(client) {
    const status = [
        'je weet hoe die gaat',
        'dit is hoe ik rol',
        'probeer nu ook /rolstoelkat voor al je rolstoelkat behoeftes',
        '🐱🦽💨',
        'meow meow lieve poes',
        'bot.rolstoelkat.nl',
        'rolstoelkat.nl',
        'rolstoelkat',
        '0111001001101111011011000111001101110100011011110110010101101100011010110110000101110100 snap je want ik ben een robot',
        `deze status is om ${new Date().toLocaleTimeString('nl-NL', {
            timeZone: 'Europe/Amsterdam',
            hour: 'numeric',
            minute: 'numeric'
        })} voor het laatst veranderd`,
        '🤖 Geautomatiseerd',
        'geen virus™',
        'aan het rollen sinds 1869',
        'Let op! Geld lenen, kost geld',
        'wie dit leest is gek',
        'wie dit leest is te gek',
        'wie dit leest is een soepkip',
        'voor maar €12,99 kun jij je eigen officiële rolstoelkat mok hebben! 👉 rolstoelkat.nl',
        '✅ Ik ben geen robot',
        `aaaaaaa${'A'.repeat(Math.random() * 25)}`,
        'soep',
        'taart aan het bakken',
        "fun fact: mark rutte's favoriete voorgerecht is soep",
        `${Math.floor(client.uptime / 8.64e+7)} dagen zonder ongeval`,
        `${client.user.tag} aan het zijn`,
        `© ${new Date().getFullYear()} sommige rechten voorbehouden`,
        'met liefde gemaakt',
        'met afschuw gemaakt',
        'live, love, rolstoelkat',
        'life, love, rolstoelkat',
        'best viewed with microsoft internet explorer',
        'volg me niet op twitter',
        'klop klop',
        'verzin zelf een leuke status',
        'op verzoek meer rapper sjors',
        'rip @robtripbot',
        'kiwi',
        'ulp',
        "yeah let's go",
        'yo yo yo',
        'je bent een soepkip!',
    ];

    console.log('changing status');

    await client.user.setPresence({
        activities: [{ name: randomItem(status) }],
        status: Math.random() < 0.05 ? 'dnd' : 'online'
    });

    setTimeout(statusChanger, Math.floor(Math.random() * 3600e3) + 3600e3, client);
}


async function handleCommand(interaction) {
    console.log('handling command');

    const commands = {
        'rolstoelkat': async interaction => {
            return await reply(interaction, { files: ['./media/rolstoelkat.gif'] });
        },
        'ping': async interaction => {
            const sent = await reply(interaction, { content: 'aan het pingen...', fetchReply: true, ephemeral: true });
            return await interaction.editReply(`ping is ${sent.createdTimestamp - interaction.createdTimestamp}ms, cool beans`);
        },
        'invite': async interaction => {
            return await reply(interaction, '👉👉👉👉 http://bot.rolstoelkat.nl 👈👈👈 (geen virus)');
        }
    };

    try {
        return commands[interaction.commandName](interaction);
    } catch (error) {
        console.error('unable to handle command ', interaction.commandName, error);
    }
}


async function handleMessage(recievedMessage) {

    const normalizedMessage = normalizeText(recievedMessage.content);

    if (normalizedMessage === 'klop klop') return await initiateKlopKlop(recievedMessage);

    await checkMessageEnd(recievedMessage, normalizedMessage);

    await checkMessageContent(recievedMessage, normalizedMessage);

}








async function reply(interaction, message, isReply = true) {

    console.log('recieved', interaction.content || `/${interaction.commandName}`);
    console.log('sending message', message);

    await interaction.channel.sendTyping();

    if (isReply) return await interaction.reply(message);
    return await interaction.channel.send(message);
}




async function checkMessageEnd(interaction, normalizedMessage) {
    if (normalizedMessage.endsWith('wat')) await reply(interaction, 'patat');
    if (normalizedMessage.endsWith('wie')) await reply(interaction, 'kiwi');
    if (normalizedMessage.endsWith('hoe')) await reply(interaction, 'roekoe');
    if (normalizedMessage.endsWith('waarbij')) await reply(interaction, 'aardbei');

    if (normalizedMessage.endsWith('helaas')) {
        await reply(interaction, 'pindakaas');
        await reply(interaction, { files: ['./media/sjors/pindakaas.mp4'] }, false);
    }
}


async function checkMessageContent(interaction, normalizedMessage) {
    if (interaction.content.includes(`<@${discordClientId}>`)) await reply(interaction, randomItem(['je weet hoe die gaat', 'dit is hoe ik rol']), false);

    if (normalizedMessage.includes('rolstoelkat')) await sendRolstoelkat(interaction);
    if (normalizedMessage.includes('katstoelrol') || normalizedMessage.includes('takleotslor')) await reply(interaction, { files: ['./media/katstoelrol.gif'] }, false);
    if (normalizedMessage.includes('soep') && !normalizedMessage.includes('soepkip')) await executeSoep(interaction);
    if (normalizedMessage.includes('lubach')) await reply(interaction, { files: ['./media/arjen_lubach.mp4'] }, false);
    if (normalizedMessage.includes('aardbei') || normalizedMessage.includes('ali b')) await reply(interaction, { files: ['./media/aardbei.mp4'] }, false);

    if (normalizedMessage.includes('rob trip') || normalizedMessage.includes('robtripbot')) await reply(interaction, { files: [randomFileFromFolder('./media/robtrip')] }, false);
    if (normalizedMessage.includes('henry winkler') || normalizedMessage.includes('vis foto')) await reply(interaction, { files: [randomFileFromFolder('./media/henrywinkler')] }, false);

    if (normalizedMessage.includes('rik') || normalizedMessage.includes('widm') || normalizedMessage.includes('wie is de mol')) await reply(interaction, { files: ['./media/rik.jpg'] }, false);
    if (normalizedMessage.includes('frank') || normalizedMessage.includes('monchou')) await reply(interaction, { files: ['./media/frank.mp4'] }, false);
    if (normalizedMessage.includes('ulp') || normalizedMessage.includes('rossem')) await reply(interaction, { files: ['./media/ulp.mp4'] }, false);
    if (normalizedMessage.includes('soepkip') || (normalizedMessage.includes('ernst') && normalizedMessage.includes('bobbie'))) await executeSoepkip(interaction);
    if (normalizedMessage.includes('10sc waltz')) await execute10SCWaltz(interaction);
    if (normalizedMessage.includes('ĳ')) await reply(interaction, { files: ['./media/lange_ei.jpg'] });

    if (normalizedMessage.includes('rapper sjors')) return await reply(interaction, { files: [randomFileFromFolder('./media/sjors')] }, false);
    if (normalizedMessage.includes('kipnuggets')) await reply(interaction, { files: ['./media/sjors/kipnuggets.mp4'] }, false);
    if (normalizedMessage.includes('pindakaas')) await reply(interaction, { files: ['./media/sjors/pindakaas.mp4'] }, false);
    if (normalizedMessage.includes('de muziek staat aan') || normalizedMessage.includes('pelikaan') || normalizedMessage.includes('reiger')) await reply(interaction, { files: ['./media/sjors/pelikaan.mp4'] }, false);
}

async function sendRolstoelkat(interaction) {
    if (Math.random() < .05) return await reply(interaction, { files: ['./media/rolstoelkat_2d.gif'] }, false);
    return await reply(interaction, { files: ['./media/rolstoelkat.gif'] }, false);
}


async function executeSoep(interaction) {
    await reply(interaction, { files: ['./media/soep.mp4'] }, false);
    playSoundEffect(interaction, './media/soep.ogg');
}

async function execute10SCWaltz(interaction) {
    await reply(interaction, { files: ['./media/liesbeth.webm'] }, false);
    playSoundEffect(interaction, './media/liesbeth.ogg');
}

async function executeSoepkip(interaction) {
    await reply(interaction, { files: ['./media/soepkip.webm'] }, false);
    playSoundEffect(interaction, './media/soepkip.ogg');
}

async function initiateKlopKlop(interaction) {
    await reply(interaction, 'wie is daar', false);

    const filter = i => i.author.id === interaction.author.id;
    const collector1 = await interaction.channel.createMessageCollector({ filter, max: 1 });

    collector1.on('collect', async interaction1 => {

        await reply(interaction1, `${interaction1.content} wie?`, false);

        const collector2 = await interaction1.channel.createMessageCollector({ filter, max: 1 });

        collector2.on('collect', async interaction2 => {

            await reply(interaction2, randomItem(['ik ga stuk', 'grappig joh', 'leuk man', 'HAHAHAHA', 'ik snap hem niet', '?']), false);
        });
    });
}


function playSoundEffect(interaction, file) {
    if (!interaction.member.voice.channel) return;

    const channel = interaction.member.voice.channel;

    console.log('joining voicechannel', channel.name);

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator
    });

    const player = createAudioPlayer();

    console.log('playing file', file);
    const resource = createAudioResource(file);
    player.play(resource);
    connection.subscribe(player);


    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
        console.log('disconnected from voicechannel', channel.name);
    });
}


function normalizeText(text) {
    return text.toLowerCase().trim().replaceAll(/[\/!?.'"\\]/g, '');
}


function randomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}


function randomFileFromFolder(folder) {
    const files = fs.readdirSync(folder);
    return `${folder}/${randomItem(files)}`;
}