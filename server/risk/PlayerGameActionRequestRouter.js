const PleaseExist = require('./utils/PleaseExist')

const PlaceUnitDuringSetup_PGAR = ({ requestingPlayerName, territory }) => {

}


const Create_PlaceUnitDuringSetup_Action = ({ requestingPlayerName, territoryName }) => {
    const actionName = "PlaceUnitDuringSetup"
    PleaseExist(requestingPlayerName, 'requestingPlayerName')
    PleaseExist(territoryName, 'territoryName')
    
    const isAllowed = (gameState) => {
        const { turnManager, phaseManager, territories } = gameState;

        const isItPlayersTurn = turnManager.front() === requestingPlayerName;
        if (isItPlayersTurn === false)
        {
            console.warn(`${actionName} failed because not players turn`)
            return false;
        }

        const canPlayerPlaceOnTerritory = territories.getNode({ id : territoryName }).data.numberOfUnits === 0;
        if (canPlayerPlaceOnTerritory === false)
        {
            console.warn(`${actionName} failed because player cannot place unit on territory with other units`)
            return false;
        }

        return true;
    }

    const execute = (gameState) => {
        console.log('executing place unit action')
        territories.getNode({ id : territoryName }).data.numberOfUnits++;
        
    }
}


const GameAction = ({ isAllowedFn, executeFn, actionName }) => {

} 

const PlayerGameActionRequestRouter = () => {
    const parsePGAR = (pgar) => {
        
    }

    const routeToAction = (pgar) => {

    }

}

