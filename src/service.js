const URL = 'https://pokeapi.co/api/v2/pokemon/'

export const getPokemons = async () => {
  const res = await fetch(`${URL}?limit=150`)

  if (!res.ok) throw Error('response not ok!')

  return (await res.json()).results
}

export const getPokemon = async name => {
  const res = await fetch(`${URL}${name}`)
  if (!res.ok) throw Error('response not ok!')

  const pokemon = await res.json()

  return {
    name: pokemon.forms[0].name,
    types: pokemon.types.map(({ type }) => type),
    id: pokemon.id,
  }
}
