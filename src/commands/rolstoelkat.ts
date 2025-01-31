import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import { ChatInputCommandInteraction, Message, MessageFlags } from 'discord.js';

export class RolstoelkatCommand extends Command {
    constructor(context: Command.LoaderContext, options: CommandOptions | undefined) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand((builder) => {
            return builder
                .setName('rolstoelkat')
                .setDescription('rolstoelkat');
        });
    }

    async chatInputRun(interaction: ChatInputCommandInteraction): Promise<Message | void> {
        if (!interaction.isRepliable()) return;

        if (interaction.channel?.isSendable()) interaction.channel.sendTyping();
        
        await interaction.reply({ files: ["src/media/rolstoelkat.gif"] });
    }
}
