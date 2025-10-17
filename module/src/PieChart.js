/**
 * @file Defines the PieChart class.
 * @author Jonatan Wetterberg
 */

import Chart from './Chart.js'

/**
 * Class representing a pie chart, extending the base Chart class.
 */
export default class PieChart extends Chart {
    constructor(title = 'Untitled Pie Chart') {
        super(title)
    }

    /**
     * Gets the largest slice in the pie chart.
     * @returns {Array} - An array containing the entry with the maximum value.
     */
    getLargestSlice() {
        return this.getExtremeValues('max')
    }

    /**
     * Gets the smallest slice in the pie chart.
     * @returns {Array} - An array containing the entry with the minimum value.
     */
    getSmallestSlice() {
        return this.getExtremeValues('min')
    }

    /**
     * Sorts the slices by their values.
     * @param {boolean} [descending=true] - Whether to sort in descending order.
     * @returns {Array} - The sorted data entries.
     */
    sortSlicesByValue(descending = true) {
        return this.sortByValue(descending)
    }

    /**
     * Gets the total number of entries in the pie chart.
     * @returns {number} - The total number of entries.
     */
    getTotal() {
        return this.getTotalEntries()
    }

    /**
     * Gets the percentage representation of each slice in the pie chart.
     * @returns {Array} - An array of objects containing labels and their corresponding percentages.
     */
    getPercentage() {
        const percentageMultiplier = 100

        const total = this.getTotal()
        return this.getData().map((entry) => ({
            label: entry.label,
            percentage: (entry.value / total) * percentageMultiplier + '%',
        }))
    }
}
