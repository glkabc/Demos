import React from 'react'
import { createPortal } from 'react-dom'

// function getDiv() {
//     let divElement = document.createElement('div')
//     divElement.textContent = 'div'
//     document.appendChild(divElement)
//     return divElement
// }

const hoc = (Component) => {
    return class extends React.Component {
        render () {
            return createPortal(
                <Component {...this.props}></Component>,
                document.querySelector('body')
            )
        }
    }
}

export default hoc