const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('invite')
        .setDescription('voeg rolstoelkat toe aan een andere server'),
    async execute(interaction) {
        await interaction.user.send('👉👉👉👉 http://bot.rolstoelkat.nl 👈👈👈 (geen virus)');
        await interaction.reply({content: 'check je dm\'s', ephemeral: true});
    },
};