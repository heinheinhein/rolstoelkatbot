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
    client.user.setActivity('rolstoelkat 👍');
    const time = new Date(Date.now()).toLocaleTimeString();
    console.log(`${time} ${client.user.tag} is er klaar voor`);
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

    const time = new Date(Date.now()).toLocaleTimeString();
    console.log(`${time} ${interaction.user.tag}: /${interaction.commandName}`);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
    }
});

client.on('messageCreate', async message => {
    if (message.author.id === clientID) return;

    const time = new Date(Date.now()).toLocaleTimeString();

    const regex = /[\/1!?.]/g; // god ik haat regex
    let messageContent = message.content.toLowerCase().replace(regex, '');

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
            console.log(`${time} ${message.author.tag}: klop klop`);
            await message.channel.sendTyping();
            await message.channel.send('wie is daar');
        }

        // rolstoelkat
        if (messageContent.indexOf('rolstoelkat') >= 0) {
            console.log(`${time} ${message.author.tag}: rolstoelkat`);
            await message.channel.sendTyping();
            const rolstoelkatEmbed = new MessageEmbed()
                .setColor('#FF6B00')
                .setTitle('rolstoelkat')
                .setURL('http://rolstoelkat.nl/')
                .setImage('http://www.krokanjer.nl/rolstoelkat.gif')
            await message.channel.send({embeds: [rolstoelkatEmbed]});
        }

        // katstoelrol
        if (messageContent.indexOf('katstoelrol') >= 0) {
            console.log(`${time} ${message.author.tag}: katstoelrol`);
            await message.channel.sendTyping();
            const rolstoelkatEmbed = new MessageEmbed()
                .setColor('#FF6B00')
                .setTitle('katstoelrol')
                .setURL('http://rolstoelkat.nl/')
                .setImage('http://www.krokanjer.nl/katstoelrol.gif')
            await message.channel.send({embeds: [rolstoelkatEmbed]});
        } else {
            if (messageContent.indexOf('takleotslor') >= 0) {
                console.log(`${time} ${message.author.tag}: takleotslor`);
                await message.channel.sendTyping();
                const rolstoelkatEmbed = new MessageEmbed()
                    .setColor('#FF6B00')
                    .setTitle('takleotslor')
                    .setURL('http://rolstoelkat.nl/')
                    .setImage('http://www.krokanjer.nl/katstoelrol.gif')
                await message.channel.send({embeds: [rolstoelkatEmbed]});
            }
        }

        // @rolstoelkat
        if (message.content.indexOf(`<@!${clientID}>`) >= 0) {
            console.log(`${time} ${message.author.tag}: @rolstoelkat`);
            await message.channel.sendTyping();
            await message.channel.send('je weet hoe die gaat');
        }

        // wat etc
        if (messageContent.endsWith('wat')) {
            console.log(`${time} ${message.author.tag}: wat`);
            await message.channel.sendTyping();
            await message.reply("patat");
        }
        if (messageContent.endsWith('wie')) {
            console.log(`${time} ${message.author.tag}: wie`);
            await message.channel.sendTyping();
            await message.reply("kiwi");
        }
        if (messageContent.endsWith('hoe')) {
            console.log(`${time} ${message.author.tag}: hoe`);
            await message.channel.sendTyping();
            await message.reply("roekoe");
        }
        if (messageContent.endsWith('waarbij')) {
            console.log(`${time} ${message.author.tag}: waarbij`);
            await message.channel.sendTyping();
            await message.reply("aardbei");
        }
        if (messageContent.startsWith('waarom')) {
            console.log(`${time} ${message.author.tag}: waarom niet?`);
            await message.channel.sendTyping();
            await message.reply("waarom niet?");
        } else {
            if (messageContent.endsWith('waarom')) {
                console.log(`${time} ${message.author.tag}: waarom`);
                await message.channel.sendTyping();
                await message.reply("daarom");
            }
        }
        if (messageContent.endsWith('helaas')) {
            console.log(`${time} ${message.author.tag}: helaas`);
            await message.channel.sendTyping();
            await message.reply("pindakaas");
        }

        // :thinking:
        if (messageContent === '🤔') {
            console.log(`${time} ${message.author.tag}: :thinking:`);

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
        if (messageContent.indexOf('soep') >= 0) {
            console.log(`${time} ${message.author.tag}: soep`);
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
        if (messageContent.indexOf('kipnuggets') >= 0 || messageContent.indexOf('rapper sjors') >= 0) {
            console.log(`${time} ${message.author.tag}: kipnuggets`);
            await message.channel.sendTyping();
            const kipnuggets = 'media/kipnuggets.mp4';
            await message.channel.send({
                files: [{
                    attachment: kipnuggets,
                    name: 'kipnuggets.mp4'
                }]
            })
        }

        // aardbei
        if (messageContent.indexOf('aardbei') >= 0 || messageContent.indexOf('ali b') >= 0) {
            console.log(`${time} ${message.author.tag}: aardbei`);
            await message.channel.sendTyping();
            const aardbei = 'media/aardbei.mp4';
            await message.channel.send({
                files: [{
                    attachment: aardbei,
                    name: 'aardbei.mp4'
                }]
            })
        }
    }
});


// Login to Discord with your client's token
client.login(token);