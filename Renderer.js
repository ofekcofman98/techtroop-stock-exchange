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

            let changeColorClass = '';
            let sign = '';

            if (company.changes >= 0) {
                changeColorClass = 'positive';
                sign = '+';
            } else {
                changeColorClass = 'negative';
                sign = '';
            }

            resultContainer.innerHTML = `
                <a href="company.html?symbol=${company.symbol}" class="company-link">
                    <img src="${company.image}" 
                        alt="${company.name} logo" 
                        class="search-logo" 
                        onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/3522/3522500.png';"
                    >
                    <span class="company-name">${company.name}</span>
                    <span class="company-symbol">(${company.symbol})</span>
                    <span class="company-change ${changeColorClass}">(${sign}${company.changes.toFixed(2)}%)</span>
                </a>
            `;
            
            this.container.appendChild(resultContainer);
        });
    }
}