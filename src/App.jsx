import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Todos } from './Todos'
import { SignIn } from './SignIn'

export const App = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/sign-in">
          <SignIn/>
        </Route>
        <Route path="/">
          <Todos/>
        </Route>
      </Switch>
    </Router>
  )
}
