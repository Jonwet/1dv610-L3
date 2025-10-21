import chartFactory from '../model/chartFactory.js'

export default class chartController {
    #factory
    #view
    #currentType
    #currentChart

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
        this.#view.setOnGetLargest(() => {
            this.#handleGetExtremeValues('max')
        })
        this.#view.setOnGetSmallest(() => {
            this.#handleGetExtremeValues('min')
        })
        this.#view.setOnSortByValue((sortOrder) => {
            this.#handleSortByValue(sortOrder)
        })
    }

    #handleCreateChart(type, title) {
        this.#currentChart = this.#factory.createChart(type, title)
        this.#currentType = type
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

    #handleGetExtremeValues(extremeType) {
        if (this.#currentType === 'bar' || this.#currentType === 'pie') {
            const extremeValues = this.#currentChart.getExtremeValues(
                extremeType === 'max' ? 'max' : 'min',
            )
            console.log(
                extremeType === 'max' ? 'Largest:' : 'Smallest:',
                extremeValues,
            )
        }
    }

    #handleSortByValue(sortOrder) {
        if (this.#currentType === 'bar') {
            const sortedBars = this.#currentChart.sortBarsByValue(
                sortOrder === 'descending',
            )
            console.log('Sorted bars:', sortedBars)
        } else if (this.#currentType === 'pie') {
            const sortedSlices = this.#currentChart.sortSlicesByValue(
                sortOrder === 'descending',
            )
            console.log('Sorted slices:', sortedSlices)
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
