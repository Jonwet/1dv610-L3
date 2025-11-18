/**
 * Controls AI decision-making for a combatant.
 */
export default class AIController {
    #combatSystem
    #actions

    /**
     * Create an AI controller.
     *
     * @throws {Error} If combatSystem is missing.
     * @throws {Error} If actions is missing, not an array, or empty.
     */
    constructor(combatSystem, actions) {
        if (!combatSystem) {
            throw new Error('combatSystem is required')
        }

        if (!actions) {
            throw new Error('actions are required')
        }

        if (!Array.isArray(actions)) {
            throw new Error('actions must be an array')
        }

        if (actions.length === 0) {
            throw new Error('actions array cannot be empty')
        }

        this.#combatSystem = combatSystem
        this.#actions = actions
    }

    /**
     * Choose an action and target for the provided combatant.
     * Currently selects the first available action and the first alive enemy.
     * @throws {Error} If combatant is missing.
     */
    chooseAction(combatant) {
        if (!combatant) {
            throw new Error('combatant is required')
        }

        const state = this.#combatSystem.getState()

        const enemies = this.#getOpponents(state.combatants, combatant)

        return this.#defaultAttack(enemies)
    }

    #getOpponents(combatants, combatant) {
        return combatants.filter(
            (unit) => unit.team !== combatant.team && unit.isAlive,
        )
    }

    #defaultAttack(enemies) {
        if (enemies.length === 0) {
            return null
        }

        const target = enemies[0]
        const action = this.#actions[0]
        return { action, target }
    }
}
