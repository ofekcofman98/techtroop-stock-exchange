class APIManager {
    constructor(){
        this.companies = [],
        this.companyProfile = null;
        this.stockHistory = [];

        this.apiKey = "lsWhQ8lq5pJslf0bU9AI2yi2IyjMU0Ll";
        
        this.baseUrl = "https://financialmodelingprep.com/api/v3";
        this.stableUrl = "https://financialmodelingprep.com/stable";

    }
    async searchCompanies(query) {
        try {

            const response = await fetch(`${this.stableUrl}/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`)
            const results = await response.json();
            
            if (!Array.isArray(results) || results.length === 0) {
                this.companies = [];    
                return;
            }
            
            this.companies = results;
        }
        catch (err) {
            console.error(`Failed to fetch: ${err}`);
            this.companies = [];
        }
    }

    async getCompany() {
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