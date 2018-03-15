const prompt = require("prompt"),
    smocker = require("smocker"),
    colors = require("colors/safe"),
    configHelper = require("./config"),
    parseArgs = require("command-line-args");

const startServer = (config) => {
    console.log("!!!!! starting with config: ", config);
    smocker.start({
        port: config.port || 9991,
        resources: "./resources",
        appData: {
            ...config
        },
    });

    configHelper.save(config);
};

const checkStartArgs = () =>
    parseArgs([
        { name: "reconfig", alias: "c", type: Boolean, },
        { name: "example", alias: "e", type: Boolean, },
        { name: "port", alias: "p", type: Number, },
        { name: "key", alias: "k", type: String, },
        { name: "secret", alias: "s", type: String, },
        { name: "help", alias: "?",},
    ]);

const promptForConfig = (config, callback) => {
    prompt.message = "";
    prompt.start({});

    prompt.get({
        properties: {
            key: {
                description:
                    colors.blue(`Your cloud's api key ${config.key || ""}`),
                required: false,
            },
            secret: {
                description: colors.blue(`Your cloud's api secret (${config.secret || ""})`),
                message: colors.red("secret is required"),
                required: true,
            },
            port: {
                description: colors.blue(`Run on port  (${config.port || ""})`),
                message: colors.red("Must be a number"),
                pattern: /\d+/,
                required: false,
            },
        },
    }, (err, results) => {
        prompt.stop();

        if (err) {
            err.message === "canceled" ?
                console.log(colors.gray("\nbye")) :
                console.error("ERR!", err);
        }
        else {


            callback();
        }
    });
};

const getConfig = (args) => {
    console.log("args === ", args);

    let config = {
        key: args.key,
        secret: args.secret,
        port: args.port || 9991,
    };

    const savedConfig = configHelper.load();

    if (savedConfig) {
        config = {
            key: config.key || savedConfig.key,
            secret: config.secret || savedConfig.secret,
            port: config.port || savedConfig.port,
        };
    }

    return config;
};

const printExamples = () => {

};

const start = () => {
    const args = checkStartArgs();

    if (args.help){
        
    }

    const config = getConfig(args),
        reconfig = args.reconfig || !configHelper.isValid(config);

    if (reconfig) {
        promptForConfig(config, (updatedConfig) => {
            if (updatedConfig) {
                console.log(colors.green("Starting Server!"));
                startServer(updatedConfig);
            }
            else {
                process.exit(1);
            }
        });
    }
    else {
        startServer(config);
    }
}

start();