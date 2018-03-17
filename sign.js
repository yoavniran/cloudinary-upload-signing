const crypto = require("crypto");

module.exports = (key, secret, params) => {
    const shasum = crypto.createHash("sha1");

    let hashString = Object.keys(params)
        .sort()
        .reduce((res, key) =>
            res + (res ? "&" : "") + `${key}=${params[key]}`, "");
    
    shasum.update(hashString + secret);

    const signature =  shasum.digest("hex");
    console.log(`returning signature: '${signature}' for params = `, params);

    return signature;
};