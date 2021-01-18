import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Switch,
    NavLink,
    Redirect
} from 'react-router-dom'

import './index.css'

const Home = () => <div>Home</div>
const Child1 = () => <div>Child1</div>
const Child2 = () => <div>Child2</div>
function About () {
    let { id } = useParams()
    return (
        <div>ID: {id}</div>
    )
}
function Bord () {
    let { path, url } = useRouteMatch()
    return (
        <>
            <span>Bord</span>
            <ul>
                <li><NavLink activeClassName='selected' to={`${url}/child1`}>Child1</NavLink></li>
                <li><NavLink activeClassName='selected' to={`${url}/child2`}>Child2</NavLink></li>
            </ul>
            <hr/>
            <Route path={`${path}/child1`} render={Child1}></Route>
            <Route path={`${path}/child2`} children={<Child2/>}></Route>
            <Redirect from={`${path}`} to={`${path}/child1`}></Redirect>
            {/* <Route path={`${path}/child2`} children={(props) => <Child2 {...props}/>}></Route> */}
        </>
    )
}

export default class Index extends Component {
    render() {
        return (    
            <> 
                React Router
                <Router>
                    <ul>
                        <li><Link to='/home'>Home</Link></li>
                        <li><Link to='/about/22'>About</Link></li>
                        <li><Link to='/bord'>Bord</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route path='/home'><Home/></Route>
                        {/* <Route path='/home' component={Home}></Route> */}
                        <Route path='/about/:id' children={<About/>}></Route>
                        <Route path='/bord' children={<Bord/>}></Route>
                        <Redirect from='/' to='/home'></Redirect>
                    </Switch>
                </Router>
            </>    
        )
    }
}
