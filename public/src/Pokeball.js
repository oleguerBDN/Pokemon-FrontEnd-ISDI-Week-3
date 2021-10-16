import PokemonService from "./PokemonService.js";
import Card from "./Card.js";

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
      console.log(this.pokemonList);
      this.totalPokemons = this.pokemonList.length;
      console.log(this.totalPokemons);
      this.pokemonList.map(
        (pokemon) => new Card(this.cardsListElement, pokemon.name, pokemon.url)
      );
    })();
  }
}

export default Pokeball;
