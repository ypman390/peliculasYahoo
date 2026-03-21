document.addEventListener('DOMContentLoaded', async () => {

    // Obtenemos el id de la URL
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
            </div>
        </div>
    `;

});