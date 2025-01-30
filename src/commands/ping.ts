import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { Interaction, Message, MessageFlags } from 'discord.js';

export class PingCommand extends Command {
    constructor(context: Command.LoaderContext, options: CommandOptions | undefined) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand((builder) => {
            return builder
                .setName('ping')
                .setDescription('Ping bot to see if it is alive');
        });
    }

    async chatInputRun(interaction: Interaction): Promise<Message | void> {
        if (!interaction.isRepliable()) return;

        await interaction.reply({ content: `Ping?`, flags: [MessageFlags.Ephemeral] });
        const message = await interaction.fetchReply();


        if (isMessageInstance(message)) {
            const diff = message.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (Round trip took: ${diff}ms. Heartbeat: ${ping}ms.)`);
        }

        return interaction.editReply('Failed to retrieve ping :(');
    }
}
