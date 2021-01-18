import React, {useState} from 'react'
import {CSSTransition} from 'react-transition-group'
import './style.css'
import 'animate.css'

export default function TransItionGroup () {
  let [inProp, setInProp] = useState(true)
  console.log(inProp)

  return (
    <div>
      <h3>TransItionGroup</h3>
      <CSSTransition
        in={inProp} 
        timeout={1000} 
        appear={true}
        // classNames='my-node'
        classNames={{
          appear: 'animate__animated',
          appearActive: 'animate__pulse',
          enter: 'animate__animated',
          enterActive: 'animate__bounce',
          exit: 'animate__animated',
          exitActive: 'animate__rubberBand'
        }}
        mountOnEnter
        unmountOnExit
        >
        <p>I'll receive my-node-* classes</p>
      </CSSTransition>
      <button onClick={() => setInProp((inProp) => inProp = !inProp)}>click show or hidden</button>
    </div>
  )
}