import CombatSystem from '../module/CombatSystem.js'
import Combatant from '../module/Combatant.js'

export default class CombatModel {
    constructor() {
        this.combat = null
        this.player = null
        this.enemy = null
    }

    initializeCombat(playerUnit, enemyUnit) {
        this.combat = new CombatSystem()

        this.player = new Combatant(playerUnit)
        this.enemy = new Combatant(enemyUnit)

        const allCombatants = [this.player, this.enemy]
        this.combat.startCombat(allCombatants)
    }

    executeAttack(targetId, action) {
        return this.combat.executeAttack(targetId, action)
    }

    executeDefend(unitId) {
        return this.combat.executeDefend(unitId)
    }

    advanceTurn() {
        return this.combat.nextUnitTurn()
    }

    checkBattleEnd() {
        return this.combat.checkBattleEnd()
    }

    getCurrentCombatant() {
        return this.combat.getState().currentCombatant
    }

    getPlayer() {
        return this.player
    }

    getEnemy() {
        return this.enemy
    }

    getWinner() {
        return this.combat.getWinner()
    }

    isPlayerTurn() {
        const current = this.getCurrentCombatant()
        return current && current.team === 'Player'
    }
}
