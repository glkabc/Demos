import React from 'react'
import './indexInput.css'

export default class Input extends React.Component {
    state = {
        value: ''
    }
    handleChange = () => {
        return (e) => {
            // console.log(e);
            this.setState({
                value: e.target.value
            })
        }
    }
    handleKeyUp = () => {
        return (e) => {
            // console.log(e.target)
            if (e.keyCode === 13 && e.target.value !== '') {
                this.props.onReceiveKeyWorld(this.state.value)
                this.setState({
                    value: ''
                })
            }
        }
    }
    clickAddItem = () => {
        return () => {
            if (this.state.value !== '') {
                this.props.onReceiveKeyWorld(this.state.value)
                this.setState({
                    value: ''
                })
            }
        }
    }
    render () {
        return (
            <div className='indexInput'>
                <input
                type="text" 
                value={this.state.value} 
                onChange={this.handleChange()}
                onKeyUp={this.handleKeyUp()}

                />
                <button onClick={this.clickAddItem()}>添加</button>
            </div>
        )
    }
}