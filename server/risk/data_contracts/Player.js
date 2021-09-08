const PleaseExist = require('../utils/PleaseExist')

const Player = ({name, startingUnitsToPlaceCount}) => {
PleaseExist(name, 'name')
    PleaseExist(startingUnitsToPlaceCount, 'startingUnitsToPlaceCount')

    return {
        name,
        startingUnitsToPlaceCount,
        remainingUnitsToPlace : startingUnitsToPlaceCount
    }
}

module.exports = Player