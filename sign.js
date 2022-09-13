const crypto = require("crypto");

module.exports = (key, secret, params) => {
    const shasum = crypto.createHash("sha1");

    let hashString = Object.keys(params)
        .sort()
        .reduce((res, key) =>
	        //ignore empty params
	        params[key] !== "" ?
		        (res + (res ? "&" : "") + `${key}=${params[key]}`) :
	        res, "");

	console.log(`signing string: '${hashString}'`);

	shasum.update(hashString + secret);

    const signature =  shasum.digest("hex");
    console.log(`returning signature: '${signature}' for params = `, params);

    return signature;
};
