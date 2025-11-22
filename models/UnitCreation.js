export default class UnitCreation {
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
