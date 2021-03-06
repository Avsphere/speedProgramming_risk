const { Graph } = require('./data_structures/Graph')
const CircularQueue = require('./data_structures/CircularQueue')
const { GamePhaseManager, GAME_PHASES } = require('./GamePhaseManager')
const PlayerGameActionRequestRouter = require('./PlayerGameActionRequestRouter')

const Player = require('./data_contracts/Player')
const Territory = require('./data_contracts/Territory')
const Unit = require('./data_contracts/Unit')

const RiskGameConfig = ({ playerCount, startingUnitsToPlaceCount }) => ({
    playerCount, 
    startingUnitsToPlaceCount
})

const createDefaultConfig = () => RiskGameConfig({
    playerCount : 2,
    startingUnitsToPlaceCount : 10
})

const createDefaultTerritoriesGraph = () => {
    const territoriesGraph = Graph();
    
    const america = Territory({ name : "America" })
    const china = Territory({ name : "China" })

    territoriesGraph.addNode({
        id : america.name,
        data : america
    })

    territoriesGraph.addNode({
        id : china.name,
        data : china
    })

    territoriesGraph.addConnection(
        territoriesGraph.getNode({ id : america.name }),
        territoriesGraph.getNode({ id : china.name }),
    )

    return territoriesGraph;
}


const createDefaultGameState = () => { 
    const config = createDefaultConfig();
    const players = [ 
        Player({
            name : "aaron",
            startingUnitsToPlaceCount : config.startingUnitsToPlaceCount

        }), 
        Player({
            name : "scootes",
            startingUnitsToPlaceCount : config.startingUnitsToPlaceCount
        }) 
    ];
    const phaseManager = GamePhaseManager(GAME_PHASES.setup);

    return GameState({
        config,
        territoriesGraph : createDefaultTerritoriesGraph(),
        players : players,
        turnManager : CircularQueue(players.map( player => player.name)),
        phaseManager 
    })
}
const GameState = ({ config, territoriesGraph, players, turnManager, phaseManager }) => ({
    config,
    territories : territoriesGraph,
    players,
    turnManager,
    phaseManager
}) 




const Risk = () => {
    const gameState = createDefaultGameState();
    const metaState = {
        executedActionRequests : [],
        failedActionRequests : []
    }


    const submitGameAction = (playerGameActionRequest) => {
        const actionCreationFn = PlayerGameActionRequestRouter.RouteRequestToAction(playerGameActionRequest)

        const gameAction = actionCreationFn();
        if (gameAction.validateArgs() === false)
        {
            metaState.failedActionRequests.push(playerGameActionRequest)
            console.error('The submitted player game action request was invalid. Submitted request: ', playerGameActionRequest)
        }
        else if (gameAction.isAllowed(gameState))
        {
            gameAction.execute(gameState)
            metaState.executedActionRequests.push({ playerGameActionRequest })
        }
        else
        {
            metaState.failedActionRequests.push(playerGameActionRequest)
            console.warn("An action was submitted but is not allowed: ", playerGameActionRequest)
        }
    }

    return {
        submitGameAction,
        metaState
    }
}

module.exports = Risk