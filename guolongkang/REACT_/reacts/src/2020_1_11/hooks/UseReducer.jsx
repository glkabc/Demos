import React, { useReducer } from 'react'

const initState = {
  count: 0
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'add': 
      return {count: state.count + 1}
    case 'mimus':
      return {count: state.count - 1}
    default:
      return state
  }
}

export default function UseReducerHooks () {
  let [state, dispatch] = useReducer(reducer, initState)

  return (
    <div>
      <h3>Use Reducer</h3>
      <p>{state.count}</p>
      <button onClick={() => dispatch({type: 'mimus'})}>-</button>
      <button onClick={() => dispatch({type: 'add'})}>+</button>
    </div>
  )
}