import { Listener } from "@sapphire/framework";
import { Client } from "discord.js";
import { startStatusChanger } from "../timer.js";

export class ReadyListener extends Listener {
    public constructor(context: Listener.LoaderContext, options: Listener.Options) {
        super(context, {
            ...options,
            once: true
        });
    }

    public run(client: Client) {
        const { username, id } = client.user!;
        this.container.logger.info(`Successfully logged in as ${username} (${id})`);
        startStatusChanger(client);
    }
}
