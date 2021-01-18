import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store'
import Input from './Input'
import List from './List'

export default class index extends Component {
    render() {
        return (
            <Provider store={store}>
                <h3>todo list</h3>
                <Input/>
                <List/>
            </Provider>
        )
    }
}
