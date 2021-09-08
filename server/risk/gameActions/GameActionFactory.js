const gameActionCreationFns = [
    require('./PlaceUnitDuringSetup')
] 

// should throw at run time if fails
const validateGameActionCreationFns = () => {
    gameActionCreationFns.forEach( (gameActionCreationFn, i) => {
        if (gameActionCreationFn.hasOwnProperty('actionName') === false)
        {
            throw `GameAction creation fn missing actionName. Require Index ${i}`
        }

        if (gameActionCreationFn.hasOwnProperty(gameActionCreationFn['actionName']) === false)
        {
            throw `GameAction creation fn missing creation fn. Require Index ${i}`
        }
    })
}

validateGameActionCreationFns();

const GetActionCreationFnByName = name => gameActionCreationFns.find( el => el.actionName === name)[name];

module.exports = { GetActionCreationFnByName }