import CombatSystem from '../modules/CombatSystem.js'
import Combatant from '../modules/Combatant.js'
import CombatAction from '../modules/CombatAction.js'

export default class CombatModel {
    constructor() {
        this.combat = null
        this.playerCombatants = []
        this.enemyCombatants = []
    }

    initializeCombat(playerUnits, enemyUnits) {
        this.combat = new CombatSystem()

        this.playerCombatants = playerUnits.map((unit) => new Combatant(unit))
        this.enemyCombatants = enemyUnits.map((unit) => new Combatant(unit))

        const allCombatants = [
            ...this.playerCombatants,
            ...this.enemyCombatants,
        ]
        this.combat.startCombat(allCombatants)
    }

    executeAttack(targetId, action) {
        this.combat.executeAttack(targetId, action)
    }

    executeDefend(unitId) {
        this.combat.executeDefend(unitId)
    }

    advanceTurn() {
        this.combat.nextUnitTurn()
    }

    checkBattleEnd() {
        return this.combat.checkBattleEnd()
    }
}
