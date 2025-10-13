/**
 * @file Defines the LineChart class.
 * @author Jonatan Wetterberg
 */

import Chart from './Chart.js'

/**
 * Class representing a line chart, extending the base Chart class.
 */
export default class LineChart extends Chart {
    #line = {}

    /**
     * Creates an instance of the LineChart class.
     * @param {string} title - The title of the line chart.
     */
    constructor(title = 'Untitled Line Chart') {
        super(title)
    }

    /**
     * Adds a new line to the chart.
     * @param {string} name - The name of the line.
     * @param {Array<number>} data - The data points for the line.
     */
    addLine(name, data) {
        this.#line[name] = [...data]
    }

    /**
     * Removes a line from the chart.
     * @param {string} name - The name of the line to remove.
     */
    removeLine(name) {
        delete this.#line[name]
    }

    /**
     * Gets a copy of the lines in the chart.
     * @returns {Object} - A copy of the lines in the chart.
     */
    getLines() {
        const copyOfLines = { ...this.#line }
        return copyOfLines
    }

    /**
     * Gets the names of all lines in the chart.
     * @returns {Array<string>} - An array of line names.
     */
    getLineNames() {
        return Object.keys(this.#line)
    }

    /**
     * Gets the maximum value for each line in the chart.
     * @returns {Object} - An object mapping line names to their maximum values.
     */
    getMaxValueForEachLine() {
        const maxValue = {}
        for (const [name, data] of Object.entries(this.#line)) {
            if (data.length === 0) {
                maxValue[name] = null
            } else {
                maxValue[name] = Math.max(...data)
            }
        }
        return maxValue
    }

    /**
     * Gets the minimum value for each line in the chart.
     * @returns {Object} - An object mapping line names to their minimum values.
     */
    getMinValueForEachLine() {
        const minValue = {}
        for (const [name, data] of Object.entries(this.#line)) {
            if (data.length === 0) {
                minValue[name] = null
            } else {
                minValue[name] = Math.min(...data)
            }
        }
        return minValue
    }

    /**
     * Gets the global maximum value among all lines.
     * @returns {number|null} - The global maximum value among all lines, or null if no data exists.
     */
    getGlobalMaxValue() {
        const maxAllValues = []

        for (const data of Object.values(this.#line)) {
            maxAllValues.push(...data)
        }
        if (maxAllValues.length > 0) {
            return Math.max(...maxAllValues)
        } else {
            return null
        }
    }

    /**
     * Gets the global minimum value among all lines.
     * @returns {number|null} - The global minimum value among all lines, or null if no data exists.
     */
    getGlobalMinValue() {
        const minAllValues = []

        for (const data of Object.values(this.#line)) {
            minAllValues.push(...data)
        }
        if (minAllValues.length > 0) {
            return Math.min(...minAllValues)
        } else {
            return null
        }
    }
}
