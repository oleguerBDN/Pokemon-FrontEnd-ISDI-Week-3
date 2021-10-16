/* eslint-disable class-methods-use-this */
class PokemonService {
  async getPokemons(url) {
    const response = await fetch(url); // asincrono perque tarda
    // response te ok, status, body, cabecera...
    const pokemonsList = await response.json(); // ASINCRONo perque tarda tmbe
    // console.log(pokemonsList.result);
    return pokemonsList;
  }

  async getPokemon(url) {
    const response = await fetch(url); // asincrono perque tarda
    // response te ok, status, body, cabecera...
    const pokemonsDetails = await response.json(); // ASINCRONo perque tarda tmbe
    // console.log(pokemonsList.result);
    return pokemonsDetails;
  }
}

export default PokemonService;
