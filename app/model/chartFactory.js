import { BarChart, LineChart, PieChart } from '../../module/superChart.js'

export default class chartFactory {
    static createChart(type, title = 'Untitled Chart') {
        switch (type) {
            case 'bar':
                return new BarChart(title)
            case 'line':
                return new LineChart(title)
            case 'pie':
                return new PieChart(title)
            default:
                throw new Error(`Unknown chart type: ${type}`)
        }
    }
}
