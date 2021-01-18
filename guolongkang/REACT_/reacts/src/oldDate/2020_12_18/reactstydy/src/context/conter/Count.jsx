import React from 'react'

const { Provider, Consumer: CountConsumer} = React.createContext();

class CountProvider extends React.Component {
    constructor(props) {
        super(props)
        this.addCount = this.addCount.bind(this)
        this.cutCount = this.cutCount.bind(this)
    }
    state = {
        count: 0
    }
    addCount (value) {
        // console.log(value);
        this.setState(state => ({count: state.count + value}))
    }
    cutCount (value) {
        // console.log(value);
        this.setState(state => ({count: state.count - value}))
    }
    render () {
        return (
            <Provider
            value = {{
                count: this.state.count,
                addCount: this.addCount,
                cutCount: this.cutCount
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export {
    CountProvider,
    CountConsumer
}