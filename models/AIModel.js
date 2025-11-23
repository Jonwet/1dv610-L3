import AIController from '../module/AIController.js'

/**
 * Model representing the AI behavior in combat.
 */
export default class AIModel {
    #combatModel
    #aiController
    constructor(combatModel, actions) {
        this.#combatModel = combatModel
        this.#aiController = new AIController(
            combatModel.getCombatSystem(),
            actions,
        )
    }

    /**
     * Chooses an action for the AI-controlled enemy during combat.
     */
    chooseAction() {
        const enemy = this.#combatModel.getEnemy()

        if (!enemy || !enemy.isAlive) {
            return null
        }
        return this.#aiController.chooseAction(enemy)
    }
}
