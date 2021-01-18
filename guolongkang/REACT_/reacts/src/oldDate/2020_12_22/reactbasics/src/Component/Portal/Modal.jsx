import React from 'react'
import hoc from './withPortal'
// import './style.css'

class Modal extends React.Component {
    render() {
        return (
            <div className="protal">
                <h1>Protal Header</h1>
                <button>add</button>
            </div>
        )
    }
}

export default hoc(Modal)