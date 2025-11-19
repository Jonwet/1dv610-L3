export default class GameModel {
    constructor() {
        this.isActive = false
        this.roundNumber = 0
        this.winner = null
    }

    startGame() {
        this.isActive = true
        this.roundNumber = 0
        this.winner = null
    }
}
