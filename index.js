const prompt = require("prompt"),
    smocker = require("smocker"),
    colors = require("colors/safe")
    configHelper = require("./config");

//chcek for config file
//if not found - show prompts (port, api key, secret)
//if run with re-config param show prompts again

const start = () =>{
    const config = configHelper.load();

    smocker.start({
        port: config.port || 9991,
        resources: "./resources",
        appData: {
        },
    });   
}

if (process.env.config || !configHelper.hasConfig()) {
    prompt.message = "";
    prompt.start({});

    prompt.get({
        properties: {
            key: {
                description: colors.blue("Your cloud's api key (can be provided by prepare method)"),            
                required: false,
            },
            secret: {
                description:  colors.blue("Your cloud's api secret"),
                message: colors.red("secret is required"),
                required: true,
            },
            port: {
                description:  colors.blue("Run on port (default: 9991)"),
                message: colors.red("Must be a number"),
                pattern: /\d+/,
                required: false,
            },
        },
    }, (err, results) => {
        if (err) {
            if (err.message ===  "canceled"){
                console.log(colors.gray("\nbye"));
            }
            else{
                console.error("ERR!", err);
            }
        }
        else {
            configHelper.save(results);
            start();
            prompt.stop();
        }
    });
}
else{
    start();
}