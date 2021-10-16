class PokemonService {
  url;

  async getPokemons() {
    const response = await fetch(this.url); // asincrono perque tarda
    // response te ok, status, body, cabecera...
    const pokemonsList = await response.json(); // ASINCRONo perque tarda tmbe
    // console.log(pokemonsList.result);
    return pokemonsList;
  }
}

export default PokemonService;
