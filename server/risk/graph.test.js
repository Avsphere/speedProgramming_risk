
const { Graph } = require('./Graph')

test('can create', () => {
    const g = Graph()
    const n1 = { id : 'a', data : 1 };
    const n2 = { id : 'b', data : 1 }
    
    g.addNode(n1)
    g.addNode(n2)

    expect( g.containsNode(n1) ).toBe(true)
    expect( g.containsNode(n2) ).toBe(true)
})

test('can modify node data', () => {
    const g = Graph()
    const n1 = { id : 'a', data : 1 };
    const n2 = { id : 'b', data : 1 }
    
    g.addNode(n1)
    g.addNode(n2)

    g.addConnection(g.getNode({ id : 'a'}), g.getNode({ id : 'b'}))

    g.getNode(n1).data = 5;
    n1.data = "this should not work because graph maintains internal node object"
    expect(g.getNode(n1).data).toBe(5)
})

test('can connect nodes', () => {
    const g = Graph()
    const n1 = { id : 'a', data : 1 };
    const n2 = { id : 'b', data : 1 }
    
    g.addNode(n1)
    g.addNode(n2)

    expect(g.areNodesConnected(g.getNode(n1), g.getNode(n2))).toBe(false)
    
    g.addConnection(g.getNode(n1), g.getNode(n2))

    expect(g.areNodesConnected(g.getNode(n1), g.getNode(n2))).toBe(true)
})