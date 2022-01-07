// Require the necessary discord.js classes
const fs = require('fs');
const {Client, Collection, Intents, MessageEmbed} = require('discord.js');
const {token, clientID} = require('./config.json');

// Create a new client instance
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Set a new item in the Collection
    // With the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log(`${client.user.tag} is er klaar voor`);
    client.user.setActivity('rolstoelkat 👍');
});

async function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.on('messageCreate', async message => {
    if (message.author.id === clientID) return;

    message.content = message.content.toLowerCase();
    message.content = message.content.replace('.', '');
    message.content = message.content.replace('?', '');
    message.content = message.content.replace('!', '');
    message.content = message.content.replace('/', '');
    message.content = message.content.replace('1', '');

    // kijken of klop klop bezig is
    const last4Messages = await message.channel.messages.fetch({limit: 4});
    let botMessage = last4Messages.find(message => message.author.id === clientID);
    let klopklop = false;
    if (botMessage) {
        if (botMessage.content === 'wie is daar' || botMessage.content.endsWith(' wie')) {
            klopklop = true;
        }
    }

    if (klopklop) {
        // klop klop afmaken
        const last2Messages = await message.channel.messages.fetch({limit: 2});
        botMessage = last2Messages.find(message => message.author.id === clientID);
        if (botMessage) {
            if (botMessage.content === 'wie is daar') {
                await message.channel.sendTyping();
                await message.channel.send(`${message.content} wie`);
            }
            if (botMessage.content.endsWith(' wie')) {
                await message.channel.sendTyping();
                await message.channel.send('grappig joh');
            }
        }
    } else {
        // klop klop begin
        if (message.content === 'klop klop') {
            await message.channel.sendTyping();
            await message.channel.send('wie is daar');
        }

        // rolstoelkat
        if (message.content.indexOf('rolstoelkat') >= 0) {
            await message.channel.sendTyping();
            const rolstoelkatEmbed = new MessageEmbed()
                .setColor('#FF6B00')
                .setTitle('rolstoelkat')
                .setURL('http://rolstoelkat.nl/')
                .setImage('http://www.krokanjer.nl/rolstoelkat.gif')
            await message.channel.send({embeds: [rolstoelkatEmbed]});
        }

        // katstoelrol
        if (message.content.indexOf('katstoelrol') >= 0) {
            await message.channel.sendTyping();
            const rolstoelkatEmbed = new MessageEmbed()
                .setColor('#FF6B00')
                .setTitle('katstoelrol')
                .setURL('http://rolstoelkat.nl/')
                .setImage('http://www.krokanjer.nl/katstoelrol.gif')
            await message.channel.send({embeds: [rolstoelkatEmbed]});
        } else {
            if (message.content.indexOf('takleotslor') >= 0) {
                await message.channel.sendTyping();
                const rolstoelkatEmbed = new MessageEmbed()
                    .setColor('#FF6B00')
                    .setTitle('takleotslor')
                    .setURL('http://rolstoelkat.nl/')
                    .setImage('http://www.krokanjer.nl/katstoelrol.gif')
                await message.channel.send({embeds: [rolstoelkatEmbed]});
            }
        }

        // wat etc
        if (message.content.endsWith('wat')) {
            await message.channel.sendTyping();
            await message.reply("patat");
        }
        if (message.content.endsWith('wie')) {
            await message.channel.sendTyping();
            await message.reply("kiwi");
        }
        if (message.content.endsWith('hoe')) {
            await message.channel.sendTyping();
            await message.reply("roekoe");
        }
        if (message.content.endsWith('waarbij')) {
            await message.channel.sendTyping();
            await message.reply("aardbei");
        }
        if (message.content.endsWith('waarom')) {
            await message.channel.sendTyping();
            await message.reply("daarom");
        }
        if (message.content.endsWith('helaas')) {
            await message.channel.sendTyping();
            await message.reply("pindakaas");
        }

        // :thinking:
        if (message.content === '🤔') {
            const thinkingArray = ['⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔\n⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔:clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔\n⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🤔🤔:clap_tone5:🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔:clap_tone5::clap_tone5::clap_tone5:🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫🤔🤔🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫🤔🤔🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫⚫⚫🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫🤔🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫🤔🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫⚫⚫⚫⚫🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫🤔🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔', '⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔🤔🤔🤔🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🤔🤔\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊\n⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫⚫🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊🍊'];

            let thinkingMessages = [];

            for (let i = 0; i < thinkingArray.length; i++) {
                const thinkingMessage = await message.channel.send(thinkingArray[i]);
                thinkingMessages.push(thinkingMessage.id);
                await sleep(1000);
            }
            await sleep(9000);
            await message.channel.bulkDelete(thinkingMessages);
        }

        // soep
        if (message.content.indexOf('soep') >= 0) {
            await message.channel.sendTyping();
            const soep = 'media/soep.mp4';
            await message.channel.send({
                files: [{
                    attachment: soep,
                    name: 'soep.mp4'
                }]
            })
        }

        // kipnuggets
        if (message.content.indexOf('kipnuggets') >= 0 || message.content.indexOf('rapper sjors') >= 0) {
            await message.channel.sendTyping();
            const soep = 'media/kipnuggets.mp4';
            await message.channel.send({
                files: [{
                    attachment: soep,
                    name: 'kipnuggets.mp4'
                }]
            })
        }

        // aardbei
        if (message.content.indexOf('aardbei') >= 0 || message.content.indexOf('ali b') >= 0) {
            await message.channel.sendTyping();
            const soep = 'media/aardbei.mp4';
            await message.channel.send({
                files: [{
                    attachment: soep,
                    name: 'aardbei.mp4'
                }]
            })
        }
    }
});


// Login to Discord with your client's token
client.login(token);