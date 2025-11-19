import CombatSystem from '../module/CombatSystem.js'
import Combatant from '../module/Combatant.js'

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

    getCurrentCombatant() {
        return this.combat.getState().currentCombatant
    }

    getAllCombatants() {
        return this.combat.getState().combatants
    }

    getPlayerTeam() {
        return this.getAllCombatants().filter((c) => c.team === 'Player')
    }

    getEnemyTeam() {
        return this.getAllCombatants().filter((c) => c.team === 'Enemy')
    }

    getAliveEnemies() {
        return this.getEnemyTeam().filter((c) => c.isAlive())
    }

    getAlivePlayers() {
        return this.getPlayerTeam().filter((c) => c.isAlive())
    }

    getCombatLog() {
        return this.combat.getCombatLog()
    }

    getWinner() {
        return this.combat.getWinner()
    }

    isPlayerTurn() {
        const current = this.getCurrentCombatant()
        return current && current.team === 'Player'
    }

    getCombatantById(id) {
        return this.getAllCombatants().find((c) => c.id === id)
    }

    isInitialized() {
        return this.combat !== null
    }

    isCombatActive() {
        if (!this.combat) return false
        return this.combat.getState().isActive
    }
}

// Test
const playerUnits = [
    {
        id: 1,
        name: 'Hero',
        team: 'Player',
        maxHealth: 100,
        attackPower: 20,
        defense: 10,
        speed: 15,
    },
]

const enemyUnits = [
    {
        id: 2,
        name: 'Goblin',
        team: 'Enemy',
        maxHealth: 80,
        attackPower: 15,
        defense: 5,
        speed: 10,
    },
]

const combat = new CombatModel()
combat.initializeCombat(playerUnits, enemyUnits)
console.log(combat.getCurrentCombatant())
