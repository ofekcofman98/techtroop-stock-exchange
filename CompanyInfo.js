class CompanyRenderer {
    constructor() {
        this.loader = document.getElementById('loader');
        this.detailsContainer = document.getElementById('details-container');
        this.chart = null;
    }
    
    showLoading() {
        this.loader.classList.remove('hidden');
        this.detailsContainer.classList.add('hidden');
    }
    
    hideLoading() {
        this.loader.classList.add('hidden');
        this.detailsContainer.classList.remove('hidden');
    }

    renderProfile(profile) {
        const changeValue = parseFloat(profile.changes);
        const changeColorClass = changeValue >= 0 ? 'positive' : 'negative';    
        
        this.detailsContainer.innerHTML = `
            <div class="profile-header">
                <img src="${profile.image}" 
                    alt="${profile.companyName} logo" 
                    class="profile-logo" 
                    onerror="this.onerror=null; this.src='https://cdn-icons-png.flaticon.com/512/3522/3522500.png';"
                >
                <h2>${profile.companyName} (${profile.symbol})</h2>
            </div>
            
            <div class="stock-info">
                <span class="stock-price">Stock Price: $${profile.price}</span>
                <span class="stock-change ${changeColorClass}">(${profile.changes}%)</span>
            </div>

            <p class="company-description">${profile.description}</p>
            
            <a href="${profile.website}" target="_blank" class="company-website-link">Visit Company Website ↗</a>
        `;
    }

    renderChart(historyData) {
        const ctx = document.getElementById('stock-chart')

        if (this.chart) {
            this.chart.destroy();
        }

        const sortedData = [...historyData];

        const labels = sortedData.map(item => item.date);
        const prices = sortedData.map(item => item.close);

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Stock Price History',
                    data: prices,
                    borderColor: '#e24373',
                    backgroundColor: 'rgba(226, 67, 115, 0.7)',
                    borderWidth: 3,
                    pointRadius: 4,
                    pointBackgroundColor: '#e24373',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}

const apiManager = new APIManager();
const companyRenderer = new CompanyRenderer();

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

async function loadPageData() {
    if (!symbol) return;

    try {
        companyRenderer.showLoading();

        await apiManager.getCompany(symbol);
        await apiManager.getHistoricalPrice(symbol);

        if (!apiManager.companyProfile) {
            document.getElementById('loader').textContent = "Company profile not found.";
            return;
        }
        
        companyRenderer.renderProfile(apiManager.companyProfile);
        companyRenderer.renderChart(apiManager.stockHistory);

        companyRenderer.hideLoading();
    } 
    catch (error) {
        console.error("Error loading page:", error);
        companyLoader.textContent = "An error occurred while loading data.";
    }
}

loadPageData();