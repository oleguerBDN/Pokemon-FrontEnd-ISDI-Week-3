import PokemonService from "./PokemonService.js";
import Card from "./Card.js";

class Cards {
  cardsParentElement;

  paginationParentElement;

  cardsListElement;

  paginationElement;

  pokemonService;

  pokemonList;

  url = "https://pokeapi.co/api/v2/pokemon?limit=12&offset=0";

  offset = 0;

  totalPokemons;

  constructor(cardsParentElement, paginationParentElement) {
    this.pokemonService = new PokemonService();
    this.cardsParentElement = cardsParentElement;
    this.paginationParentElement = paginationParentElement;
    this.createCardsHTML();
    this.createPaginationHTML();
    this.fillCardList();
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
    <li class="pagination__item pagination__item--center"></li>
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

  leftClicked = () => {
    if (this.offset !== 0) {
      this.offset -= 12;
      const offsetPosition = this.url.indexOf("offset=") + 7;
      this.url = this.url.substring(0, offsetPosition) + this.offset;
      this.fillCardList();
    }
  };

  rightClicked = () => {
    if (this.offset + 12 < this.totalPokemons) {
      this.offset += 12;
      const offsetPosition = this.url.indexOf("offset=") + 7;
      this.url = this.url.substring(0, offsetPosition) + this.offset;
      this.fillCardList();
    }
  };

  fillCardList() {
    this.cardsListElement.innerHTML = "";
    (async () => {
      this.pokemonList = await this.pokemonService.getPokemons(this.url);
      this.totalPokemons = this.pokemonList.count;
      this.pokemonList.results.map(
        (pokemon) => new Card(this.cardsListElement, pokemon.name, pokemon.url)
      );
      this.updatePagination();
    })();
  }

  updatePagination() {
    this.paginationElement.querySelector(
      ".pagination__item--center"
    ).textContent = `${this.offset + 1} / ${this.totalPokemons}`;
  }
}

export default Cards;
