/**
 * Handles turn-based combat between combatants.
 */
export default class CombatSystem {
    #combatants
    #turnOrder
    #currentTurn
    #isActive
    #winner
    #combatLog

    /**
     * Initialize an empty combat system.
     */
    constructor() {
        this.#combatants = []
        this.#turnOrder = []
        this.#currentTurn = 0
        this.#isActive = false
        this.#winner = null
        this.#combatLog = []
    }

    /**
     * Start a combat with the given participants.
     *
     * @param {Combatant[]} participants - Non-empty array of combatants.
     * @throws {Error} If participants is not a non-empty array.
     */
    startCombat(participants) {
        if (!Array.isArray(participants) || participants.length === 0) {
            throw new Error('participants must be a non-empty array')
        }

        this.#combatants = participants
        this.#calculateTurnOrder()
        this.#isActive = true
        this.#combatLogger('Combat started')
    }

    /**
     * Execute an attack from the current combatant against a target.
     *
     * @param {number} targetId - ID of the target combatant.
     * @param {CombatAction} action - Action to perform.
     * @returns {number} The damage dealt (0 if the attack missed).
     * @throws {Error} If attacker/target not found or invalid state.
     */
    executeAttack(targetId, action) {
        const attacker = this.#getCurrentCombatant()
        const target = this.#findCombatantById(targetId)

        if (!attacker) {
            throw new Error('No combatant found for current turn')
        }

        if (!target) {
            throw new Error(`Target ${targetId} not found`)
        }

        if (!attacker.isAlive) {
            throw new Error(`${attacker.name} is dead`)
        }

        if (!target.isAlive) {
            throw new Error(`${target.name} is already dead`)
        }

        if (!this.#checkHit(action)) {
            this.#combatLogger(`${attacker.name} missed ${target.name}`)
            return 0
        }

        const rawDamage = this.#calculateDamage(attacker, target)
        const actualDamage = target.takeDamage(rawDamage)

        let message = `${attacker.name} attacked ${target.name} for ${actualDamage} damage`
        if (!target.isAlive) {
            message += ` and defeated them`
        }

        this.#combatLogger(message)

        return actualDamage
    }

    /**
     * Set a combatant to defending state, reducing next incoming damage.
     *
     * @param {number} unitId - ID of the combatant to defend.
     * @returns {boolean} True on success.
     * @throws {Error} If combatant is not found or is dead.
     */
    executeDefend(unitId) {
        const combatant = this.#findCombatantById(unitId)

        if (!combatant) {
            throw new Error(`Combatant ${unitId} not found`)
        }

        if (!combatant.isAlive) {
            throw new Error(`${combatant.name} is dead`)
        }

        combatant.isDefending = true

        this.#combatLogger(`${combatant.name} is defending`)
    }

    /**
     * Advance to the next alive combatant in turn order.
     *
     * @returns {Combatant|null} The next combatant, or null if none are alive.
     */
    nextUnitTurn() {
        for (let attempts = 0; attempts < this.#turnOrder.length; attempts++) {
            this.#currentTurn++

            // Starts over if at the end of the turn order
            if (this.#currentTurn >= this.#turnOrder.length) {
                this.#currentTurn = 0
            }

            const nextCombatant = this.#getCurrentCombatant()
            if (nextCombatant && nextCombatant.isAlive) {
                nextCombatant.isDefending = false
                return nextCombatant
            }
        }
        return null
    }

    /**
     * Check if the battle has ended (only one or zero teams alive).
     * Sets internal state and winner when battle ends.
     *
     * @returns {boolean} True if battle ended, false otherwise.
     */
    checkBattleEnd() {
        const aliveTeams = this.#getAliveTeams()
        if (aliveTeams.size <= 1) {
            this.#endBattle(aliveTeams)
            return true
        }
        return false
    }

    /**
     * Get the winning team after battle ends.
     *
     * @returns {string|null} Returns team name or 'none' if no winner, else null.
     */
    getWinner() {
        return this.#winner
    }

    /**
     * Get a snapshot of the current combat state.
     *
     * @returns {{combatants: Combatant[], currentCombatant: Combatant, isActive: boolean}}
     */
    getState() {
        return {
            combatants: this.#combatants,
            currentCombatant: this.#getCurrentCombatant(),
            isActive: this.#isActive,
        }
    }

    /**
     * Get the combat log messages in order.
     *
     * @returns {string[]} Array of log entries.
     */
    getCombatLog() {
        return this.#combatLog
    }

    // Compares the speed of combatants to determine the turn order, a is the first combatant, b is the second
    #calculateTurnOrder() {
        const randomTiebreaker = 0.5
        this.#turnOrder = [...this.#combatants].sort((a, b) => {
            if (a.speed === b.speed) {
                return Math.random() - randomTiebreaker
            }
            return b.speed - a.speed
        })
    }

    #getCurrentCombatant() {
        return this.#turnOrder[this.#currentTurn]
    }

    #findCombatantById(id) {
        return this.#combatants.find((combatant) => combatant.id === id)
    }

    #checkHit(action) {
        return Math.random() < action.accuracy
    }

    #calculateDamage(attacker, target) {
        const defenseDamageReduction = 2
        const damage =
            attacker.attackPower -
            Math.floor(target.defense / defenseDamageReduction)
        return Math.max(1, damage) // Attacks always deal 1 damage minimum
    }

    #combatLogger(message) {
        this.#combatLog.push(message)
    }

    #endBattle(aliveTeams) {
        this.#isActive = false
        this.#winner =
            aliveTeams.size === 1 ? Array.from(aliveTeams)[0] : 'none'
        this.#combatLogger(`Combat ended. Winner: ${this.#winner}`)
    }

    #getAliveTeams() {
        const aliveTeams = new Set()
        for (const combatant of this.#combatants) {
            if (combatant.isAlive) {
                aliveTeams.add(combatant.team)
            }
        }
        return aliveTeams
    }
}
