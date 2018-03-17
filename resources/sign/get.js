const sign = require("../../sign");

module.exports = (req, info) => {
    const appData = info.config.appData;

    return {
        response: {
            signature: sign(appData.key, appData.secret, info.params)
        }
    };
};
