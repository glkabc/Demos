import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Switch,
  Redirect
} from 'react-router-dom'

class About extends React.Component {
  render() {
    return (
      <div>
        about Component
      </div>
    )
  }
}

const Home = (props => <div>Home Component</div>)

export default class Redirected extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <NavLink to='/'>Home</NavLink>&nbsp;|&nbsp;
          <NavLink to='/about'>About</NavLink>
          <Switch>
            <Route path='/home' exact>
              <Home/>
            </Route>
            <Route path='/about'>
              <About/>
            </Route>
            <Redirect from='/' to='/home'></Redirect>
          </Switch>
        </Router>
      </div>
    )
  }
}