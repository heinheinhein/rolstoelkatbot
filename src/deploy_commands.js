import { REST, Routes } from 'discord.js';

const discordToken = process.env.DISCORD_TOKEN,
    discordClientId = process.env.DISCORD_APPLICATION_ID;

const commands = [
    {
        name: 'rolstoelkat',
        description: 'rolstoelkat',
    },
    {
        name: 'ping',
        description: 'ping me dan'
    },
    {
        name: 'invite',
        description: 'voeg rolstoelkat toe aan een andere server'
    }
];

const rest = new REST({ version: '10' }).setToken(discordToken);

try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(discordClientId), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
} catch (error) {
    console.error(error);
}