
const Risk = require('./Risk')

test('can submit setup place unit action', () => {
    const pgar = {
        actionName : 'PlaceUnitDuringSetup',
        requestingPlayerName : 'aaron',
        territoryName : "America"
    }

    const risk = Risk();

    risk.submitGameAction(pgar);

    expect(risk.metaState.executedActionRequests.length).toBe(1)
    expect(risk.metaState.failedActionRequests.length).toBe(0)
})