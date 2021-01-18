import React from 'react'
import Modal from './Modal'

export default class Protal extends React.Component {
    state = {
        count: 0
    }
    handleClick = () => {
        console.log(11111)
    }
    render() {
        return (
            <div onClick={this.handleClick}>
                <Modal />
            </div>
        )
    }
}