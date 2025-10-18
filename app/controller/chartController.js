import chartFactory from '../model/chartFactory.js'

export default class chartController {
    #factory
    #view
    #currentType
    #currentChart
    #currentTitle

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
        this.#currentChart = this.#factory.createChart(type, title)
        this.#currentType = type
        this.#currentTitle = title
        // Test log
        console.log('Chart created:', {
            type,
            title,
        })
    }

    #handleAddData(type, label, value) {
        if (type === 'line') {
            this.#addLineEntry(label, value)
        } else if (type === 'bar' || type === 'pie') {
            this.#addBarOrPieEntry(label, value)
        }
    }

    #parseLineValues(value) {
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

    #addLineEntry(label, values) {
        const parsedLineValues = this.#parseLineValues(values)
        this.#currentChart.addLine(label, parsedLineValues)
        console.log(`Line added: ${label}: [${parsedLineValues.join(', ')}]`)
    }

    #addBarOrPieEntry(label, value) {
        const parsedValue = this.#parseValue(value)
        this.#currentChart.addData({ [label]: parsedValue })
        console.log(`Entry added: ${label}: ${parsedValue}`)
    }
}
