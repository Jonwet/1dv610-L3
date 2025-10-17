export default class chartView {
    #elements
    #handlers

    constructor(root = document) {
        this.#elements = {
            chartTypeSelect: root.querySelector('#chart-type'),
            chartTitleInput: root.querySelector('#chart-title'),
            createChartButton: root.querySelector('#create-chart'),
        }

        this.#handlers = {
            onTypeChange: null,
            onCreate: null,
        }
        this.#setupEventListeners()
    }

    /*     setOnChartTypeChange(handler) {
        this.#handlers.onTypeChange = handler
    } */ // Ej implementerad ännu
    setOnCreateChart(handler) {
        this.#handlers.onCreate = handler
    }

    #setupEventListeners() {
        this.#elements.createChartButton.addEventListener('click', (event) => {
            event.preventDefault()
            const type = this.#elements.chartTypeSelect.value
            const title =
                this.#elements.chartTitleInput.value || 'Untitled Chart'
            console.log('Creating chart with title:', { type, title })
            this.#handlers.onCreate?.({ type, title })
        })
    }
}
