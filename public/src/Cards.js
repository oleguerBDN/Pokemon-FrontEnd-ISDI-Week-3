import PokemonService from "./PokemonService.js";
import Card from "./Card.js";

class Cards {
  cardsParentElement;

  paginationParentElement;

  cardsListElement;

  paginationElement;

  pageType;

  pokemonService;

  pokemonList;

  url = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";

  constructor(cardsParentElement, paginationParentElement, pageType) {
    this.pokemonService = new PokemonService();
    this.cardsParentElement = cardsParentElement;
    this.paginationParentElement = paginationParentElement;
    this.pageType = pageType;
    this.createCardsHTML();
    this.fillCardList();
    this.createPaginationHTML();
    this.addPaginationListeners();
  }

  createCardsHTML() {
    this.cardsListElement = document.createElement("ul");
    this.cardsListElement.className = "cards__list";
    this.cardsParentElement.appendChild(this.cardsListElement);
  }

  createPaginationHTML() {
    this.paginationElement = document.createElement("ul");
    this.paginationElement.className = "pagination";
    this.paginationParentElement.appendChild(this.paginationElement);
    this.paginationElement.innerHTML = `<li class="pagination__item pagination__item--left"><<</li>
            <li class="pagination__item pagination__item--right">>></li>`;
  }

  addPaginationListeners() {
    const leftButton = this.paginationElement.querySelector(
      ".pagination__item--left"
    );
    const rightButton = this.paginationElement.querySelector(
      ".pagination__item--right"
    );

    leftButton.addEventListener("click", this.leftClicked);
    rightButton.addEventListener("click", this.rightClicked);
  }

  fillCardList() {
    (async () => {
      this.pokemonList = await this.pokemonService.getPokemons(this.url);
      this.pokemonList.results.map(
        (pokemon) => new Card(this.cardsListElement, pokemon.name, pokemon.url)
      );
      console.log(this.pokemonList.results);
    })();
  }
}

export default Cards;
