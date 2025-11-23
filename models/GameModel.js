/**
 * GameModel manages the state of the game, including whether the game is active,
 * the current round number, and the winner of the game.
 */
export default class GameModel {
    #isActive
    #roundNumber
    #winner

    /**
     * Initializes the game model with default values.
     */
    constructor() {
        this.#isActive = false
        this.#roundNumber = 0
        this.#winner = null
    }

    /**
     * Starts the game by setting the game as active, resetting the round number, and clearing the winner.
     */
    startGame() {
        this.#isActive = true
        this.#roundNumber = 0
        this.#winner = null
    }

    /**
     * Increases the round number by one.
     */
    increaseRound() {
        this.#roundNumber++
    }

    /**
     * Ends the game by setting the game as inactive and recording the winner.
     */
    endGame(winner) {
        this.#isActive = false
        this.#winner = winner
    }

    /**
     * Gets the current round number.
     */
    getRoundNumber() {
        return this.#roundNumber
    }

    /**
     * Checks if the game is currently active.
     */
    getIsGameActive() {
        return this.#isActive
    }

    /**
     * Gets the winner of the game.
     */
    getWinner() {
        return this.#winner
    }
}
