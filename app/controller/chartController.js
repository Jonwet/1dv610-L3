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
        try {
            const chartData = this.#addLineEntry(label, value)

            // Currently not used
            this.#view.showCurrentChart?.({
                title: this.#currentTitle,
                type: this.#currentType,
                dataPreview: chartData,
            })
        } catch (error) {
            // Empty catch block because i am only testing to add data to line charts currently
        }
    }

    #parseValues(value) {
        const parsedValues = String(value)
            .split(',')
            .map((v) => v.trim())
            .filter((v) => v.length > 0)
            .map((v) => Number(v))
        return parsedValues
    }

    // Value parser for bar and pie chart, not used currently
    #parseValue(value) {
        const parsedValue = Number(value)
        if (Number.isNaN(parsedValue)) {
            throw new Error(`Value must be a number`)
        }
        return parsedValue
    }

    #addLineEntry(label, values) {
        const parsedValues = this.#parseValues(values)
        this.#currentChart.addLine(label, parsedValues)
        console.log(`Line added: ${label}: [${parsedValues.join(', ')}]`)
    }
}
