import React, { useReducer } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Link,
} from 'react-router-dom'
import Route from './router/Route'
import './styles.css'

const wait = time => new Promise(res => setTimeout(res, time))

const PageA = ({ counter }) => <div>pageA</div>
const PageB = ({ counter, increment }) => (
  <div>
    {counter} <button onClick={increment}>increment</button>
    {counter > 10 ? <Link to="/a">Ir para a A</Link> : null}
  </div>
)

const routes = [
  {
    path: '/a',
    component: PageA,
    middlewares: [
      ({ redirect, counter }) => {
        if (counter > 10) return
        redirect('/b')
      },
    ],
  },
  {
    path: '/b',
    component: PageB,
    middlewares: [],
  },
]

export default function App() {
  const [counter, increment] = useReducer(state => state + 1, 0)

  const injectState = middleware => args => middleware({ ...args, counter })

  return (
    <Router>
      <Switch>
        {routes.map(({ path, component: Component, middlewares }) => {
          return (
            <Route
              path={path}
              middlewares={middlewares.map(injectState)}
              key={path}
              loading={'loading...'}
            >
              <Component counter={counter} increment={increment} />
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}
