document.addEventListener('DOMContentLoaded', () => {
    const createPreloader = () => {
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.innerHTML = '<div class="preloader__spinner"></div>';
        return preloader;
    };

    const gameList = document.querySelector('.game-list');
    const movieList = document.querySelector('.movie-list');

    const gamePreloader = createPreloader();
    const moviePreloader = createPreloader();

    gameList.parentNode.insertBefore(gamePreloader, gameList);
    movieList.parentNode.insertBefore(moviePreloader, movieList);

    const fetchData = async (url, filter, preloader) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data.filter(filter).slice(0, 15);
        } catch (error) {
            console.error('Fetch error:', error);
            const errorMessage = document.createElement('div');
            errorMessage.textContent = '⚠ Что-то пошло не так';
            preloader.parentNode.insertBefore(errorMessage, preloader);
            preloader.remove();
            return [];
        }
    };

    const renderData = (data, listElement) => {
        data.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = listElement.classList.contains('game-list') ? 'game-list__item' : 'movie-list__item';
            listItem.innerHTML = `
                <img src="${item.url}" alt="${item.title}" class="${listElement.classList.contains('game-list') ? 'game-list__item-img' : 'movie-list__item-img'}">
                <div class="${listElement.classList.contains('game-list') ? 'game-list__item-text' : 'movie-list__item-text'}">${item.title}</div>
            `;
            listElement.appendChild(listItem);
        });
    };

    const loadGames = async () => {
        const games = await fetchData('https://jsonplaceholder.typicode.com/photos', item => item.id % 2 === 0, gamePreloader);
        renderData(games, gameList);
        gamePreloader.remove();
    };

    const loadMovies = async () => {
        const movies = await fetchData('https://jsonplaceholder.typicode.com/photos', item => item.id % 2 !== 0, moviePreloader);
        renderData(movies, movieList);
        moviePreloader.remove();
    };

    loadGames();
    loadMovies();
});
