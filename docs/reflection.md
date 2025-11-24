# Reflektion: Clean Code kapitel 2-11

### Kapitel 2: Meaningful Names

Kapitel 2 har påverkat min kod genom att jag funderar över namn som beskriver vad metoden gör. Kapitlet har även fått mig att inse hur viktigt det är med bra variabel namn som gör det lätt för andra och mig själv då man inte behöver "mental mappa" när man läser igenom koden. Något jag fortfarande inte håller med om är noise words i metod namn, jag gillar när mina metod namn är tydliga och jag tycker att noise words kan vara bra ibland. Jag har även blivit bättre på att inte använda magical numbers i min kod utan istället skapar en konstant som ger mig "searchable names".

```js
    handlePlayerAttack() {
        if (this.#isProcessingTurn) {
            return
        }
        this.#isProcessingTurn = true
        const damage = this.#combatModel.executeAttack(
            this.#enemy.id,
            this.#attackAction,
        )

        if (damage === 0) {
            this.#logView.addLogMessage(
                `${this.#player.name} attacked ${this.#enemy.name} but missed!`,
            )
        } else {
            this.#logView.addLogMessage(
                `${this.#player.name} attacked ${this.#enemy.name} for ${damage} damage`,
            )
        }
        this.#gameModel.increaseRound()
        this.#combatModel.advanceTurn()
        this.#updateViews()

        if (this.#combatModel.checkBattleEnd()) {
            this.#endGame()
            this.#isProcessingTurn = false
        }
        this.#aiTurnTimeout = setTimeout(() => {
            this.#handleAITurn()
        }, 1000)
    }
```

### Kapitel 3: Functions

Kapitel 3 har påverkat min kod genom att jag försökt tänka på att hålla metoder små och försöka bryta ut metoder som gör me än en sak till flera mindre metoder, men det är något som jag fortfarande tycker är svårt. Däremot bryter fortfarande min "executeAttack()" metod i modulen mot "one level of abstraction" och "do one thing" då jag inte hunnit refaktorera den. Jag bryter även mot "Flag Arguments" då jag skickar en boolean in i funktioner vilket boken avråder från. Jag använder descriptive names t.ex handlePlayerDefend istället för defend().

```js
    /**
     * Advances the turn to the next combatant.
     */
    advanceTurn() {
        return this.#combatSystem.nextUnitTurn()
    }
```

### Kapitel 4: Comments

Jag tycker att jag gör ett OK jobb med att förklara mig själv med bara kod som boken rekommenderar. Jag använder även jsdoc för publika metoder vilket boken också rekommenderar. Jag tycker även att mina kommentarer tillför något och inte bara upprepar metod namnet. Något jag tagit med mig från kapitlet är att en kommentar försöker förklara dålig kod och att man istället borde försöka ändra på metoden/funktionen istället för att skriva en bra kommentar. Denna kommentaren är ganska onödig och kan nog tas bort utan problem.

```js
    /**
     * Advances the turn to the next combatant.
     */
    advanceTurn() {
        return this.#combatSystem.nextUnitTurn()
    }
```

### Kapitel 5: Formatting

Jag har inte funderat jättemycket på formatering då linters idag gör mycket av jobbet. Däremot har jag försökt lägga metoder i en bra ordning i klasserna, publika metoder längre upp än de privata metoderna. Lintern hjälper även till med att inte få för långa horisontella rader vilket ökar läsbarheten. Fördelen med att använda sig utav linters är att den hjälper en indentera vilket ökar läsbarheten.

```js
    chooseAction() {
        const enemy = this.#combatModel.getEnemy()

        if (!enemy || !enemy.isAlive) {
            return null
        }
        return this.#aiController.chooseAction(enemy)
    }

        chooseAction() {
        const enemy = this.#combatModel.getEnemy()
        if (!enemy || !enemy.isAlive) {
        return null
        }
        return this.#aiController.chooseAction(enemy)
    }
