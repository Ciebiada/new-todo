import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import { Todos } from './Todos'
import { SignIn } from './SignIn'
import { ThemeProvider } from 'styled-components'

const theme = {
  primary: '#FF003D',
  secondary: '#00FFC2',
}

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route path="/sign-in">
            <SignIn />
          </Route>
          <Route path="/">
            <Todos />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}
