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

async function fetchPokemonDetails(pokemonNumber) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`);
    const pokemon = await response.json();

    return pokemon;
}

function renderPokemonDetails(pokemon) {
    const pokemonDetailsContainer = document.getElementById('pokemonDetails');

    const html = `
        <div class="pokemon ${pokemon.types[0].type.name} pokemon-details-card">
            <span class="number">#${pokemon.id}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type.type.name}">${type.type.name}</li>`).join('')}
                </ol>

                
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                </div>
                
                </div>
                <div class="pokemonstats">
                    <ol class="stats">
                        ${pokemon.stats.map((stat) => `
                            <li class=" type">${stat.stat.name} 
                            <span class="value">${stat.base_stat}</span>
                            </li>`
                        ).join('')}
                    </ol>
                </div>
    `;

    pokemonDetailsContainer.innerHTML = html;
}

async function loadPokemonDetails(pokemonNumber) {
    const pokemon = await fetchPokemonDetails(pokemonNumber);
    renderPokemonDetails(pokemon);
}

loadPokemonDetails(pokemonNumber);


function handleError(error) {
    console.error('Erro ao obter detalhes do Pokémon:', error);
}
