const Territory = ({ name, numberOfUnits }) => {
    if (!name) {
        throw 'Cannot create territory without name'
    }
    
    return {
        name,
        numberOfUnits : numberOfUnits ?? 0
    }
}

module.exports = Territory