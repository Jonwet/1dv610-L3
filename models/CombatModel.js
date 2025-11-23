import CombatSystem from '../module/CombatSystem.js'
import Combatant from '../module/Combatant.js'

/**
 * Model managing the combat system and combatants.
 */
export default class CombatModel {
    #combatSystem
    #player
    #enemy
    constructor() {
        this.#combatSystem = null
        this.#player = null
        this.#enemy = null
    }

    /**
     * Initializes combat with the given player and enemy units.
     */
    initializeCombat(playerUnit, enemyUnit) {
        this.#combatSystem = new CombatSystem()

        this.#player = new Combatant(playerUnit)
        this.#enemy = new Combatant(enemyUnit)

        const allCombatants = [this.#player, this.#enemy]
        this.#combatSystem.startCombat(allCombatants)
    }

    /**
     * Executes an attack action on the specified target.
     */
    executeAttack(targetId, action) {
        return this.#combatSystem.executeAttack(targetId, action)
    }

    /**
     * Executes a defend action for the specified unit.
     */
    executeDefend(unitId) {
        return this.#combatSystem.executeDefend(unitId)
    }

    /**
     * Advances the turn to the next combatant.
     */
    advanceTurn() {
        return this.#combatSystem.nextUnitTurn()
    }

    /**
     * Checks if the battle has ended.
     */
    checkBattleEnd() {
        return this.#combatSystem.checkBattleEnd()
    }

    /**
     * Gets the current combatant whose turn it is.
     */
    getCurrentCombatant() {
        return this.#combatSystem.getState().currentCombatant
    }

    /**
     * Gets the player combatant.
     */
    getPlayer() {
        return this.#player
    }

    /**
     * Gets the enemy combatant.
     */
    getEnemy() {
        return this.#enemy
    }

    /**
     * Gets the winner of the combat.
     */
    getWinner() {
        return this.#combatSystem.getWinner()
    }

    /**
     * Gets the combat system instance.
     */
    getCombatSystem() {
        return this.#combatSystem
    }

    /**
     * Checks if it's the player's turn.
     */
    isPlayerTurn() {
        const current = this.getCurrentCombatant()
        return current && current.team === 'Player'
    }
}
