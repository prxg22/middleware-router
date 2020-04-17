import React, { useReducer } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom'
import Route from './router/Route'
import injectState from './router/injectState'
import { getPokemon, getPokemons } from './service'

import './styles.css'

const PokemonsPage = ({ state }) => {
  const { pokemons = [] } = state

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
  const { pokemon = [] } = state

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

const getPokemonMiddleware = async ({ location, setState }) => {
  const { name = '' } = location.params || {}
  const pokemon = await getPokemon(name)
  console.log(pokemon)
  setState({ pokemon })
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
  const [state, setState] = useReducer((state, obj) => ({ ...state, ...obj }), {
    txt: '',
  })

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
              <Component state={state} />
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
