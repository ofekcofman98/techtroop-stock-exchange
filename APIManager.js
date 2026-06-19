class APIManager {
    constructor(){
        this.companies = [],
        this.apiKey = "lsWhQ8lq5pJslf0bU9AI2yi2IyjMU0Ll",
        this.baseUrl = "https://financialmodelingprep.com/stable"
    }

    async searchCompanies(query) {
        try {

            const response = await fetch(`${this.baseUrl}/search-name?query=${query}&limit=10&exchange=NASDAQ&apikey=${this.apiKey}`)
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


}