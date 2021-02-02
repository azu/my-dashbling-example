const { createFileHistory } = require("@dashbling/core/history");
const eventHistoryPath = require("path").join(process.cwd(), "dashbling-events");

module.exports = {
    basicAuth: process.env.NODE_ENV === "production" ? "you:secretsecretsecretsecret" : undefined,
    authToken: "secretsecretsecretsecret",
    webpackConfig: (config) => {
        // return modified config
        // or even completely custom config.
        //
        // Example:
        // config.module.rules.push({
        //   test: /\.jpg$/,
        //   loader: "file-loader"
        // });
        return config;
    },
    onStart: (sendEvent) => {
        // start custom code that sends events here,
        // for example listen to streams etc.
    },
    configureServer: async (hapiServer) => {
        // Configure the Hapi server here.
        // See https://hapijs.com/api/17.1.1 docs for details.
        // This is only needed for more advanced use cases.
        hapiServer.route({
            method: "GET",
            path: "/ping",
            handler: (_request, _h) => {
                return "pong";
            }
        });
    },
    eventHistory: createFileHistory(eventHistoryPath),
    forceHttps: false,
    jobs: [
        {
            schedule: "*/30 * * * *",
            fn: require("./jobs/jser-info-status")({
                eventId: "jser-info-status"
            })
        },
        // Hard code config in ./jobs/github-project...
        // You should edit /jobs/github-project
        // {
        //     schedule: "*/5 * * * *",
        //     fn: require("./jobs/github-project")({
        //         GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        //         eventId: "github-project"
        //     })
        // },
        {
            schedule: "*/10 * * * *",
            fn: require("./jobs/natureremo")({
                OPEN_WEATHER_TOKEN: process.env.OPEN_WEATHER_TOKEN,
                NATUREREMO_TOKEN: process.env.NATUREREMO_TOKEN,
                eventId: "natureremo"
            })
        },
        {
            schedule: "*/30 * * * *",
            fn: require("./jobs/calendar")({
                ICAL_URL: process.env.ICAL_URL,
                eventId: "calendar"
            })
        }
    ]
};
