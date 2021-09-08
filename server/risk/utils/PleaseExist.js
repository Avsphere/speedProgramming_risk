/// hmm even for speed programming i wonder if this is worth, maybe if i could enforce execution  --trace-uncaught

const PleaseExist = (arg, argName) => {
    if (!arg || arg === NaN) {
        throw `PleaseExist says nooooo ${argName} does not exist`
    }
} 

module.exports = PleaseExist;