const GAME_PHASES = {
    setup : "setup",
    preturn : "preturn",
    turn : "turn" 
}

const GamePhaseManager = (initialPhase) => {
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

    if (initialPhase) {
        setPhase(initialPhase)
    }

    return {
        setPhase,
        currentPhase
    }
}

module.exports = { GamePhaseManager, GAME_PHASES };