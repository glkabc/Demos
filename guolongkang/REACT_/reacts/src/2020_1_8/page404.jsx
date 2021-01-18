import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  NavLink,
  useParams,
  useLocation,
} from 'react-router-dom'

const Home = () => {
  let {state: {id}} = useLocation();
  return (
    <div>Home useLocation to datas =&gt; id: {id}</div>
  )
}

const About = () => {
  let {id} = useParams()
  return (
    <div>About useParams to datas =&gt; id:{id}</div>
  )
}

const Search = () => {
  let {search} = useLocation()
  let query = new URLSearchParams(search)
  return (
    <div>Search useLocation to datas =&gt; id:{query.get('id')}</div>
  )
}

const Page404 = () => {
  return (
    <div>Not Found 404</div>
  )
}

const ParamsComponent = () => {
  return (
    <>
    <h2>Page 404</h2>
    <Router>
     <ul>
       <li><NavLink to={{
         pathname: '/home',
         state: {
           id : 12
         }
       }}>Home</NavLink></li>
       <li><NavLink to='/about/23'>About</NavLink></li>
       <li><NavLink to='/search?id=3'>Search</NavLink></li>
     </ul>
      <Switch>
        <Route path='*'>
          <Page404/>
        </Route>
        <Route path='/home'>
          <Home></Home>
        </Route>
        <Route path='/about/:id'>
          <About></About>
        </Route>
        <Route path='/search'>
          <Search/>
        </Route>
        <Redirect exact from='/' to='/home'/>
        
      </Switch>
     </Router>
    </>
  )
}

export default ParamsComponent