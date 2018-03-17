
const fs = require ("fs-extra");

const fileName = "./.appconfig";

let loadedConfig = null;

const load = () => {    
    try{
        if (fs.existsSync(fileName)){
            loadedConfig = fs.readJsonSync(fileName);
        }
    }
    catch(ex){
        console.error("failed to read config file", ex);
    }

    return loadedConfig;
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

const save = (config) => {
    fs.outputJSONSync(fileName, config);
};

module.exports = {
    isValid,
    load,
    save,
};