```

### Kapitel 6: Objects and Data Structures

Jag använder mig utav "Anti-symmetry" i t.ex mina models som CombatModel och GameModel då jag exponerar beteende (executeAttack()) och döljer data genom privata fält (#combatSystem). Jag använder mig av Law of Demeter då klasser bara pratar med sina direkta dependencies. Detta gör så att jag lätt kan byta ut eller ändra i metoder utan att behöva ändra på flera ställen, det blir lättare att underhålla koden. Jag tycker att jag följer "hide implementation and expose interface" bra. Exempel på Anti-symmetry:

```js
export default class GameModel {
    #isActive
    #roundNumber
    #winner

    startGame() {
        this.#isActive = true
        this.#roundNumber = 0
        this.#winner = null
    }

    getRoundNumber() {
        return this.#roundNumber
    }
}
```

### Kapitel 7: Error Handling

Jag använder mig utav exceptions istället för return codes i min Combatant konstruktor då jag kastar errors vid fel input. Jag tycker att jag har tydliga fel meddelanden som ger bra kontext. Däremot bryter jag mot return null regeln i min AIModel istället för att kasta en exception. Jag hade kunnat använda mig utav fler custom exceptions och fler fel meddelanden i min app. För tillfället så får man inget meddelande om varför "Attack" knappen inte funkar på fiendens tur.

```js
    constructor(unit) {
    if (!unit.id) {
        throw new Error('Combatant must have an id')
        }
    }
```

### Kapitel 8: Boundaries

Jag tycker att jag wrappar min modul på ett bra sätt då jag har försökt att separera min modul från min app kod. Jag försökte att inte ändra mycket på min modul då jag i framtiden inte kan vara säker på att jag inte kan ändra på modul kod som jag använder mig utav. Min implementation möjliggör updatering eller utbyte av modulen utan att behöva ändra på min apps kod. Min metod visar "Use of Third-Party Code" då användare bara behöver använda de publika metoderna utan att veta vad som ligger under huven.

```js
    /**
     * Get the combat log messages in order.
     *
     * @returns {string[]} Array of log entries.
     */
    getCombatLog() {
        return this.#combatLog
    }
```

### Kapitel 9: Unit Tests

Jag har använt mig utav automatiska tester i min modul och jag tycker att jag följer "One Assert per Test" någorlunda bra, vissa tester bryter mot den men de flesta följer den. Mina tester har långa beskrivande namn vilket gör dem "self-documenting". Tyvärr har jag inte hunnit med att implementera några automatiska tester för min app.

```js
test('CombatAction throws error if accuracy is greater than 1', () => {
    expect(() => new CombatAction({ name: 'Attack', accuracy: 2 })).toThrow(
        'action accuracy must be between 0 and 1',
    )
})
```

### Kapitel 10: Classes

Jag har försökt att hålla mina klasser små men det blev svårt när jag implementerade min GameController, jag tycker att den gör lite för mycket och borde kanske bryta ut vissa delar till en egen klass. Däremot har jag försökt att låta klasserna ha ett tydligt ansvar, jag har delat upp mina views där en hanterar combatLog och en annan hanterar Combatants. Model, view och controller underlättar "Organizing for Change" då man kan ändra på en view utan att påverka models.

```js
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
```

### Kapitel 11: Systems

Detta kapitlet handlar om att dela upp ett system i flera delar där varje del sköter en del av systemet. Min GameModel hanterar game state, CombatModel hanterar "Combat mechancis", LogView hanterar combatLog UI osv. Min modul är inte kopplad till min app och jag kan därför byta modul utan problemo ch jag kan använda min modul i andra appar.

```js
constructor() {
    this.#gameModel = new GameModel()
    this.#combatModel = new CombatModel()
    this.#logView = new LogView()
}

handlePlayerAttack() {
    const damage = this.#combatModel.executeAttack()
    this.#logView.addLogMessage()
    this.#gameModel.increaseRound()
}
```
