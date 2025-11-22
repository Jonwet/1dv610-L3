import AIController from '../module/AIController.js'

export default class AIModel {
    constructor(combatModel, actions) {
        this.combatModel = combatModel
        this.aiController = new AIController(combatModel.combat, actions)
    }

    chooseAction() {
        const enemy = this.combatModel.getEnemy()

        if (!enemy || !enemy.isAlive) {
            return null
        }
        return this.aiController.chooseAction(enemy)
    }
}
