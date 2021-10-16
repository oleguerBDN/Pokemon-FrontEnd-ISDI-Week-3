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
    this.cardElement.innerHTML = `   <h2 class="card__title">${this.pokemonName}</h2>
              <img src="" height="130" alt="${this.pokemonName} image" class="card__image" />
              <button class="card__add">+</button>`;
    this.parentElement.appendChild(this.cardElement);
    (async () => {
      this.pokemonDetail = await this.pokemonService.getPokemon(this.url);
      this.cardElement.querySelector(".card__image").src =
        this.pokemonDetail.sprites.other.dream_world.front_default;
      console.log(this.pokemonDetail);
    })();
  }
}

export default Card;
