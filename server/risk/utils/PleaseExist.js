const PleaseExist = (arg, argName) => {
    if (!arg || arg === NaN) {
        throw `PleaseExist says nooooo ${argName} does not exist`
    }
} 

module.exports = PleaseExist;