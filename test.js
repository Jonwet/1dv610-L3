import CombatantView from './views/CombatantView.js'
import EventController from './controllers/EventController.js'
import GameModel from './models/GameModel.js'
import CombatModel from './models/CombatModel.js'

const view = new CombatantView()

const hero = {
    id: 1,
    name: 'Hero',
    team: 'Player',
    maxHealth: 100,
    currentHealth: 100,
    attackPower: 20,
    defense: 10,
    speed: 15,
}

const goblin = {
    id: 2,
    name: 'Goblin',
    team: 'Enemy',
    maxHealth: 50,
    currentHealth: 50,
    attackPower: 10,
    defense: 5,
    speed: 12,
}

view.renderCombatants([hero, goblin])
