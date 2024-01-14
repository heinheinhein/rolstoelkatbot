import pino from 'pino';

const transport = pino.transport({
    targets: [
        {
            target: 'pino/file',
            options: {
                destination: './logs/rolstoelkatbot.json',
                mkdir: true
            }
        },
        {
            target: 'pino-pretty',
            options: {
                colorize: true,
                singleLine: true,
                ignore: 'hostname,guild,user,commands'
            }
        }
    ]
});

export default pino(transport);