import chartFactory from '../model/chartFactory.js'

export default class chartController {
    #factory
    #view
    #currentType

    constructor(view) {
        this.#factory = new chartFactory()
        this.#view = view
    }

    start() {
        this.connectView()
    }

    connectView() {
        this.#view.setOnChartTypeChange((type) => {
            this.#currentType = type
        })
        this.#view.setOnCreateChart(({ type, title }) => {
            this.#handleCreateChart(type, title)
        })
        this.#view.setOnAddData(({ type, label, value }) => {
            this.#handleAddData(type, label, value)
        })
    }

    #handleCreateChart(type, title) {
        const chart = this.#factory.createChart(type, title)
        this.#currentType = type
    }

    #handleAddData(type, label, value) {}

    #parseValues(value) {
        const parsedValues = String(value)
            .split(',')
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .map((v) => Number(v))
        return parsedValues
    }

    #parseValue(value) {
        const parsedValue = Number(value)
        if (Number.isNaN(parsedValue)) {
            throw new Error(`Value must be a number`)
        }
        return parsedValue
    }
}
