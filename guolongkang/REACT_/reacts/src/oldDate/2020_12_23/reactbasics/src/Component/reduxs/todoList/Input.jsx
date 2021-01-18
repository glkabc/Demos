import React, { Component } from 'react'
import { connect } from 'react-redux'
import {putAction} from './store/actionCreator'

const mapDispatchToProps = dispatch => {
    return {
        putData(task) {
            dispatch(putAction(task))
        } 
    }
}

@connect(null, mapDispatchToProps)
class Input extends Component {
    state = {
        task: ''
    }
    handleChange = (e) => {
        this.setState({
            task: e.target.value
        })
    }
    handleKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.props.putData(this.state.task)
            e.target.value = ''
        }
    }
    render() {
        return (
            <div>
                <input type="text" value={this.state.task} onChange={this.handleChange} onKeyUp={this.handleKeyUp}/>
            </div>
        )
    }
}

export default Input