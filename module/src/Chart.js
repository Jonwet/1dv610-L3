/**
 * @file Defines the Chart class.
 * @author Jonatan Wetterberg
 */

/**
 * Base class for different types of charts.
 */
export default class Chart {
    #chartTitle
    #data

    /**
     * Creates an instance of the Chart class.
     * @param {string} chartTitle - The title of the chart.
     */
    constructor(chartTitle = 'Unnamed Chart') {
        this.setChartTitle(chartTitle)
        this.#data = []
    }

    /**
     * Sets the title of the chart.
     * @param {string} chartTitle - The new title of the chart.
     */
    setChartTitle(chartTitle) {
        this.#validateTitle(chartTitle)
        this.#chartTitle = chartTitle
    }

    /**
     * Gets the title of the chart.
     * @returns {string} - The title of the chart.
     */
    getTitle() {
        return this.#chartTitle
    }

    /**
     * Adds new data to the chart.
     * @param {Object} newData - An object where keys are string labels and values are numbers.
     * Example: { Fish: 10, Chips: 20 }
     */
    addData(newData) {
        this.#validateData(newData)

        for (const [label, value] of Object.entries(newData)) {
            this.#validateLabel(label)
            this.#validateValue(value)

            if (this.#data.some((dataEntry) => dataEntry.label === label)) {
                throw new Error(`Data with label "${label}" already exists`)
            } else {
                this.#data.push({ label, value })
            }
        }
    }

    removeData(label) {
        this.#validateLabel(label)

        const findLabel = this.#data.find(
            (dataEntry) => dataEntry.label === label,
        )
        if (!findLabel) {
            throw new Error(`Data with label "${label}" not found`)
        } else {
            this.#data = this.#data.filter(
                (dataEntry) => dataEntry.label !== label,
            )
        }
    }

    /**
     * Gets a copy of the chart data.
     * @returns {Array} - A copy of the chart data.
     */
    getData() {
        const copyOfData = [...this.#data]
        return copyOfData
    }

    /**
     * Updates the value of an existing data entry.
     * @param {string} label - The label of the data entry to update.
     * @param {number} newValue - The new value for the data entry.
     */
    updateData(label, newValue) {
        this.#validateLabel(label)
        this.#validateValue(newValue)

        const dataEntry = this.#data.find(
            (dataEntry) => dataEntry.label === label,
        )
        if (!dataEntry) {
            throw new Error(`Data with label "${label}" not found`)
        } else {
            dataEntry.value = newValue
        }
    }

    /**
     * Gets the total number of entries in the chart.
     * @returns {number} - The total number of entries.
     */
    getTotalEntries() {
        return this.#data.reduce(
            (total, dataEntry) => total + dataEntry.value,
            0,
        )
    }

    /**
     * Sorts the data entries by their values.
     * @param {boolean} [descending=true] - Whether to sort in descending order.
     * @returns {Array} - The sorted data entries.
     */
    sortByValue(descending = true) {
        const sortedData = [...this.getData()]
        sortedData.sort((a, b) => {
            if (descending) {
                return b.value - a.value
            } else {
                return a.value - b.value
            }
        })
        return sortedData
    }

    getExtremeValues(type = 'min') {
        if (type !== 'max' && type !== 'min') {
            throw new Error('Type must be "min" or "max"')
        }
        if (this.#data.length === 0) {
            return []
        }

        let extremeValue
        if (type === 'max') {
            extremeValue = Math.max(...this.#data.map((entry) => entry.value))
        } else if (type === 'min') {
            extremeValue = Math.min(...this.#data.map((entry) => entry.value))
        }
        return this.#data.filter((entry) => entry.value === extremeValue)
    }

    // Title validator
    #validateTitle(chartTitle) {
        if (typeof chartTitle !== 'string' || chartTitle.trim() === '') {
            throw new Error("Title can't be empty and must be a string")
        }
    }

    // Data validator
    #validateData(data) {
        if (typeof data !== 'object' || data === null || Array.isArray(data)) {
            throw new Error("Data can't be null and must be an object")
        }
    }

    // Label validator
    #validateLabel(label) {
        if (typeof label !== 'string' || label.trim() === '') {
            throw new Error("Data labels can't be empty and must be strings")
        }
    }

    // Value validator
    #validateValue(value) {
        if (typeof value !== 'number' || isNaN(value)) {
            throw new Error('Data values must be numbers')
        }
    }
}
