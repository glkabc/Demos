import React, { useState, useEffect } from 'react'

export default function UseEffectHooks () {
  let [datas, setDatas] = useState({ count: 1 })

  useEffect(() => {
    console.log(2222222)
  }, [datas]) // 依赖datas 不加第二个参数组件渲染就会执行
  
  useEffect(() => {
    return () => {
      console.log('unmout') // 组件销毁执行到
    }
  }, [])
  
  return (
    <div>
      <h3>Use Effect</h3>
      <p>{datas.count}</p>
      <button onClick={() => setDatas(datas => ({count: datas.count + 1}))}>addData</button>
    </div>
  )
}