export default class GameStatusView {
    #roundElement
    #turnElement
    constructor() {
        this.#roundElement = document.getElementById('round-number')
        this.#turnElement = document.getElementById('current-turn')
    }

    updateRoundNumber(round) {
        if (this.#roundElement) {
            this.#roundElement.textContent = round
        }
    }

    updateCurrentTurn(combatantName) {
        if (this.#turnElement) {
            this.#turnElement.textContent = combatantName
        }
    }
}
