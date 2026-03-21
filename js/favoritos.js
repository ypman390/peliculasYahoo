document.addEventListener('DOMContentLoaded', () => {

    mostrarFavoritos();

    function mostrarFavoritos() {
        const contenedor = document.getElementById('lista-favoritos');
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

        if (favoritos.length === 0) {
            contenedor.innerHTML = '<p class="sin-favoritos">No tienes películas favoritas aún.</p>';
            return;
        }

        contenedor.innerHTML = '';

        favoritos.forEach((pelicula, index) => {
            const card = document.createElement('div');
            card.classList.add('card-favorito');

            card.innerHTML = `
                <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" alt="${pelicula.title}">
                <div class="card-info">
                    <h2>${pelicula.title}</h2>
                    <p>⭐ ${pelicula.vote_average}</p>
                    <p>📅 ${pelicula.release_date}</p>

                    <div class="nota-container">
                        <textarea id="nota-${index}" placeholder="Añade una nota...">${pelicula.nota || ''}</textarea>
                        <button class="btn-update" onclick="actualizarNota(${index})">💾 Guardar nota</button>
                    </div>

                    <button class="btn-delete" onclick="eliminarFavorito(${index})">🗑️ Eliminar</button>
                </div>
            `;

            contenedor.appendChild(card);
        });
    };

    // UPDATE - Guardar nota
    window.actualizarNota = (index) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos[index].nota = document.getElementById(`nota-${index}`).value;
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        alert('✅ Nota guardada correctamente');
    };

    // DELETE - Eliminar favorito
    window.eliminarFavorito = (index) => {
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        favoritos.splice(index, 1);
        localStorage.setItem('favoritos', JSON.stringify(favoritos));
        mostrarFavoritos();
    };

});