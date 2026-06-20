const apiManager = new APIManager();
const renderer = new Renderer();

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

let debounceTimeout = null;

async function executeSearch(query) {
    try {
        await apiManager.searchCompanies(query);
        renderer.hideLoading();
        renderer.render(apiManager.companies);
    } 
    catch (error) {
        console.error("Error during search:", error);
        renderer.hideLoading();
    }
}

function handleSearch() {
    const query = searchInput.value.trim();
    
    if (query === '') {
        renderer.hideLoading();
        renderer.render([]);
        return;
    }
    
    renderer.showLoading();
    
    clearTimeout(debounceTimeout);
    
    debounceTimeout = setTimeout(function() {
        executeSearch(query);
    }, 500);
}

searchInput.addEventListener('input', handleSearch);
searchButton.addEventListener('click', handleSearch);