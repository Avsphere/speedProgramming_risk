const GameAction = require("./GameAction")
const PleaseExist = require('../utils/PleaseExist')
const ACTION_NAME = "PlaceUnitDuringSetup";

const PlaceUnitDuringSetup = ({ requestingPlayerName, territoryName }) => {

    const isAllowed = (gameState) => {
        PleaseExist(gameState, 'gameState')
        const { turnManager, phaseManager, territories } = gameState;

        const isItPlayersTurn = turnManager.front() === requestingPlayerName;
        if (isItPlayersTurn === false)
        {
            console.warn(`${ACTION_NAME} failed because not players turn`)
            return false;
        }

        const canPlayerPlaceOnTerritory = territories.getNode({ id : territoryName }).data.numberOfUnits === 0;
        if (canPlayerPlaceOnTerritory === false)
        {
            console.warn(`${ACTION_NAME} failed because player cannot place unit on territory with other units`)
            return false;
        }

        return true;
    }

    const execute = (gameState) => {
        console.log('PlaceUnitDuringSetup executing')
        PleaseExist(gameState, 'gameState')
        const { turnManager, phaseManager, territories, players } = gameState;

        territories.getNode({ id : territoryName }).data.numberOfUnits++;
        
        const triggeringPlayer = players.find( p => p.name === requestingPlayerName);
        triggeringPlayer.remainingSetupUnitsToPlace--;
        triggeringPlayer.occupyingTerritories.push(territoryName)
    
        turnManager.next();
    }
    
    const validateArgs = () => {
        try
        {
            PleaseExist(requestingPlayerName, 'requestingPlayerName')
            PleaseExist(territoryName, 'territoryName')
            return true;
        }
        catch (error)
        {
            console.warn(`${ACTION_NAME} could not be created because missing args. `, error);
            return false;
        }
    }


    return GameAction({ name : ACTION_NAME, isAllowed, execute, validateArgs })
}

const CreatePlaceUnitDuringSetup = {
    actionName : ACTION_NAME,
    PlaceUnitDuringSetup
}

module.exports = CreatePlaceUnitDuringSetup;