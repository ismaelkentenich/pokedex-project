document.addEventListener('DOMContentLoaded', () => {
    const pokemonList = document.getElementById('pokemonList');
    const loadMoreButton = document.getElementById('loadMoreButton');

    const maxRecords = 151;
    const limit = 10;
    let offset = 0;

    // Função para converter um Pokémon em um elemento de lista HTML
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

    // Função para carregar os itens da lista de Pokémon
    function loadPokemonItems(offset, limit) {
        pokeApi.getPokemons(offset, limit)
            .then((pokemons = []) => {
                const newHtml = pokemons.map(convertPokemonToLi).join('');
                pokemonList.innerHTML += newHtml;
            });
    }

    // Carrega os primeiros Pokémon ao carregar a página
    loadPokemonItems(offset, limit);

    // Adiciona um evento de clique ao botão "Load More"
    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;

        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonItems(offset, newLimit);

            loadMoreButton.parentElement.removeChild(loadMoreButton);
        } else {
            loadPokemonItems(offset, limit);
        }
    });

    // Adiciona um evento de clique aos cards para navegar para a página de detalhes
    pokemonList.addEventListener('click', (event) => {
        const clickedCard = event.target.closest('.pokemon-card');
        if (clickedCard) {
            const pokemonNumber = clickedCard.getAttribute('data-number');
            navigateToPokemonPage(pokemonNumber);
        }
    });

    // Função para navegar para a página de detalhes do Pokémon
    function navigateToPokemonPage(pokemonNumber) {
        const url = `pokemon-details.html?number=${pokemonNumber}`;
        window.location.href = url;
    }
});
