class APIManager {
    constructor(){
        this.companies = [],
        this.companyProfile = null;
        this.stockHistory = [];

        this.apiKey = "lsWhQ8lq5pJslf0bU9AI2yi2IyjMU0Ll";
        
        this.baseUrl = "https://financialmodelingprep.com/api/v3";
        this.stableUrl = "https://financialmodelingprep.com/stable";

        this.isMockMode = true;
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
            console.log("Mock Mode: Returning fake search results for:", query);
            this.companies = [
                { name: "Approach Resources Inc.", symbol: "AREX", image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png", changes: -26.56 },
                { name: "Apple Inc.", symbol: "AAPL", image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png", changes: 4.64 },
                { name: "Applied Optoelectronics Inc.", symbol: "AAOI", image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png", changes: -0.21 },
                { name: "Applied Materials Inc.", symbol: "AMAT", image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png", changes: 4.27 }            ];
            return;
        }

        try {
            const searchResults = await this.fetchGeneric(`${this.stableUrl}/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`);
            
            if (!Array.isArray(searchResults) || searchResults.length === 0) {
                this.companies = [];    
                return;
            }
            
            const profileUrls = searchResults.map(company => {
                return `${this.stableUrl}/profile?symbol=${company.symbol}&apikey=${this.apiKey}`;
            });
            
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
        this.companies = searchResults.map((company, index) => {
            const variantData = profilesResults[index];
            
            let logoImage = '';
            let stockChanges = 0;

            if (variantData !== undefined && variantData !== null && variantData.length > 0) {
                logoImage = variantData[0].image;
                stockChanges = parseFloat(variantData[0].changes);
            }
        
            return {
                name: company.name,
                symbol: company.symbol,
                image: logoImage,
                changes: stockChanges
            };
        });
    }

    async getCompany() {
        if (this.isMockMode) {
            console.log("Mock Mode: Returning fake profile for:", symbol);
            this.companyProfile = {
                symbol: symbol,
                companyName: symbol === "AAPL" ? "Apple Inc." : "Mock Company " + symbol,
                price: "175.50",
                changes: symbol === "AAPL" ? "2.34" : "-1.45",
                image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png",
                description: "This is a mock description used during local development to save API rate limits. Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
                website: "https://www.apple.com"
            };
            return;
        }
        try {
            const response = await fetch(`${this.stableUrl}/profile?symbol=${symbol}&apikey=${this.apiKey}`);
            const data = await response.json();

            this.companyProfile = data[0];
            console.log("Company Profile Data:", this.companyProfile);
        }
        catch (error) {
            console.error("Error fetching company profile:", error);
        }
    }

    async getHistoricalPrice(symbol) {
        if (this.isMockMode) {
            console.log("Mock Mode: Returning fake historical price for:", symbol);
            this.stockHistory = [
                { date: "2026-06-15", close: 170.5 },
                { date: "2026-06-16", close: 172.1 },
                { date: "2026-06-17", close: 171.3 },
                { date: "2026-06-18", close: 174.0 },
                { date: "2026-06-19", close: 173.8 },
                { date: "2026-06-20", close: 175.5 }
            ];
            return;
        }

        try {
            const response = await fetch(`${this.stableUrl}/historical-price-eod/light?symbol=${symbol}&apikey=${this.apiKey}`);
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error("API returned invalid history data:", data);
                this.stockHistory = [];
                return;
            }

            this.stockHistory = data; 
        }
        catch (error) {
            console.error("Error fetching historical price:", error);
            this.stockHistory = [];
        }
    }

}