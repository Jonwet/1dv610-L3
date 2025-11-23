/**
 * GameStatusView is responsible for updating the game status display in the UI
 */
export default class GameStatusView {
    #roundElement
    #turnElement

    /**
     * Initializes the GameStatusView by selecting the round number and current turn elements from the DOM.
     */
    constructor() {
        this.#roundElement = document.getElementById('round-number')
        this.#turnElement = document.getElementById('current-turn')
    }

    /**
     * Updates the round number display in the UI.
     * @param {number} round - The current round number.
     */
    updateRoundNumber(round) {
        if (this.#roundElement) {
            this.#roundElement.textContent = round
        }
    }

    /**
     * Updates the current turn display in the UI.
     * @param {string} combatantName - The name of the combatant whose turn it is.
     */
    updateCurrentTurn(combatantName) {
        if (this.#turnElement) {
            this.#turnElement.textContent = combatantName
        }
    }
}
