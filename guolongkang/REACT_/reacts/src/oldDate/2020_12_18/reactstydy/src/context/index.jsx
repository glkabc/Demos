import React from 'react'
import { textContext, Provider, Consumer } from './textContext'

class Child1 extends React.PureComponent {
    static contextType = textContext
    render () {
        console.log(this.context)
        return (
            <div>
                Child1
            </div>
        )
    }
}

class Child2 extends React.Component {
    render () {
        return (
            <div>
                Child2
                <Child4/>
            </div>
        )
    }
}

const Child3 = function (props) {
    return (
        <div>
            Child3
            {/* 函数式组件的传值 */}
            <Consumer>
                {
                    (value) => {
                        console.log(value)
                    }
                }
            </Consumer>
        </div>
    )
}

const Child4 = function (props) {   
    return (
        <div>
            Child4
            <Child3/>
        </div>
    )
}

export default class Context extends React.Component {
    render () {
        return (
            <Provider value='hello'>
                <h3>Context</h3>
                <Child1/>
                <Child2/>
            </Provider>
        )
    }
}