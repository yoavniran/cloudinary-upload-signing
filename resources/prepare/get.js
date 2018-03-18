const sign = require("../../sign");

module.exports = function (req, info) {
    const appData = info.config.appData,
        params = info.params;

    params.timestamp = params.timestamp || Math.floor(new Date().getTime() / 1000);
    params.folder = params.folder || "test-prepare-uw";
    
    return {
        response: {
            signature: sign(appData.key, appData.secret, params),
            api_key: appData.key,
            upload_params: params
        }
    };
};
