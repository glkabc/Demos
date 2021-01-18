import React, { Component } from 'react'
import {connect} from 'react-redux'
import {delelteAction} from './store/actionCreator'

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete(index) {
            dispatch(delelteAction(index))
        }
    }
}

// @connect(mapStateToProps, null)
class List extends Component {
    handleClick = (index) => {
        return () => {
            this.props.delete(index)
        }
    }

    render() {
        return (
            <ul>
                {
                    // console.log(this.props)
                    this.props.list.map((value, index) => {
                        return <li key={index}>{value} <button onClick={this.handleClick(index)}>remove</button> </li>
                    })
                }
            </ul>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
// export default List