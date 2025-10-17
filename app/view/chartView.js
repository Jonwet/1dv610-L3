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

    setOnChartTypeChange(handler) {
        this.#handlers.onTypeChange = handler
    }
    setOnCreateChart(handler) {
        this.#handlers.onCreate = handler
    }

    #setupEventListeners() {
        this.#elements.chartTypeSelect.addEventListener('change', (event) => {
            const type = event.target.value
            console.log('Chart type changed to:', type)
            this.#handlers.onTypeChange?.(type)
        })
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
