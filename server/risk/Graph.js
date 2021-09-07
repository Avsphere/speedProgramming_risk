const GraphNode = ({ id, data }) => {


    return {
        id,
        data,
        edgeMap : []
    }
}

const Graph = () => {
    const nodes = []
    const containsNode = ({id}) => nodes.findIndex( n => n.id === id) !== -1

    const addNode = ({ id, data }) => {
        if (containsNode({id}))
        {
            throw `Graph cannot add node with id ${id} because it already exists in graph`
        }

        nodes.push(GraphNode({id, data}))
    }

    const addConnection = (n1, n2) => {
        if (containsNode(n1) === false || containsNode(n2) === false)
        {
            throw 'Can only add a connection if node exists in graph'
        }
        if (n1.edgeMap.includes(n2.id))
        {
            throw `GraphNode ${n1.id} already connects to node with id: ${n2.id}`
        }
        if (n1.edgeMap.includes(n1.id))
        {
            throw `GraphNode ${n2.id} already connects to node with id: ${n1.id}`
        }

        if (n1.id === n2.id) {
            throw 'Cannot connect to node with same id'
        }

        n1.edgeMap.push(n2.id)
        n2.edgeMap.push(n1.id)
    }

    const getNode = ({id}) => {
        if (containsNode({id}) === false)
        {
            throw `Cannot get node ${id} because node cannot be found` 
        }

        return nodes.find( n => n.id === id)
    }

    const areNodesConnected = (n1, n2) => {
        return n1.edgeMap.includes(n2.id) && n2.edgeMap.includes(n1.id)
    }

    return {
        containsNode,
        addNode,
        getNode,
        areNodesConnected,
        addConnection
    }
}

module.exports = {
    Graph
}