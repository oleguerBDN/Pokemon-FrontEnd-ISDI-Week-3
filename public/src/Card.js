import PokemonService from "./PokemonService.js";

class Card {
  parentElement;

  pokemonName;

  url;

  cardElement;

  pokemonDetail;

  constructor(parentElement, pokemonName, pokemonUrl) {
    this.pokemonService = new PokemonService();
    this.parentElement = parentElement;
    this.pokemonName = pokemonName;
    this.url = pokemonUrl;

    this.createCardHTML();
  }

  createCardHTML() {
    this.cardElement = document.createElement("li");
    this.cardElement.className = "card";
    this.cardElement.innerHTML = `<h2 class="card__title">${this.pokemonName.toUpperCase()}</h2>
              <a href= ""><img src="img/defaultImage.png" height="130" alt="${
                this.pokemonName
              } image" class="card__image" /></a>
              <button class="card__add">CATCH +</button>`;
    this.parentElement.appendChild(this.cardElement);
    (async () => {
      this.pokemonDetail = await this.pokemonService.getPokemon(this.url);
      this.cardElement.querySelector(".card__image").src =
        this.pokemonDetail.sprites.other.dream_world.front_default;
      this.cardElement.querySelector(
        "a"
      ).href = `detail.html?id=${this.pokemonDetail.id}`;
      this.addListener();
    })();
  }

  addListener() {
    this.cardElement
      .querySelector(".card__add")
      .addEventListener("click", this.addClickedPokemon);
  }

  addClickedPokemon = () => {
    (async () => {
      await this.pokemonService.addPokemon(this.pokemonDetail);
    })();
  };
}

export default Card;
