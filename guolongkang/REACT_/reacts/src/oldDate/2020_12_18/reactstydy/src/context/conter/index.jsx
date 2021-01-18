import React from 'react'
import { CountProvider } from './Count'
import ChildOne from './Child1'

export default class IndexConter extends React.Component {
    render() {
        return (
            <CountProvider>
                <ChildOne/>
            </CountProvider>
        )
    }
}