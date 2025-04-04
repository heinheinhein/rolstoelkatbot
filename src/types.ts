import { Message } from "discord.js";

export interface messageFunction {
    if: (content: string, message: Message) => boolean;
    do: (message: Message) => void;
}
