const apiManager = new APIManager();
const renderer = new Renderer();

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (query === '') {
        renderer.render([]);
        return;
    }
    
    renderer.showLoading();
    
    await apiManager.searchCompanies(query);
    
    renderer.hideLoading();
    
    renderer.render(apiManager.companies);
}

searchButton.addEventListener('click', handleSearch);