import React from 'react'

import Child1 from './Child1'
import Child2 from './Child2'

// export default function Parent () {
//     return (
//         <div>Parent</div>
//     )
// }

export default class Parent extends React.Component {
    state ={
        data: ''
    }
    handleReceiveData(data) {
        console.log(data)
        this.setState({
            data
        })
    }
    render() {
        return (
            <div>
                {/* 需要绑定 this 才能传参成功 */}
                <Child1 onReceiveData={this.handleReceiveData.bind(this)}/>
                <Child2 data={this.state.data}/>
            </div>
        )
    }
}