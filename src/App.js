import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom'
import { Route, injectState } from '@lemonenergy/utils/dist/router'
import { useGlobalState } from '@lemonenergy/utils/dist/hooks'
import { getPokemon, getPokemons } from './service'

import './styles.css'

const PokemonsPage = () => {
  const [{ pokemons = [] }] = useGlobalState()

  return (
    <div>
      {pokemons.map(p => (
        <Link to={`/pokemon/${p.name}`}>
          <p>{p.name}</p>
        </Link>
      ))}
    </div>
  )
}

const PokemonPage = ({ state }) => {
  const [{ pokemon = [] }] = useGlobalState()

  return (
    <div>
      {pokemon.id} - {pokemon.name} - {pokemon.types.map(t => t.name).join('/')}
    </div>
  )
}

const getPokemonsMiddleware = async ({ setState }) => {
  const pokemons = await getPokemons()
  setState({ pokemons })
}

const getPokemonMiddleware = async ({
  location,
  redirect,
  setState,
  getState,
}) => {
  const { pokemons } = getState()
  const { name = '' } = location.params || {}

  try {
    const pokemon = await getPokemon(name)
    setState({ pokemon })
  } catch (e) {
    redirect('/pokemons')
  }
}

const routes = [
  {
    path: '/pokemons',
    component: PokemonsPage,
    middlewares: [getPokemonsMiddleware],
  },
  {
    path: '/pokemon/:name',
    component: PokemonPage,
    middlewares: [getPokemonMiddleware],
  },
]

export default function App() {
  const [state, setState] = useGlobalState()
  return (
    <Router>
      <Switch>
        {routes.map(({ path, component: Component, middlewares }) => {
          return (
            <Route
              exact
              path={path}
              middlewares={injectState(middlewares, state, setState)}
              key={path}
              loading={'loading...'}
            >
              <Component />
            </Route>
          )
        })}
        <Route>
          <Redirect to="/pokemons" />
        </Route>
      </Switch>
    </Router>
  )
}
