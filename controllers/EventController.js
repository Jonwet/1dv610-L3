export default class EventController {
    constructor(callbacks, gameModel, combatModel) {
        this.callbacks = callbacks
        this.gameModel = gameModel
        this.combatModel = combatModel

        this.startButton = document.getElementById('start-button')
        this.attackButton = document.getElementById('attack-button')
        this.defendButton = document.getElementById('defend-button')
        this.restartButton = document.getElementById('restart-button')

        this.setupEventListeners()
    }

    setupEventListeners() {
        this.startButton.addEventListener('click', () => {
            this.handleStartClick()
        })

        this.attackButton.addEventListener('click', () => {
            this.handleAttackClick()
        })
        this.defendButton.addEventListener('click', () => {
            this.handleDefendClick()
        })
        this.restartButton.addEventListener('click', () => {
            this.handleRestartClick()
        })
    }

    handleStartClick() {
        this.callbacks.onStartGame()
    }

    handleAttackClick() {
        this.callbacks.onPlayerAttack()
    }

    handleDefendClick() {
        this.callbacks.onDefend()
    }

    handleRestartClick() {
        this.callbacks.onRestart()
    }
}
