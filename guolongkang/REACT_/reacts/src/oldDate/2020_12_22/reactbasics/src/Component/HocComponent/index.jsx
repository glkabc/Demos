import React from 'react'
import HOC from './hoc'

// 装饰器 
// @HOC
// class HOCIndex extends React.Component {
//     render () {
//         return (
//             <div>
//                 HOC
//             </div>
//         )
//     }

//     componentDidMount() {
//         console.log(this)
//     }
// }

// export default HOCIndex


class HOCIndex extends React.Component {
    render() {
        return (
            <div>
                HOC
            </div>
        )
    }
}

export default HOC(HOCIndex)