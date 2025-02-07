document.addEventListener('DOMContentLoaded', function() {
    const gameListContainer = document.getElementById('game-list');
    const searchInput = document.getElementById('search-input');
    const categorySelect = document.getElementById('category-select');

    let allGames = []; // Store all games loaded from JSON

    // Load game data from JSON file
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            allGames = data.games; // Store all games
            populateCategories(data.categories);
            displayGames(allGames);

            // Event listeners
            searchInput.addEventListener('input', filterGames);
            categorySelect.addEventListener('change', filterGames);
        })
        .catch(error => console.error('Error loading data:', error));

    function populateCategories(categories) {
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category.toLowerCase();
            option.textContent = category;
            categorySelect.appendChild(option);
        });
    }

    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        let filteredGames = allGames;

        if (selectedCategory !== 'all') {
            filteredGames = filteredGames.filter(game => game.category.toLowerCase() === selectedCategory);
        }

        filteredGames = filteredGames.filter(game => game.name.toLowerCase().includes(searchTerm));

        displayGames(filteredGames);
    }

    function displayGames(games) {
        gameListContainer.innerHTML = ''; // Clear existing list
        games.forEach(game => {
            const gameItem = document.createElement('div');
            gameItem.classList.add('game-item');

            const gameLink = document.createElement('a');
            gameLink.href = game.requestFileLink;
            gameLink.textContent = game.name;
            gameLink.target = "_blank"; // Open in new tab

            gameItem.appendChild(gameLink);
            gameListContainer.appendChild(gameItem);
        });
    }
});
