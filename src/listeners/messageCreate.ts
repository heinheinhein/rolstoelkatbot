import { Listener } from "@sapphire/framework";
import { Message, MessageCreateOptions, MessageReplyOptions } from "discord.js";
import { randomItem, randomFileFromFolder } from "../random.js";
import { messageFunction } from "../types.js";
import {
    AudioPlayerStatus,
    createAudioPlayer,
    createAudioResource,
    joinVoiceChannel
} from "@discordjs/voice";

export class ReadyListener extends Listener {
    // klap deze maar dicht
    private onMessageFunctions: messageFunction[] = [
        {
            if: (content) => content.endsWith("wat"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    replyOptions: { content: "patat" }
                })
        },
        {
            if: (content) => content.endsWith("wie"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    replyOptions: { content: "kiwi" }
                })
        },
        {
            if: (content) => content.endsWith("hoe"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    replyOptions: { content: "roekoe" }
                })
        },
        {
            if: (content) => content.endsWith("waarbij"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    replyOptions: { content: "aardbei" }
                })
        },
        {
            if: (content) => content.endsWith("helaas"),
            do: (message) => {
                this.reply({
                    interaction: message,
                    replyOptions: { content: "pindakaas" }
                });
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/sjors/pindakaas.mp4"] }
                });
            }
        },
        {
            if: (_content, message) =>
                message ? message.mentions.users.has(this.container.client.id || "") : false,
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: {
                        content: randomItem(["je weet hoe die gaat", "dit is hoe ik rol"])
                    }
                })
        },
        {
            if: (content) => content.includes("rolstoelkat"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: {
                        files: [
                            Math.random() < 0.05
                                ? "./src/media/rolstoelkat_2d.gif"
                                : "./src/media/rolstoelkat.gif"
                        ]
                    }
                })
        },
        {
            if: (content) => content.includes("katstoelrol") || content.includes("takleotslor"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/katstoelrol.gif"] }
                })
        },
        {
            if: (content) =>
                (content.includes("soep") && !content.includes("soepkip")) ||
                content.includes("rutte"),
            do: (message) => {
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/soep.mp4"] }
                });
                this.playSound(message, "./src/media/soep.ogg");
            }
        },
        {
            if: (content) => content.includes("lubach"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/lubach.mp4"] }
                })
        },
        {
            if: (content) => content.includes("ali b") || content.includes("aardbei"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/aardbei.mp4"] }
                })
        },
        {
            if: (content) => content.includes("rob trip") || content.includes("robtripbot"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: [randomFileFromFolder("./src/media/rob-trip")] }
                })
        },
        {
            if: (content) => content.includes("henry winkler") || content.includes("vis foto"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: [randomFileFromFolder("./src/media/henry-winkler")] }
                })
        },
        {
            if: (content) =>
                content.includes("rik") ||
                content.includes("wie is de mol") ||
                content.includes("widm"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/rik.jpg"] }
                })
        },
        {
            if: (content) => content.includes("frank") || content.includes("monchou"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/frank.mp4"] }
                })
        },
        {
            if: (content) => content.includes("rossem") || content.includes("ulp"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/ulp.mp4"] }
                })
        },
        {
            if: (content) =>
                content.includes("soepkip") ||
                content.includes("ernst") ||
                content.includes("bobbie"),
            do: (message) => {
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/soepkip.webm"] }
                });
                this.playSound(message, "./src/media/soepkip.ogg");
            }
        },
        {
            if: (content) => content.includes("ĳ"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/lange_ei.jpg"] }
                })
        },
        {
            if: (content) => content.includes("rapper sjors"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: [randomFileFromFolder("./src/media/sjors")] }
                })
        },
        {
            if: (content) => content.includes("kipnugget"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/sjors/kipnuggets.mp4"] }
                })
        },
        {
            if: (content) => content.includes("pindakaas"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/sjors/pindakaas.mp4"] }
                })
        },
        {
            if: (content) =>
                content.includes("de muziek staat aan") || content.includes("pelikaan"),
            do: (message) =>
                this.reply({
                    interaction: message,
                    messageOptions: { files: ["./src/media/sjors/pelikaan.mp4"] }
                })
        }
    ];

    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, { ...options });
    }

    public run(message: Message) {
        if (message.author.bot) return;
        if (!message.channel.isTextBased()) return;
        if (!message.channel.isSendable()) return;

        const normalizedMessage = this.normalizeText(message.content);

        if (normalizedMessage === "klop klop") return this.klopKlop(message);

        for (let i = 0; i < this.onMessageFunctions.length; i++) {
            const onMessageFunction = this.onMessageFunctions[i];
            if (onMessageFunction.if(normalizedMessage, message)) {
                onMessageFunction.do(message);
            }
        }
    }

    private async reply({
        interaction,
        messageOptions,
        replyOptions
    }: {
        interaction: Message;
        messageOptions?: MessageCreateOptions;
        replyOptions?: MessageReplyOptions;
    }): Promise<void> {
        if (!messageOptions && !replyOptions) return;
        if (!interaction.channel.isTextBased()) return;
        if (!interaction.channel.isSendable()) return;

        if (messageOptions) {
            await interaction.channel.sendTyping();
            await interaction.channel.send(messageOptions);
        } else if (replyOptions) {
            await interaction.channel.sendTyping();
            await interaction.reply(replyOptions);
        }
    }

    private playSound(interaction: Message, file: string): void {
        if (!interaction.member?.voice.channel) return;
        const channel = interaction.member.voice.channel;

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = createAudioPlayer();
        const resource = createAudioResource(file);
        player.play(resource);
        connection.subscribe(player);

        player.on(AudioPlayerStatus.Idle, () => connection.destroy());
    }

    private async klopKlop(interaction: Message): Promise<void> {
        const channel = interaction.channel;
        if (!channel.isSendable()) return;

        await this.reply({ interaction, messageOptions: { content: "wie is daar" } });

        const authorFilter = (m: Message) => m.author.id === interaction.author.id;
        const collector = channel.createMessageCollector({ filter: authorFilter, max: 2 });

        let grap: string | undefined;

        collector.on("collect", async (collectedInteraction) => {
            if (!grap) {
                grap = collectedInteraction.content;
                await this.reply({
                    interaction: collectedInteraction,
                    messageOptions: { content: `${grap} wie?` }
                });
            } else {
                await this.reply({
                    interaction: collectedInteraction,
                    messageOptions: {
                        content: randomItem([
                            "ik ga stuk",
                            "grappig joh",
                            "leuk man",
                            "HAHAHAHA",
                            "ik snap hem niet",
                            "?"
                        ])
                    }
                });
            }
        });
    }

    private normalizeText(text: string) {
        return text
            .toLowerCase()
            .trim()
            .replaceAll(/[\/!?.'"\\]/g, "");
    }
}
