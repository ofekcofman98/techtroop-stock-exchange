class APIManager {
    constructor(){
        this.companies = [],
        this.companyProfile = null;
        this.stockHistory = [];

        this.apiKey = "lsWhQ8lq5pJslf0bU9AI2yi2IyjMU0Ll";
        
        this.baseUrl = "https://financialmodelingprep.com/api/v3";
        this.stableUrl = "https://financialmodelingprep.com/stable";

        this.limitPerRequest = 3;
        this.isMockMode = false;
    }

    async fetchGeneric(url) {
        const response = await fetch(url);
        if (!response.ok) {
            return { error: true, status: response.status };
        }
        return await response.json();
    }

    async searchCompanies(query) {
        if (this.isMockMode) {
            console.log("Mock Mode:", query);
            const searchResults = MOCK_DATA.searchResults;
            const profilesResults = searchResults.map(company => {
                const found = MOCK_DATA.profiles.find(p => p.symbol === company.symbol);
                return found ? [found] : [];
            });

            this.processSearchData(searchResults, profilesResults);
            return;
        }

        try {
            const searchResults = await this.fetchGeneric(`${this.stableUrl}/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`);
            
            if (!Array.isArray(searchResults) || searchResults.length === 0) {
                this.companies = [];    
                return;
            }
            
            const profileUrls = [];

            for (let i = 0; i < searchResults.length; i += this.limitPerRequest) {
                const chunk = searchResults.slice(i, i + this.limitPerRequest);
                const symbolsString = chunk.map(c => c.symbol).join(',');

                const url = `${this.stableUrl}/profile?symbol=${symbolsString}&apikey=${this.apiKey}`;
                profileUrls.push(url);
            }

            const profilesResults = await Promise.all(
                profileUrls.map(url => this.fetchGeneric(url))
            );

            this.processSearchData(searchResults, profilesResults);
        }
        catch (err) {
            console.error(`Failed to fetch: ${err}`);
            this.companies = [];
        }
    }

    processSearchData(searchResults, profilesResults) {
        let allProfiles = [];
        for (let i = 0; i < profilesResults.length; i++) {
            if (Array.isArray(profilesResults[i])) {
                allProfiles.push(...profilesResults[i]);
            }
        }

        console.log("All Profiles fetched for list:", allProfiles);

        this.companies = searchResults.map((company) => {
            const data = allProfiles.find(profile => {
                return profile && 
                       profile.symbol && 
                       company.symbol && 
                       profile.symbol.trim().toUpperCase() === company.symbol.trim().toUpperCase();
            });
            
            let logoImage = 'https://cdn-icons-png.flaticon.com/512/3522/3522500.png';
            let stockChanges = 0;

            if (data) {
                logoImage = data.image || logoImage;
                stockChanges = data.changePercentage !== undefined ? parseFloat(data.changePercentage) : 0;
            }
        
            return {
                name: company.name,
                symbol: company.symbol,
                image: logoImage,
                changes: stockChanges
            };
        });    
    }

    async getCompany(symbol) {
        if (this.isMockMode) {
            console.log("Mock Mode");
            const foundProfile = MOCK_DATA.profiles.find(p => p.symbol === symbol);
            
            this.companyProfile = foundProfile || MOCK_DATA.profiles[1];
            return;
        }
        try {
            const data = await this.fetchGeneric(`${this.stableUrl}/profile?symbol=${symbol}&apikey=${this.apiKey}`);

            if (Array.isArray(data) && data.length > 0) {
                this.companyProfile = data[0];
            }
            else {
                this.companyProfile = null;
            }
            console.log("Company Profile Data:", this.companyProfile);
        }
        catch (error) {
            console.error("Error fetching company profile:", error);
        }
    }

    async getHistoricalPrice(symbol) {
        if (this.isMockMode) {
            console.log("Mock Mode");
            this.stockHistory = MOCK_DATA.historicalPrices;
            return;
        }

        try {
            const data = await this.fetchGeneric(`${this.stableUrl}/historical-price-full?symbol=${symbol}&apikey=${this.apiKey}`);

            if (data && Array.isArray(data.historical)) {
                this.stockHistory = data.historical.slice(0, 30).reverse();
            }
            else if (Array.isArray(data)) {
                this.stockHistory = data.slice(0, 30).reverse();
            } 
            else {
                console.error("API returned invalid history data structure:", data);
                this.stockHistory = [];
            }
        }
        catch (error) {
            console.error("Error fetching historical price:", error);
            this.stockHistory = [];
        }
    }

}