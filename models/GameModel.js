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

    increaseRound() {
        this.roundNumber++
    }

    endGame(winner) {
        this.isActive = false
        this.winner = winner
    }

    getRoundNumber() {
        return this.roundNumber
    }

    getIsGameActive() {
        return this.isActive
    }

    getWinner() {
        return this.winner
    }
}
