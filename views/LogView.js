export default class LogView {
    constructor() {
        this.logContainer = document.getElementById('combat-log')
    }

    addLogMessage(message) {
        const logEntry = document.createElement('div')
        logEntry.className = 'log-entry'
        logEntry.textContent = message

        this.logContainer.appendChild(logEntry)

        this.scrollToBottom()
    }

    clearLog() {
        this.logContainer.innerHTML = ''
    }

    scrollToBottom() {
        this.logContainer.scrollTop = this.logContainer.scrollHeight
    }
}
