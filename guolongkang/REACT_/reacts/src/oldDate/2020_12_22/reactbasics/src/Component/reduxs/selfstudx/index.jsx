import React from 'react'
import store from './store'

export default class MyRedux extends React.Component {
    render () {
        return (
            <div>
                My redux
                <span id="count">counr</span>
                <button onClick={store.dispatch.bind(this, {type: 'increment'})}>+</button>
            </div>
        )
    }

    componentDidMount() {
        store.dispatch()
    }
}