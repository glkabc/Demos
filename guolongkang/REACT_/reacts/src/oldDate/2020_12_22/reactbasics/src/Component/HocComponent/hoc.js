/**
 * 高阶组件
 */
import React from 'react'
 const hoc = (Component) => {
     return class extends React.Component {
         render() {
             return (
                 <Component title="props hello" {...this.props}></Component>
             )
         }
     }
 }

 export default hoc
 
// export default class HOC extends React.Component {
//     render() {
//         return (
//             this.props.children
//         )
//     }
// }