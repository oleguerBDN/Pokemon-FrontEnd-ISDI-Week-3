/* eslint-disable no-restricted-globals */
import PokemonService from "./PokemonService.js";

class Detail {
  parentElement;

  url = "https://pokeapi.co/api/v2/pokemon/";

  urlPokeball = "https://oleguer-pokemon.herokuapp.com/pokemon/";

  cardElement;

  editCard = false;

  constructor(parentElement) {
    this.pokemonService = new PokemonService();
    this.parentElement = parentElement;
    this.getUrl();
    this.createCardHTML();
    this.fillCard();
    if (this.editCard) {
      this.addEditButton();
    }
  }

  getUrl() {
    const idPosition = location.href.indexOf("id=") + 3;
    const pidPosition = location.href.indexOf("pid=") + 4;

    if (pidPosition > 4) {
      this.url = `${this.urlPokeball}${location.href.substring(pidPosition)}/`;
      this.editCard = true;
    } else {
      this.url = `${this.url}${location.href.substring(idPosition)}/`;
    }
  }

  createCardHTML() {
    this.cardElement = document.createElement("div");
    this.cardElement.className = "card";
    this.parentElement.appendChild(this.cardElement);
  }

  async fillCard() {
    this.pokemonDetail = await this.pokemonService.getPokemon(this.url);
    this.cardElement.innerHTML = `
      <h2 class="card__name">${this.pokemonDetail.name.toUpperCase()}</h2>
            <img
              src="${
                this.pokemonDetail.sprites.other.dream_world.front_default
              }"
              height="180" width = "290"
              alt="${this.pokemonDetail.name} Image"
              class="card__image"
            />
            <ul class="card__list">
              <li class="card__order">Order: ${this.pokemonDetail.order}</li>
              <li class="card__type">Type: ${
                this.pokemonDetail.types[0].type.name
              }</li>
              <li class="card__experience">XP: ${
                this.pokemonDetail.base_experience
              }</li>
              <li class="card__height">Height: ${
                this.pokemonDetail.height
              } cm</li>
              <li class="card__weight">Weight: ${
                this.pokemonDetail.weight
              } grams</li>
            </ul>
      `;
    if (this.pokemonDetail.types.length > 1) {
      this.cardElement.querySelector(
        ".card__type"
      ).textContent += ` - ${this.pokemonDetail.types[1].type.name}`;
    }
  }

  addEditButton() {
    const newButton = document.createElement("button");
    newButton.className = "edit";
    newButton.textContent = "EDIT POKEMON";
    this.parentElement.appendChild(newButton);
    newButton.addEventListener("click", this.showEditCard);
  }

  showEditCard() {
    console.log("kk");
  }
}

export default Detail;
