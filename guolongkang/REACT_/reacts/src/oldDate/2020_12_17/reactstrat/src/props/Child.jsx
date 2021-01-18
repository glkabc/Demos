// import React from 'react'

// export default class Child extends React.Component {
//     // static defaultProps = {
//     //     title: 'default props value'
//     // }
//     render() {
//         return (
//             <div>
//                 Child Component
//                 {this.props.title}
//             </div>
//         )
//     }
// }

// Child.defaultProps = {
//     title: "this is default props value!"
// }

import PropTypes from 'prop-types'

export default  function Child (props) {
    return (
        <div>Child {props.title}</div>
    )
}

Child.propTypes = {
    // 检测 title 的类型是否是 字符串类型
    title: PropTypes.string
}

Child.defaultProps = {
    title: "this is default props value!"
}