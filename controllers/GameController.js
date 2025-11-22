import GameModel from '../models/GameModel.js'
import CombatModel from '../models/CombatModel.js'
import EventController from './EventController.js'
import UnitCreation from '../models/UnitCreation.js'
import LogView from '../views/LogView.js'
import CombatantView from '../views/CombatantView.js'

export default class GameController {
    constructor() {
        this.gameModel = new GameModel()
        this.combatModel = new CombatModel()
        this.unitCreation = new UnitCreation()

        this.logView = new LogView()
        this.combatantView = new CombatantView()

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

        const player = this.combatModel.getPlayer()
        const enemy = this.combatModel.getEnemy()

        this.combatantView.renderCombatants([player, enemy])
    }
}
