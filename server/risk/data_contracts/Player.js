const PleaseExist = require('../utils/PleaseExist')

const Player = ({name, startingUnitsToPlaceCount}) => {
    PleaseExist(name, 'name')
    PleaseExist(startingUnitsToPlaceCount, 'startingUnitsToPlaceCount')

    return {
        name,
        startingUnitsToPlaceCount,
        remainingSetupUnitsToPlace : startingUnitsToPlaceCount,
        remainingPreTurnUnitsToPlace : null, 
        occupyingTerritories : []
    }
}

module.exports = Player