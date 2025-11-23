/**
 * Controller for handling user events and interactions.
 */
export default class EventController {
    #callbacks
    #gameModel
    #startButton
    #attackButton
    #defendButton
    #restartButton

    /**
     * Initializes the event controller and sets up event listeners for user interactions.
     */
    constructor(callbacks, gameModel) {
        this.#callbacks = callbacks
        this.#gameModel = gameModel

        this.#startButton = document.getElementById('start-button')
        this.#attackButton = document.getElementById('attack-button')
        this.#defendButton = document.getElementById('defend-button')
        this.#restartButton = document.getElementById('restart-button')

        this.#setupEventListeners()
    }

    #setupEventListeners() {
        this.#startButton.addEventListener('click', () => {
            this.#handleStartClick()
        })

        this.#attackButton.addEventListener('click', () => {
            this.#handleAttackClick()
        })
        this.#defendButton.addEventListener('click', () => {
            this.#handleDefendClick()
        })
        this.#restartButton.addEventListener('click', () => {
            this.#handleRestartClick()
        })
    }

    #handleStartClick() {
        if (!this.#gameModel.getIsGameActive()) {
            this.#callbacks.onStartGame()
        }
    }

    #handleAttackClick() {
        this.#callbacks.onPlayerAttack()
    }

    #handleDefendClick() {
        this.#callbacks.onDefend()
    }

    #handleRestartClick() {
        if (!this.#gameModel.getIsGameActive()) {
            this.#callbacks.onRestart()
        }
    }
}
