document.addEventListener('DOMContentLoaded', async () => {

    const contenedor = document.getElementById('lista-peliculas');
    const buscador = document.getElementById('buscador');

    // Carga inicial de películas populares
    mostrarPeliculas(await getPopularMovies());

    // Buscador con espera mientras escribes
    buscador.addEventListener('input', async () => {
        const query = buscador.value.trim();
        if (query.length > 2) {
            mostrarPeliculas(await searchMovies(query));
        } else if (query.length === 0) {
            mostrarPeliculas(await getPopularMovies());
        }
    });

    function mostrarPeliculas(peliculas) {
        contenedor.innerHTML = '';

        peliculas.forEach(pelicula => {
            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                <div class="card-info">
                    <h2 class="titulo">${pelicula.title}</h2>
                    <p>⭐ Puntuación: ${pelicula.vote_average}</p>
                    <p>📅 Fecha: ${pelicula.release_date}</p>
                    <p>🗣️ Idioma: ${pelicula.original_language.toUpperCase()}</p>
                </div>
            `;

            // Al hacer click va a la página de detalle
            card.querySelector('.titulo').addEventListener('click', () => {
                window.location.href = `detalle.html?id=${pelicula.id}`;
            });

            contenedor.appendChild(card);
        });
    }

});