class Renderer {
    render(companies) {
        const container = document.getElementById('results-container');
        container.innerHTML = '';

        if(companies.length === 0) {
            container.innerHTML = '<p class="no-results"> No companies found</p>';
            return;
        }

        companies.forEach(company => {
            const resultContainer = document.createElement('div');
            resultContainer.className = 'result-container';

            resultContainer.innerHTML = `
                <span class="company-name">${company.name}</span>
                <span class="company-symbol">(${company.symbol})</span>
            `;
            
            container.appendChild(resultContainer);
        });
    }
}