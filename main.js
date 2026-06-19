const apiManager = new APIManager();
const renderer = new Renderer();

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const loading = document.getElementById('loader');

async function handleSearch() {
    const query = searchInput.value.trim();
    
    if (query === '') {
        renderer.render([]);
        return;
    }
    loading.classList.remove('hidden');

    document.getElementById('results-container').innerHTML = '';

    await apiManager.searchCompanies(query);
    
    loading.classList.add('hidden');
    
    renderer.render(apiManager.companies);
}

searchButton.addEventListener('click', handleSearch);