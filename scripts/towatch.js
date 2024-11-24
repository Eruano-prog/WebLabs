(function () {
    const form = document.getElementById('towatch-form');
    const listContainer = document.getElementById('towatch-list');

    // Load saved list from localStorage
    const savedMovies = JSON.parse(localStorage.getItem('toWatchList')) || [];
    savedMovies.forEach(addMovieRow);

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const title = form.title.value.trim();
        const genre = form.genre.value.trim();
        const priority = parseInt(form.priority.value, 10);

        if (!title || !genre || isNaN(priority)) {
            alert('Please fill in all fields correctly!');
            return;
        }

        const movie = { title, genre, priority };
        addMovieRow(movie);

        savedMovies.push(movie);
        localStorage.setItem('toWatchList', JSON.stringify(savedMovies));

        form.reset();
    });

    function addMovieRow(movie) {
        const row = document.createElement('tr');

        const titleCell = document.createElement('td');
        titleCell.textContent = movie.title;
        row.appendChild(titleCell);

        const genreCell = document.createElement('td');
        genreCell.textContent = movie.genre;
        row.appendChild(genreCell);

        const priorityCell = document.createElement('td');
        priorityCell.textContent = movie.priority;
        row.appendChild(priorityCell);

        const actionsCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => {
            row.remove();
            const index = savedMovies.findIndex(
                (item) =>
                    item.title === movie.title &&
                    item.genre === movie.genre &&
                    item.priority === movie.priority
            );
            if (index > -1) {
                savedMovies.splice(index, 1);
                localStorage.setItem('toWatchList', JSON.stringify(savedMovies));
            }
        });
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        listContainer.appendChild(row);
    }
})();
