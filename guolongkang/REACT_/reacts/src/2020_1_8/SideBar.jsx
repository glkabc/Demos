import React from 'react'
import './SideBar.css'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

const routes = [
  {
    path: '/',
    exact: true,
    sidebar: () => <div>home!</div>,
    main: () => <h3>Home</h3>
  },
  {
    path: '/bubblegum',
    sidebar: () => <div>bubblegum!</div>,
    main: () => <h3>Bubbledum</h3>
  },
  {
    path: '/shoelaces',
    sidebar: () => <div>shoelaces!</div>,
    main: () => <h3>Shoelace</h3>
  }
]

export default function SideBAr () {
  return (
    <div className='sidebarbox'>
      <h2>SideBar Component</h2>
      <Router>
        <div className='sidebar'>
          <ul>
            {
              routes.map(value => {
                return <li key={value.path}><Link to={value.path}>{value.path === '/' ? 'home' : value.path.replace('/', '')}</Link></li>
              })
            }
          </ul>
          <Switch>
            {
              routes.map(value => {
                return <Route path={value.path} key={value.path} exact={value.exact} children={value.sidebar}></Route>
              })
            }
          </Switch>
        </div>
        <div className='main'>
          <Switch>
            {
              routes.map(value => {
                return <Route key={value.path} path={value.path} exact={value.exact} children={value.main}></Route>
              })
            }
          </Switch>
        </div>
      </Router>
    </div>
  )
}