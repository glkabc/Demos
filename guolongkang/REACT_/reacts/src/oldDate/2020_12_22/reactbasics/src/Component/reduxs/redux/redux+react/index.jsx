import React from 'react'
import store from './stroe'

export default class IndexRedux extends React.Component {
    increment() {
        store.dispatch({type: 'increment'})
    }

    decrement() {
        store.dispatch({type: 'decrement'})
    }

    render () {
        return (
            <div>
                <h1>Redux</h1>
                <button onClick={this.increment}>+</button>
                <span>{store.getState().count}</span>
                <button onClick={this.decrement}>-</button>
            </div>
        )
    }
}