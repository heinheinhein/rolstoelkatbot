import { Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { MessageFlags } from 'discord.js';
export class PingCommand extends Command {
    constructor(context, options) {
        super(context, { ...options });
    }
    registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            return builder
                .setName('ping')
                .setDescription('Ping bot to see if it is alive');
        });
    }
    async chatInputRun(interaction) {
        if (!interaction.isRepliable())
            return;
        await interaction.reply({ content: `Ping?`, flags: [MessageFlags.Ephemeral] });
        const msg = await interaction.fetchReply();
        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }
        return interaction.editReply('Failed to retrieve ping :(');
    }
}
