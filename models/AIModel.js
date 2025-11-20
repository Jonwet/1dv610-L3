export default class AIModel {
    constructor(combatModel, actions) {
        this.combatModel = combatModel
        this.actions = actions
    }

    chooseAction() {
        const player = this.combatModel.getPlayer()

        if (!player || !player.isAlive) {
            return null
        }

        const action = this.chooseAttackAction()

        return { action, target: player }
    }

    chooseAttackAction() {
        if (this.actions.length === 1) {
            return this.actions[0]
        }
    }
}
