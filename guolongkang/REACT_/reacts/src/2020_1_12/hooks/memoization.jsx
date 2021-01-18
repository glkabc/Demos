import React, { useState } from 'react'
import memoizeOne from 'memoize-one'

// 函数式组件放在外面
let data = memoizeOne( str => {
    console.log('changes.......')
    return str + ' world!!!'}
)

const Child = function (props) {
  console.log('asassasasas')
  return (
    <div>
      <h4>CHild</h4>
      <p>{data(props.title)}</p>
    </div>
  )
}

export default function MemoizationOne () {
  console.log('parent....')
  let [title, changeTitle] = useState('hello')
  let [count, setCount] = useState(0)
  return (
    <div>
      <h3>Memoization</h3>
      <p>Count: {count}</p>
      <Child title={title} />
      <button onClick={() => changeTitle(`hello `)}>Change</button>
      <button onClick={() => changeTitle(`hello `)}>Change</button>
      <button onClick={() => changeTitle(`hello`)}>Change</button>
      <button onClick={() => setCount(12)}>CHange Count</button>
      <button onClick={() => setCount(14)}>CHange Count</button>
    </div>
  )
}