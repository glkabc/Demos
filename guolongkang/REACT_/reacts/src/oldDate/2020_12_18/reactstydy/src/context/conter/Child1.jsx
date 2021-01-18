import React from 'react'
import { CountConsumer } from './Count'
import ChildTwo from './Child2'

export default class Child1 extends React.Component {
    render() {
        return (
            <div>
                <CountConsumer>
                    {
                        (value) => {
                            return (
                                <div>{value.count}</div>
                            )
                        }
                    }
                </CountConsumer>
                <ChildTwo/>
            </div>
        )
    }
}