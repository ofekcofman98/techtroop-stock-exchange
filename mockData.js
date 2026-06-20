const MOCK_DATA = {
    searchResults: [
        { name: "Approach Resources Inc.", symbol: "AREX" },
        { name: "Apple Inc.", symbol: "AAPL" },
        { name: "Applied Optoelectronics Inc.", symbol: "AAOI" },
        { name: "Applied Materials Inc.", symbol: "AMAT" }
    ],
    
    profiles: [
        {
            symbol: "AREX",
            companyName: "Approach Resources Inc.",
            price: "1.25",
            changePercentage: "-26.56",
            image: "https://cdn-icons-png.flaticon.com/512/3522/3522500.png",
            description: "Approach Resources Inc. is an independent energy company.",
            website: "https://www.approachresources.com"
        },
        {
            symbol: "AAPL",
            companyName: "Apple Inc.",
            price: "175.50",
            changePercentage: "2.34",
            image: "https://financialmodelingprep.com/images-logos-stocks/AAPL.png",
            description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
            website: "https://www.apple.com"
        },
        {
            symbol: "AAOI",
            companyName: "Applied Optoelectronics Inc.",
            price: "12.40",
            changePercentage: "-0.21",
            image: "https://cdn-icons-png.flaticon.com/512/3522/3522500.png",
            description: "Applied Optoelectronics, Inc. designs and manufactures fiber-optic networking products.",
            website: "https://www.ao-inc.com"
        },
        {
            symbol: "AMAT",
            companyName: "Applied Materials Inc.",
            price: "145.20",
            changePercentage: "4.27",
            image: "https://cdn-icons-png.flaticon.com/512/3522/3522500.png",
            description: "Applied Materials, Inc. provides manufacturing equipment, services, and software to the semiconductor industry.",
            website: "https://www.appliedmaterials.com"
        }
    ],

    historicalPrices: [
        { date: "2026-06-15", close: 170.5 },
        { date: "2026-06-16", close: 172.1 },
        { date: "2026-06-17", close: 171.3 },
        { date: "2026-06-18", close: 174.0 },
        { date: "2026-06-19", close: 173.8 },
        { date: "2026-06-20", close: 175.5 }
    ]
};