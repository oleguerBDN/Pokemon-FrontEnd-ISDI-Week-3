/* eslint-disable class-methods-use-this */
class PokemonService {
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

  // method: "DELETE"
  // const response = await fetch ( shit_to_delete_url, { method: "delete"}
  // if response.ok  return true;
}

export default PokemonService;
