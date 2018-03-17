const prompt = require("prompt"),
    smocker = require("smocker"),
    parseArgs = require("command-line-args"),
    colors = require("colors/safe"),
    configHelper = require("./config"),
    examples = require("./examples");

const C_ARGS = [
    { name: "config", alias: "c", type: Boolean, description: "Use to show configuration prompts" },
    { name: "example", alias: "e", type: Boolean, description: "Prints client-side examples to the console"},
    { name: "port", alias: "p", type: Number, description: "The port to run this app on (default: 9991)"},
    { name: "key", alias: "k", type: String, description: "The Cloudinary cloud API key"},
    { name: "secret", alias: "s", type: String, description: "The Cloudinary cloud API secret"},
    { name: "help", alias: "?", type: Boolean, description: "Show this help screen"},
];

const printExamples = (port) => {
    console.log(colors.green("!!!!!!!!!!! EXAMPLES START"));
    console.log("-------------------------------- Signature Example --------------------------");
    console.log(examples.signature(port));
    console.log("-------------------------------- Prepare Example --------------------------");
    console.log(examples.prepare(port));
    console.log(colors.green("!!!!!!!!!!! EXAMPLES END"));
};

const startServer = (config, args) => {
    config.port = config.port || 9991;

    if (args.example){
        printExamples(config.port);
    }

    console.info(colors.gray(`!!! Starting server with config: `), config);

    smocker.start({
        port: config.port,
        resources: "./resources",
        appData: {
            ...config
        },
    });

    configHelper.save(config);
};

const checkStartArgs = () =>
    parseArgs(C_ARGS);

const promptForConfig = (config, callback) => {
    prompt.message = "";
    prompt.start({});

    prompt.get({
        properties: {
            key: {
                description:
                    colors.blue(`Your cloud's api key ${config.key ? `(${config.key})` : ""}`),
                required: false,
            },
            secret: {
                description: colors.blue(`Your cloud's api secret ${config.secret ? `(${config.secret})` : ""}`),
                message: colors.red("secret is required"),
                required: !config.secret,
            },
            port: {
                description: colors.blue(`Run on port ${config.port ? `(${config.port})` :  ""}`),
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
            callback(mergeConfig(config, results));
        }
    });
};

const mergeConfig = (config, overrides) => ({
    key: overrides.key || config.key,
    secret: overrides.secret || config.secret,
    port: overrides.port ?  parseInt(overrides.port) : config.port,
});

const getConfig = (args) => {
    let config = {
        key: args.key,
        secret: args.secret,
        port: args.port,
    };

    const savedConfig = configHelper.load();

    if (savedConfig) {
        config = mergeConfig(savedConfig, config);
    }

    return config;
};

const printHelp = () => {
    console.info(`You can use the following arguments: \n`);
    
    C_ARGS.forEach((arg) =>
        console.info(`  ${(arg.name + ":").padEnd(8)} --${arg.name} or -${arg.alias.padEnd(3)} \t- ${arg.description}`));

    console.info(`\nExample: yarn start -p 3000 -k "cloud_key" -s "cloud_secret"`);
    console.info(`Example: npm run start -- -p 3000 -k "cloud_key" -s "cloud_secret"\n`);
};

const start = () => {
    const args = checkStartArgs();

    if (args.help) {
        printHelp();
    }
    else {
        const config = getConfig(args),
            reconfig = args.config || !configHelper.isValid(config);

        if (reconfig) {
            promptForConfig(config, (updatedConfig) => {
                if (updatedConfig) {                    
                    startServer(updatedConfig, args);
                }
                else {
                    process.exit(1);
                }
            });
        }
        else {
            startServer(config, args);
        }
    }
}

start();