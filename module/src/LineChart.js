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
     * @param {string} lineName - The name of the line.
     * @param {Array<number>} data - The data points for the line.
     */
    addLine(lineName, data) {
        this.#line[lineName] = [...data]
    }

    /**
     * Removes a line from the chart.
     * @param {string} lineName - The name of the line to remove.
     */
    removeLine(lineName) {
        delete this.#line[lineName]
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

    getExtremeValuesForEachLine(type = 'min') {
        this.#validateExtremeType(type)

        const extremeValues = {}
        for (const [lineName, data] of Object.entries(this.#line)) {
            if (data.length === 0) {
                extremeValues[lineName] = null
            } else if (type === 'max') {
                extremeValues[lineName] = Math.max(...data)
            } else if (type === 'min') {
                extremeValues[lineName] = Math.min(...data)
            }
        }
        return extremeValues
    }

    /**
     * Gets the maximum value for each line in the chart.
     * @returns {Object} - An object mapping line names to their maximum values.
     */
    getMaxValueForEachLine() {
        return this.getExtremeValuesForEachLine('max')
    }

    /**
     * Gets the minimum value for each line in the chart.
     * @returns {Object} - An object mapping line names to their minimum values.
     */
    getMinValueForEachLine() {
        return this.getExtremeValuesForEachLine('min')
    }

    getGlobalExtremeValue(type = 'min') {
        this.#validateExtremeType(type)

        const allValues = []
        for (const data of Object.values(this.#line)) {
            allValues.push(...data)
        }
        if (allValues.length === 0) {
            return null
        } else if (type === 'max') {
            return Math.max(...allValues)
        } else if (type === 'min') {
            return Math.min(...allValues)
        }
    }

    /**
     * Gets the global maximum value among all lines.
     * @returns {number|null} - The global maximum value among all lines, or null if no data exists.
     */
    getGlobalMaxValue() {
        return this.getGlobalExtremeValue('max')
    }

    /**
     * Gets the global minimum value among all lines.
     * @returns {number|null} - The global minimum value among all lines, or null if no data exists.
     */
    getGlobalMinValue() {
        return this.getGlobalExtremeValue('min')
    }

    #validateExtremeType(type) {
        if (type !== 'max' && type !== 'min') {
            throw new Error('Type must be "min" or "max"')
        }
    }
}
