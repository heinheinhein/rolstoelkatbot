const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('ping me dan'),
    async execute(interaction) {
        const sent = await interaction.reply({content: 'aan het pingen...', fetchReply: true, ephemeral: true});
        await interaction.editReply(`ping is ${sent.createdTimestamp - interaction.createdTimestamp}ms, cool beans`);
    },
};