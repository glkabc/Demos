import React, { useState, useCallback, memo } from 'react'

const Child = memo(function (props) {
  console.log('child run...')
  return (
    <>
      <h1>hello</h1>
      <button onClick={props.onAdd}>add</button>
    </>
  )
})

export default function useCallbackHooks () {
  console.log('parent run...')
  let [count, setCount] = useState(0)

  const handleAdd = useCallback(
    () => {
      console.log('added.')
    },
    [],
  )

  return (
    <div>
      <h3>Use Callback</h3>
      <p>{count}</p>
      <Child onAdd={handleAdd}></Child>
      <button onClick={() => setCount(100)}>chang child</button>
    </div>
  )
}