import React, {createRef, useRef} from 'react'

export default function UseRefHooks () {
  // let btn = createRef()
  let btn = useRef()

  // 使用 useref 避免 capture value  类组件中因为值是this的指向，所以没有 capture value 的问题
  let count = useRef(0)

  function handleClick () {
    console.log(btn.current)
  }

  function handelClickCurrent(num) {
    count.current += num
    setTimeout(() => {
      console.log(count.current)
    }, 3000);
  }
  return (
    <div>
      <h3>Use Ref</h3>
      <button ref={btn} onClick={handleClick}>click</button> <br/>
      <button onClick={() => handelClickCurrent(1)}>currendata</button>
      <button onClick={() => handelClickCurrent(-1)}>currendata</button>
    </div>
  )
}