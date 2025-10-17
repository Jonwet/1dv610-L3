import chartFactory from '../model/chartFactory.js'

export default class chartController {
    #factory
    #view

    constructor(view) {
        this.#factory = new chartFactory()
        this.#view = view
    }

    start() {
        this.connectView()
    }

    connectView() {
        // this.#view.setOnChartTypeChange((type) => {})

        this.#view.setOnCreateChart(({ type, title }) => {
            this.#handleCreateChart(type, title)
        })
    }

    #handleCreateChart(type, title) {
        const chart = this.#factory.createChart(type, title)
        // this.#view.renderChart(chart) // Rendering not implemented yet
    }
}
