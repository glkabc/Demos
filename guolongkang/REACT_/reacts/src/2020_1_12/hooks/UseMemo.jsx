import React, { useState, useMemo, memo } from 'react'

const ChildHood = function (props) {
  return (
    <div>
      <h4>child hood</h4>
      {/* <p>{props}</p> */}
    </div>
  )
}

const Child = memo(function (props) {
  console.log('child run...')

  const Child1 = useMemo(() => () => <ChildHood a={props.a}></ChildHood>, [props.a])
  const Child2 = useMemo(() => () => <ChildHood b={props.b}></ChildHood>, [props.b])

  return (
    <>
      <h1>hello</h1>
      <button onClick={props.onAdd}>add</button>
      <Child1/>
      <Child2/>
    </>
  )
})

export default function useCallbackHooks () {
  let [count, setCount] = useState(0)

  const handleAdd = useMemo(() => {
    return () => {console.log('added.')}
  }, [])

  return (
    <div>
      <h3>Use Memo</h3>
      <p>{count}</p>
      <Child
      onAdd={handleAdd}
      a={'a'}
      b={'b'}
      ></Child>
      <button onClick={() => setCount(100)}>chang child</button>
    </div>
  )
}