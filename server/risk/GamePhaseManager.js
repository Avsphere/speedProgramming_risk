const PleaseExist = require('./utils/PleaseExist')

const GAME_PHASES = {
    setup : "setup",
    preturn : "preturn",
    turn : "turn" 
}

const isSetupPhaseOver = (gameState) => {
    PleaseExist(gameState, 'gameState')

    const { players } = gameState.players

    const haveAllPlayersPlacedUnits = players.filter( p => p.remainingSetupUnitsToPlace === 0).length === gameState.players

    return haveAllPlayersPlacedUnits;
}

const isPreTurnPhaseOver = (gameState) => {
    PleaseExist(gameState, 'gameState')

    const { players, turnManager } = gameState.players;

    const currentPlayer = players.filter( p => p.name === turnManager.front() )[0]

    return currentPlayer.remainingPreTurnUnitsToPlace === 0;
}


const GamePhaseManager = (initialPhase) => {
    PleaseExist(initialPhase, 'initialPhase')
    const gamePhases = { ...GAME_PHASES }

    const setPhase = (newPhase) => {
        const standardCasedPhase = newPhase.toLocaleLowerCase();
        if (gamePhases.hasOwnProperty(standardCasedPhase) === false)
        {
            throw `Game phase ${standardCasedPhase} is not recognized`
        }

        Object.entries(gamePhases).forEach( ([key, _]) => {
            gamePhases[key] = false;
        })

        gamePhases[standardCasedPhase] = true;
    }

    const currentPhase = () => Object.entries(gamePhases).reduce( (acc, [key, value]) => {
        if ( value === true)
        {
            acc = key
        }
        
        return acc;
    }, null)

    // idea here is to abstract phase shifting to this 
    const tick = (gameState) => {
        if (currentPhase() === GAME_PHASES.setup && isSetupPhaseOver(gameState))
        {
            setPhase(GAME_PHASES.preturn)
        }
        else if (currentPhase() === GAME_PHASES.preturn && isPreTurnPhaseOver(gameState))
        {
            setPhase(GAME_PHASES.turn)
        }
    }


    if (initialPhase) {
        setPhase(initialPhase)
    }

    return {
        currentPhase,
        tick
    }
}

module.exports = { GamePhaseManager, GAME_PHASES };