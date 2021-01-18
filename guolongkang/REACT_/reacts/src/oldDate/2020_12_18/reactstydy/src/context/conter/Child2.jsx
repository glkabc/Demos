import React from 'react'
import {CountConsumer} from './Count'

export default class Child2 extends React.Component {
    render() {
        return (
            <div>
                <CountConsumer>
                    {
                        // 结构出传过来的对象
                        ({count, addCount, cutCount}) => {
                            return (
                                <div>
                                    <button onClick={() => cutCount(1)}>减去</button>
                                    {count}
                                    <button onClick={() => addCount(2)}>增加</button>
                                </div>
                            )
                        }
                    }
                </CountConsumer>
            </div>
        )
    }
}