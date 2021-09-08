const PleaseExist = require('../utils/PleaseExist')


const GameAction = ({ name, isAllowed, execute, validateArgs }) => {
    try
    {
        PleaseExist(name, 'name')
        PleaseExist(isAllowed, 'isAllowed')
        PleaseExist(execute, 'execute')
        PleaseExist(validateArgs, 'validateArgs')
    }
    catch (error)
    {
        console.warn(`GameAction could not be created because missing args. `, error);
        throw error;
    }


    return {
        name,
        isAllowed,
        execute,
        validateArgs
    }
}


module.exports = GameAction