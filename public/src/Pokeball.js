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
              <a href="detail.html?pid=${pokemon.id}"><img src="${
          pokemon.sprites.other.dream_world.front_default
        }" height="130" alt=" ${pokemon.name} image" class="card__image" /></a>
              <button class="card__remove" id="${
                pokemon.id
              }">REMOVE -</button>`;
      });
      this.addListeners();
    })();
  }

  addListeners() {
    const deleteButtons =
      this.cardsListElement.querySelectorAll(".card__remove");
    deleteButtons.forEach((item) =>
      item.addEventListener("click", this.removeClickedPokemons)
    );
  }

  removeClickedPokemons = (clickedItem) => {
    const url = `${this.url}/${clickedItem.target.id}/`;
    (async () => {
      await this.pokemonService.deletePokemon(url);
      this.fillCardList();
    })();
  };
}

export default Pokeball;
