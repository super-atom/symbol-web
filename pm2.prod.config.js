module.exports = {
    apps: [
        {
            name: 'symbol_web_prod',
            script: './.next/server/init-server.js',
            exec_mode: 'cluster',
            instances: 2,
            env: {
                NODE_ENV: 'production',
                MODE: 'production',
            },
        },
    ],
};
