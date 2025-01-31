import { ApplicationCommandRegistry, Command, CommandOptions } from '@sapphire/framework';
import { Interaction, Message, MessageFlags } from 'discord.js';

export class InviteCommand extends Command {
    constructor(context: Command.LoaderContext, options: CommandOptions | undefined) {
        super(context, { ...options });
    }

    registerApplicationCommands(registry: ApplicationCommandRegistry) {
        registry.registerChatInputCommand((builder) => {
            return builder
                .setName('invite')
                .setDescription('voeg rolstoelkatbot toe aan een andere server');
        });
    }

    async chatInputRun(interaction: Interaction): Promise<Message | void> {
        if (!interaction.isRepliable()) return;

        if (interaction.channel?.isSendable()) interaction.channel.sendTyping();

        await interaction.reply("👉👉👉👉 http://bot.rolstoelkat.nl/ 👈👈👈 (geen virus)");
    }
}
