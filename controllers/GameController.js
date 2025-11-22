import GameModel from '../models/GameModel.js'
import CombatModel from '../models/CombatModel.js'
import EventController from './EventController.js'
import UnitCreation from '../models/UnitCreation.js'
import LogView from '../views/LogView.js'
import CombatantView from '../views/CombatantView.js'
import CombatAction from '../module/CombatAction.js'
import AIModel from '../models/AIModel.js'
import GameStatusView from '../views/GameStatusView.js'

export default class GameController {
    constructor() {
        this.gameModel = new GameModel()
        this.combatModel = new CombatModel()
        this.unitCreation = new UnitCreation()

        this.logView = new LogView()
        this.combatantView = new CombatantView()
        this.statusView = new GameStatusView()

        this.player = null
        this.enemy = null
        this.aiModel = null

        this.attackAction = new CombatAction({ name: 'Attack', accuracy: 0.8 })

        this.eventController = new EventController(
            {
                onStartGame: () => this.startNewGame(),
                onPlayerAttack: () => this.handlePlayerAttack(),
                onDefend: () => this.handlePlayerDefend(),
                onRestart: () => this.startNewGame(),
            },
            this.gameModel,
            this.combatModel,
        )
    }

    startNewGame() {
        this.logView.addLogMessage('New game started!')

        this.gameModel.startGame()

        const playerUnit = this.unitCreation.createHero()
        const enemyUnit = this.unitCreation.createEnemy()

        this.combatModel.initializeCombat(playerUnit, enemyUnit)

        this.aiModel = new AIModel(this.combatModel, [this.attackAction])

        this.player = this.combatModel.getPlayer()
        this.enemy = this.combatModel.getEnemy()

        this.combatantView.renderCombatants([this.player, this.enemy])
        this.updateViews()
    }

    handlePlayerAttack() {
        console.log('Player attacked')

        const damage = this.combatModel.executeAttack(
            this.enemy.id,
            this.attackAction,
        )

        this.logView.addLogMessage(
            `${this.player.name} attacked ${this.enemy.name} for ${damage} damage`,
        )
        this.updateViews()

        if (this.combatModel.checkBattleEnd()) {
            this.endGame()
        }
        this.handleAITurn()
    }

    handlePlayerDefend() {
        console.log('Player defended')

        this.combatModel.executeDefend(this.player.id)

        this.logView.addLogMessage(`${this.player.name} is defending`)
        this.updateViews()
        this.handleAITurn()
    }

    handleAITurn() {
        console.log('AI turn')

        const decision = this.aiModel.chooseAction()

        const damage = this.combatModel.executeAttack(
            decision.target.id,
            decision.action,
        )

        this.logView.addLogMessage(
            `${this.enemy.name} attacked ${decision.target.name} for ${damage} damage`,
        )

        this.updateViews()

        if (this.combatModel.checkBattleEnd()) {
            this.endGame()
        }
    }

    updateViews() {
        const currentCombatant = this.combatModel.getCurrentCombatant()

        this.combatantView.updateCombatants([this.player, this.enemy])

        this.statusView.updateRoundNumber(this.gameModel.getRoundNumber())
        this.statusView.updateCurrentTurn(currentCombatant.name)
    }

    endGame() {
        const winner = this.combatModel.getWinner()

        this.gameModel.endGame(winner)

        if (winner === 'Player') {
            this.logView.addLogMessage('You win!')
        } else if (winner === 'Enemy') {
            this.logView.addLogMessage('You lose!')
        }
    }
}
