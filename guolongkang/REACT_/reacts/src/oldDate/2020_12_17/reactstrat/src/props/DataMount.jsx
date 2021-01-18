import React from 'react'
import Child from './Child'

/**
 * 类组件定义
 */
export default class DataMount extends React.Component {
    render () {
        return (
            <>
                <div>WORLD IS VERY BEAUTIFUL</div>
                <Child title="this is props data"></Child>
            </>
        )
    }
}


/**
 * 函数组件定义
 */
//  export default (props) => {
//      return (
//         <>
//             <div>WORLD IS VERY BEAUTIFUL</div>
//             <Child title="this is props data"></Child>
//         </>
//      )
//  }