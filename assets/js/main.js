
// Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Get the Pokemon list and load more button elements by their IDs
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');

    // Define constants for maximum records, limit, and initial offset
    const maxRecords = 151;
    const limit = 10;
    let offset = 0;

    // Function to convert a Pokemon to an HTML list element
    function convertPokemonToLi(pokemon) {
        return `
            <li class="pokemon ${pokemon.type} pokemon-card" data-number="${pokemon.number}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>

                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `;
    }

    // Function to load Pokemon items into the list
    function loadPokemonItems(offset, limit) {
        pokeApi.getPokemons(offset, limit)
            .then((pokemons = []) => {
                const newHtml = pokemons.map(convertPokemonToLi).join('');
                pokemonList.innerHTML += newHtml;
            });
    }

    // Load the initial Pokemon items when the page loads
    loadPokemonItems(offset, limit);

    // Add a click event listener to the "Load More" button
    loadMoreButton.addEventListener('click', () => {
        // Increment the offset and calculate the new limit
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;

        // Check if the new limit exceeds the maximum records
        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonItems(offset, newLimit);

            // Remove the "Load More" button if the maximum records are reached
            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            loadPokemonItems(offset, limit);
        }
    });

    // Add a click event listener to the Pokemon cards to navigate to the details page
    pokemonList.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.pokemon-card');
        if (clickedCard) {
            const pokemonNumber = clickedCard.getAttribute('data-number');
            navigateToPokemonPage(pokemonNumber);
        }
    });

    // Function to navigate to the Pokemon details page
    function navigateToPokemonPage(pokemonNumber) {
        const url = `pokemon-details.html?number=${pokemonNumber}`;
        window.location.href = url;
    }
});
