import PokemonService from "./PokemonService.js";
import Card from "./Card.js";

class Cards {
  parentElement;

  cardsListElement;

  pageType;

  pokemonService;

  pokemonList;

  constructor(parentElement, pageType) {
    this.pokemonService = new PokemonService();
    this.parentElement = parentElement;
    this.pageType = pageType;
    this.createCardsHTML();
    this.fillCardList();
  }

  createCardsHTML() {
    this.cardsListElement = document.createElement("ul");
    this.cardsListElement.className = "cards__list";
    this.parentElement.appendChild(this.cardsListElement);
  }

  fillCardList() {
    (async () => {
      this.pokemonList = await this.pokemonService.getPokemons(
        "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0"
      );
      this.pokemonList.results.map(
        (pokemon) => new Card(this.cardsListElement, pokemon.name, pokemon.url)
      );
      console.log(this.pokemonList.results);
    })();
  }
}

export default Cards;
