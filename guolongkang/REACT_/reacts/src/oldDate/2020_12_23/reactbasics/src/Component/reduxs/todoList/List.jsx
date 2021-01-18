import React, { Component } from 'react'
import { connect } from 'react-redux'
import { delelteAction, setdataAction, loaddataAction } from './store/actionCreator'

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = dispatch => {
    return {
        delete(index) {
            dispatch(delelteAction(index))
        },

        setData(data) {
            dispatch(setdataAction(data))
        },

        loadData() {
            dispatch(loaddataAction())
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
                    // console.log(this.props.list.data)
                    this.props.list.map((value, index) => {
                        return <li key={index}>{value} <button onClick={this.handleClick(index)}>remove</button> </li>
                    })
                    // this.props.list.data.map((value, index) => {
                    //     return <li key={index}>{value.author} <button onClick={this.handleClick(index)}>remove</button> </li>
                    // })
                }
            </ul>
        )
    }

    componentDidMount() {
        // fetch('/manifest.json')
        //     .then(res => res.json())
        //     .then(result => {
        //         this.props.setData(result)
        //     })
        // this.props.setData(111111111)
        this.props.loadData()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
// export default List