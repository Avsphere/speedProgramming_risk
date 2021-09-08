const PleaseExist = require('./utils/PleaseExist')
const GameActionFactory = require('./gameActions/GameActionFactory')

const RouteRequestToAction = (pgar) => {
    const { actionName, requestingPlayerName, ...actionArgs } = pgar;
    PleaseExist(actionName, 'actionName')
    PleaseExist(requestingPlayerName, 'requestingPlayerName')
    
    const actionCreationFn = GameActionFactory.GetActionCreationFnByName(actionName);

    return actionCreationFn.bind(null, { requestingPlayerName, ...actionArgs })
}


module.exports = { RouteRequestToAction }
