module.exports = {
    apps: [
        {
            name: 'symbol_web_dev',
            script: './server/index.ts',
            interpreter: './node_modules/.bin/ts-node',
            exec_mode: 'fork_mode',
            watch: false,
            ignore_watch: ['[/\\]./', 'node_modules'],
            instances: 1,
            port: 3000,
            noDaemonMode: true,
            env_dev: {
                NODE_ENV: 'development',
                NEXT_PUBLIC_MODE: 'development',
            },
            env_local: {
                NODE_ENV: 'development',
                NEXT_PUBLIC_MODE: 'local',
            },
        },
    ],
};
