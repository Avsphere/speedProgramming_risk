const { Graph } = require('./Graph')
const CircularQueue = require('./CircularQueue')
const Player = require('./Player')

const RiskGameConfig = ({ playerCount, startingUnitCount }) => ({
    playerCount, 
    startingUnitCount
})

const createDefaultConfig = () => RiskGameConfig({
    playerCount : 2,
    startingUnitCount : 10
})

const Unit = ({ id }) => ({ id })

const Territory = ({ name, numberOfUnits }) => {
    if (!name) {
        throw 'Cannot create territory without name'
    }
    
    return {
        name,
        numberOfUnits : numberOfUnits ?? 0
    }
}

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

const createDefaultGameState = () => GameState({
    config : createDefaultConfig(),
    territoriesGraph : createDefaultTerritoriesGraph(),
    players : [ Player({name : "aaron"}), Player({name : "scootes"}) ]
})

const GameState = ({ config, territoriesGraph, players }) => ({
    config,
    territories : territoriesGraph,
    players,
    turnManager : CircularQueue(players.map( player => player.name))
}) 



const Risk = () => {
    const gameState = createDefaultGameState();

    console.log(gameState)
}

const r = Risk({});