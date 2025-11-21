import GameModel from '../models/GameModel.js'
import CombatModel from '../models/CombatModel.js'
import EventController from './EventController.js'

export default class GameController {
    constructor() {
        this.gameModel = new GameModel()
        this.combatModel = new CombatModel()

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
        console.log('Starting a new game')
    }
}
