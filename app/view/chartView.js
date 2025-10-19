export default class chartView {
    #elements
    #handlers

    constructor(root = document) {
        this.#elements = {
            chartTypeSelect: root.querySelector('#chart-type'),
            chartTitleInput: root.querySelector('#chart-title'),
            createChartButton: root.querySelector('#create-chart'),
            dataForm: root.querySelector('#data-form'),
            dataLabelInput: root.querySelector('#data-label'),
            dataValueInput: root.querySelector('#data-value'),
            largestButton: root.querySelector('#get-largest'),
        }

        this.#handlers = {
            onTypeChange: null,
            onCreate: null,
            onAddData: null,
            onGetLargest: null,
        }
        this.#setupEventListeners()
    }

    setOnChartTypeChange(handler) {
        this.#handlers.onTypeChange = handler
    }
    setOnCreateChart(handler) {
        this.#handlers.onCreate = handler
    }
    setOnAddData(handler) {
        this.#handlers.onAddData = handler
    }
    setOnGetLargest(handler) {
        this.#handlers.onGetLargest = handler
    }

    #setupEventListeners() {
        this.#elements.chartTypeSelect.addEventListener('change', (event) => {
            const type = event.target.value
            this.#handlers.onTypeChange(type)
        })
        this.#elements.createChartButton.addEventListener('click', (event) => {
            event.preventDefault()
            const type = this.#elements.chartTypeSelect.value
            const title =
                this.#elements.chartTitleInput.value || 'Untitled Chart'
            this.#handlers.onCreate({ type, title })
        })
        this.#elements.dataForm.addEventListener('submit', (event) => {
            event.preventDefault()
            const type = this.#elements.chartTypeSelect.value
            const label = this.#elements.dataLabelInput.value.trim()
            const value = this.#elements.dataValueInput.value.trim()
            this.#handlers.onAddData({ type, label, value })
        })
        this.#elements.largestButton.addEventListener('click', (event) => {
            event.preventDefault()
            this.#handlers.onGetLargest()
        })
    }
}
