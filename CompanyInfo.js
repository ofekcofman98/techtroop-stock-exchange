const apiManager = new APIManager();

const companyLoader = document.getElementById('loader'); 
const companyDetails = document.getElementById('details-container');

const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get('symbol');

async function loadPageData() {
    if (!symbol) return;

    try {
        companyLoader.classList.remove('hidden');
        companyDetails.classList.add('hidden');

        await apiManager.getCompany(symbol);
        
        const profile = apiManager.companyProfile;
        
        if (!profile) {
            companyLoader.textContent = "Company profile not found.";
            return;
        }
        
        const changeValue = parseFloat(profile.changes);
        const changeColorClass = changeValue >= 0 ? 'positive' : 'negative';    
        
        companyDetails.innerHTML = `
            <div class="profile-header">
                <img src="${profile.image}" alt="${profile.companyName} logo" class="profile-logo">
                <h2>${profile.companyName} (${profile.symbol})</h2>
            </div>
            
            <div class="stock-info">
                <span class="stock-price">Stock Price: $${profile.price}</span>
                <span class="stock-change ${changeColorClass}">(${profile.changes}%)</span>
            </div>

            <p class="company-description">${profile.description}</p>
            
            <a href="${profile.website}" target="_blank" class="company-website-link">Visit Company Website ↗</a>
        `;

        companyLoader.classList.add('hidden');
        companyDetails.classList.remove('hidden');

        console.log("Data is ready to be used on screen:", apiManager.companyProfile);
    } 
    catch (error) {
        console.error("Error loading page:", error);
        companyLoader.textContent = "An error occurred while loading data.";
    }
}

loadPageData();