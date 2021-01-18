import React, {Fragment} from 'react'

class Header extends React.Component {
    render() {
        return (
            <div>hello</div>
        )
    }
}

class Body extends React.Component {
    render() {
        return (
            <div>this is body</div>
        )
    }
}

export default class App extends React.Component {
    render() {
        return (
            // <>
            //     <Header/>
            //     <Body/>
            // </>
            React.createElement(
                Fragment,
                null,
                React.createElement(
                    Header
                ),
                React.createElement(
                    Body
                )
            )
        )
    }
}