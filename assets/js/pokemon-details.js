
// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Extract the Pokemon number from the URL parameters
    const params = new URLSearchParams(window.location.search);
    const pokemonNumber = params.get('number');

    // If a Pokemon number is present, load and render its details
    if (pokemonNumber) {
        loadPokemonDetails(pokemonNumber);
    }

    // Get the back button element by its ID
    const backButton = document.getElementById('backButton');

    // If the back button exists, add a click event listener to navigate back to 'index.html'
    if (backButton) {
        backButton.addEventListener('click', () => {
            // Redirect to 'index.html'
            window.location.href = 'index.html';
        });
    }
});

// Function to fetch Pokemon details from the API
async function fetchPokemonDetails(pokemonNumber) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}/`);
    const pokemon = await response.json();

    return pokemon;
}

// Function to render Pokemon details to the HTML
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
                    <li class="type">${stat.stat.name} 
                    <span class="value">${stat.base_stat}</span>
                    </li>`
                ).join('')}
            </ol>
        </div>
    `;

    pokemonDetailsContainer.innerHTML = html;
}

// Function to load and render Pokemon details by number
async function loadPokemonDetails(pokemonNumber) {
    const pokemon = await fetchPokemonDetails(pokemonNumber);
    renderPokemonDetails(pokemon);
}

// Call the loadPokemonDetails function with the extracted Pokemon number
loadPokemonDetails(pokemonNumber);

// Function to handle errors
function handleError(error) {
    console.error('Error fetching Pokemon details:', error);
}
