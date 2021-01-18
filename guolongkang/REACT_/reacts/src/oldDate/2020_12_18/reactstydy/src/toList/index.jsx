import React from 'react'
import InputItem from './input'
import ListItem from './list'

export default class ToList extends React.Component {
    state = {
        list: [
            {
                id: 1,
                taskname: '小明'
            },
            {
                id: 2,
                taskname: '小s明'
            },
            {
                id: 3,
                taskname: '小a明'
            },
            {
                id: 4,
                taskname: '小e明'
            },
            {
                id: 5,
                taskname: '小t明'
            }
        ]
    }
    ReceiveKeyWorld = () => {
        return (value) => {
            // console.log(value)
            this.state.list.push({
                id: new Date().getTime(),
                taskname: value
            })
            this.setState({})
        }
    }
    handleDeleteList = (id) => {
        return () => {
            let newList = this.state.list
            newList.forEach((item, index) => {
                if (item.id === id) {
                    this.state.list.splice(index, 1)
                }
            })
            this.setState({
                list: newList
            })
        }
    }
    render () {
        return (
            <>
                <InputItem onReceiveKeyWorld={this.ReceiveKeyWorld()}/>
                <ListItem  onDeleteList={this.handleDeleteList} list={this.state.list}/>
            </>
        )
    }
}