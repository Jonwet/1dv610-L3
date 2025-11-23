/**
 * LogView is responsible for managing the combat log display in the UI
 */
export default class LogView {
    #logContainer

    /**
     * Initializes the LogView by selecting the combat log container from the DOM.
     */
    constructor() {
        this.#logContainer = document.getElementById('combat-log')
    }

    /**
     * Adds a log message to the combat log display.
     * @param {string} message - The log message to add.
     */
    addLogMessage(message) {
        const logEntry = document.createElement('div')
        logEntry.className = 'log-entry'
        logEntry.textContent = message

        this.#logContainer.appendChild(logEntry)

        this.#scrollToBottom()
    }

    /**
     * Clears all log messages from the combat log display.
     */
    clearLog() {
        this.#logContainer.innerHTML = ''
    }

    #scrollToBottom() {
        this.#logContainer.scrollTop = this.#logContainer.scrollHeight
    }
}
