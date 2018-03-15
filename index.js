const prompt = require("prompt"),
    smocker = require("smocker"),
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

if (!process.env.CONFIG || !configHelper.hasConfig()) {
    prompt.message = "";
    prompt.start({});

    prompt.get({
        properties: {
            key: {
                description: "Your cloud's api key (can be provided by prepare method)",            
                required: false,
            },
            secret: {
                description: "Your cloud's api secret",
                message: "secret is required",
                required: true,
            },
            port: {
                description: "Run on port (default: 9991)",
                message: "Must be a number",
                pattern: /\d+/,
                required: false,
            }
        },
    }, (err, results) => {
        if (err) {
            if (err.message ===  "canceled"){
                console.log("\nbye");
            }
            else{
                console.error("ERR!", err);
            }
        }
        else {
            configHelper.save(results);
            console.log(results);
            // start();
            prompt.stop();
        }
    });
}
else{
    start();
}