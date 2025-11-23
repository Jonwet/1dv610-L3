export default class CombatantView {
    #playerContainer
    #enemyContainer
    constructor() {
        this.#playerContainer = document.getElementById('player-team')
        this.#enemyContainer = document.getElementById('enemy-team')
    }

    renderCombatants(combatants) {
        this.#playerContainer.innerHTML = ''
        this.#enemyContainer.innerHTML = ''

        const players = combatants.filter(
            (combatant) => combatant.team === 'Player',
        )
        const enemies = combatants.filter(
            (combatant) => combatant.team === 'Enemy',
        )

        players.forEach((combatant) => {
            const combatantElement = this.#createCombatantElement(combatant)
            this.#playerContainer.appendChild(combatantElement)
        })

        enemies.forEach((combatant) => {
            const combatantElement = this.#createCombatantElement(combatant)
            this.#enemyContainer.appendChild(combatantElement)
        })
    }

    #createCombatantElement(combatant) {
        const combatantElement = document.createElement('div')
        combatantElement.className = 'combatant-element'
        combatantElement.dataset.id = combatant.id

        combatantElement.innerHTML = `
            <div class="combatant-name">${combatant.name}</div>

            
            <div class="hp-container">
                <div class="hp-label">HP: ${combatant.currentHealth}/${combatant.maxHealth}</div>
            </div>
            
            <div class="stats">
                <div class="stat">ATK: ${combatant.attackPower}</div>
                <div class="stat">DEF: ${combatant.defense}</div>
                <div class="stat">SPD: ${combatant.speed}</div>
            </div>
            
            ${combatant.isDefending ? '<div class="defending-indicator">DEFENDING</div>' : ''}
        `
        return combatantElement
    }

    updateCombatants(combatants) {
        combatants.forEach((combatant) => {
            const combatantElement = document.querySelector(
                `[data-id="${combatant.id}"]`,
            )

            if (combatantElement) {
                const hpLabel = combatantElement.querySelector('.hp-label')

                if (hpLabel) {
                    hpLabel.textContent = `HP: ${combatant.currentHealth}/${combatant.maxHealth}`
                }

                if (!combatant.isAlive) {
                    combatantElement.classList.add('dead')
                } else {
                    combatantElement.classList.remove('dead')
                }

                const existingIndicator = combatantElement.querySelector(
                    '.defending-indicator',
                )
                if (combatant.isDefending && !existingIndicator) {
                    const indicator = document.createElement('div')
                    indicator.className = 'defending-indicator'
                    indicator.textContent = 'DEFENDING'
                    combatantElement.appendChild(indicator)
                } else if (!combatant.isDefending && existingIndicator) {
                    existingIndicator.remove()
                }
            }
        })
    }
}
