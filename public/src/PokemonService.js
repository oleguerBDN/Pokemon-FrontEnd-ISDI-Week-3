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
}

export default PokemonService;
