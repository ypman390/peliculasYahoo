document.addEventListener('DOMContentLoaded', async () => {

    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    const pelicula = await getMovieDetail(id);
    const detalle = document.getElementById('detalle');

    detalle.innerHTML = `
        <div class="detalle-container">
            <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
            <div class="detalle-info">
                <h2>${pelicula.title}</h2>
                <p><strong>📅 Fecha de estreno:</strong> ${pelicula.release_date}</p>
                <p><strong>⭐ Puntuación:</strong> ${pelicula.vote_average} / 10</p>
                <p><strong>🗣️ Idioma original:</strong> ${pelicula.original_language.toUpperCase()}</p>
                <p><strong>⏱️ Duración:</strong> ${pelicula.runtime} minutos</p>
                <p><strong>🎭 Géneros:</strong> ${pelicula.genres.map(g => g.name).join(', ')}</p>
                <p><strong>📝 Sinopsis:</strong> ${pelicula.overview}</p>
                <button class="btn-favorito" id="btn-fav">⭐ Añadir a favoritos</button>
                <a href="favoritos.html" class="btn-volver">Ver mis favoritos</a>
            </div>
        </div>
    `;

    // Comprobamos si ya está en favoritos
    const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    const yaEsta = favoritos.find(f => f.id === pelicula.id);
    const btnFav = document.getElementById('btn-fav');

    if (yaEsta) {
        btnFav.textContent = '✅ Ya en favoritos';
        btnFav.disabled = true;
    }

    // CREATE - Añadir a favoritos
    btnFav.addEventListener('click', () => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        favoritos.push({
            id: pelicula.id,
            title: pelicula.title,
            poster_path: pelicula.poster_path,
            vote_average: pelicula.vote_average,
            release_date: pelicula.release_date,
            nota: ''
        });

        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        btnFav.textContent = '✅ Ya en favoritos';
        btnFav.disabled = true;
    });

});