/* eslint-disable no-restricted-globals */
import PokemonService from "./PokemonService.js";

class Detail {
  parentElement;

  url = "https://pokeapi.co/api/v2/pokemon/";

  urlPokeball = "https://oleguer-pokemon.herokuapp.com/pokemon/";

  cardElement;

  editCard = false;

  pokemonDetail;

  pokemonObject = {};

  pokemonService;

  editButton;

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
    this.editButton = document.createElement("button");
    this.editButton.className = "detail__edit";
    this.editButton.textContent = "EDIT";
    this.parentElement.appendChild(this.editButton);
    this.editButton.addEventListener("click", this.showEditCard);
  }

  showEditCard = () => {
    this.cardElement.innerHTML = `
            <h2 class="card__name">
            <label for="xp">Name: </label>
                    <input type="text" id="name" name="name" required
                    minlength="1" maxlength="15" size="15" value="${this.pokemonDetail.name}">
            </h2>
                  <img
                    src="${this.pokemonDetail.sprites.other.dream_world.front_default}"
                    height="180" width = "290"
                    alt="${this.pokemonDetail.name} Image"
                    class="card__image"
                  />
                  <ul class="card__list">
                  <li class="card__order">
                    <label for="order">Order:</label>
                    <input type="text" id="order" name="order" required
                    minlength="1" maxlength="4" size="4" value="${this.pokemonDetail.order}">
                  </li>
                  <li class="card__type">
                    <label for="type">Type:</label>
                    <input type="text" id="type1" name="type1" required
                    minlength="1" maxlength="10" size="10" value="${this.pokemonDetail.types[0].type.name}">
                    <input type="text" id="type2" name="type2" required
                    minlength="1" maxlength="10" size="10" value="">
                  </li>
                  <li class="card__xp">
                    <label for="xp">XP:</label>
                    <input type="text" id="xp" name="xp" required
                    minlength="1" maxlength="4" size="4" value="${this.pokemonDetail.base_experience}">
                  </li>
                  <li class="card__height">
                    <label for="height">Height:</label>
                    <input type="text" id="height" name="height" required
                    minlength="1" maxlength="4" size="4" value="${this.pokemonDetail.height}">
                  </li>
                  <li class="card__height">
                    <label for="weight">Weight:</label>
                    <input type="text" id="weight" name="weight" required
                    minlength="1" maxlength="4" size="4" value="${this.pokemonDetail.weight}">
                  </li>
                  </ul>
            `;
    if (this.pokemonDetail.types.length > 1) {
      this.cardElement.querySelector(
        "#type2"
      ).value = `${this.pokemonDetail.types[1].type.name}`;
    }

    this.editButton.removeEventListener("click", this.showEditCard);
    this.editButton.textContent = "SAVE";
    this.editButton.addEventListener("click", this.saveCardChanges);
  };

  saveCardChanges = () => {
    this.pokemonDetail.name = this.cardElement.querySelector("#name").value;
    this.pokemonDetail.order = this.cardElement.querySelector("#order").value;
    this.pokemonDetail.base_experience =
      this.cardElement.querySelector("#xp").value;
    this.pokemonDetail.height = this.cardElement.querySelector("#height").value;
    this.pokemonDetail.weight = this.cardElement.querySelector("#weight").value;
    this.pokemonDetail.types[0].type.name =
      this.cardElement.querySelector("#type1").value;

    if (this.cardElement.querySelector("#type2").value !== "") {
      this.pokemonDetail.types[1] = {
        type: {
          name: this.cardElement.querySelector("#type2").value,
        },
      };
    }
    this.applyChangesToApi();
  };

  async applyChangesToApi() {
    await this.pokemonService.modifyPokemon(this.url, this.pokemonDetail);
    this.fillCard();
    this.editButton.removeEventListener("click", this.saveCardChanges);
    this.editButton.textContent = "EDIT";
    this.editButton.addEventListener("click", this.showEditCard);
  }
}

export default Detail;
