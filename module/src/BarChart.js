/**
 * @file Defines the BarChart class.
 * @author Jonatan Wetterberg
 */

import Chart from './Chart.js'

/**
 * Class representing a bar chart, extending the base Chart class.
 */
export default class BarChart extends Chart {
    constructor(title = 'Untitled Bar Chart') {
        super(title)
    }

    /**
     * Gets the largest bar in the chart.
     * @returns {Array} - An array containing the entry with the maximum value.
     */
    getLargestBar() {
        return this.getExtremeValues('max')
    }

    /**
     * Gets the smallest bar in the chart.
     * @returns {Array} - An array containing the entry with the minimum value.
     */
    getSmallestBar() {
        return this.getExtremeValues('min')
    }

    /**
     * Sorts the bars by their values.
     * @param {boolean} [descending=true] - Whether to sort in descending order.
     * @returns {Array} - The sorted data entries.
     */
    sortBarsByValue(descending = true) {
        return this.sortByValue(descending)
    }

    /**
     * Gets the total number of entries
     * @returns {number} - The total number of entries.
     */
    getTotal() {
        return this.getTotalEntries()
    }

    /**
     * Renders the bar chart in the terminal.
     * @returns {string} - The rendered bar chart as a string.
     */
    render() {
        const data = this.getData()

        let result = ''

        data.forEach((entry) => {
            const bar = '#'.repeat(entry.value)
            result = result + `${entry.label} : ${bar} ${entry.value}\n`
        })

        return result
    }
}
