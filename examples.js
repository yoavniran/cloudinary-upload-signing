const signatureExample = function () {
    const makeAjaxRequest = (url, data, cb) =>
        $.ajax({
            url,
            type: "GET",
            dataType: "json",
            data,
            complete: () => {
                console.log("request completed - " + url);
            },
            success: cb,
            error: (xhr, status, error) => {
                console.log(xhr, status, error);
            }
        });

    const getSignature = (cb, params) =>
        makeAjaxRequest("http://localhost:${port}/signature", params,
            (response) =>
                cb(response.signature));


    cloudinary.openUploadWidget({
        upload_preset: "<upload_preset>",
        cloud_name: "<cloud_name>",
        //!!!!!!!!!
        upload_signature: getSignature,
        //!!!!!!!!!
    });
};

const prepareExample = function () {
    const makeAjaxRequest = (url, data, cb) =>
        $.ajax({
            url,
            type: "GET",
            dataType: "json",
            data,
            complete: () => {
                console.log("request completed - " + url);
            },
            success: cb,
            error: (xhr, status, error) => {
                console.log(xhr, status, error);
            }
        });

    const prepareParams = (cb, params) =>
        makeAjaxRequest("http://localhost:${port}/prepare", params,
            (response) => cb(Object.assign({
                signature: response.signature,
                api_key: response.api_key,
            }, response.upload_params)));

    cloudinary.openUploadWidget({
        upload_preset: "<upload_preset>",
        cloud_name: "<cloud_name>",
        //!!!!!!!!!
        prepare_upload_params: prepareParams,
        //!!!!!!!!!
    });
};

module.exports = {
    signature: (port) => signatureExample.toString().replace("${port}", port),
    prepare: (port) => prepareExample.toString().replace("${port}", port),
};