import PokemonService from "./PokemonService.js";

class Pokeball {
  cardsParentElement;

  paginationParentElement;

  cardsListElement;

  paginationElement;

  pokemonService;

  pokemonList;

  url = "https://oleguer-pokemon.herokuapp.com/pokemon";

  totalPokemons;

  constructor(cardsParentElement) {
    this.pokemonService = new PokemonService();
    this.cardsParentElement = cardsParentElement;
    this.createCardsHTML();
    this.fillCardList();
  }

  createCardsHTML() {
    this.cardsListElement = document.createElement("ul");
    this.cardsListElement.className = "cards__list";
    this.cardsParentElement.appendChild(this.cardsListElement);
  }

  fillCardList() {
    this.cardsListElement.innerHTML = "";
    (async () => {
      this.pokemonList = await this.pokemonService.getPokemons(this.url);
      this.totalPokemons = this.pokemonList.length;
      // eslint-disable-next-line array-callback-return
      this.pokemonList.map((pokemon) => {
        this.cardElement = document.createElement("li");
        this.cardElement.className = "card";
        this.cardsListElement.appendChild(this.cardElement);
        this.cardElement.innerHTML = `<h2 class="card__title">${pokemon.name.toUpperCase()}</h2>
              <a href="detail.html?id=${pokemon.id}"><img src="${
          pokemon.sprites.other.dream_world.front_default
        }" height="130" alt=" ${pokemon.name} image" class="card__image" /></a>
              <button class="card__add">REMOVE -</button>`;
      });
    })();
  }
}

export default Pokeball;
