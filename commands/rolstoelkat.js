const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rolstoelkat')
        .setDescription('rolstoelkat'),
    async execute(interaction) {
        const rolstoelkatEmbed = new MessageEmbed()
            .setColor('#FF6B00')
            .setTitle('rolstoelkat')
            .setURL('http://rolstoelkat.nl/')
            .setImage('http://www.krokanjer.nl/rolstoelkat.gif')
        await interaction.reply({embeds: [rolstoelkatEmbed]});
    },
};