import chartView from './view/chartView.js'
import chartController from './controller/chartController.js'

export default class App {
    #view
    #controller

    constructor(root = document) {
        this.#view = new chartView(root)
        this.#controller = new chartController(this.#view)
    }

    start() {
        this.#controller.start()
    }
}
