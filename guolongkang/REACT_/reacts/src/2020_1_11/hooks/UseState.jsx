import React, { useState } from 'react'

export default function HooksUse () {
  let [count, setCount] = useState(1)

  function addCount() {
    // setCount( (count) => count + 1)
    setCount( count + 1 )
  }
  return (
    <div>
      <h3>Hooks Use</h3>
      <p>{count}</p>
      <button onClick={addCount}>add</button>
    </div>
  )
}