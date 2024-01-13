document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const pokemonNumber = params.get('number');

    if (pokemonNumber) {
        loadPokemonDetails(pokemonNumber);
    }

    const backButton = document.getElementById('backButton');

    if (backButton) {
        backButton.addEventListener('click', () => {
            // Redirecionar para 'index.html'
            window.location.href = 'index.html';
        });
    }
});

function loadPokemonDetails(pokemonNumber) {
    pokeApi.getPokemonDetail({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/` })
        .then(renderPokemonDetails)
        .catch(handleError);
}

function renderPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');

    const html = `
        <div class="pokemon ${pokemon.type} pokemon-details-card">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </div>
    `;

    pokemonDetailsContainer.innerHTML = html;
}

function handleError(error) {
    console.error('Erro ao obter detalhes do Pokémon:', error);
}
