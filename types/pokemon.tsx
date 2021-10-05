export type Pokemon = {
  id: string,
  name: string,
  url: string,
  imagePokemon: string,
}

export type Pokemons = Pokemon[]

export type PokemonComponent = {
  name: string,
  imagePokemon: string,
  handlePokemonModal: () => void
}