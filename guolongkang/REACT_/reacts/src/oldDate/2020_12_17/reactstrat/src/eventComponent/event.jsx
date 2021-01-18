import React from 'react'

export default class Event extends React.Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this) // 优化绑定 推荐使用
    }
    state = {
        count: 0
    }

    // handleClick() {
    //     console.log('click one')
    //     console.log(this.state.count)
    // }
    // 事件柯里化 进行传参
    handleClick = (arg) => {
        return (e) => {
            console.log('click one')
            console.log(this.state.count)
            console.log(arg)
            console.log(e.target)
        }
    }
    render () {
        return (
            <div>
                <h3>Event Component</h3>
                {/* bind 每次绑定都会重新创建 所以不建议 */}
                {/* <button onClick={this.handleClick.bind(this)}>点击</button> */}
                <button onClick={this.handleClick('bbbbaaaa')}>点击</button>
            </div>
        )
    }
}