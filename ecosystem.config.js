module.exports = {
    apps: [
        {
            name: "prod",
            script: "./server.js",
            env: {
                "PORT": 443
            }
        },
        {
            name: "dev",
            script: "./server.js",
            env: {
                "PORT": 80
            }
        }
    ]
};