import fs from "fs";

export function randomItem<T>(array: T[]): T {
    return array[Math.floor(Math.random() * array.length)];
}

export function randomFileFromFolder(folder: string): string {
    const files = fs.readdirSync(folder);
    return `${folder}/${randomItem(files)}`;
}
