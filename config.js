
const fs = require ("fs-extra");

const fileName = ".appconfig";

let loadedConfig = null;

const load = () => {


    

    return null;
};


const isValid = (config) => {
    let valid = false;

   if ( config){
        if (config.secret){
            const port = Number(config.port);
            if (port && !Number.isNaN(port)){
                valid = true;   
            }
        }
   }

   return valid;
};

const save = (results) => {


};

module.exports = {
    isValid,
    load,
    save,
};