import CombatSystem from '../module/CombatSystem.js'
import Combatant from '../module/Combatant.js'

export default class CombatModel {
    #combatSystem
    #player
    #enemy
    constructor() {
        this.#combatSystem = null
        this.#player = null
        this.#enemy = null
    }

    initializeCombat(playerUnit, enemyUnit) {
        this.#combatSystem = new CombatSystem()

        this.#player = new Combatant(playerUnit)
        this.#enemy = new Combatant(enemyUnit)

        const allCombatants = [this.#player, this.#enemy]
        this.#combatSystem.startCombat(allCombatants)
    }

    executeAttack(targetId, action) {
        return this.#combatSystem.executeAttack(targetId, action)
    }

    executeDefend(unitId) {
        return this.#combatSystem.executeDefend(unitId)
    }

    advanceTurn() {
        return this.#combatSystem.nextUnitTurn()
    }

    checkBattleEnd() {
        return this.#combatSystem.checkBattleEnd()
    }

    getCurrentCombatant() {
        return this.#combatSystem.getState().currentCombatant
    }

    getPlayer() {
        return this.#player
    }

    getEnemy() {
        return this.#enemy
    }

    getWinner() {
        return this.#combatSystem.getWinner()
    }

    getCombatSystem() {
        return this.#combatSystem
    }

    isPlayerTurn() {
        const current = this.getCurrentCombatant()
        return current && current.team === 'Player'
    }
}
