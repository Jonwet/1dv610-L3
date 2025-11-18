import CombatSystem from '../modules/CombatSystem.js'
import Combatant from '../modules/Combatant.js'

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
    }
}
