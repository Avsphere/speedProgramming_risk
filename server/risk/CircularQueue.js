const CircularQueue = (items) => {
    const _items = [...items]
    
    const front = () => _items[0];

    const next = () => {
        // add the front to the back
        const shiftedOffItem = _items[0]

        _items.shift()
        _items.push(shiftedOffItem)
    }

    return {
        front,
        next
    }
}

module.exports = CircularQueue;