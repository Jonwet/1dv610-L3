/**
 * Represents an action that can be performed in combat.
 *
 * @property {string} name - Action name.
 * @property {number} accuracy - Hit chance, 0..1
 */
export default class CombatAction {
    /**
     * Create a combat action.
     *
     * @throws {Error} If action is missing or not an object.
     * @throws {Error} If name is not a non-empty string.
     * @throws {Error} If accuracy is not a number.
     * @throws {Error} If accuracy is outside the range 0..1.
     */
    constructor(action) {
        if (!action || typeof action !== 'object') {
            throw new Error('action must be an object')
        }
        if (
            !action.name ||
            typeof action.name !== 'string' ||
            action.name.trim() === ''
        ) {
            throw new Error('action name must be a non-empty string')
        }
        if (
            typeof action.accuracy !== 'number' ||
            Number.isNaN(action.accuracy)
        ) {
            throw new Error('action accuracy must be a number')
        }
        if (!(action.accuracy >= 0 && action.accuracy <= 1)) {
            throw new Error('action accuracy must be between 0 and 1')
        }

        this.name = action.name
        this.accuracy = action.accuracy
    }
}
