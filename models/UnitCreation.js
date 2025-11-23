/**
 * UnitCreation is responsible for creating game units such as heroes and enemies
 */
export default class UnitCreation {
    /**
     * Creates a hero unit
     * @returns {Object} The hero unit object
     */
    createHero() {
        return {
            id: 1,
            name: 'Hero',
            team: 'Player',
            maxHealth: 100,
            attackPower: 20,
            defense: 10,
            speed: 15,
        }
    }

    /**
     * Creates an enemy unit
     * @returns {Object} The enemy unit object
     */
    createEnemy() {
        return {
            id: 2,
            name: 'Goblin',
            team: 'Enemy',
            maxHealth: 80,
            attackPower: 15,
            defense: 5,
            speed: 10,
        }
    }
}
