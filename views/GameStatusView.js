export default class GameStatusView {
    constructor() {
        this.roundElement = document.getElementById('round-number')
    }

    updateRoundNumber(round) {
        if (this.roundElement) {
            this.roundElement.textContent = round
        }
    }
}
