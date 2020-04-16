import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import Route from './router/Route'
import './styles.css'

const PageA = () => <div>pageA</div>
const PageB = () => <div>pageB</div>

export default function App() {
  // const [state, setState] = useState({ counter: 1, text: 'heeeeey' })

  return (
    <Router>
      {/* <Switch> */}
      <Route path="/" component={<PageA />} />
      {/* <Route path="/b" component={PageA} /> */}
      {/* <Route>
          <Redirect to="/a" />
        </Route> */}
      {/* </Switch> */}
    </Router>
  )
}
