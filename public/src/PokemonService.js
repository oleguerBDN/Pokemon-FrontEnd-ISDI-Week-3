/* eslint-disable class-methods-use-this */
class PokemonService {
  PokeballUrl = "https://oleguer-pokemon.herokuapp.com/pokemon";

  async getPokemons(url) {
    const response = await fetch(url);
    const pokemonsList = await response.json();
    return pokemonsList;
  }

  async getPokemon(url) {
    const response = await fetch(url);
    const pokemonsDetails = await response.json();
    return pokemonsDetails;
  }

  async deletePokemon(url) {
    const response = await fetch(url, { method: "delete" });
    if (response.ok) return true;
  }

  async addPokemon(jsonInfo) {
    const response = await fetch(this.PokeballUrl, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(jsonInfo),
    });
    if (response.ok) return true;
  }
}

export default PokemonService;
