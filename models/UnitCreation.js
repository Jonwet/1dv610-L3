export default class UnitCreation {
    createHero() {
        return {
            id: 1,
            name: 'Hero',
            team: 'Player',
            health: 100,
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
            health: 80,
            attackPower: 15,
            defense: 5,
            speed: 10,
        }
    }

    createPlayerTeam() {
        return [this.createHero()]
    }

    createEnemyTeam() {
        return [this.createEnemy()]
    }
}

// Test
const units = new UnitCreation().createPlayerTeam()
console.log(units)
