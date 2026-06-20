class Renderer {
    constructor() {
        this.loader = document.getElementById('loader');
        this.container = document.getElementById('results-container');
    }
    showLoading() {
        this.loader.classList.remove('hidden');
        this.container.innerHTML = '';
    }

    hideLoading() {
        this.loader.classList.add('hidden');
    }

    render(companies) {
        this.container.innerHTML = '';

        if(companies.length === 0) {
            this.container.innerHTML = '<p class="no-results"> No companies found</p>';
            return;
        }

        companies.forEach(company => {
            const resultContainer = document.createElement('div');
            resultContainer.className = 'result-container';
            resultContainer.innerHTML = `
                <a href="company.html?symbol=${company.symbol}" class="company-link">
                    <span class="company-name">${company.name}</span>
                    <span class="company-symbol">(${company.symbol})</span>
                </a>
            `;
            
            this.container.appendChild(resultContainer);
        });
    }
}