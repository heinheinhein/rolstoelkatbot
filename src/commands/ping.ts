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
                .setDescription('ping me dan');
        });
    }

    async chatInputRun(interaction: Interaction): Promise<Message | void> {
        if (!interaction.isRepliable()) return;

        await interaction.reply({ content: "aan het pingen...", flags: [MessageFlags.Ephemeral] });
        const message = await interaction.fetchReply();

        if (isMessageInstance(message)) {
            const diff = message.createdTimestamp - interaction.createdTimestamp;
            return interaction.editReply(`ping is ${diff}ms, cool beans`);
        }

        return interaction.editReply('pingen is niet gelukt :(');
    }
}
