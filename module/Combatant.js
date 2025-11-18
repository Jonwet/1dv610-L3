/**
 * @property {number} id - Unique identifier.
 * @property {string} name - Non-empty display name.
 * @property {string} team - Team identifier (e.g., 'player' | 'enemy').
 * @property {number} maxHealth - Maximum health, > 0.
 * @property {number} attackPower - Attack power, > 0.
 * @property {number} defense - Defense value, >= 0.
 * @property {number} speed - Speed value, > 0.
 * @property {number} [currentHealth] - Optional starting health; defaults to maxHealth.
 */

/**
 * Represents a unit that can participate in combat.
 *
 * @property {number} id
 * @property {string} name
 * @property {string} team
 * @property {number} maxHealth
 * @property {number} currentHealth
 * @property {number} attackPower
 * @property {number} defense
 * @property {number} speed
 * @property {boolean} isAlive
 * @property {boolean} isDefending
 */
export default class Combatant {
    /**
     * Create a combatant from a unit definition.
     *
     * @throws {Error} If required fields are missing or invalid.
     */
    constructor(unit) {
        if (!unit) {
            throw new Error('Unit object is required to create a combatant')
        }

        if (!unit.id) {
            throw new Error('Combatant must have an id')
        }

        if (
            !unit.name ||
            typeof unit.name !== 'string' ||
            unit.name.trim() === ''
        ) {
            throw new Error('Combatant name must be a non-empty string')
        }

        if (!unit.team) {
            throw new Error('Combatants must belong to a team')
        }

        if (typeof unit.maxHealth !== 'number' || unit.maxHealth <= 0) {
            throw new Error('Combatant maxHealth must be a positive number')
        }

        if (typeof unit.attackPower !== 'number' || unit.attackPower <= 0) {
            throw new Error('Combatant attackPower must be a positive number')
        }

        if (typeof unit.defense !== 'number' || unit.defense < 0) {
            throw new Error('Combatant defense must be a non-negative number')
        }

        if (typeof unit.speed !== 'number' || unit.speed <= 0) {
            throw new Error('Combatant speed must be a positive number')
        }

        this.id = unit.id
        this.name = unit.name
        this.team = unit.team

        this.maxHealth = unit.maxHealth
        this.currentHealth = unit.currentHealth || unit.maxHealth
        this.attackPower = unit.attackPower
        this.defense = unit.defense
        this.speed = unit.speed

        this.isAlive = true
        this.isDefending = false
    }

    /**
     * Apply incoming damage to the combatant.
     * Reduces currentHealth and sets isAlive to false if health drops to 0 or below.
     *
     * Damage is adjusted by defending state (50% reduction) and
     * has a minimum of 1 after adjustments.
     *
     * @param {number} amount - Incoming damage (> 0).
     * @returns {number} The actual damage applied after adjustments.
     * @throws {Error} If amount is not a number or <= 0.
     */
    takeDamage(amount) {
        this.#validateAmountNumber(amount)

        if (amount <= 0) {
            throw new Error('amount must be greater than 0')
        }
        const adjustedAmount = this.#adjustDamage(amount)
        this.#applyDamage(adjustedAmount)

        if (this.currentHealth <= 0) {
            this.#die()
        }

        return adjustedAmount
    }

    #adjustDamage(amount) {
        this.#validateAmountNumber(amount)
        const defenseDamageReduction = 0.5
        if (this.isDefending) {
            amount = Math.floor(amount * defenseDamageReduction)
        }
        return Math.max(1, amount)
    }

    #applyDamage(amount) {
        this.#validateAmountNumber(amount)
        this.currentHealth = this.currentHealth - amount
    }

    #die() {
        this.isAlive = false
    }

    #validateAmountNumber(amount) {
        if (typeof amount !== 'number' || Number.isNaN(amount)) {
            throw new Error('amount must be a number')
        }
    }
}
